from rest_framework import generics
from django.contrib.auth.models import User  
from django.contrib.auth import get_user_model
User = get_user_model()
from rest_framework import viewsets
from user.models import Group
from task.models import TaskStatus,JobStatus,TaskCategory,Tag,Granularity,Task,Job
from task.serializers import TaskStatusSerializer,JobStatusSerializer,TaskCategorySerializer,TagSerializer,GranularitySerializer,TaskSerializer,JobSerializer

from rest_framework.pagination import PageNumberPagination  
from rest_framework.response import Response 
from rest_framework import status 
from django_filters import rest_framework as filters  


class TaskFilter(filters.FilterSet):  
    # 假设您的时间字段是datetime类型，使用DateTimeFilter  
    start_time = filters.DateTimeFilter(field_name="start_time", lookup_expr='gte')  
    deadline_time = filters.DateTimeFilter(field_name="deadline_time", lookup_expr='lte')  
    receiver = filters.NumberFilter(field_name="receiver_id")  # 假设receiver是一个关联到User的外键  
    status = filters.NumberFilter(field_name="status_id")  # 假设status是一个关联到Status的外键  
  
    # 使用CharFilter进行文本搜索，并使用icontains进行不区分大小写的包含搜索  
    search_text = filters.CharFilter(  
        method='filter_search_text',  
        label='Search text in content, challenge, feedback, name'  
    )
  
    class Meta:  
        model = Task  
        fields = ['start_time', 'deadline_time', 'receiver', 'status','search_text']  # 这里只列出用于自动生成查询参数的字段  
  
    def filter_search_text(self, queryset, name, value): 
        from django.db.models import Q  
        if value:  
            return queryset.filter(  
                Q(content__icontains=value) |  
                Q(challenge__icontains=value) |  
                Q(feedback__icontains=value) |  
                Q(name__icontains=value)  
            )  
    

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
    def list(self, request, *args, **kwargs):  
        # 获取查询参数  
        filter_params = request.query_params.dict()  

        # 从查询参数中提取group（如果存在）  
        group_id = filter_params.pop('group', None)  

        # 创建FilterSet实例  
        print('filter_params',filter_params)
        task_filter = TaskFilter(data=filter_params, queryset=Task.objects.all())  

        # 检查过滤是否有效  
        if not task_filter.is_valid():  
            return Response(task_filter.errors, status=status.HTTP_400_BAD_REQUEST)  

        filtered_tasks = task_filter.qs  

        # 如果提供了group_id，则进一步过滤tasks  
        print('group_id:',group_id)
        if group_id:  
            try:  
                group = Group.objects.get(id=group_id)  
                # 使用Django ORM来查询接收者在给定组内的任务  
                filtered_tasks = filtered_tasks.filter(receiver__group__id=group_id)  
            except Group.DoesNotExist:  
                # 处理组不存在的情况  
                return Response({"error": "Group not found"}, status=status.HTTP_404_NOT_FOUND)  

        # 使用TaskSerializer序列化查询集  
        serializer = TaskSerializer(filtered_tasks, many=True)  

        # 返回序列化后的数据  
        return Response(serializer.data)

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

class UserTaskListView(generics.ListAPIView):  
    serializer_class = TaskSerializer  
  
    def get_queryset(self):  
        # 获取请求中的用户名  
        userid = self.kwargs.get('userid')  
        try:  
            user = User.objects.get(id=userid)  
        except User.DoesNotExist:  
            return Job.objects.none()  # 返回一个空的Job查询集  
  
        # 获取用户创建的Job  
        tasks = Task.objects.filter(receiver=user)  
  
        return tasks


class UserJobsListView(generics.ListAPIView):  
    serializer_class = JobSerializer  
  
    def get_queryset(self):  
        # 获取请求中的用户名  
        userid = self.kwargs.get('userid')  
        try:  
            user = User.objects.get(id=userid)  
        except User.DoesNotExist:  
            return Job.objects.none()  # 返回一个空的Job查询集  
  
        # 获取用户创建的Job  
        jobs_by_user = Job.objects.filter(creater=user,status=1)  
  
        # 获取用户所在组的Job（这里假设一个用户可能属于多个组）  
        groups = user.group.all().values_list('pk',flat=True)
        jobs_by_groups = Job.objects.filter(group__in=groups,status=1).distinct()
  
        # 由于distinct()可能不完全可靠，特别是在多对多关系中，我们可以手动去重  
        # 这里我们使用列表推导式和集合来确保结果唯一  
        all_jobs = list(set(jobs_by_user.union(jobs_by_groups)))  
  
        return all_jobs