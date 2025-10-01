from django.shortcuts import render
from .permissions import IsAuthor, IsAuthorOrTopicAdmin, IsTopicParticipant
from rest_framework import viewsets, permissions
from .models import Resource
from .serializers import ResourceSerializer

# Create your views here.

class ResourceViewSet(viewsets.ModelViewSet):
    queryset = Resource.objects.all()
    serializer_class = ResourceSerializer
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
        topic_id = self.kwargs.get('topic_pk')          
        return Resource.objects.filter(topic=topic_id)
    
    def perform_create(self, serializer):
        topic = self.kwargs.get('topic_pk')
        serializer.save(uploaded_by=self.request.user, topic=topic)
