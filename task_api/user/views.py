from rest_framework import generics
from user.serializers import UserSerializer,GroupSerializer,RoleSerializer
from django.contrib.auth import get_user_model
User = get_user_model()
from user.models import Role
from django.contrib.auth.models import Group
from rest_framework import viewsets

class UserViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list` and `retrieve` actions.hello
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer

class RoleViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list` and `retrieve` actions.hello
    """
    queryset = Role.objects.all()
    serializer_class = RoleSerializer

class GroupViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list` and `retrieve` actions.hello
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer