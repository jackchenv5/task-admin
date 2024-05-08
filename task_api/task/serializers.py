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
    create_time = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S')
    done_time = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S')
    deadline_time = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S')
    class Meta:
        model = Task
        fields = ['id','category','content','challenge','creater','receiver','create_time','done_time','deadline_time','status','tags']

class JobSerializer(serializers.ModelSerializer):
    # group = serializers.StringRelatedField() 
    # status = serializers.StringRelatedField() 
    # granularity = serializers.StringRelatedField() 
    create_time = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S')
    done_time = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S')
    class Meta:
        model = Job
        fields = ['id', 'name','group','status','create_time','done_time','description','granularity']

class TestSerializer(serializers.ModelSerializer):
    start_time = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S')
    #     # 如果你需要支持更新关联关系，可以重写update方法  
    class Meta:
        model = Test
        fields = ['id', 'name','status','users','start_time']