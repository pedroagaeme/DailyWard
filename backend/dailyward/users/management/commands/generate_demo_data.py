import random
import requests
from io import BytesIO
from django.core.management.base import BaseCommand
from django.core.files.base import ContentFile
from django.utils import timezone
from datetime import timedelta
from users.models import User
from topics.models import Topic, Participant
from posts.models import Post
from resources.models import Resource, ResourceFile


class Command(BaseCommand):
    help = 'Generate demo data with images from Lorem Picsum API'

    # Cache for downloaded images to reuse them
    image_cache = {}

    def add_arguments(self, parser):
        parser.add_argument(
            '--users',
            type=int,
            default=10,
            help='Number of users to create (default: 10)'
        )
        parser.add_argument(
            '--topics',
            type=int,
            default=5,
            help='Number of topics to create (default: 5)'
        )
        parser.add_argument(
            '--posts',
            type=int,
            default=1000,
            help='Number of posts to create (default: 1000)'
        )
        parser.add_argument(
            '--resources',
            type=int,
            default=30,
            help='Number of resources to create (default: 30)'
        )
        parser.add_argument(
            '--clear',
            action='store_true',
            help='Clear existing data before generating (keeps superusers)'
        )

    def handle(self, *args, **options):
        if options['clear']:
            self.stdout.write(self.style.WARNING('Clearing existing data...'))
            Post.objects.all().delete()
            ResourceFile.objects.all().delete()
            Resource.objects.all().delete()
            Participant.objects.all().delete()
            Topic.objects.all().delete()
            User.objects.filter(is_superuser=False).delete()
            self.stdout.write(self.style.SUCCESS('Existing data cleared.'))

        self.stdout.write('Generating demo data...')
        
        # Generate users
        users = self.create_users(options['users'])
        self.stdout.write(self.style.SUCCESS(f'Created {len(users)} users'))
        
        # Generate topics
        topics = self.create_topics(options['topics'], users)
        self.stdout.write(self.style.SUCCESS(f'Created {len(topics)} topics'))
        
        # Add participants to topics
        self.add_participants(topics, users)
        self.stdout.write(self.style.SUCCESS('Added participants to topics'))
        
        # Generate posts
        posts = self.create_posts(options['posts'], topics, users)
        self.stdout.write(self.style.SUCCESS(f'Created {len(posts)} posts'))
        
        # Generate resources
        resources = self.create_resources(options['resources'], topics, users)
        self.stdout.write(self.style.SUCCESS(f'Created {len(resources)} resources'))
        
        # Summary
        image_percentage = 15 if options['posts'] > 100 else 50
        self.stdout.write(self.style.SUCCESS(f'\n✓ Demo data generation complete!'))
        self.stdout.write(self.style.SUCCESS(f'  ~{image_percentage}% of posts have images'))

    def download_image(self, width=400, height=400, seed=None):
        """Download a random image from Lorem Picsum API with caching"""
        # Limit unique images to reduce downloads (reuse images)
        cache_key = f'{width}x{height}_{seed % 20 if seed else 0}'  # Only 20 unique images per size
        
        # Check if we already have this image cached
        if cache_key in self.image_cache:
            # Return a copy of the cached image with a new name
            cached_content = self.image_cache[cache_key]
            return ContentFile(cached_content, name=f'image_{random.randint(1000, 9999)}.jpg')
        
        # Download new image
        try:
            url = f'https://picsum.photos/{width}/{height}'
            if seed:
                url += f'?random={seed}'
            
            response = requests.get(url, timeout=30)
            if response.status_code == 200:
                # Cache the image content
                self.image_cache[cache_key] = response.content
                return ContentFile(response.content, name=f'image_{random.randint(1000, 9999)}.jpg')
            return None
        except KeyboardInterrupt:
            raise
        except Exception as e:
            # Silently fail to avoid cluttering output with warnings
            return None

    def create_users(self, count):
        """Create demo users with profile pictures"""
        first_names = ['Ana', 'Bruno', 'Carlos', 'Diana', 'Eduardo', 'Fernanda', 'Gabriel', 'Helena', 'Igor', 'Juliana', 
                      'Lucas', 'Mariana', 'Pedro', 'Rafaela', 'Rodrigo', 'Sofia', 'Thiago', 'Vanessa', 'William', 'Beatriz']
        last_names = ['Silva', 'Santos', 'Oliveira', 'Souza', 'Rodrigues', 'Ferreira', 'Alves', 'Pereira', 
                     'Lima', 'Gomes', 'Costa', 'Ribeiro', 'Martins', 'Carvalho', 'Rocha']
        
        users = []
        for i in range(count):
            first_name = random.choice(first_names)
            last_name = random.choice(last_names)
            email = f'{first_name.lower()}.{last_name.lower()}{random.randint(1, 999)}@demo.com'
            
            user = User.objects.create_user(
                email=email,
                password='demo1234',
                first_name=first_name,
                last_name=last_name,
                is_verified=True
            )
            
            # Add profile picture
            profile_pic = self.download_image(300, 300, seed=i)
            if profile_pic:
                user.profile_pic_url = profile_pic
                user.save()
            
            users.append(user)
            self.stdout.write(f'  Created user: {user.email}')
        
        return users

    def create_topics(self, count, users):
        """Create demo topics with images and different start dates"""
        topic_titles = [
            'Bootcamp de Desenvolvimento Web',
            'Fundamentos de Machine Learning',
            'Estratégia de Marketing Digital',
            'Design de Aplicativos Mobile',
            'Projetos de Ciência de Dados',
            'Computação em Nuvem Básico',
            'Treinamento em Cibersegurança',
            'Gestão de Produtos',
            'Workshop de Design UI/UX',
            'Melhores Práticas DevOps',
            'Tecnologia Blockchain',
            'Desenvolvimento de Jogos',
            'Metodologias Ágeis',
            'Design de Banco de Dados',
            'Administração de Redes'
        ]
        
        descriptions = [
            'Um curso completo sobre as tecnologias e práticas mais recentes.',
            'Junte-se a nós para aprender e colaborar em projetos empolgantes.',
            'Treinamento prático com aplicações do mundo real.',
            'Sessões conduzidas por especialistas com exemplos práticos.',
            'Desenvolva suas habilidades através de lições interativas e atividades.'
        ]
        
        topics = []
        for i in range(min(count, len(topic_titles))):
            code = ''.join(random.choices('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', k=8))
            
            # Create topic with different start dates (spread over 6 months)
            days_ago = random.randint(1, 180)  # Random date within last 6 months
            created_at = timezone.now() - timedelta(days=days_ago, hours=random.randint(0, 23))
            
            topic = Topic.objects.create(
                code=code,
                title=topic_titles[i],
                description=random.choice(descriptions),
                created_by=random.choice(users)
            )
            
            # Override created_at using update (bypasses auto_now_add)
            Topic.objects.filter(pk=topic.pk).update(created_at=created_at)
            topic.refresh_from_db()
            
            # Add topic image
            topic_pic = self.download_image(600, 400, seed=i+100)
            if topic_pic:
                topic.topic_image_url = topic_pic
                topic.save()
            
            topics.append(topic)
            self.stdout.write(f'  Created topic: {topic.title} (Code: {topic.code}) - Created {days_ago} days ago')
        
        return topics

    def add_participants(self, topics, users):
        """Add participants to topics with 2-3 admins per topic"""
        for topic in topics:
            # Add creator as admin
            Participant.objects.create(
                user=topic.created_by,
                topic=topic,
                role='admin'
            )
            
            # Select additional admins (1-2 more admins)
            num_additional_admins = random.randint(1, 2)
            available_users = [u for u in users if u != topic.created_by]
            
            if len(available_users) >= num_additional_admins:
                additional_admins = random.sample(available_users, num_additional_admins)
                for admin_user in additional_admins:
                    Participant.objects.create(
                        user=admin_user,
                        topic=topic,
                        role='admin'
                    )
                
                # Update available users list
                available_users = [u for u in available_users if u not in additional_admins]
            
            # Add random regular members
            num_members = random.randint(2, min(6, len(available_users)))
            if available_users and num_members > 0:
                members = random.sample(available_users, min(num_members, len(available_users)))
                
                for user in members:
                    Participant.objects.create(
                        user=user,
                        topic=topic,
                        role='member'
                    )
            
            total_admins = 1 + num_additional_admins if len(available_users) >= num_additional_admins else 1
            self.stdout.write(f'    Topic "{topic.title}" has {total_admins} admins')

    def create_posts(self, count, topics, users):
        """Create demo posts with images"""
        post_contents = [
            'Ótima sessão hoje! Aprendi muito sobre os fundamentos.',
            'Aqui estão minhas anotações da aula de hoje. Espero que ajudem!',
            'Pergunta rápida sobre a tarefa - alguém está disponível para discutir?',
            'Acabei de finalizar o projeto! Confiram isso.',
            'Encontrei este recurso útil relacionado ao nosso tópico.',
            'Mal posso esperar pela próxima sessão!',
            'Compartilhando algumas percepções da minha pesquisa.',
            'Este conceito é realmente fascinante!',
            'Colaboração é fundamental nesta área.',
            'Fiz algum progresso na tarefa hoje.',
            'Alguém tem dicas para a próxima prova?',
            'Estou adorando este curso até agora!',
            'Aqui está uma visualização que eu criei.',
            'Artigo interessante que encontrei relacionado às nossas discussões.',
            'A prática leva à perfeição!',
            'Ansioso para trabalhar com todos vocês.',
            'Este exemplo realmente esclareceu as coisas para mim.',
            'Ótima discussão em aula hoje!',
            'Aqui estão alguns recursos adicionais.',
            'Animado para aplicar o que aprendemos!'
        ]
        
        posts = []
        # Adjust image percentage based on volume (fewer images for large volumes)
        image_percentage = 0.15 if count > 100 else 0.5
        
        for i in range(count):
            # Progress reporting every 100 posts
            if i > 0 and i % 100 == 0:
                self.stdout.write(f'  Created {i} posts so far...')
            
            topic = random.choice(topics)
            # Get participants of this topic
            participants = Participant.objects.filter(topic=topic)
            if not participants.exists():
                continue
            
            participant = random.choice(participants)
            
            # Create post with random date between topic creation and now
            topic_created = topic.created_at
            days_since_topic = (timezone.now() - topic_created).days
            
            if days_since_topic > 0:
                days_after_topic = random.randint(0, days_since_topic)
                created_at = topic_created + timedelta(days=days_after_topic, hours=random.randint(0, 23))
            else:
                created_at = topic_created
            
            post = Post.objects.create(
                topic=topic,
                posted_by=participant.user,
                content_text=random.choice(post_contents),
            )
            
            # Override created_at using update
            Post.objects.filter(pk=post.pk).update(created_at=created_at)
            post.refresh_from_db()
            
            # Chance of including an image (reduced for large volumes)
            if random.random() < image_percentage:
                post_pic = self.download_image(800, 600, seed=i+200)
                if post_pic:
                    post.content_pic_url = post_pic
                    post.save()
            
            posts.append(post)
        
        return posts

    def create_resources(self, count, topics, users):
        """Create demo resources"""
        resource_titles = [
            'Ementa do Curso',
            'Guia de Estudos',
            'Exercícios Práticos',
            'Materiais de Referência',
            'Anotações de Vídeo Tutorial',
            'Exemplos de Código',
            'Modelo de Atividade',
            'Slides da Apresentação',
            'Lista de Leituras',
            'Cartão de Referência Rápida',
            'Projeto de Exemplo',
            'Cola de Consulta',
            'Guia de Melhores Práticas',
            'Documento de Perguntas Frequentes',
            'Links de Recursos'
        ]
        
        descriptions = [
            'Materiais essenciais para o curso.',
            'Recursos úteis para estudar.',
            'Problemas de prática e soluções.',
            'Documentação e guias de referência.',
            'Materiais de aprendizado complementares.',
            'Leituras e exemplos adicionais.'
        ]
        
        resources = []
        for i in range(count):
            # Progress reporting every 50 resources
            if i > 0 and i % 50 == 0:
                self.stdout.write(f'  Created {i} resources so far...')
            
            topic = random.choice(topics)
            participants = Participant.objects.filter(topic=topic)
            if not participants.exists():
                continue
            
            participant = random.choice(participants)
            
            # Create resource with random date between topic creation and now
            topic_created = topic.created_at
            days_since_topic = (timezone.now() - topic_created).days
            
            if days_since_topic > 0:
                days_after_topic = random.randint(0, days_since_topic)
                created_at = topic_created + timedelta(days=days_after_topic, hours=random.randint(0, 23))
            else:
                created_at = topic_created
            
            resource = Resource.objects.create(
                topic=topic,
                title=random.choice(resource_titles),
                uploaded_by=participant.user,
                description=random.choice(descriptions)
            )
            
            # Override created_at using update
            Resource.objects.filter(pk=resource.pk).update(created_at=created_at)
            resource.refresh_from_db()
            
            resources.append(resource)
        
        return resources
