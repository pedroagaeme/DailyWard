from rest_framework import serializers
from .models import Post

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['id', 'topic', 'posted_by', 'content_text', 'created_at']
        read_only_fields = ['posted_by', 'created_at', 'topic']