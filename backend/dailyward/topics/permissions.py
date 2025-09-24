from rest_framework import permissions

class IsAdminOrParticipant(permissions.BasePermission):
    """
    - Allow read if user is a participant.
    - Allow edit/delete if user is admin of the topic.
    """

    def has_object_permission(self, request, view, obj):
        user = request.user
        # SAFE_METHODS: GET, HEAD, OPTIONS
        if request.method in permissions.SAFE_METHODS:
            return obj.participant_set.filter(user=user).exists()
        # For edit/delete, must be admin of the topic
        return obj.participant_set.filter(user=user, role="admin").exists()