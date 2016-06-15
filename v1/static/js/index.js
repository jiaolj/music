require.config({
	paths: {
		jquery: '../js/jquery.min',
		cookie: '../js/jquery.cookie',
		base: '../js/base',
		jfa: '../js/jfa',
		drawe: '../js/drawe',
		echarts: '../js/echarts.min'
	}
})

require(['jquery','base','jfa','drawe','echarts','cookie'], function($,Base,Jfa,Dr,ec) {
	var Start = (function(){
		var _obj = {};
		return {
			sdetail : function(name){
				$.ajax({
					url : '/singer/get',
					data : {name:name},
					success : function(back){
						log(back);
						if(back.state=='ok'){
							var j = back.data[0];
							$('.sdetail span.name').text(j.name);
							$('.sdetail span.sex').text(j.sex);
							$('.sdetail span.nationality').text(j.nationality);
							$('.sdetail span.style').text(j.style);
							$('.sdetail span.album').text(j.album);
							$('.sdetail span.song').text(j.song);
						}
					}
				})
				$.ajax({
					url : '/singer/chart',
					success : function(back){
						if(back.state=='ok'){
							Dr.getNet('schart',back.data);
						}
					}
				})
			},
			mdetail : function(name){
				$.ajax({
					url : '/song/get',
					data : {name:name},
					success : function(back){
						log(back);
						if(back.state=='ok'){
							var j = back.data[0];
							$('.mdetail span.name').text(j.name);
							$('.mdetail span.singer').text(j.singer);
							$('.mdetail span.album').text(j.album);
							$('.mdetail span.language').text(j.language);
							$('.mdetail span.style').text(j.style);
							$('.mdetail span.tag').text(j.tag);
						}
					}
				})
				$.ajax({
					url : '/song/chart',
					success : function(back){
						if(back.state=='ok'){
							Dr.getBar('mchart',back.data);
						}
					}
				})
			},
			getSong : function(url){
				$.ajax({
					url : url,
					data : {f:_obj.conf.page.f,l:_obj.conf.page.l},
					success : function(back){
						log(back);
						if(back.state=='ok'){
							$('#thead').html(_obj.conf.temp[_obj.conf.tp].head);
							$('#tbody').html(function(){
								var htm = '',
									temp = _obj.conf.temp[_obj.conf.tp].body;
								$.each(back.data,function(k,j){
									htm += temp.replace('#name',j.name).replace('#singer',j.singer).replace('#album',j.album).replace('#heat',j.heat);
								})
								return htm;
							})
							$('#tbody').find('td.mname').click(function(){
								var o = $(this),
									mname = o.text();
								Jfa.page.hide();
								$('.cntbox').attr('s','3');
								_obj.mdetail(mname);
							});
							if(Jfa.page.state==0){
								Jfa.page.init({
									dom : $('.pagelist'),
									count : back.count,
									every : 10,
									suc : function(fromNum,limitNum){
										_obj.conf.page.f = fromNum;
										_obj.conf.page.l = limitNum;
										_obj.getSong(url);
									}
								})
							}
						}
					}
				})
			},
			getSinger : function(kwd){
				$.ajax({
					url : '/singer/get',
					data : {f:_obj.conf.page.f,l:_obj.conf.page.l,kwd:kwd},
					success : function(back){
						log(back);
						if(back.state=='ok'){
							$('.cntbox').attr('s','1');
							Jfa.html($('.types'),function(){
								var htm = '<dl jui-click="active" jui-tar="a" jui-callback="menu4">';
								$.each(back.data,function(k,j){
									htm += '<dt><a>'+j.name+'</a></dt>';
								})
								return htm+'</div>';
							})
							$('.types').css('line-height',$('.types')[0].clientHeight/(parseInt((back.data.length-1)/2)+1)+'px');
							$('.types').find('a').click(function(){
								var o = $(this),
									sname = o.text();
								Jfa.page.hide();
								$('.cntbox').attr('s','2');
								_obj.sdetail(sname);
							});
							if(Jfa.page.state==0){
								Jfa.page.init({
									dom : $('.pagelist'),
									count : back.count,
									every : _obj.conf.page.l,
									suc : function(fromNum,limitNum){
										_obj.conf.page.f = fromNum;
										_obj.conf.page.l = limitNum;
										_obj.getSinger(kwd);
									}
								})
							}
						}
					}
				})
			},
			getNews : function(){
				$.ajax({
					url : '/news/get',
					success : function(back){
						log(back);
						if(back.state=='ok'){
							$('#news').html(function(){
								var htm = '';
								$.each(back.data,function(k,j){
									htm += '<dt><a pk="'+j.pk+'">'+j.title+'</a><span>'+j.date+'</span></dt>';
								})
								return htm;
							}).find('a').click(function(){
								var pk = $(this).attr('pk');
								$('.cntbox').attr('s','4');
								Jfa.page.empty();
								$.ajax({
									url : '/news/get',
									data : {pk:pk},
									success : function(back){
										if(back.state=='ok'){
											var j = back.data[0];
											$('.ndetail h2').text(j.title);
											$('.ndetail .date').text(j.date);
											$('.ndetail .abstr').html(j.abstr);
										}
									}
								})
							})
						}
					}
				})
				_obj.getSong('/song/irecommend');
			},
			user : {
				get : function(){
					return {username:$.cookie('username'),rank:$.cookie('rank')}
				},
				member : [
					{username:'1872',password:'123456',rank:'1'},
					{username:'udms',password:'udms',rank:'0'}
				],
				show : function(suc){
					if($.cookie('username')){
						suc && suc();
					}else{
						Jfa.tools.login(function(){
							var username = $('.msg.login input[name="username"]').val().trim(),
								password = $('.msg.login input[name="password"]').val().trim();
							$.each(_obj.user.member,function(k,j){
								if(username==j.username && password==j.password){
									$.cookie('username',username);
									$.cookie('rank',j.rank);
									Jfa.tools.alertLeave();
									$('.msg.login p.error').text('登陆成功');
									$('nav.user>span').text(username);
									$('nav.user>a.login').text('注销');
									$('nav.user>a.reg').text('');
									$('.jui-login-box').removeClass('hide');
									suc && suc();
								}
							})
							if(!$.cookie('username')) $('.msg.login p.error').text('账号或密码错误');
						},1);
					}
				}
			},
			bind : function(){
				$('nav.user>a').click(function(){
					var o = $(this),
						txt = o.text();
					if(txt=='登录'){
						_obj.user.show(function(){
							_obj.getNews();
						});
					}
					else if(txt=='注销'){
						$.cookie('username','');
						$.cookie('rank','');
						location.href = '';
						/*
						o.text('登录');
						$('nav.user>a.reg').text('注册');
						$('nav.user>span').text('');
						$('.jui-login-box').addClass('hide');
						*/
					}
				})
			},
			init : function(){
				_obj = this;
				_obj.conf = {
					page : {
						news : 1,
						f : 0,
						l : 10
					},
					tp : 'music',
					temp : {
						music : {
							head : '<tr><th>歌名</th><th>歌手</th><th>专辑</th><th>热度</th></tr>',
							body : '<tr><td class="name mname">#name</td><td>#singer</td><td>#album</td><td>#heat</td></tr>',
						},
						singer : {
							head : '<tr><th>歌手</th><th>热度</th></tr>',
							body : '<tr><td class="name sname">陈奕迅</td><td>9</td></tr>',
						}
					},
					menus : {
						music:['曲风','心情','主题','场景'],
						singer:['性别','地区','风格'],
						sons : {
							'曲风':['摇滚','乡村','嘻哈','古曲','流行','电子','民谣','爵士'],
							'心情':['伤感','安静','快乐','舒服','怀旧','甜蜜','寂寞','思念'],
							'主题':['热歌','新歌','经典','流行','抒情','动感','港台','内地','欧美','日韩','中国风'],
							'场景':['酒吧夜店','咖啡馆','工作学习','开车运动','睡前','校园'],
							
							'性别':['内地男','内地女','港台男','港台女','欧美男','欧美女','日韩男','日韩女'],
							'地区':['内地','港台','欧美','日韩'],
							'风格':['国语流行','粤语流行','流行摇滚'],
						},
					}
				};
				Jfa.init({
					size:(100/1920),
					callback : {
						menu1 : function(o){
							var tp = o.attr('t');
							_obj.conf.tp = tp;
							_obj.conf.page.f = 0;
							if(_obj.conf.tp=='music') {
								_obj.conf.page.l = 10;
								_obj.getSong('/song/get');
							}
							else if(_obj.conf.tp=='singer') {
								_obj.conf.page.l = 14;
								_obj.getSinger();
							}
							$('.cntbox').attr('s','0');
							Jfa.page.empty();
							$('.leftbox').addClass('active');
							Jfa.html($('nav.menus'),function(){
								var htm = '<div jui-click="active" jui-tar="p" jui-callback="menu2">';
								$.each(_obj.conf.menus[tp],function(k,j){
									htm += '<p>'+j+'</p>';
								})
								return htm+'</div>';
							})
							$('nav.menus').css('line-height',$('nav.menus')[0].clientHeight/_obj.conf.menus[tp].length+'px');
						},
						menu2 : function(o){
							var txt = o.text();
							_obj.conf.menu2 = txt;
							$('.cntbox').attr('s','1');
							Jfa.page.empty();
							Jfa.html($('.types'),function(){
								var htm = '<dl jui-click="active" jui-tar="a" jui-callback="menu3">';
								$.each(_obj.conf.menus.sons[txt],function(k,j){
									htm += '<dt><a>'+j+'</a></dt>';
								})
								return htm+'</div>';
							})
							$('.types').css('line-height',$('.types')[0].clientHeight/(parseInt((_obj.conf.menus.sons[txt].length-1)/2)+1)+'px');
						},
						menu3 : function(o){
							var txt = o.text();
							
							_obj.conf.page.f = 0;
							Jfa.page.empty();
							log(_obj.conf.tp);
							if(_obj.conf.tp=='music') {
								_obj.conf.page.l = 10;
								_obj.getSong('/song/erecommend');
								$('.cntbox').attr('s','0');
							}
							else if(_obj.conf.tp=='singer') {
								_obj.conf.page.l = 14;
								_obj.getSinger(txt);
								$('.cntbox').attr('s','1');
							}
						}
					}
				});
				Base.init();
				_obj.req = Jfa.tools.getRequest();
				_obj.bind();
				if($.cookie('username')){
					$('nav.user>span').text($.cookie('username'));
					$('nav.user>a.login').text('注销');
					$('nav.user>a.reg').text('');
					_obj.getNews();
				}else{
					_obj.user.show(function(){
						_obj.getNews();
					});
					$('.jui-login-box').addClass('hide');
				};
				$('.mdetail a.close').click(function(){
					$('.cntbox').attr('s','0');
					Jfa.page.show();
				})
				$('.sdetail a.close').click(function(){
					$('.cntbox').attr('s','1');
					Jfa.page.show();
				})
				$('.ndetail a.close').click(function(){
					$('.cntbox').attr('s','0');
					Jfa.page.show();
				})
				$('.search img').click(function(){
					var kwd = $('.search input').val().trim();
					if(kwd){
						$.ajax({
							url : '/search/',
							data : {kwd:kwd},
							success : function(back){
								if(back.state=='ok'){
									Jfa.page.hide();
									
									if(back.data==1) {
										$('.cntbox').attr('s','3');
										_obj.mdetail(kwd);
									}
									else {
										$('.cntbox').attr('s','2');
										_obj.sdetail(kwd);
									}
									
								}
							}
						})
					}
				})
				$('.pages img').click(function(){
					var d = parseInt($(this).attr('d'));
					_obj.conf.page.news += d;
					if(_obj.conf.page.news<1) _obj.conf.page.news = 1;
					$('.pages span').text(_obj.conf.page.news);
				})
			}
		}
	})();
	$(function() {
		Start.init()
	})
})