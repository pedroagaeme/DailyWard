from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.exceptions import NotFound, ValidationError
from django.utils.dateparse import parse_date
from rest_framework.response import Response
from django.views.generic.dates import DayArchiveView
from .models import Post
from .serializers import PostSerializer
from .permissions import IsTopicParticipant, IsAuthor, IsAuthorOrTopicAdmin
from topics.models import Topic
from rest_framework.views import APIView

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

    def perform_create(self, serializer):
        topic_id = self.kwargs.get('topic_pk') 
        topic = Topic.objects.get(pk=topic_id)
        post = serializer.save(posted_by=self.request.user, topic=topic)
    
class PostsByDayAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated, IsTopicParticipant]

    def get(self, request, topic_pk, date_iso):
        posts = Post.objects.filter(topic_id=topic_pk, created_at__date=date_iso)
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data)
