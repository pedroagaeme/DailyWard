from rest_framework import serializers
from .models import Resource

class ResourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resource
        fields = ['id', 'topic', 'uploaded_by', 'description', 'created_at']
        read_only_fields = ['uploaded_by', 'created_at']