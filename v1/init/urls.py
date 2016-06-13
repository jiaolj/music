from django.conf.urls import patterns, url
from conf.settings import STATIC_ROOT

urlpatterns = patterns('init.home',
    url(r'^$', 'index'),
)
#urlpatterns += patterns('',url(r'^static/(?P<path>.*)$', 'django.views.static.serve', { 'document_root': STATIC_ROOT,}),)
urlpatterns += patterns('',url(r'^(?P<path>.*)$', 'django.views.static.serve', { 'document_root': STATIC_ROOT,}),)