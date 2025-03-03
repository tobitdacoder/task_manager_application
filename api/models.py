from django.db import models  
from django.contrib.auth.models import AbstractUser

class Task(models.Model):  
    title = models.CharField(max_length=100)  
    description = models.TextField()  
    created_at = models.DateTimeField(auto_now_add=True)  

    def __str__(self):  
        return self.title  
