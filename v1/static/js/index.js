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
			init : function(){
				_obj = this;
				_obj.conf = {
					main : $('#content'),
					menus : {
						'歌曲':['曲风','心情','主题','场景'],
						'歌手':['性别','地区','风格'],
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
							var txt = o.text();
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
									htm += '<dt>'+j+'</dt>';
								})
								return htm+'</div>';
							})
						},
					}
				});
				Base.init();
				_obj.req = Jfa.tools.getRequest();
				
				
			}
		}
	})();
	$(function() {
		Start.init()
	})
})