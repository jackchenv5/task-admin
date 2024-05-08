from rest_framework import generics
from django.contrib.auth import get_user_model
User = get_user_model()
from rest_framework import viewsets

from task.models import TaskStatus,JobStatus,TaskCategory,Tag,Granularity,Task,Job,Test
from task.serializers import TaskStatusSerializer,JobStatusSerializer,TaskCategorySerializer,TagSerializer,GranularitySerializer,TaskSerializer,JobSerializer,TestSerializer

class TaskStatusViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list` and `retrieve` actions.hello
    """
    queryset = TaskStatus.objects.all()
    serializer_class = TaskStatusSerializer

class JobStatusViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list` and `retrieve` actions.hello
    """
    queryset = JobStatus.objects.all()
    serializer_class = JobStatusSerializer

class TaskCategoryViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list` and `retrieve` actions.hello
    """
    queryset = TaskCategory.objects.all()
    serializer_class = TaskCategorySerializer

class TagViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list` and `retrieve` actions.hello
    """
    queryset = Tag.objects.all()
    serializer_class = TagSerializer

class GranularityViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list` and `retrieve` actions.hello
    """
    queryset = Granularity.objects.all()
    serializer_class = GranularitySerializer

class TaskViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list` and `retrieve` actions.hello
    """
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

class JobViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list` and `retrieve` actions.hello
    """
    queryset = Job.objects.all()
    serializer_class = JobSerializer

class TestViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list` and `retrieve` actions.hello
    """
    queryset = Test.objects.all()
    serializer_class = TestSerializer