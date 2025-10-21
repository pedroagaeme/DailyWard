import pytz
from rest_framework import viewsets, permissions, status, generics
from rest_framework.decorators import action
from rest_framework.exceptions import NotFound, ValidationError
from django.utils.dateparse import parse_date
from rest_framework.response import Response
from django.views.generic.dates import DayArchiveView
from .models import Post
from .serializers import PostSerializer
from .permissions import IsTopicParticipant, IsAuthor, IsAuthorOrTopicAdmin
from topics.models import Topic
from datetime import datetime 
from django.utils import timezone

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
        serializer.save(posted_by=self.request.user, topic=topic)

class PostsByDayAPIView(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated, IsTopicParticipant]
    serializer_class = PostSerializer

    def get_queryset(self):
        topic_pk = self.kwargs.get('topic_pk')
        date_iso = self.kwargs.get('date_iso')
        # Get timezone from request header
        user_tz_name = self.request.headers.get('X-User-Timezone', 'UTC')

        try:
            user_tz = pytz.timezone(user_tz_name)
        except pytz.UnknownTimeZoneError:
            user_tz = pytz.utc
        
        # Create timezone-aware datetime objects for the start and end of the day
        start_of_day = timezone.make_aware(
            datetime.combine(date_iso, datetime.min.time()), 
            user_tz
        )
        end_of_day = timezone.make_aware(
            datetime.combine(date_iso, datetime.max.time()), 
            user_tz
        )
        
        # Filter posts created during this day in user's timezone
        return Post.objects.filter(
            topic_id=topic_pk,
            created_at__gte=start_of_day,
            created_at__lte=end_of_day
        ).order_by('-created_at')
