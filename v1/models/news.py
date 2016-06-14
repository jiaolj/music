# -- coding: utf8 --
from django.db import models

class News(models.Model):
    title = models.CharField()
    date = models.DateTimeField()
    abstr = models.TextField()
    singer = models.CharField()
    class Meta:
        db_table = 'news'
