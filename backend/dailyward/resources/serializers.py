from rest_framework import serializers
from .models import Resource

class ResourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resource
        fields = ['id', 'poster_name', 'title', 'resource_type', 'file', 'uploaded_by', 'description', 'created_at']
        read_only_fields = ['uploaded_by', 'created_at', 'poster_name']