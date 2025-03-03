from django.urls import path, include  
from rest_framework.routers import DefaultRouter  
from .views import TaskViewSet, UserListCreateView, UserDetailView
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet

router = DefaultRouter()  
router.register(r'tasks', TaskViewSet)  
router.register(r'users', UserViewSet, basename='user')

urlpatterns = [  
    path('', include(router.urls)), 
    path('api/', include(router.urls)),
    path('users/', UserListCreateView.as_view(), name='user-list-create'),
    path('users/<int:pk>/', UserDetailView.as_view(), name='user-detail'), 
]  