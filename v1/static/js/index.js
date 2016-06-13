require.config({
	paths: {
		jquery: '../js/jquery.min',
		cookie: '../js/jquery.cookie',
		base: '../js/base',
		jfa: '../js/jfa',
		echarts: '../js/echarts.min'
	}
})

require(['jquery','base','jfa','echarts','cookie'], function($,Base,Jfa,ec) {
	var Start = (function(){
		var _obj = {};
		return {
			query : function(){
				$('#thead').html(_obj.conf.temp[_obj.conf.tp].head);
				$('#tbody').html(function(){
					var htm = '',
						temp = _obj.conf.temp[_obj.conf.tp].body;
					for(var i = 0;i<10;i++){
						htm += temp;
					}
					return htm;
				});
				if(Jfa.page.status==0){
					Jfa.page.init({
						dom : $('.pagelist'),
						count : 100,
						every : 10,
						suc : function(fromNum,limitNum){
							_obj.conf.page.f = fromNum;
							_obj.conf.page.l = limitNum;
							_obj.query();
						}
					})
				}
			},
			init : function(){
				_obj = this;
				_obj.conf = {
					o : {
						
					},
					page : {
						f : 0,
						l : 10
					},
					tp : 'music',
					temp : {
						music : {
							head : '<tr><th>歌名</th><th>歌手</th><th>专辑</th><th>热度</th></tr>',
							body : '<tr><td>1</td><td>2</td><td>3</td><td>4</td></tr>',
						},
						singer : {
							head : '<tr><th>歌手</th><th>热度</th></tr>',
							body : '<tr><td>1</td><td>2</td></tr>',
						}
					},
					query : {
						music : {
							data : function(){
								
							},
							news : function(){
								
							}
						},
						singer : {
							data : function(){
								
							},
							news : function(){
								
							}
						}
					},
					menus : {
						music:['曲风','心情','主题','场景'],
						singer:['性别','地区','风格'],
						sons : {
							'曲风':['摇滚','乡村','嘻哈','古曲','流行','电子','民谣','爵士'],
							'心情':['伤感','安静','快乐','舒服','怀旧','甜蜜','寂寞','思念，主题包括热歌','新歌','经典','流行','抒情','动感','港台','内地','欧美','日韩','中国风，场景包括酒吧夜店','咖啡馆','工作学习','开车运动','睡前','校园'],
							'主题':['1','2','3'],
							'场景':['4','5','6'],
							
							'性别':['男','女'],
							'地区':['1','2','3'],
							'风格':['摇滚','乡村','嘻哈'],
						},
					}
				};
				Jfa.init({
					size:(100/1920),
					callback : {
						menu1 : function(o){
							var txt = o.attr('t');
							$('.leftbox').addClass('active');
							$('.cntbox').removeClass('active');
							Jfa.html($('nav.menus'),function(){
								var htm = '<div jui-click="active" jui-tar="p" jui-callback="menu2">';
								$.each(_obj.conf.menus[txt],function(k,j){
									htm += '<p>'+j+'</p>';
								})
								return htm+'</div>';
							})
						},
						menu2 : function(o){
							var txt = o.text();
							$('.cntbox').addClass('active');
							Jfa.html($('.types'),function(){
								var htm = '<dl jui-click="active" jui-tar="p" jui-callback="menu3">';
								$.each(_obj.conf.menus.sons[txt],function(k,j){
									htm += '<dt><a>'+j+'</a></dt>';
								})
								return htm+'</div>';
							})
						},
					}
				});
				Base.init();
				_obj.req = Jfa.tools.getRequest();
				_obj.query();
			}
		}
	})();
	$(function() {
		Start.init()
	})
})