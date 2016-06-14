define(function(){
	var ECharts = (function(){
		var _obj = {},
			ec = echarts,
			_config = {
				color : ['#F05F74','#6D90D3','#9761BE','#FFBE5D','#6AC78B','#839098'],
				nameMap : {'Afghanistan':'阿富汗','Angola':'安哥拉','Albania':'阿尔巴尼亚','United Arab Emirates':'阿联酋','Argentina':'阿根廷','Armenia':'亚美尼亚','French Southern and Antarctic Lands':'法属南半球和南极领地','Australia':'澳大利亚','Austria':'奥地利','Azerbaijan':'阿塞拜疆','Burundi':'布隆迪','Belgium':'比利时','Benin':'贝宁','Burkina Faso':'布基纳法索','Bangladesh':'孟加拉国','Bulgaria':'保加利亚','The Bahamas':'巴哈马','Bosnia and Herzegovina':'波斯尼亚和黑塞哥维那','Belarus':'白俄罗斯','Belize':'伯利兹','Bermuda':'百慕大','Bolivia':'玻利维亚','Brazil':'巴西','Brunei':'文莱','Bhutan':'不丹','Botswana':'博茨瓦纳','Central African Republic':'中非共和国','Canada':'加拿大','Switzerland':'瑞士','Chile':'智利','China':'中国','Ivory Coast':'象牙海岸','Cameroon':'喀麦隆','Democratic Republic of the Congo':'刚果民主共和国','Republic of the Congo':'刚果共和国','Colombia':'哥伦比亚','Costa Rica':'哥斯达黎加','Cuba':'古巴','Northern Cyprus':'北塞浦路斯','Cyprus':'塞浦路斯','Czech Republic':'捷克共和国','Germany':'德国','Djibouti':'吉布提','Denmark':'丹麦','Dominican Republic':'多明尼加共和国','Algeria':'阿尔及利亚','Ecuador':'厄瓜多尔','Egypt':'埃及','Eritrea':'厄立特里亚','Spain':'西班牙','Estonia':'爱沙尼亚','Ethiopia':'埃塞俄比亚','Finland':'芬兰','Fiji':'斐','Falkland Islands':'福克兰群岛','France':'法国','Gabon':'加蓬','United Kingdom':'英国','Georgia':'格鲁吉亚','Ghana':'加纳','Guinea':'几内亚','Gambia':'冈比亚','Guinea Bissau':'几内亚比绍','Equatorial Guinea':'赤道几内亚','Greece':'希腊','Greenland':'格陵兰','Guatemala':'危地马拉','French Guiana':'法属圭亚那','Guyana':'圭亚那','Honduras':'洪都拉斯','Croatia':'克罗地亚','Haiti':'海地','Hungary':'匈牙利','Indonesia':'印尼','India':'印度','Ireland':'爱尔兰','Iran':'伊朗','Iraq':'伊拉克','Iceland':'冰岛','Israel':'以色列','Italy':'意大利','Jamaica':'牙买加','Jordan':'约旦','Japan':'日本','Kazakhstan':'哈萨克斯坦','Kenya':'肯尼亚','Kyrgyzstan':'吉尔吉斯斯坦','Cambodia':'柬埔寨','South Korea':'韩国','Kosovo':'科索沃','Kuwait':'科威特','Laos':'老挝','Lebanon':'黎巴嫩','Liberia':'利比里亚','Libya':'利比亚','Sri Lanka':'斯里兰卡','Lesotho':'莱索托','Lithuania':'立陶宛','Luxembourg':'卢森堡','Latvia':'拉脱维亚','Morocco':'摩洛哥','Moldova':'摩尔多瓦','Madagascar':'马达加斯加','Mexico':'墨西哥','Macedonia':'马其顿','Mali':'马里','Myanmar':'缅甸','Montenegro':'黑山','Mongolia':'蒙古','Mozambique':'莫桑比克','Mauritania':'毛里塔尼亚','Malawi':'马拉维','Malaysia':'马来西亚','Namibia':'纳米比亚','New Caledonia':'新喀里多尼亚','Niger':'尼日尔','Nigeria':'尼日利亚','Nicaragua':'尼加拉瓜','Netherlands':'荷兰','Norway':'挪威','Nepal':'尼泊尔','New Zealand':'新西兰','Oman':'阿曼','Pakistan':'巴基斯坦','Panama':'巴拿马','Peru':'秘鲁','Philippines':'菲律宾','Papua New Guinea':'巴布亚新几内亚','Poland':'波兰','Puerto Rico':'波多黎各','North Korea':'北朝鲜','Portugal':'葡萄牙','Paraguay':'巴拉圭','Qatar':'卡塔尔','Romania':'罗马尼亚','Russia':'俄罗斯','Rwanda':'卢旺达','Western Sahara':'西撒哈拉','Saudi Arabia':'沙特阿拉伯','Sudan':'苏丹','South Sudan':'南苏丹','Senegal':'塞内加尔','Solomon Islands':'所罗门群岛','Sierra Leone':'塞拉利昂','El Salvador':'萨尔瓦多','Somaliland':'索马里兰','Somalia':'索马里','Republic of Serbia':'塞尔维亚共和国','Suriname':'苏里南','Slovakia':'斯洛伐克','Slovenia':'斯洛文尼亚','Sweden':'瑞典','Swaziland':'斯威士兰','Syria':'叙利亚','Chad':'乍得','Togo':'多哥','Thailand':'泰国','Tajikistan':'塔吉克斯坦','Turkmenistan':'土库曼斯坦','East Timor':'东帝汶','Trinidad and Tobago':'特里尼达和多巴哥','Tunisia':'突尼斯','Turkey':'土耳其','United Republic of Tanzania':'坦桑尼亚联合共和国','Uganda':'乌干达','Ukraine':'乌克兰','Uruguay':'乌拉圭','United States of America':'美国','Uzbekistan':'乌兹别克斯坦','Venezuela':'委内瑞拉','Vietnam':'越南','Vanuatu':'瓦努阿图','West Bank':'西岸','Yemen':'也门','South Africa':'南非','Zambia':'赞比亚','Zimbabwe':'津巴布韦'},
			}
		;
		return {
			getPie : function(id,d,click){
				var o = ec.init(document.getElementById(id)),
					option = {
						color : _config.color,
						title : {
							show: false,
							text: '某站点用户访问来源',
							subtext: '纯属虚构',
							x:'center'
						},
						series : [
							{
								itemStyle: {
									normal: {
										label:{
											textStyle:{
												fontSize:14,
												//color:'#ccc'
											}
										},
										labelLine:{
											length:16
										},
										borderColor:'#fff',
										borderWidth:'1.5'
									}
								},
								name:'访问来源',
								type:'pie',
								radius : '46%',
								center: ['50%', '50%'],
								data:d/*[
									{value:335, name:'直接访问'},
									{value:310, name:'邮件营销'},
									{value:234, name:'联盟广告'},
									{value:135, name:'视频广告'},
									{value:1548, name:'搜索引擎'}
								]*/
							}
						]
					}
				; 
				o.setOption(option);
				o.on('click',function(e){
					click && click(e);
				})
				return _obj;
			},
			getWord : function(id,d,click){
				var r = [];
				$.each(d,function(k,j){
					if(j.value>30) j.value = 30;
					r.push(j);
				})
				var o = ec.init(document.getElementById(id)),
					option = {
						color : _config.color,
						tooltip: {
							show: false
						},
						series: [{
							name: 'Google Trends',
							type: 'wordCloud',
							center:['50%', '50%'],
							size: ['100%', '100%'],
							textRotation : [0,90,45,-45],
							textPadding: 3,
								data : r/*[
									{value:20, name:'直接访问',itemStyle: {normal:{color:'#ccc'}}},
									{value:20, name:'邮件营销',itemStyle: {normal:{color:'#ccc'}}},
									{value:20, name:'联盟广告',itemStyle: {normal:{color:'#ccc'}}},
									{value:20, name:'视频广告',itemStyle: {normal:{color:'#ccc'}}},
									{value:20, name:'搜索引擎',itemStyle: {normal:{color:'#ccc'}}}
								]*/
							}
						]
					}
				; 
				o.setOption(option);
				o.on('click',function(e){
					click && click(e);
				})
				return _obj;
			},
			getImgList : function(id,d,suc){
				var o = $(document.getElementById(id));
				var htm = '';
				$.each(d,function(k,j){
					htm += '<img src="'+j.src+'" topic_name="'+j.topic_name+'" topic_id="'+j.topic_id+'" style="height:100%" />';
				})
				o.html(htm).find('img').click(function(){
					suc && suc($(this));
				});
			},
			getTreeMap : function(id,d){
				var obj = document.getElementById(id),
					o = $(obj),
					option = {
						data : d/*[
							{
								src : 'img/test.jpg',
								value : 1
							},
							{
								src : 'img/test.jpg',
								value : 2
							},
							{
								src : 'img/test.jpg',
								value : 3
							},
							{
								src : 'img/test.jpg',
								value : 3
							},
							{
								src : 'img/test.jpg',
								value : 2
							},
							{
								src : 'img/test.jpg',
								value : 1
							},
							{
								src : 'img/test.jpg',
								value : 2
							},
						]*/
					}
				;
				option.lines = function(){
					var len = option.data.length,
						back = {len:0},
						r = 1
					;
					if(len>=3 && len<6) r = 2;
					else if(len>=6 && len<9) r = 3;
					else if(len>=9 && len<12) r = 4;
					else if(len>=12 && len<15) r = 5;
					else if(len>=15 && len<18) r = 6;
					else if(len>=18 && len<21) r = 7;
					else if(len>=21 && len<24) r = 8;
					else if(len>=24 && len<27) r = 9;
					back.len = r;
					for(var i=0;i<r;i++) back[i+1] = [];
					return back;
				}();
				option.lv = 0;
				//option.lvs = [];
				option.list = [];
				option.allvalue = 0;
				option.dom = '';
				for(var c=0;c<option.data.length;c++) option.allvalue += option.data[c].value;
				for(var i=0;i<option.data.length;i++){
					var v = option.data[i].value/option.allvalue,
						l = 1/option.lines.len,
						j = {v:v,src:option.data[i].src,url:option.data[i].url,h:l*100+'%'};
					option.lv += v;
					if(option.lv<=l) option.lines[1].push(j);
					else if(option.lv<=l*2) option.lines[2].push(j);
					else if(option.lv<=l*3) option.lines[3].push(j);
					else if(option.lv<=l*4) option.lines[4].push(j);
					else if(option.lv<=l*5) option.lines[4].push(j);
					else if(option.lv<=l*6) option.lines[4].push(j);
					else if(option.lv<=l*7) option.lines[4].push(j);
					else if(option.lv<=l*8) option.lines[4].push(j);
					else if(option.lv<=l*9) option.lines[4].push(j);
				};
				for(var k in option.lines){
					if(k!='len'){
						var a = function(){
							var _r = 0;
							$.each(option.lines[k],function(m,j){
								_r += j.v;
							})
							return _r;
						}();
						$.each(option.lines[k],function(m,j){
							option.lines[k][m].w = j.v*100/a + '%';
						})
					}
				}
				for(var k in option.lines){
					if(k!='len'){
						$.each(option.lines[k],function(m,j){
							option.dom += '<img src="'+j.src+'" onerror="this.src=\''+j.url.trim()+'\'" style="float:left;width:'+j.w+';height:'+j.h+'" />';
						})
					}
				}
				//console.log(option.dom);
				option.sons += '<br style="clear:both"/>'
				o.html(option.dom);
				return _obj;
			},
			getBar : function(id,d){
				var o = ec.init(document.getElementById(id)),
					option = {
						tooltip : {
							trigger: 'axis'
						},
						legend: {
							data:['相似歌曲']
						},
						calculable : true,
						xAxis : [
							{
								type : 'value',
								boundaryGap : [0, 0.01]
							}
						],
						yAxis : [
							{
								type : 'category',
								data : d.y//['巴西','印尼','美国','印度','中国','世界人口(万)']
							}
						],
						series : [
							{
								name:'相似歌曲',
								type:'bar',
								data:d.s//[94, 95, 96, 97, 98, 99]
							}
						]
					}
				; 
				o.setOption(option);
				return _obj;
			},
			getNet : function(id,d){
				var o = ec.init(document.getElementById(id)),
					option = {
						color : _config.color,
						title : {
							text: '',
							subtext: '',
							x:'right',
							y:'bottom'
						},
						tooltip : {
							trigger: 'item',
							formatter: '{a} : {b}'
						},
						legend: {
							x: 'left',
							//textStyle : {color: '#ccc'},
							data:['相似歌手'],
						},
						series : [
							{
								type:'force',
								name : "知识图谱",
								ribbonType: false,
								categories : [
									{
										name: '相似歌手'
									}
								],
								itemStyle: {
									normal: {
										label: {
											show: true,
											textStyle: {
												color: '#333',
												fontSize: 9
											}
										},
										nodeStyle : {
											brushType : 'both',
											borderColor : 'rgba(255,215,0,0.4)',
											borderWidth : 0
										},
										linkStyle: {
											type: 'curve'
										}
									},
									emphasis: {
										label: {
											show: false,
										},
										nodeStyle : {
											borderColor : '#d7d7d7',
											borderWidth : 2
										},
										linkStyle : {}
									}
								},
								useWorker: false,
								minRadius : d.min || 15,
								maxRadius : d.max || 30,
								gravity: 1.2,
								scaling: 1.2,
								roam: 'move',
								nodes:d.nodes/*[
									{category:0, name: '乔布斯', value : 10},
									{category:0, name: '丽萨-乔布斯', value : 9},
									{category:0, name: '保罗-乔布斯', value : 8},
									{category:0, name: '克拉拉-乔布斯', value : 7},
									{category:0, name: '劳伦-鲍威尔', value : 6},
								]*/,
								links : d.links/*[
									{source : '丽萨-乔布斯', target : '乔布斯', weight : 1, name: '女儿'},
									{source : '保罗-乔布斯', target : '乔布斯', weight : 2, name: '父亲'},
									{source : '克拉拉-乔布斯', target : '乔布斯', weight : 1, name: '母亲'},
									{source : '劳伦-鲍威尔', target : '乔布斯', weight : 2},
								]*/
							}
						]
					}
				; 
				o.setOption(option);
				return _obj;
			},
			getMap : function(id,d,cr,tp){
				var o = ec.init(document.getElementById(id)),
					d = d || [],
					max = d[0] && d[0].value || 0,
					tp = tp || 'world',
					cr = cr || ['#6AC78B','#ddd'],
					option = {
						animationDuration:1,
						title : {
							text: '',
							x:'center',
							y:'top',
							//textStyle:{color:'#eee'}
						},
						tooltip : {
							trigger: 'item',
							formatter : function (params) {
								var value=params.value;
								var name=params.name;
								if (value) return name+': '+value;
								else return name;
							}
						},
						toolbox: {
							show : false,
							orient : 'vertical',
							x: 'right',
							y: 'center',
							feature : {
								mark : {show: true},
								dataView : {show: true, readOnly: false},
								restore : {show: true},
								saveAsImage : {show: true}
							}
						},
						dataRange: {
							min: 0,
							max: max,
							text:['高','低'],
							realtime: false,
							calculable : true,
							//textStyle: {color:'#eee'},
							color: cr,
							x:'15%',
							y:'60%',
							itemHeight:10,
						},
						series : [
							{
								name: '世界地图',
								type: 'map',
								mapType: tp,
								nameMap : _config.nameMap,
								roam: false,
								mapLocation: {y:'2%',x:'center'},
								itemStyle:{
									normal: {
										borderColor:'#fff',
										borderWidth:'1',
										color:'rgba(0,0,0,0)'
									},
									emphasis:{
										label:{show:true},
										areaStyle:{color:'#96C1EC'},
									},
								},
								data:d,
							}
						]
					}
				; 
				o.setOption(option);
				return _obj;
			},
			getLine : function(id,data,grid){
				var o = ec.init(document.getElementById(id)),
					series=data.series,
						lend=[],
						cor = this.pubcolor,
						grid = grid || {x:'5%',y:'11%',x2:'2%',y2:'10%'};
				for(var s in series) lend.push(series[s].name);
				var option = {
						color : _config.color,
						tooltip : {
							trigger: 'axis'
						},
						legend: {
							x: '2%',
							//y: '2%',
							//textStyle: {color:'#eee',fontSize:14},
							data:lend
						},
						xAxis : [
							{
								type : 'category',
								//boundaryGap : false,
								splitLine: {show:false},
								axisLine: {show:true,lineStyle:{color:'#ddd',width:1}},
								axisLabel:{
									//textStyle: {color:'#ccc'},
								},
								data : data.tm
							}
						],
						yAxis : [
							{
								type : 'value',
								axisLine: {show:true,lineStyle:{color:'#ddd',width:1}},
								splitLine: {show:true,lineStyle:{color:'#ddd'}},
								axisLabel:{
									//textStyle: {color:'#ccc'},
								},
							}
						],
						grid: grid,
						series : (function(){
							var lst = [];
							for(var s in series){
								var d = series[s].data,
									isTrue = 0,
									newd = [];
								d.reverse();
								for(var u in d){
									if(d[u]!=0) isTrue = 1;
									if(isTrue==1) newd.push(d[u]);
								}
								newd.reverse();
								lst.push({'name':series[s].name,data:newd,type:'line',symbolSize:series[s].symbolSize || 0,smooth:true})
							}
							return lst;
						})()
					}
				; 
				o.setOption(option);
				return _obj;
			},
			getForward : function(id,data){
				var o = $(document.getElementById(id)),
					htm = '<div class="forward">';
				$.each(data,function(k,j){
					htm += '<div>';
					$.each(j,function(m,n){
						htm += '<a title="'+n.name+'"></a>';
					})
					htm += '</div>';
				})
				htm += '</div>';
				o.html(htm);
			},
			init : function(init){
				_obj = this;
			}
		}
	})();
	ECharts.init();
	return ECharts;
})