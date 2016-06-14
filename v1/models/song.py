# -- coding: utf8 --
from django.db import models

class Song(models.Model):
    name = models.CharField()
    singer = models.CharField()
    album = models.CharField() #专辑
    year = models.CharField()
    company = models.CharField()
    language = models.CharField()
    heat = models.IntegerField()
    style = models.CharField()
    theme_tag = models.CharField()
    class Meta:
        db_table = 'song'

class Songs(models.Model):
    song = models.CharField()
    simiSong = models.CharField()
    sim = models.IntegerField()
    class Meta:
        db_table = 'songs'

class IRecommend(models.Model):
    iRecommend_song = models.CharField()
    iRecommend_singer = models.CharField()
    iRecommend_album = models.CharField() #专辑
    iRecommend_similarity = models.IntegerField() #相似度
    heat = models.IntegerField()
    class Meta:
        db_table = 'iRecommend'

class ERecommend(models.Model):
    eRecommend_song = models.CharField()
    eRecommend_singer = models.CharField()
    eRecommend_album = models.CharField() #专辑
    eRecommend_similarity = models.IntegerField() #相似度
    heat = models.IntegerField()
    class Meta:
        db_table = 'eRecommend'