from rest_framework import serializers
from django.contrib.auth import get_user_model
User = get_user_model()
from user.models import Role,Group

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['id', 'username']

class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = ['id', 'name']

class GroupSerializer(serializers.ModelSerializer):
    # users = UserSerializer(many=True, read_only=True)  
    class Meta:
        model = Group
        fields = ['id', 'name','users']