from rest_framework import serializers
from django.contrib.auth import get_user_model
from task.models import TaskStatus,JobStatus,TaskCategory,Tag,Granularity,Task,Job,Test
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
    create_time = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S',allow_null=True)
    done_time = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S',allow_null=True)
    deadline_time = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S',allow_null=True)
    class Meta:
        model = Task
        fields = ['id','category','content','challenge','creater','receiver','create_time','done_time','deadline_time','status','tags']

class JobSerializer(serializers.ModelSerializer):
    creater_name = serializers.SerializerMethodField()
    group_name = serializers.SerializerMethodField() 
    status_name = serializers.SerializerMethodField() 
    granularity_name = serializers.SerializerMethodField() 
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

class TestSerializer(serializers.ModelSerializer):
    start_time = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S')
    #     # 如果你需要支持更新关联关系，可以重写update方法  
    class Meta:
        model = Test
        fields = ['id', 'name','status','users','start_time']