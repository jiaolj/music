from django.conf.urls import patterns, url
from conf.settings import STATIC_ROOT

urlpatterns = patterns('views.home',
    url(r'^$', 'index'),
    url(r'^search/', 'search'),
    url(r'^news/get', 'news_get'),
    url(r'^singer/get', 'singer_get'),
    url(r'^singer/chart', 'singer_chart'),
    url(r'^song/get', 'song_get'),
    url(r'^song/irecommend', 'song_irecommend'),
    url(r'^song/erecommend', 'song_erecommend'),
    url(r'^song/chart', 'song_chart'),
)
urlpatterns += patterns('user.home',
    url(r'^user/get', 'get'),
)
#urlpatterns += patterns('',url(r'^static/(?P<path>.*)$', 'django.views.static.serve', { 'document_root': STATIC_ROOT,}),)
urlpatterns += patterns('',url(r'^(?P<path>.*)$', 'django.views.static.serve', { 'document_root': STATIC_ROOT,}),)