from rest_framework import viewsets, permissions
from .models import Post
from .serializers import PostSerializer
from .permissions import IsTopicParticipant, IsAuthor, IsAuthorOrTopicAdmin

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
        topic_id = self.kwargs.get('topic_id')          
        if topic_id:
            return Post.objects.filter(topic_id=topic_id)
        return Post.objects.none()
    
    def perform_create(self, serializer):
        # optionally enforce that user is participant of target topic, or add them
        serializer.save(posted_by=self.request.user)