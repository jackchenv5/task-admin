from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.
class User(AbstractUser):
    emp_num = models.CharField(max_length=15, blank=True, null=True)
    
    def __str__(self):
        return self.username
