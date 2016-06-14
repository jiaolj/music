# -- coding: utf8 --
from django.db import models

class Singer(models.Model):
    singer_name = models.CharField()
    singer_sex = models.CharField()
    singer_nationality = models.CharField()
    singer_heat = models.IntegerField()
    singer_style = models.CharField()
    singer_album = models.CharField()
    singer_song = models.CharField()
    class Meta:
        db_table = 'singer'

class Singers(models.Model):
    singer = models.CharField()
    simiSinger = models.CharField()
    simi = models.IntegerField()
    class Meta:
        db_table = 'singers'