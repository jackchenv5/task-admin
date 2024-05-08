from django.urls import path
from task.views import TaskStatusViewSet,JobStatusViewSet,TaskCategoryViewSet,TagViewSet,GranularityViewSet,TaskViewSet,JobViewSet,TestViewSet

from django.urls import path, include
from rest_framework.routers import DefaultRouter

# Create a router and register our ViewSets with it.
router = DefaultRouter()
router.register(r'task_status', TaskStatusViewSet, basename='task_status')
router.register(r'job_status', JobStatusViewSet, basename='job_status')
router.register(r'task_category', TaskCategoryViewSet, basename='task_category')
router.register(r'tags', TagViewSet, basename='tag')
router.register(r'granularity', GranularityViewSet, basename='granularity')
router.register(r'tasks', TaskViewSet, basename='task')
router.register(r'jobs', JobViewSet, basename='job')
router.register(r'tests', TestViewSet, basename='test')
# The API URLs are now determined automatically by the router.
urlpatterns = [
    path('', include(router.urls)),
]