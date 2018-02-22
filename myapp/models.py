from django.db import models


class Fktest(models.Model):
    name = models.CharField(max_length=30)
    age = models.IntegerField()
