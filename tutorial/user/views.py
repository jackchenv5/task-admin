from rest_framework import generics
from user.serializers import UserSerializer
from django.contrib.auth import get_user_model
User = get_user_model()
from rest_framework import viewsets

class UserViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list` and `retrieve` actions.hello
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer