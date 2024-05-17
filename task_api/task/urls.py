from django.urls import path
from task.views import TaskStatusViewSet,JobStatusViewSet,TaskCategoryViewSet,TagViewSet,GranularityViewSet,TaskViewSet,JobViewSet, UserJobsListView,UserTaskListView
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


urlpatterns = [
    path('', include(router.urls)),
    path('jobs/by-user/<int:userid>/', UserJobsListView.as_view(), name='user-jobs-by-username'),
    path('tasks/by-user/<int:userid>/', UserTaskListView.as_view(), name='user-tasks-by-username'),  
]