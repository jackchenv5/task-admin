from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import Group
from django.db import models

# Create your models here.
class User(AbstractUser):
    emp_num = models.CharField(max_length=15, blank=True,unique=True)
    class Meta:  
        db_table = 'user'
    def __str__(self):
        return self.username

class Role(models.Model):
    name = models.CharField(max_length=20,blank=True,unique=True)
    
    class Meta:  
        db_table = 'role'
    def __str__(self):
        return self.username

# UserGroupRole 模型（用户-组-角色的中间模型）  
class UserGroupRole(models.Model):  
    user = models.ForeignKey(User, on_delete=models.CASCADE)  
    group = models.ForeignKey(Group, on_delete=models.CASCADE)  
    role = models.ForeignKey(Role, on_delete=models.CASCADE)  
  
    class Meta:  
        db_table = 'user_group_role'
        unique_together = (('user', 'group', 'role'),)  # 确保用户-组-角色组合是唯一的  
  
    def __str__(self):  
        return f"{self.user.username} in {self.group.name} as {self.role.name}" 