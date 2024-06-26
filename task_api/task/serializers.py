from rest_framework import serializers
from django.contrib.auth import get_user_model
from user.models import Group
User = get_user_model()
from task.models import TaskStatus,JobStatus,TaskCategory,Tag,Granularity,Task,Job
class TaskStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskStatus
        fields = ['id', 'name']

class JobStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobStatus
        fields = ['id', 'name']

class TaskCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskCategory
        fields = ['id', 'name']

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name','color']

class GranularitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Granularity
        fields = ['id', 'name']

class TaskSerializer(serializers.ModelSerializer):
    category = serializers.PrimaryKeyRelatedField(queryset=TaskCategory.objects.all(), required=False)
    creater = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), required=False)
    receiver = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), required=False)
    start_time = serializers.DateField(format='%Y-%m-%d',allow_null=True,required=False)
    done_time = serializers.DateField(format='%Y-%m-%d',allow_null=True,required=False)
    deadline_time = serializers.DateField(format='%Y-%m-%d',allow_null=True,required=False)
    category_name = serializers.SerializerMethodField(required=False)
    creater_name = serializers.SerializerMethodField(required=False)
    receiver_name = serializers.SerializerMethodField(required=False)
    status_name = serializers.SerializerMethodField(required=False)
    related_task_name = serializers.SerializerMethodField(required=False)
    class Meta:
        model = Task
        fields = ['id','name','category','content','challenge','feedback','creater','receiver','start_time','done_time','deadline_time','workload','status','related_task_name','related_task','tags'
                  ,'category_name','creater_name','receiver_name','status_name']
    
    def get_status_name(self, obj):  
        if obj.status is not None:  
            return obj.status.name  
        return '未指定'  # 或者你想要的任何默认值
    
    def get_category_name(self, obj):  
        if obj.category is not None:  
            return obj.category.name  
        return '未指定'  # 或者你想要的任何默认值
    
    def get_creater_name(self, obj):  
        if obj.creater is not None:  
            return obj.creater.username  
        return '未指定'  # 或者你想要的任何默认值

    def get_receiver_name(self, obj):  
        if obj.receiver is not None:  
            return obj.receiver.username  
        return '未指定'  # 或者你想要的任何默认值

    def get_related_task_name(self, obj):  
        if obj.related_task is not None:  
            return obj.related_task.name  
        return '未指定'  # 或者你想要的任何默认值

class JobSerializer(serializers.ModelSerializer):
    creater = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), required=False)
    group = serializers.PrimaryKeyRelatedField(queryset=Group.objects.all(), required=False)
    creater_name = serializers.SerializerMethodField(required=False)
    group_name = serializers.SerializerMethodField(required=False) 
    status_name = serializers.SerializerMethodField(required=False) 
    granularity_name = serializers.SerializerMethodField(required=False) 
    create_time = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S',required=False)
    done_time = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S',required=False)
    class Meta:
        model = Job
        fields = ['id', 'name','creater','group','status','create_time','done_time','description','granularity','creater_name','group_name','status_name','granularity_name']
    def get_creater_name(self, obj):  
        if obj.creater is not None:  
            return obj.creater.username  
        return '未指定'  # 或者你想要的任何默认值
    
    def get_group_name(self, obj):  
        if obj.creater is not None:  
            return obj.group.name
        return '未指定'  # 或者你想要的任何默认值

    def get_status_name(self, obj):  
        if obj.status is not None:  
            return obj.status.name
        return '未指定'  # 或者你想要的任何默认值
    
    def get_granularity_name(self, obj):  
        if obj.granularity is not None:  
            return obj.granularity.name
        return '未指定'  # 或者你想要的任何默认值