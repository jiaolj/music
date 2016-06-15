# -*- coding: utf-8 -*-
from django.shortcuts import render_to_response
from tools.func import to_json
from models.news import News
from models.singer import Singer,Singers
from models.song import Song,Songs,IRecommend,ERecommend
import logging,time

logger = logging.getLogger("test")

def index(req):
    active = 'test'
    logger.info('首页 '+time.strftime('%Y-%m-%d %H:%M:%S',time.localtime(time.time())))
    return render_to_response('test.html',locals())

def news_get(req):
    back = {'state':'ok'}
    q = req.GET or req.POST
    f = int(q.get('f','0'))
    l = int(q.get('l','14'))
    pk = q.get('pk')
    if pk:
        objs = News.objects.filter(pk=pk)
    else:
        objs = News.objects.all().order_by('-date')[f:f+l]
    back['data'] = [{'pk':m.pk,'title':m.title,'date':m.date.strftime('%Y-%m-%d %H:%M:%S'),'abstr':m.abstr,'singer':m.singer} for m in objs]
    return to_json(back)

def search(req):
    back = {'state':'ok'}
    q = req.GET or req.POST
    kwd = q.get('kwd')
    if Song.objects.filter(name=kwd):
        back['data'] = 1
    else:
        back['data'] = 2
    return to_json(back)

def song_get(req):
    back = {'state':'ok'}
    q = req.GET or req.POST
    f = int(q.get('f','0'))
    l = int(q.get('l','10'))
    name = q.get('name')
    if name:
        objs = Song.objects.filter(name=name)
    else:
        objs = Song.objects.all().order_by('-heat')[f:f+l]
    back['data'] = [{'pk':m.pk,'name':m.name,'singer':m.singer,'album':m.album,'language':m.language,'style':m.style,'heat':m.heat,'tag':m.theme_tag} for m in objs]
    return to_json(back)

def song_chart(req):
    back = {'state':'ok'}
    r = Songs.objects.all().order_by('-sim')[:9]
    back['data'] = {'y':[m.simiSong for m in r][::-1],'s':[n.sim for n in r][::-1]}
    return to_json(back)

def singer_chart(req):
    back = {'state':'ok'}
    singer = '陈奕迅'
    nodes = [{'category':0, 'name': singer, 'value' : 350}]
    links = []
    r = Singers.objects.filter(singer=singer).order_by('-simi')[:18]
    for j in r:
        nodes.append({'category':0, 'name': j.simiSinger, 'value' : j.simi})
        links.append({'source' : j.simiSinger, 'target' : singer, 'weight' : j.simi, 'name': '歌手'})
    back['data'] = {'nodes':nodes,'links':links}
    return to_json(back)

def singer_get(req):
    back = {'state':'ok'}
    q = req.GET or req.POST
    f = int(q.get('f','0'))
    l = int(q.get('l','14'))
    kwd = q.get('kwd')
    if kwd:
        lk = len(kwd)
        if lk==2:
            rs = Singer.objects.filter(singer_nationality__contains=kwd)
        if lk==3:
            sex = kwd[2:3]
            nationality = kwd[:2]
            rs = Singer.objects.filter(singer_sex=sex,singer_nationality__contains=nationality)
        if lk==4:
            rs = Singer.objects.filter(singer_style__contains=kwd)
    else:
        name = q.get('name')
        if name:
            rs = Singer.objects.filter(singer_name=name)
        else:
            rs = Singer.objects.all()
    back['count'] = rs.count()
    back['data'] = [{'pk':m.pk,'name':m.singer_name,'sex':m.singer_sex,'nationality':m.singer_nationality,'style':m.singer_style,'album':m.singer_album,'song':m.singer_song,'heat':m.singer_heat} for m in rs[f:f+l]]
    return to_json(back)

def song_irecommend(req):
    back = {'state':'ok'}
    q = req.GET or req.POST
    f = int(q.get('f','0'))
    l = int(q.get('l','10'))
    rs = IRecommend.objects.all().order_by('-iRecommend_similarity')
    back['count'] = rs.count()
    back['data'] = [{'pk':m.pk,'name':m.iRecommend_song,'singer':m.iRecommend_singer,'album':m.iRecommend_album,'heat':m.heat} for m in rs[f:f+l]]
    return to_json(back)

def song_erecommend(req):
    back = {'state':'ok'}
    q = req.GET or req.POST
    f = int(q.get('f','0'))
    l = int(q.get('l','10'))
    rs = ERecommend.objects.all().order_by('-eRecommend_similarity')
    back['count'] = rs.count()
    back['data'] = [{'pk':m.pk,'name':m.eRecommend_song,'singer':m.eRecommend_singer,'album':m.eRecommend_album,'heat':m.heat} for m in rs[f:f+l]]
    return to_json(back)