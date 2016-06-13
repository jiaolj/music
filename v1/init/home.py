# -*- coding: utf-8 -*-
from django.shortcuts import render_to_response

def index(req):
    active = 'test'
    return render_to_response('test.html',locals())
