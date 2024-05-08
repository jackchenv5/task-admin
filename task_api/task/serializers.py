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
    category = serializers.StringRelatedField() 
    creater = serializers.StringRelatedField() 
    receiver = serializers.StringRelatedField() 
    status = serializers.StringRelatedField() 
    tags = TagSerializer(many=True)
    class Meta:
        model = Task
        fields = ['id','category','content','challenge','creater','receiver','create_time','done_time','deadline_time','status','tags']

class JobSerializer(serializers.ModelSerializer):
    group = serializers.StringRelatedField() 
    status = serializers.StringRelatedField() 
    granularity = serializers.StringRelatedField() 
    create_time = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S')
    done_time = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S')
    class Meta:
        model = Job
        fields = ['id', 'name','group','status','create_time','done_time','description','granularity']

from django.db import models
class TestSerializer(serializers.ModelSerializer):
    # status = serializers.CharField()
    start_time = serializers.DateTimeField(format='%Y-%m-%d %H:%M:%S')
    #     # 如果你需要支持更新关联关系，可以重写update方法  

    def update(self, instance, validated_data):  
        print('validated_data',validated_data)
        # 处理非多对多字段  
        for attr, value in validated_data.items():  
            if isinstance(instance._meta.get_field(attr), models.ManyToManyField): 
                # 跳过多对多字段，稍后处理  
                continue  
            setattr(instance, attr, value)  
  
        # 处理多对多字段  
        for m2m_field_name, value in validated_data.items():  
            print('instance._meta.get_field(attr)',instance._meta.get_field(m2m_field_name))
            # print('models.ManyToManyField',models.ManyToManyField)
            if isinstance(instance._meta.get_field(m2m_field_name), models.ManyToManyField): 
                # 假设 value 是一个对象列表，使用 set() 方法来更新关联  
                print(m2m_field_name,value)
                getattr(instance, m2m_field_name).set(value)  
  
        # 保存模型实例  
        instance.save()  
        return instance

    class Meta:
        model = Test
        fields = ['id', 'name','status','users','start_time']