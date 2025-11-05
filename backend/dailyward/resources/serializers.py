from rest_framework import serializers
from .models import Resource, ResourceFile
from django.core.files.storage import default_storage
from django.core.cache import cache

class ResourceFileSerializer(serializers.ModelSerializer):
    file_url = serializers.SerializerMethodField()
    
    class Meta:
        model = ResourceFile
        fields = ['id', 'file_url', 'filename', 'file_size', 'mime_type', 'created_at']
        read_only_fields = ['created_at']
    
    def get_file_url(self, obj):
        if obj.file_url:
            return default_storage.url(obj.file_url.name)
        return None

class ResourceSerializer(serializers.ModelSerializer):
    poster_name = serializers.CharField(source='uploaded_by.get_full_name', read_only=True)
    poster_id = serializers.CharField(source='uploaded_by.id', read_only=True)
    poster_profile_pic_url = serializers.SerializerMethodField(read_only=True)
    files = ResourceFileSerializer(many=True, read_only=True)
    
    class Meta:
        model = Resource
        fields = ['id', 'poster_name', 'poster_profile_pic_url', 'title', 'uploaded_by', 'poster_id', 'description', 'created_at', 'files']
        read_only_fields = ['uploaded_by', 'poster_id', 'created_at', 'poster_name', 'poster_profile_pic_url']
    
    def get_poster_profile_pic_url(self, obj):
        if obj.uploaded_by.profile_pic_url:
            return obj.uploaded_by.profile_pic_url.url
        return None
    
    def to_representation(self, instance):
        # Get the default representation
        data = super().to_representation(instance)
        
        # Handle caching for poster_profile_pic_url
        if instance.uploaded_by.profile_pic_url:
            cache_key = f'profile_pic_url_{instance.uploaded_by.id}'
            cached_url = cache.get(cache_key)
            
            if cached_url:
                data['poster_profile_pic_url'] = cached_url
            else:
                url = instance.uploaded_by.profile_pic_url.url
                cache.set(cache_key, url, timeout=300)
                data['poster_profile_pic_url'] = url
        else:
            data['poster_profile_pic_url'] = None
            
        return data