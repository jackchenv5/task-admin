import re
from rest_framework import generics
from user.serializers import UserSerializer,GroupSerializer,RoleSerializer
from django.contrib.auth import get_user_model
User = get_user_model()
from user.models import Role,Group
from rest_framework import viewsets
from rest_framework.views import APIView  

from rest_framework.pagination import PageNumberPagination  
from rest_framework.response import Response 
from rest_framework import status  

# 自定义分页类（可选，如果需要自定义每页显示的条目数）  
class StandardPagination(PageNumberPagination):  
    page_size = 10  # 设置每页显示的条目数  
    page_size_query_param = 'pageSize'  # 允许客户端通过查询参数来覆盖默认设置  
    max_page_size = 100  # 客户端请求的最大条目数  


class UserViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list` and `retrieve` actions.hello
    """
    queryset = User.objects.all()
    agination_class = StandardPagination
    serializer_class = UserSerializer
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

class RoleViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list` and `retrieve` actions.
    """
    queryset = Role.objects.all()
    serializer_class = RoleSerializer
    pagination_class = StandardPagination

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

class GroupViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list` and `retrieve` actions.hello
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    pagination_class = StandardPagination

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

class UserIDsByUsernamesAPIView(APIView):  
    def get(self, request, usernames, format=None):  
        # 分割用户名列表  
        username_list = re.split(r'[，,]', usernames)  
        # 移除空白字符并转换为小写（如果需要）  
        username_list = [username.strip() for username in username_list]  
          
        # 查找用户ID  
        user_ids = []  
        for username in username_list:  
            try:  
                user = User.objects.get(username=username)  
                user_ids.append(user.id)  
            except User.DoesNotExist:  
                # 你可以选择记录错误或忽略不存在的用户  
                pass  
  
        # 返回用户ID列表  
        return Response(user_ids, status=status.HTTP_200_OK)