from rest_framework import permissions
from topics.models import Participant

class IsTopicParticipant(permissions.BasePermission):
    """Allow safe reads if requester is a participant of the post's topic."""
    def has_permission(self, request, view):
        topic_id = view.kwargs.get('topic_id')
        if topic_id:
            return Participant.objects.filter(topic_id=topic_id, user=request.user).exists()
        return False


class IsAuthor(permissions.BasePermission):
    """Allow action only if requester is the post author."""
    def has_object_permission(self, request, view, obj):
        return getattr(obj, "posted_by", None) == request.user

class IsAuthorOrTopicAdmin(permissions.BasePermission):
    """Allow action if author OR a participant with role 'admin' in the post's topic."""
    def has_object_permission(self, request, view, obj):
        if getattr(obj, "posted_by", None) == request.user:
            return True
        return Participant.objects.filter(topic=getattr(obj, "topic", None), user=request.user, role="admin").exists()