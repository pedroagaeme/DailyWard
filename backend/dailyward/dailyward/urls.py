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
from django.urls import path, include
from topics.views import TopicViewSet
from posts.views import PostViewSet
from resources.views import ResourceViewSet
from rest_framework_nested import routers

router = routers.SimpleRouter()
router.register(r'topics', TopicViewSet, basename='topic')

topics_router = routers.NestedSimpleRouter(router, r'topics', lookup='topic')
topics_router.register(r'posts', PostViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),

    path('api/v1/users/me/', include(router.urls)),
    path('api/v1/users/me/', include(topics_router.urls)),

    path('api/v1/auth/', include('users.urls'))
]
