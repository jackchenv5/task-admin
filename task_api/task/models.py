from django.db import models

class TaskCategory(models.Model):
    name = models.CharField(max_length=128, blank=True,unique=True) 

# Create your models here.
class AbstractTask(models.Model):
    #任务名
    name = models.CharField(max_length=128, blank=True,unique=True)
    
    # 任务类型
    # 指向 TaskCategory 模型。related_name="tasks" 意味着，您可以通过 TaskCategory 实例的 tasks 属性来访问属于该类别的所有任务
    # on_delete=models.CASCADE 到 ForeignKey 字段。这是一个很好的做法，因为它指定了当关联的 TaskCategory 对象被删除时，相关的 Task 对象也应该被删除（级联删除）
    category = models.ForeignKey(TaskCategory, related_name="tasks",on_delete=models.CASCADE)
    
    #
    
    def __str__(self):
        return self.username