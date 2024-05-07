from rest_framework import generics
from user.serializers import UserSerializer
from django.contrib.auth import get_user_model
User = get_user_model()

class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserDetail(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer