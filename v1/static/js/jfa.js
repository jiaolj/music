define(['jquery','dom'],function($,Dom){
	var Jfa = (function(){
		var _obj = {};
		return {
			html : function(o,t){
				o.html(t);
				_obj.mvvm(o);
			},
			func : function(w){
				Function.prototype.method = function(name, func) { //js函数扩展通用方法
				  this.prototype[name] = func;  
				  return this;  
				}
				String.method('replaceAll',function(a,b){ //全部替换(扩展)
					return this.replace(new RegExp(a,'gm'),b); 
				})
				if(!String.prototype.trim){
					String.method('trim', function() {  
						return this.replace(/^\s+|\s+$/g, '') //去掉文本两头空格(扩展)
					})
					String.method('ltrim', function() {  
						return this.replace(/^\s+/g, '') //去掉文本左边空格(扩展)
					})
					String.method('rtrim', function() {  
						return this.replace(/\s+$/g, '')  //去掉文本右边空格(扩展)
					})
				}
				w.log = function(d){
					if(typeof(console)=='undefined') alert(d);
					else console.log(d);
				}
				w.str=function(k){return JSON && JSON.stringify(k)}
				w.json=function(k){return eval('('+k+')')}
			},
			load : function(){
				var o = arguments[0],
					url = arguments[1];
				$.ajax({
					url : url,
					success : function(back){
						o.html(back);
					}
				})
			},
			page : (function(){
				var _o = {},
					_i = {},
					_dom = '<a p="1">首页</a><a p="#pre">上一页</a>#pages<a p="#next">下一页</a><a p="#allp">尾页</a>'
				;
				return {
					getList : function(){
						var pages = '',
							plist = [],
							pgl = _i.page-_o.pgl,
							pgr = _i.page+_o.pgr;
						if(_i.page<=(_o.pgl+1)) pgr = _o.pgl+_o.pgr+1;
						if(pgr>_i.allp+1) {
							pgr = _i.allp+1;
							pgl = _i.allp-6;
						}
						if(pgl<1) pgl = 1;
						for(var i = pgl;i<pgr;i++) plist.push(i);
						$.each(plist,function(k,j){
							pages += '<a class="pg-num" p="'+j+'">'+j+'</a>';
						})
						_i.dom.html(function(){
							var pre = _i.page - 1,
								next = _i.page + 1;
							if(pre<1) pre = 1;
							if(next>_i.allp) next = _i.allp;
							return '<div class="jui-page">'+_dom.replace('#pages',pages).replace('#allp',_i.allp).replace('#pre',pre).replace('#next',next)+'</div>';
						}).find('a.pg-num[p="'+_i.page+'"]').addClass('active');
						_i.dom.find('a').click(function(){
							_i.page = parseInt($(this).attr('p'));
							_o.getList();
							_i.suc((_i.page-1)*_i.every,_i.every);
						});
					},
					state : 0,
					hide : function(){
						_i.dom.addClass('hide');
					},
					show : function(){
						_i.dom.removeClass('hide');
					},
					empty : function(){
						_i.dom.empty();
						_i.dom.removeClass('hide');
						_o.state = 0;
					},
					init : function(arg){
						_o = this;
						_i = arg;
						_o.state = 1;
						_o.pgl = _i.pgl || 3;
						_o.pgr = _i.pgr || 4;
						_i.page = 1;
						_i.allp = parseInt((_i.count-1)/_i.every)+1;
						_o.getList();
					}
				}
			})(),
			location : function(url,o,temp){
				if(typeof(console)=='undefined'){
					location.href = '?url='+url;
				}else{
					history.pushState('rl','','/?url='+url);
				}
				/*if(url=='/') {
					location.href = '/';
				}
				else location.href = '?url='+url;
				
				if(url=='/') {
					history.pushState('rl','','/');
				}
				else history.pushState('rl','','/?url='+url);
				*/
				_obj.load(o,temp);
			},
			ajax : function(){
				var _e = {};
				_e.url = arguments[0];
				if(arguments.length==2){
					_e.arg = {};
					_e.suc = arguments[1];
				}else if(arguments.length==3){
					_e.arg = arguments[1];
					_e.suc = arguments[2];
				}
				$.ajax({
					url : _e.url,
					data : _e._arg,
					success : function(back){
						_e.suc && _e.suc(back)
					}
				})
			},
			mvvm : function(dom){ //为某个DOM节点绑定事件(MVVM模式)
				//增加或删除active
				dom.find('[jui-click="active"]').each(function(k,i){
					var o = $(i),
						obj,
						tar = o.attr('jui-tar'), //点击元素
						to = o.attr('jui-to'), //直接目标元素
						son = o.attr('jui-son'), //子类目标元素
						pr = parseInt(o.attr('jui-prt')) || 0, //父类目标元素
						r = o.attr('jui-repeat'), //是否唯一
						k = o.attr('jui-callback') //回调函数
					; 
					if(tar) obj = o.find(tar);
					else obj = o;
					obj.click(function(){
						var ob = $(this),
							prs = ob; //目标元素
						if(to){
							prs = $(to);
						}
						else if(son){
							prs = o.find(son);
						}
						else if(pr>0){
							for(var i=0;i<pr;i++) prs = prs.parent();
						}
						if(!r) o.find(tar+'.active').removeClass('active');
						if(prs.hasClass('active')) prs.removeClass('active');
						else prs.addClass('active');
						k && _obj.conf.callback[k] && _obj.conf.callback[k](ob);
					})
				})
			},
			jui : {
				alert : function(){
					$('body').append('<div class="jui-alert" id="jui-alert"></div>');
					return $('#jui-alert');
				}(),
				cover : function(){
					$('body').append('<div class="jui-cover" id="jui-cover"></div>');
					return $('#jui-cover');
				}()
			},
			tools : {
				getSize : function(p){
					$('html').css('font-size',document.body.clientWidth*p+'px');
				},
				getRequest : function() {
					   var url = window.location.search,
							theRequest = new Object();
					   if (url.indexOf("?") != -1) {   
						  var str = url.substr(1);   
						  strs = str.split("&");   
						  for(var i = 0; i < strs.length; i ++) {
							 theRequest[strs[i].split("=")[0]]=decodeURI(strs[i].split("=")[1]);
						  }   
					   }   
					   return theRequest;   
				},
				alert : function(tp,msg){
					var msg = msg || _obj.tools.alertDefault[tp].msg;
					_obj.jui.alert.show().html(Dom.alert[tp].replace('#msg',msg)).css({top:'-'+_obj.jui.alert[0].clientHeight+'px'}).animate({top:_obj.tools.alertDefault[tp].top}).find('button').click(function(){
						if(_obj.tools.alertDefault[tp].callback) _obj.tools.alertDefault[tp].callback();
						else _obj.tools.alertLeave();
					})
					_obj.msg.alertMsg = _obj.tools.alertDefault[tp].leave;
				},
				alertDefault : {
					'msg' : {'msg':'弹出消息',leave:3,top:'10%'},
					'ok' : {'msg':'成功信息！',leave:3,top:'10%'},
					'warn' : {'msg':'警告信息！',leave:3,top:'10%'},
					'confirm' : {'msg':'确定要删除该行信息吗?',leave:-1,top:'0'},
				},
				alertLeave : function(){
					_obj.jui.alert.animate({top:'-'+_obj.jui.alert[0].clientHeight+'px'},300,function(){
						$(this).empty().hide();
						_obj.jui.cover.hide();
					})
				},
				login : function(suc,arg){
					_obj.jui.cover.show();
					_obj.jui.alert.show().html(Dom.alert.login).css({top:'-'+_obj.jui.alert[0].clientHeight+'px'}).animate({top:'10%'},function(){
						$(this).find('input[name="username"]').focus();
					});
					_obj.jui.alert.find('input[name="password"]').keypress(function(event) {
						if (event.which == 13){
							suc && suc();
						}
					});
					_obj.jui.alert.find('a.checks').click(function(){
						suc && suc();
					})
					_obj.jui.alert.find('a.closes').click(function(){
						if(!arg) _obj.tools.alertLeave();
					})
				},
				confirm : function(msg,suc){
					_obj.jui.cover.show();
					if(msg=='') msg = '确定要删除该信息吗?';
					_obj.jui.alert.show().html(Dom.alert.confirm.replace('#msg',msg)).css({top:'-'+_obj.jui.alert[0].clientHeight+'px'}).animate({top:'0'}).find('button').click(function(){
						var txt = $(this).attr('rel');
						_obj.tools.alertLeave();
						if(txt=='callback') suc && suc();
					})
				},
				data : {
					toDouble : function(n){ //单数转双数(1转01)
						n = n + '';
						if(n.length==1) n = '0' + n;
						return n;
					},
					arrayRemove : function(list,s){
						var lb=[],
							x = list.indexOf(s)
						;
						for(var i in list){
							if(i!=x) lb.push(list[i]) 
						}
						return lb;
					},
				},
				time : {
					getStrTime : function(d){ //获取时间字符串。返回值，例：2000-01-01 00:00:00。接收参数，例：{con:['-','-',' ',':',':',' '],now: new Date()}
						var toDouble = _obj.tools.data.toDouble,
							d = d || {},
							con = d.con || ['-','-',' ',':',':',' '],
							now = d.now || new Date(),
							year = now.getFullYear(),
							month = toDouble(now.getMonth()+1),
							day = toDouble(now.getDate()),
							hours = toDouble(now.getHours()),
							minutes = toDouble(now.getMinutes()),
							seconds = toDouble(now.getSeconds()),
							clock = ''
						;
						if(con[0]!='') clock += year + con[0];
						if(con[1]!='') clock += month + con[1];
						if(con[2]!='') clock += day + con[2];
						if(con[3]!='') clock += hours + con[3];
						if(con[4]!='') clock += minutes + con[4];
						if(con[5]!='') clock += seconds + con[5];
						return clock;
					},
				},
			},
			init : function(conf){ //初始化
				_obj = this;
				_obj.conf = conf || {};
				_obj.func(window);
				_obj.mvvm($(document));
				//_obj.tools.getSize(_obj.conf.size);
				if(typeof(PIE)!='undefined'){
					$('.pie').each(function() {  
						PIE.attach(this);  
					})
				}
			}
		}
	})();
	return Jfa;
})