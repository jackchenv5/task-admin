from rest_framework import generics
from django.contrib.auth import get_user_model
User = get_user_model()
from rest_framework import viewsets

from task.models import TaskStatus,JobStatus,TaskCategory,Tag,Granularity,Task,Job,Test
from task.serializers import TaskStatusSerializer,JobStatusSerializer,TaskCategorySerializer,TagSerializer,GranularitySerializer,TaskSerializer,JobSerializer,TestSerializer

from rest_framework.pagination import PageNumberPagination  
from rest_framework.response import Response 

# 自定义分页类（可选，如果需要自定义每页显示的条目数）  
class StandardPagination(PageNumberPagination):  
    page_size = 10  # 设置每页显示的条目数  
    page_size_query_param = 'pageSize'  # 允许客户端通过查询参数来覆盖默认设置  
    max_page_size = 100  # 客户端请求的最大条目数  


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
    agination_class = StandardPagination
    def list(self, request, *args, **kwargs):  
        queryset = self.filter_queryset(self.get_queryset())  
  
        page = self.paginate_queryset(queryset)  
        if page is not None:  
            serializer = self.get_serializer(page, many=True)  
            return Response({  
                'code': 0,  
                'message': 'ok',  
                 'result': {  
                    'items': serializer.data,  
                    'total': queryset.count(),  # 这里获取总条目数  
                },   
                'type': 'success',  
            })  
  
        serializer = self.get_serializer(queryset, many=True)  
        return Response({  
            'code': 0,  
            'message': 'No data',  # 或者你可以自定义没有数据的消息  
            'result': {  
                    'items': serializer.data,  
                    'total': queryset.count(),  # 这里获取总条目数  
             },  
            'type': 'success',  
        })

class TestViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list` and `retrieve` actions.hello
    """
    queryset = Test.objects.all()
    serializer_class = TestSerializer