from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.exceptions import NotFound, ValidationError
from django.utils.dateparse import parse_date
from rest_framework.response import Response
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
        # filter posts by topic from URL
        topic_id = self.kwargs.get('topic_id')          
        if not topic_id:
            raise NotFound(detail="topic_id is required in the URL")
        return Post.objects.filter(topic_id=topic_id)
    
    @action(
        detail=False,
        methods=["get"],
        url_path=r'(?P<date_iso>\d{4}-\d{2}-\d{2})',
        permission_classes=[permissions.IsAuthenticated, IsTopicParticipant],
    )
    def posts_by_date(self, request, topic_id=None, date_iso=None):
        # validate URL params
        if not topic_id:
            raise NotFound(detail="topic_id is required in the URL")
        if not date_iso:
            raise NotFound(detail="date_iso is required in the URL")

        # parse/validate date string
        date_obj = parse_date(date_iso)
        if not date_obj:
            raise ValidationError("Invalid date format. Use YYYY-MM-DD.")

        qs = Post.objects.filter(topic_id=topic_id, created_at__date=date_obj).order_by("created_at")

        page = self.paginate_queryset(qs)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(qs, many=True)
        return Response(serializer.data)
