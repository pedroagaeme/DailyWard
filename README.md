# DailyWard

## Visão Geral
DailyWard é um aplicativo desenvolvido para facilitar a comunicação, organização e compartilhamento de recursos entre usuários em ambientes colaborativos. O projeto utiliza uma arquitetura moderna, integrando backend em Django REST Framework e frontend em React Native com Expo Router.

## Principais Pontos do Desenvolvimento

### 1. Backend
- **Framework:** Django REST Framework
- **Banco de Dados:** PostgreSQL
- **Autenticação:** Customização do modelo de usuário, autenticação JWT
- **APIs:** Endpoints para posts, recursos, tópicos e usuários
- **Permissões:** Controle de acesso por permissões customizadas
- **Docker:** Contêinerização do backend para ambientes de desenvolvimento e produção
- **Gerenciamento de Segredos:** Integração com Doppler para variáveis de ambiente seguras
- **Migrações:** Gerenciamento de banco de dados via Django migrations

### 2. Frontend
- **Navegação:** Expo Router gerencia as rotas e transições entre telas, tornando o fluxo do app dinâmico e modular.
- **Formulários:** React Hook Form controla e valida os dados dos formulários, oferecendo feedback instantâneo de erros.
- **Integração com backend:** Axios realiza as requisições HTTP para a API, garantindo comunicação eficiente e segura.
- **Componentização:** Diversos componentes reutilizáveis (inputs, botões, listas, date pickers, etc.) promovem consistência visual e facilitam a manutenção.
- **Estilização:** Interface construída com StyleSheet e temas customizados, adaptando cores, tipografia e espaçamentos.
- **Gestão de assets:** Imagens e ícones organizados para garantir performance e carregamento rápido.
- **Estado e contexto:** Contextos e hooks customizados para autenticação, estado global, temas e dados do usuário.

### 3. DevOps & Deploy
- **CI/CD:** Automatização do deploy via GitHub Actions
- **Orquestração:** Docker Compose para gerenciamento dos serviços
- **Nginx:** Proxy reverso e gerenciamento de certificados SSL
- **Segurança:** Injeção de segredos via Doppler CLI
- **Deploy:** SCP/SSH para atualização do servidor VPS

### 4. Estrutura do Projeto
- **backend/**: Código do servidor Django, configurações, apps e scripts
- **frontend/**: Aplicativo mobile, componentes, telas, assets e utilitários
- **.github/**: Workflows de CI/CD

## Como Contribuir

**Este projeto está fechado para colaborações externas no momento.**

## Como rodar o projeto
1. Clone o repositório
2. Instale as dependências do backend e frontend
3. Configure as variáveis de ambiente
4. Para rodar o backend, utilize o Docker Compose de desenvolvimento (`compose.dev.yml`).
5. Para rodar o frontend, utilize o aplicativo Expo Go no seu dispositivo ou emulador.

## Contato
Para dúvidas ou sugestões, entre em contato com o mantenedor do projeto.
