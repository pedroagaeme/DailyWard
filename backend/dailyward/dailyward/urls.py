"""
URL configuration for dailyward project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path, register_converter
from topics.views import ParticipantViewSet, TopicViewSet, join_topic_by_code
from posts.views import PostViewSet, PostsByDayAPIView
from resources.views import ResourceViewSet
from rest_framework_nested import routers
from .converters import DateConverter

router = routers.SimpleRouter()
router.register(r'topics', TopicViewSet, basename='topic')

topics_router = routers.NestedSimpleRouter(router, r'topics', lookup='topic')
topics_router.register(r'posts', PostViewSet)
topics_router.register(r'participants', ParticipantViewSet, basename='participant')
topics_router.register(r'resources', ResourceViewSet, basename='resource')

register_converter(DateConverter, 'date')
    
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/users/me/topics/<int:topic_pk>/posts/<date:date_iso>/', PostsByDayAPIView.as_view(), name='topic-post-archive'),
    path('api/v1/users/me/topics/join/', join_topic_by_code, name='join-topic-by-code'),
    path('api/v1/users/me/', include(router.urls)),
    path('api/v1/users/me/', include(topics_router.urls)),
    path('api/v1/auth/', include('users.urls'))
]
