from django.db import models
from django.conf import settings

# Create your models here.
class Digit(models.Model):
    id = models.AutoField(primary_key=True)
    created_on = models.DateTimeField(null=True)
