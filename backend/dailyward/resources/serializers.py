from rest_framework import serializers
from .models import Resource

class ResourceSerializer(serializers.ModelSerializer):
    poster_name = serializers.CharField(source='uploaded_by.get_full_name', read_only=True)
    
    class Meta:
        model = Resource
        fields = ['id', 'poster_name', 'title', 'resource_type', 'file_url', 'filename', 'uploaded_by', 'description', 'created_at']
        read_only_fields = ['uploaded_by', 'created_at', 'poster_name']