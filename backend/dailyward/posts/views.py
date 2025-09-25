from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.exceptions import NotFound, ValidationError
from django.utils.dateparse import parse_date
from rest_framework.response import Response
from .models import Post
from .serializers import PostSerializer
from .permissions import IsTopicParticipant, IsAuthor, IsAuthorOrTopicAdmin
from topics.models import Topic
#create your views here.

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    
    def get_permissions(self):
        # map actions to small permissions
        if self.action in ("list", "retrieve", "create"):
            return [permissions.IsAuthenticated(), IsTopicParticipant()]
        if self.action in ("update", "partial_update"):
            return [permissions.IsAuthenticated(), IsAuthor()]
        if self.action == "destroy":
            return [permissions.IsAuthenticated(), IsAuthorOrTopicAdmin()]
        return [permissions.IsAuthenticated()]
    
    def get_queryset(self):
        # filter posts by topic from URL
        topic_id = self.kwargs.get('topic_pk')          
        return Post.objects.filter(topic=topic_id)

    def create(self, request, *args, **kwargs):
        topic_pk = self.kwargs.get('topic_pk')
        request.data['topic'] = topic_pk
        return super().create(request, *args, **kwargs)

    def perform_create(self, serializer):
        post = serializer.save(posted_by=self.request.user)
        

