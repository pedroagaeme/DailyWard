from rest_framework import serializers
from .models import Resource, ResourceFile
from django.core.files.storage import default_storage

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
    files = ResourceFileSerializer(many=True, read_only=True)
    
    class Meta:
        model = Resource
        fields = ['id', 'poster_name', 'title', 'uploaded_by', 'description', 'created_at', 'files']
        read_only_fields = ['uploaded_by', 'created_at', 'poster_name']