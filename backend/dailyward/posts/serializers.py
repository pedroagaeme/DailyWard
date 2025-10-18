from rest_framework import serializers
from .models import Post
from django.core.cache import cache

class PostSerializer(serializers.ModelSerializer):
    poster_name = serializers.CharField(source='posted_by.get_full_name', read_only=True)
    
    class Meta:
        model = Post
        fields = ['id', 'poster_name', 'content_text', 'created_at', 'content_pic_url']
        read_only_fields = ['created_at', 'poster_name']

    def to_representation(self, instance):
        # Get the default representation
        data = super().to_representation(instance)
        
        # Handle caching for content_pic_url
        if instance.content_pic_url:
            cache_key = f'post_pic_url_{instance.id}'
            cached_url = cache.get(cache_key)
            
            if cached_url:
                data['content_pic_url'] = cached_url
            else:
                url = instance.content_pic_url.url
                cache.set(cache_key, url, timeout=300)
                data['content_pic_url'] = url
        else:
            data['content_pic_url'] = None
            
        return data