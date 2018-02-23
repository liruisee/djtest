from django.db import models


class fktest(models.Model):
    name = models.CharField(max_length=30)
    age = models.IntegerField()
