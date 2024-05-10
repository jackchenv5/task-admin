from django.db import models
from django.contrib.auth import get_user_model
from django.utils import timezone  
from django.contrib.auth.models import Group

User = get_user_model()

#任务状态
class TaskStatus(models.Model):
    name = models.CharField(max_length=128, blank=True,unique=True)
    class Meta:  
        db_table = 'task_status'
    def __str__(self):
        return self.name

#Job状态
class JobStatus(models.Model):
    name = models.CharField(max_length=128, blank=True,unique=True)
    class Meta:  
        db_table = 'job_status'
    def __str__(self):
        return self.name

#任务分类：项目任务、特性任务
class TaskCategory(models.Model):
    name = models.CharField(max_length=128, blank=True,unique=True) 
    class Meta:
        db_table = 'task_category'
    def __str__(self):
        return self.name

#标签 标记任务标签
class Tag(models.Model):
    name = models.CharField(max_length=128, blank=True,unique=True)
    color = models.CharField(max_length=10, blank=True)
    class Meta:
        db_table = 'tag'
    def __str__(self):
        return self.name

class AbstractTask(models.Model):
    #任务名
    name = models.CharField(max_length=128, blank=True,unique=True)
    
    # 任务类型
    # 指向 TaskCategory 模型。related_name="tasks" 意味着，您可以通过 TaskCategory 实例的 tasks 属性来访问属于该类别的所有任务
    # on_delete=models.CASCADE 到 ForeignKey 字段。这是一个很好的做法，因为它指定了当关联的 TaskCategory 对象被删除时，相关的 Task 对象也应该被删除（级联删除）
    category = models.ForeignKey(TaskCategory, related_name="%(class)s",on_delete=models.SET_NULL,null=True)
    
    # 任务内容
    content = models.CharField(max_length=2056,null=True)
    
    # 挑战目标
    challenge = models.CharField(max_length=2056,null=True)
    
    #创建人
    creater = models.ForeignKey(User,related_name="%(class)s_of_creater",on_delete=models.CASCADE)

    #负责人
    receiver = models.ManyToManyField(User,related_name="%(class)s_of_receiver")

    #创建时间
    #auto_now=False 每次保存的时候，更新时间
    #auto_now_add=True 创建时间，不可改变 这样不利于拷贝
    create_time = models.DateTimeField(auto_now=False,auto_now_add=False,default=timezone.now)
    
    #完成时间,用于标记
    done_time = models.DateTimeField(auto_now=False,auto_now_add=False,default=timezone.now )
    
    #截至时间
    deadline_time = models.DateTimeField(auto_now=False,auto_now_add=False,default=timezone.now )

    #任务状态
    status = models.ForeignKey(TaskStatus,on_delete=models.SET_NULL,null=True)

    #标签
    tags = models.ManyToManyField(Tag,related_name="%(class)s")
    
    class Meta:  
        abstract = True  # 设置为抽象基类 

class Granularity(models.Model):
    name = models.CharField(max_length=128, blank=True,unique=True) 
    class Meta:
        db_table = 'granularity'
    def __str__(self):
        return self.name

#工作流
class Job(models.Model):
    
    #项目名
    name = models.CharField(max_length=512,unique=True)
    #job_name
    #project_name =

    #工作组
    group = models.ForeignKey(Group,related_name="jobs",on_delete=models.CASCADE)
    
    #状态
    status = models.ForeignKey(JobStatus,on_delete=models.SET_NULL,null=True)
    
    #创建时间
    create_time = models.DateTimeField(auto_now=False,auto_now_add=True)
    
    #完成时间,用于标记
    done_time = models.DateTimeField(auto_now=False,auto_now_add=False,default=timezone.now )
    
    #描述信息
    description = models.CharField(max_length=512,null=True)

    #任务排布粒度
    granularity = models.ForeignKey(Granularity,on_delete=models.SET_NULL,null=True)
    
    class Meta:
        db_table = 'job'
    def __str__(self):
        return self.name

class Task(AbstractTask):
    related_task = models.ForeignKey('self',on_delete=models.SET_NULL,null=True)
    job = models.ForeignKey(Job,on_delete=models.CASCADE,related_name='tasks',null=True)
    
    class Meta:  
        db_table = 'task'
    def __str__(self):
        return self.name

class Test(models.Model):
    name= models.CharField(max_length=20)
    start_time = models.DateTimeField(auto_now_add=True)
    status = models.ForeignKey(TaskStatus,on_delete=models.CASCADE)
    users = models.ManyToManyField(User,related_name='%(class)s')