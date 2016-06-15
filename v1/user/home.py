# -*- coding: utf-8 -*-
from tools.func import to_json
import logging

logger = logging.getLogger("test")

def get(req):
    back = {'state':'ok'}
    req.session['user_token'] = 1
    back['user_token'] = req.session['user_token']
    return to_json(back)
