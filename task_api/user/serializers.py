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
    users = serializers.SerializerMethodField()  
    class Meta:
        model = Group
        fields = ['id', 'name','users']

    def get_users(self, obj):  
        # obj 是 Group 对象  
        # 我们通过 obj.user_set.all() 获取所有关联的用户  
        # 然后使用 UserSerializer 序列化这些用户，但只包含 username 字段  
        users = UserSerializer(obj.users.all(), many=True).data  
        # 如果只想要用户名列表，我们可以提取每个序列化对象的 'username' 字段  
        usernames = [user['username'] for user in users] 
        return ",".join(usernames)  