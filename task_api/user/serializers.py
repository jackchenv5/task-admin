from rest_framework import serializers
from django.contrib.auth import get_user_model
User = get_user_model()
from user.models import Role,Group

class UserSerializer(serializers.ModelSerializer):
    role_name = serializers.SerializerMethodField() 
    
    # role_id = serializers.PrimaryKeyRelatedField(  
    # queryset=Role.objects.all(),  
    # required=False,  
    # allow_null=True  
    # )  
    class Meta:
        model = User
        fields = ['id','username','emp_num','role','role_name']
    def get_role_name(self, obj):  
        if obj.role is not None:  
            return obj.role.name  
        return '未指定'  # 或者你想要的任何默认值
    
    # def update(self, instance, validated_data):  
    #     # 实现自定义的更新逻辑  
    #     print(validated_data)
    #     if 'role' in validated_data:  
    #         role = validated_data.pop('role')  
    #         instance.role = role  
    #     for attr, value in validated_data.items():  
    #         setattr(instance, attr, value)  
    #     instance.save()  
    #     return instance

class UserIDListSerializer(serializers.Serializer):  
    ids = serializers.ListField(child=serializers.IntegerField(), required=True)


class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = ['id', 'name']

class GroupSerializer(serializers.ModelSerializer):
    users = serializers.SerializerMethodField()  
    # 这是一个可写的字段，用于接收用户ID列表来更新多对多关系  
    user_list = serializers.PrimaryKeyRelatedField(  
        many=True,  
        queryset=User.objects.all(),  
        required=False,  # 如果用户列表不是必须的  
        allow_empty=True  # 允许传递空列表来清除所有关联用户  
    )  
    class Meta:
        model = Group
        fields = ['id', 'name','users','user_list']

    def get_users(self, obj):  
        # obj 是 Group 对象  
        # 我们通过 obj.user_set.all() 获取所有关联的用户  
        # 然后使用 UserSerializer 序列化这些用户，但只包含 username 字段  
        users = UserSerializer(obj.users.all(), many=True).data  
        # 如果只想要用户名列表，我们可以提取每个序列化对象的 'username' 字段  
        usernames = [user['username'] for user in users] 
        return ",".join(usernames)  

    def update(self, instance, validated_data):  
        # 清除所有现有关联的用户  
  
        # 获取并处理自定义字段 user_list 的数据  
        print(validated_data)
        user_list = validated_data.pop('user_list', [])  
        if user_list:
            instance.users.clear()  
            # 查找并添加新的用户到Group  
            for user in user_list:  
                try:  
                    instance.users.add(user)  
                except User.DoesNotExist:  
                    # 可以选择记录一个错误或忽略不存在的用户  
                    pass  
  
        # 调用父类的update方法来更新Group的其他字段（如果有的话）  
        return super().update(instance, validated_data)  

 
    
