// JavaScript Document
(function($,undefined){
	//特殊显示效果方法---start
	mapSlideShowTip = function(chart,data,calback){//地图tooltip轮显效果
		var timer = 0;
		//var data = option.series;
		var total = data[0].data.length;
		var count = 0;
		var tooltip = chart.component.tooltip;
		function autoTip() {
			timer = setInterval(function () {
				var curr = count % total;
				var name = data[0].data[curr].name;
				var newdata = new Object();
				newdata.name = "告警全国占比";
				var data1 = new Object();
				var data2 = new Object();
				data1.name = "告警全国占比";
				data2.name = "其他";
				data1.show = false;
				data2.show = false;
				for(i=0;i<data.length;i++){
					if(data[i].name == "告警全国占比"){
						data1.value = data[i].data[curr].value;
					}else if(data[i].name == "提醒"){
						newdata.tx = data[i].data[curr].value;
					}else if(data[i].name == "告警"){
						newdata.gj = data[i].data[curr].value;
					}
				}
				data2.value = 100-data1.value;
				newdata.proportion = data1.value;
				newdata.data = [data1,data2];
				
				tooltip.showTip({seriesIndex: '0', dataIndex: curr,name:name});
				count += 1;
				calback(newdata);
			}, 2000);
		}
	   autoTip();
	   chart.on(echarts.config.EVENT.HOVER, function (param){
			clearInterval(timer);
		});
		chart.on(echarts.config.EVENT.MOUSEOUT, function (param){
			count = param.dataIndex+1;
			autoTip();
		});
	}
	
	
	//特殊显示效果方法---end
	
	//折线图
	$.fn.line = function(options){
		var data={
			title:'平均响应时间',
			legendData:['今年','去年'],
			xAxisData:[1,2,3,4,5,6,7,8,9,10,11,12],
			yAxisMax:150,
			data:[{
				//name:'今年',
				value:[
					Math.round(Math.random()*100),Math.round(Math.random()*100),Math.round(Math.random()*100),Math.round(Math.random()*100),
					Math.round(Math.random()*100),Math.round(Math.random()*100),Math.round(Math.random()*100),Math.round(Math.random()*100),
					Math.round(Math.random()*100),Math.round(Math.random()*100),Math.round(Math.random()*100),Math.round(Math.random()*100)
				]
			}]
		};
		var noption,lineLabel=false;
		if(options){
			if(options.data){
				data = options.data;
			}
			if(options.option){
				noption = options.option;
			}
			if(options.lineLabel){
				lineLabel = options.lineLabel;
			}
		}
		var sery = [];
		for(var i=0;i<data.data.length;i++){
			if(lineLabel){
				sery.push(
					{
						name:data.data[i].name,
						symbolSize:6,
						type:'line',
						label: {
							normal: {
								show: true,
								position: 'top'
							}
						},
						data:data.data[i].value
					}
				);
			}else{
				sery.push(
					{
						name:data.data[i].name,
						symbolSize:6,
						type:'line',
						data:data.data[i].value
					}
				);
			}
		}
		var chart = echarts.init(this[0]);
		option = {
			title : {
				show:true,
				x:'center',
				y:20,
				text:data.title,
				textStyle:{
					fontSize: 26,
					fontWeight: 'bolder',
					color: '#00468C'
				}
			},
			tooltip : {
				show:true,
				trigger: 'axis',
				backgroundColor:'#fff',
				axisPointer:{
					lineStyle: {
						color:'#00BEFD',
						type:'dashed'
					}
				},
				formatter: function(parms){
					var res = '<div class="tipbox"><div class="m-name" style="float:left; color:#666666">'+data.title+'</div><div class="m-value" style="float:right; color:#111111">'+parms[0].value+'</div></div>';
					return res;
				}
			},
			legend: {
				show:false,
				top:56,
				textStyle:{
					color:'#1E669D'
				},
				data:data.legendData
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				top:90,
				containLabel: true
			},
			xAxis : [
				{
					type : 'category',
					data : data.xAxisData,
					axisLine: {
						lineStyle:{
							color:'rgba(30,102,157,1)'
						}
					},
					axisTick: {show:false},
					axisLabel: {
						interval:0,
						clickable:true,
						textStyle:{
							color:'rgba(30,102,157,1)'
						}
					},
					splitArea: {show:false},
					splitLine: {show:false}
				}
			],
			yAxis : [
				{
					type : 'value',
					name:'',
					max:data.yAxisMax,
					axisLine: {
						lineStyle:{
							color:'rgba(30,102,157,1)'
						}
					},
					axisTick: {show:false},
					axisLabel: {
						interval:0,
						clickable:false,
						textStyle:{
							color:'rgba(30,102,157,1)'
						}
					},
					splitArea: {show:false},
					splitLine: {
						lineStyle:{
							color:'rgba(5,35,63,1)'
						}
					},
				}
			],
			series: sery
		};
		option = $.extend(true,{},option,noption);
		chart.setOption(option,true);
	};
	$.fn.moreLine = function(options){
		var data={
			legendData:['进山车流量','出山车流量'],
			xAxisData:[1,2,3,4,5,6,7,8,9,10,11,12],
			yAxisMax:150,
			data:[
				{
					name:'进山车流量',
					title:'进山<br>流量',
					value:[
						Math.round(Math.random()*100),Math.round(Math.random()*100),Math.round(Math.random()*100),Math.round(Math.random()*100),
						Math.round(Math.random()*100),Math.round(Math.random()*100),Math.round(Math.random()*100),Math.round(Math.random()*100),
						Math.round(Math.random()*100),Math.round(Math.random()*100),Math.round(Math.random()*100),Math.round(Math.random()*100)
					]
				},
				{
					name:'出山车流量',
					title:'出山<br>流量',
					value:[
						Math.round(Math.random()*100),Math.round(Math.random()*100),Math.round(Math.random()*100),Math.round(Math.random()*100),
						Math.round(Math.random()*100),Math.round(Math.random()*100),Math.round(Math.random()*100),Math.round(Math.random()*100),
						Math.round(Math.random()*100),Math.round(Math.random()*100),Math.round(Math.random()*100),Math.round(Math.random()*100)
					]
				}
			]
		};
		var noption,size = 2;
		if(options){
			if(options.data){
				data = options.data;
			}
			if(options.option){
				noption = options.option;
			}
			if(options.option.symbolSize){
				size = options.option.symbolSize;
			}
		}
		var sery = [];
		for(i=0;i<data.data.length;i++){
			sery.push(
				{
					name:data.data[i].name,
					//symbol:'circle',
					symbolSize:size,
					type:'line',
					data:data.data[i].value
				}
			);
		}
		var chart = echarts.init(this[0]);
		option = {
			title : {
				show:true,
				x:'center',
				y:10,
				text:'景区服务',
				textStyle:{
					fontSize: 26,
					fontWeight: 'bolder',
					color: '#00468C'
				}
			},
			tooltip : {
				show:true,
				trigger: 'item',
				backgroundColor:'#fff',
				axisPointer:{
					lineStyle: {
						color:'#00BEFD',
						type:'dashed'
					}
				},
				formatter: function(parms){
					var title;
					for(i=0;i<data.data.length;i++){
						if(parms.seriesName == data.data[i].name){
							title = data.data[i].title;
						}
					}
					var res = '<div class="tipbox"><div class="m-name" style="float:left; color:#666666;">'+title+'</div><div class="m-value" style="float:right; color:#111111">'+parms.value+'</div></div>';
					return res;
				}
			},
			legend: {
				show:false,
				top:6,
				//left:180,
				textStyle:{
					color:'#1E669D'
				},
				data:data.legendData
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				top:90,
				containLabel: true
			},
			xAxis : [
				{
					type : 'category',
					data : data.xAxisData,
					boundaryGap:false,
					axisLine: {
						lineStyle:{
							color:'rgba(30,102,157,1)'
						}
					},
					axisTick: {show:false},
					axisLabel: {
						interval:0,
						clickable:true,
						textStyle:{
							color:'rgba(30,102,157,1)'
						}
					},
					splitArea: {show:false},
					splitLine: {show:false}
				}
			],
			yAxis : [
				{
					type : 'value',
					name:'',
					max:data.yAxisMax,
					axisLine: {
						lineStyle:{
							color:'rgba(30,102,157,1)'
						}
					},
					axisTick: {show:false},
					axisLabel: {
						interval:0,
						clickable:false,
						textStyle:{
							color:'rgba(30,102,157,1)'
						}
					},
					splitArea: {show:false},
					splitLine: {
						lineStyle:{
							color:'rgba(5,35,63,1)'
						}
					},
				}
			],
			series: sery
		};
		option = $.extend(true,{},option,noption);
		chart.setOption(option,true);
	};
	$.fn.smoothLine  = function(options){
		var data={
			title:'HDFS Links',
			legendData:['今年','去年'],
			xAxisData:[1,2,3,4,5,6,7,8,9,10,11,12],
			yAxisMax:150,
			data:[{
				//name:'今年',
				value:[
					Math.round(Math.random()*100),Math.round(Math.random()*100),Math.round(Math.random()*100),Math.round(Math.random()*100),
					Math.round(Math.random()*100),Math.round(Math.random()*100),Math.round(Math.random()*100),Math.round(Math.random()*100),
					Math.round(Math.random()*100),Math.round(Math.random()*100),Math.round(Math.random()*100),Math.round(Math.random()*100)
				]
			}]
		};
		var noption;
		if(options){
			if(options.data){
				data = options.data;
			}
			if(options.option){
				noption = options.option;
			}
		}
		var sery=[];
		for(var i=0; i<data.data.length;i++){
			sery.push({
				name:data.data[i].name,
				type:'line',
				symbol:'circle',
				symbolSize:0,
				smooth:true,
				clickable:false,
				data:data.data[i].value
			});
		}
		var chart = echarts.init(this[0]);
		option = {
			title : {
				show:true,
				x:'center',
				y:20,
				text:data.title,
				textStyle:{
					fontSize: 26,
					fontWeight: 'bolder',
					color: '#00468C'
				}
			},
			tooltip : {
				trigger: 'item',
				axisPointer : { 
					type : 'shadow'
				}
			},
			legend: {
				show:false,
				data:data.legendData,
				x:'right',
				y:50
			},
			dataZoom : {
				show : false,
				realtime : true,
				height: 20,
				backgroundColor: 'rgba(0,0,0,0)',
				dataBackgroundColor: 'rgba(238,238,238,0.5)',
				fillerColor: 'rgba(144,197,237,0.2)',
				handleColor: 'rgba(70,130,180,0.8)',
				showDetail:false,
				zoomLock:true,
				start : 0,
				end : 100
			},
			calculable : false,
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				top:90,
				containLabel: true
			},
			xAxis : [
				{
					name :'',
					type : 'category',
					boundaryGap:true,
					splitNumber:'',
					axisLine: {
						show:true,
						lineStyle:{
							color: '#e4e4e4',
							width: 1,
							type: 'solid'
						}
					},
					axisTick: {
						show:false,
						length:5,
						lineStyle:{
							color: '#333',
    						width: 1
						}
					},
					axisLabel: {
						interval:0,
						rotate:0,
						clickable:true,
						textStyle:{
							color:'#000',
							fontSize:14
						}
					},
					splitArea: {
						show:false,
						areaStyle:{
							color: [
								'rgba(250,250,250,0.3)',
								'rgba(200,200,200,0.3)'
							]
						} 
					},
					splitLine: {
						show:false,
						lineStyle:{
							color: '#48b',
							width: 1,
							type: 'solid'
						}
					},
					data : data.xAxisData
				}
			],
			yAxis : [
				{
					name :'',
					type : 'value',
					nameTextStyle:{
						fontSize: 14,
						color: '#333'
					},
					axisLine: {
						show:true,
						lineStyle:{
							color: 'rgba(228,228,228,1)',
							width: 1,
							type: 'solid'
						}
					},
					axisTick: {
						show:false,
						length:5,
						lineStyle:{
							color: '#333',
    						width: 1
						}
					},
					axisLabel: {
						interval:0,
						rotate:0,
						clickable:true,
						textStyle:{
							color:'#000',
							fontSize:14
						}
					},
					splitArea: {
						show:false,
						areaStyle:{
							color: [
								'rgba(250,250,250,0.3)',
								'rgba(200,200,200,0.3)'
							]
						} 
					},
					splitLine: {
						show:false,
						lineStyle:{
							color: '#e4e4e4',
							width: 1,
							type: 'solid'
						}
					}
				}
			],
			series : sery
		};
		option = $.extend(true,{},option,noption);
		
		chart.setOption(option,true);
	};
	$.fn.yline = function(options){
		var data ={
				title:'Menmory Usage',
				legendData:['全部人数','正常有效人'],
				xAxisData:['分类一','分类二','分类三','分类四'],
				data:[{name:'全部人数',value:[20,50,30,40]},{name:'正常有效人',value:[10,20,40,30]}]
			};
		var noption;
		if(options){
			if(options.data){
				data = options.data;
			}
			if(options.option){
				noption = options.option;
			}
		}
		var sery=[];
		for(var i=0; i<data.data.length;i++){
			sery.push({
				name:data.data[i].name,
				type:'line',
				symbol:'circle',
				symbolSize:0,
				smooth:false,
				clickable:false,
				data:data.data[i].value
			});
		}
		var chart = echarts.init(this[0]);
		option = {
			title : {
				show:true,
				x:'center',
				y:20,
				text:data.title,
				textStyle:{
					fontSize: 26,
					fontWeight: 'bolder',
					color: '#00468C'
				}
			},
			tooltip : {
				trigger: 'item',
				axisPointer : { 
					type : 'shadow'
				}
			},
			legend: {
				show:false,
				data:data.legendData,
				x:'right',
				y:50
			},
			dataZoom : {
				show : false,
				realtime : true,
				height: 20,
				backgroundColor: 'rgba(0,0,0,0)',
				dataBackgroundColor: 'rgba(238,238,238,0.5)',
				fillerColor: 'rgba(144,197,237,0.2)',
				handleColor: 'rgba(70,130,180,0.8)',
				showDetail:false,
				zoomLock:true,
				start : 0,
				end : 100
			},
			calculable : false,
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				top:90,
				containLabel: true
			},
			yAxis : [
				{
					name :'',
					type : 'category',
					boundaryGap:true,
					splitNumber:'',
					axisLine: {
						show:true,
						lineStyle:{
							color: '#e4e4e4',
							width: 1,
							type: 'solid'
						}
					},
					axisTick: {
						show:false,
						length:5,
						lineStyle:{
							color: '#333',
    						width: 1
						}
					},
					axisLabel: {
						interval:0,
						rotate:0,
						clickable:true,
						textStyle:{
							color:'#000',
							fontSize:14
						}
					},
					splitArea: {
						show:false,
						areaStyle:{
							color: [
								'rgba(250,250,250,0.3)',
								'rgba(200,200,200,0.3)'
							]
						} 
					},
					splitLine: {
						show:false,
						lineStyle:{
							color: '#48b',
							width: 1,
							type: 'solid'
						}
					},
					data : data.xAxisData
				}
			],
			xAxis : [
				{
					name :'',
					type : 'value',
					nameTextStyle:{
						fontSize: 14,
						color: '#333'
					},
					axisLine: {
						show:true,
						lineStyle:{
							color: 'rgba(228,228,228,1)',
							width: 1,
							type: 'solid'
						}
					},
					axisTick: {
						show:false,
						length:5,
						lineStyle:{
							color: '#333',
    						width: 1
						}
					},
					axisLabel: {
						interval:0,
						rotate:0,
						clickable:true,
						textStyle:{
							color:'#000',
							fontSize:14
						}
					},
					splitArea: {
						show:false,
						areaStyle:{
							color: [
								'rgba(250,250,250,0.3)',
								'rgba(200,200,200,0.3)'
							]
						} 
					},
					splitLine: {
						show:false,
						lineStyle:{
							color: '#e4e4e4',
							width: 1,
							type: 'solid'
						}
					}
				}
			],
			series : sery
		};
		option = $.extend(true,{},option,noption);
		
		chart.setOption(option,true);
	};
	$.fn.ySmoothLine  = function(options){
		var data ={
				title:'Network Usage',
				legendData:['全部人数','正常有效人'],
				xAxisData:['分类一','分类二','分类三','分类四'],
				data:[{name:'全部人数',value:[20,50,30,40]},{name:'正常有效人',value:[10,20,40,30]}]
			};
		var noption;
		if(options){
			if(options.data){
				data = options.data;
			}
			if(options.option){
				noption = options.option;
			}
		}
		var sery=[];
		for(var i=0; i<data.data.length;i++){
			sery.push({
				name:data.data[i].name,
				type:'line',
				symbol:'circle',
				symbolSize:0,
				smooth:true,
				clickable:false,
				data:data.data[i].value
			});
		}
		var chart = echarts.init(this[0]);
		option = {
			title : {
				show:true,
				x:'center',
				y:20,
				text:data.title,
				textStyle:{
					fontSize: 26,
					fontWeight: 'bolder',
					color: '#00468C'
				}
			},
			tooltip : {
				trigger: 'item',
				axisPointer : { 
					type : 'shadow'
				}
			},
			legend: {
				show:false,
				data:data.legendData,
				x:'right',
				y:50
			},
			dataZoom : {
				show : false,
				realtime : true,
				height: 20,
				backgroundColor: 'rgba(0,0,0,0)',
				dataBackgroundColor: 'rgba(238,238,238,0.5)',
				fillerColor: 'rgba(144,197,237,0.2)',
				handleColor: 'rgba(70,130,180,0.8)',
				showDetail:false,
				zoomLock:true,
				start : 0,
				end : 100
			},
			calculable : false,
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				top:90,
				containLabel: true
			},
			yAxis : [
				{
					name :'',
					type : 'category',
					boundaryGap:true,
					splitNumber:'',
					axisLine: {
						show:true,
						onZero:false,
						lineStyle:{
							color: '#e4e4e4',
							width: 1,
							type: 'solid'
						}
					},
					axisTick: {
						show:false,
						length:5,
						lineStyle:{
							color: '#333',
    						width: 1
						}
					},
					axisLabel: {
						interval:0,
						rotate:0,
						clickable:true,
						textStyle:{
							color:'#000',
							fontSize:14
						}
					},
					splitArea: {
						show:false,
						areaStyle:{
							color: [
								'rgba(250,250,250,0.3)',
								'rgba(200,200,200,0.3)'
							]
						} 
					},
					splitLine: {
						show:false,
						lineStyle:{
							color: '#48b',
							width: 1,
							type: 'solid'
						}
					},
					data : data.xAxisData
				}
			],
			xAxis : [
				{
					name :'',
					type : 'value',
					nameTextStyle:{
						fontSize: 14,
						color: '#333'
					},
					axisLine: {
						show:true,
						lineStyle:{
							color: 'rgba(228,228,228,1)',
							width: 1,
							type: 'solid'
						}
					},
					axisTick: {
						show:false,
						length:5,
						lineStyle:{
							color: '#333',
    						width: 1
						}
					},
					axisLabel: {
						interval:0,
						rotate:0,
						clickable:true,
						textStyle:{
							color:'#000',
							fontSize:14
						}
					},
					splitArea: {
						show:false,
						areaStyle:{
							color: [
								'rgba(250,250,250,0.3)',
								'rgba(200,200,200,0.3)'
							]
						} 
					},
					splitLine: {
						show:false,
						lineStyle:{
							color: '#e4e4e4',
							width: 1,
							type: 'solid'
						}
					}
				}
			],
			series : sery
		};
		option = $.extend(true,{},option,noption);
		
		chart.setOption(option,true);
	};
	$.fn.areaLine = function(options){
		var data ={
				title:'Menmory Usage',
				legendData:['全部人数','正常有效人'],
				xAxisData:['11','21','31','41','51','16','17','12','13','14','15','16','17','12','13','14','15','16','17'],
				data:[{name:'全部人数',value:[20,50,30,40,20,40,30,50,30,40,20,40,30,50,30,40,20,40,30]}]
			};
		var noption;
		if(options){
			if(options.data){
				data = options.data;
			}
			if(options.option){
				noption = options.option;
			}
		}
		var sery=[];
		for(var i=0; i<data.data.length;i++){
			sery.push({
				name:data.data[i].name,
				type:'line',
				symbol:'circle',
				symbolSize:0,
				smooth:true,
				clickable:false,
				areaStyle: {normal: {opacity:0.3}},
				data:data.data[i].value
			});
		}
		var chart = echarts.init(this[0]);
		var option = {
			title : {
				show:true,
				x:'center',
				y:20,
				text:data.title,
				textStyle:{
					fontSize: 26,
					fontWeight: 'bolder',
					color: '#00468C'
				}
			},
			tooltip : {
				trigger: 'axis'
			},
			legend: {
				show:false,
				icon:'rect',
				data:data.legendData,
				x:'right'
			},
			dataZoom: [
				{
					show: false,
					realtime: true,
					width:'75%',
					x:'center',
					handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
        			handleSize: '80%',
					//start: 30,
					//end: 70,
					//xAxisIndex: [0, 1]
				},
				{
					type: 'inside',
					realtime: true,
					//start: 30,
					//end: 70,
					//xAxisIndex: [0, 1]
				}
			],
			calculable : false,
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				top:90,
				containLabel: true
			},
			xAxis : [
				{
					name :'',
					type : 'category',
					boundaryGap:true,
					//splitNumber:'',
					axisLine: {
						show:true,
						lineStyle:{
							color: '#e4e4e4',
							width: 1,
							type: 'solid'
						}
					},
					axisTick: {
						show:false,
						length:5,
						lineStyle:{
							color: '#333',
    						width: 1
						}
					},
					axisLabel: {
						rotate:0,
						clickable:true,
						textStyle:{
							color:'#000',
							fontSize:12
						}
					},
					splitArea: {
						show:false,
						areaStyle:{
							color: [
								'rgba(250,250,250,0.3)',
								'rgba(200,200,200,0.3)'
							]
						} 
					},
					splitLine: {
						show:false,
						lineStyle:{
							color: '#48b',
							width: 1,
							type: 'solid'
						}
					},
					data : data.xAxisData
				}
			],
			yAxis : [
				{
					name :'',
					type : 'value',
					minInterval: 1,
					nameTextStyle:{
						fontSize: 12,
						color: '#333'
					},
					axisLine: {
						show:true,
						lineStyle:{
							color: 'rgba(228,228,228,1)',
							width: 1,
							type: 'solid'
						}
					},
					axisTick: {
						show:false,
						length:5,
						lineStyle:{
							color: '#333',
    						width: 1
						}
					},
					axisLabel: {
						interval:0,
						rotate:0,
						clickable:true,
						textStyle:{
							color:'#000',
							fontSize:12
						}
					},
					splitArea: {
						show:false,
						areaStyle:{
							color: [
								'rgba(250,250,250,0.3)',
								'rgba(200,200,200,0.3)'
							]
						} 
					},
					splitLine: {
						show:false,
						lineStyle:{
							color: '#e4e4e4',
							width: 1,
							type: 'solid'
						}
					}
				}
			],
			series : sery
		};
		option = $.extend(true,option,noption);
		chart.setOption(option,true);
	};
	$.fn.biaxAreaLine = function(options){
		var data ={
				title:'Menmory Usage',
				legendData:['全部人数','正常有效人'],
				xAxisData:['1:00','2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00'],
				data:[0.1,0.2,0.3,0.1,0.3,0.2,0.1,0.1,0.3,0.1,0.2,0.2,0.3],
				datay:[0,0.12,0.13,0.21,0.13,0.12,0,0.12,0.23,0.31,0.23,0.27,0.3]
			};
		var noption;
		if(options){
			if(options.data){
				data = options.data;
			}
			if(options.option){
				noption = options.option;
			}
		}
		var chart = echarts.init(this[0]);
		option = {
			title : {
				show:true,
				x:'center',
				y:20,
				text:data.title,
				textStyle:{
					fontSize: 26,
					fontWeight: 'bolder',
					color: '#00468C'
				}
			},
			tooltip : {
				trigger: 'item',
				axisPointer : { 
					type : 'shadow'
				}
			},
			legend: {
				show:false,
				data:data.legendData,
				x:'right',
				y:50
			},
			dataZoom : {
				show : false,
				realtime : true,
				height: 20,
				backgroundColor: 'rgba(0,0,0,0)',
				dataBackgroundColor: 'rgba(238,238,238,0.5)',
				fillerColor: 'rgba(144,197,237,0.2)',
				handleColor: 'rgba(70,130,180,0.8)',
				showDetail:false,
				zoomLock:true,
				start : 0,
				end : 100
			},
			calculable : false,
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				top:90,
				containLabel: true
			},
			xAxis : [
				{
					name :'',
					type : 'category',
					boundaryGap:true,
					splitNumber:'',
					axisLine: {
						show:true,
						lineStyle:{
							color: '#e4e4e4',
							width: 1,
							type: 'solid'
						}
					},
					axisTick: {
						show:false,
						length:5,
						lineStyle:{
							color: '#333',
    						width: 1
						}
					},
					axisLabel: {
						interval:0,
						rotate:0,
						clickable:true,
						textStyle:{
							color:'#000',
							fontSize:14
						}
					},
					splitArea: {
						show:false,
						areaStyle:{
							color: [
								'rgba(250,250,250,0.3)',
								'rgba(200,200,200,0.3)'
							]
						} 
					},
					splitLine: {
						show:false,
						lineStyle:{
							color: '#48b',
							width: 1,
							type: 'solid'
						}
					},
					data : data.xAxisData
				}
			],
			yAxis : [
				{
					name :'',
					type : 'value',
					max:1,
					nameTextStyle:{
						fontSize: 14,
						color: '#333'
					},
					axisLine: {
						show:true,
						lineStyle:{
							color: 'rgba(228,228,228,1)',
							width: 1,
							type: 'solid'
						}
					},
					axisTick: {
						show:false,
						length:5,
						lineStyle:{
							color: '#333',
    						width: 1
						}
					},
					axisLabel: {
						interval:0,
						rotate:0,
						clickable:true,
						textStyle:{
							color:'#000',
							fontSize:14
						}
					},
					splitArea: {
						show:false,
						areaStyle:{
							color: [
								'rgba(250,250,250,0.3)',
								'rgba(200,200,200,0.3)'
							]
						} 
					},
					splitLine: {
						show:false,
						lineStyle:{
							color: '#e4e4e4',
							width: 1,
							type: 'solid'
						}
					}
				},
				{
					name :'',
					min:-1,
					type : 'value',
					nameTextStyle:{
						fontSize: 14,
						color: '#333'
					},
					axisLine: {
						show:true,
						lineStyle:{
							color: 'rgba(228,228,228,1)',
							width: 1,
							type: 'solid'
						}
					},
					axisTick: {
						show:false,
						length:5,
						lineStyle:{
							color: '#333',
    						width: 1
						}					},
					axisLabel: {
						interval:0,
						rotate:0,
						clickable:true,
						textStyle:{
							color:'#000',
							fontSize:14
						}
					},
					splitArea: {
						show:false,
						areaStyle:{
							color: [
								'rgba(250,250,250,0.3)',
								'rgba(200,200,200,0.3)'
							]
						} 
					},
					splitLine: {
						show:false,
						lineStyle:{
							color: '#e4e4e4',
							width: 1,
							type: 'solid'
						}
					}
				}
			],
			series : [
				{
					name:'流量',
					type:'line',
					itemStyle: {normal: {areaStyle: {type: 'default'}}},
					data:data.data
				},
				{
					name:'降雨量',
					type:'line',
					yAxisIndex:1,
					itemStyle: {normal: {areaStyle: {type: 'default'}}},
					data: (function(){
						var oriData = data.datay;
						var len = oriData.length;
						while(len--) {
							oriData[len] *= -1;
						}
						return oriData;
					})()
				}
			]
		};
		option = $.extend(true,option,noption);
		chart.setOption(option,true);
	};
	$.fn.areatwoLine = function(options){
		var data ={
				title:'Cluster Load',
				//legendData:['集群负载'],
				max:80,
				xAxisData:['01:00','02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00','10:00','11:00','12:00'],
				data:[{type:'area',name:'全部人数',value:[20,50,30,40,20,40,30,50,30,40,20,40]}]
			};
		var noption;
		if(options){
			if(options.data){
				data = options.data;
			}
			if(options.option){
				noption = options.option;
			}
		}
		var sery=[];
		for(i=0;i<data.data.length;i++){
			if(data.data[i].type == 'area'){
				sery.push(
					{
						name:data.data[i].name,
						type:'line',
						smooth:true,
						symbolSize:0.1,
						lineStyle: {
							normal: {
								width: 1
							}
						},
						areaStyle: {
							normal: {
								opacity:0.2
							}
						},
						data:data.data[i].value
					}
				);
			}else{
				sery.push(
					{
						name:data.data[i].name,
						type:'line',
						smooth:true,
						symbolSize:0.1,
						data:data.data[i].value
					}
				);
			}
		}
		var chart = echarts.init(this[0]);
		option = {
			title: {
				show:true,
				x:'center',
				y:20,
				text:data.title,
				textStyle:{
					fontSize: 26,
					fontWeight: 'bolder',
					color: '#00468C'
				}
			},
			tooltip : {
				trigger: 'axis',
				backgroundColor:'#fff',
				axisPointer:{
					lineStyle: {
						color:'#00BEFD',
						type:'dashed'
					}
				},
				formatter: function(parms){
					var res = '<div class="tipbox"><div class="m-name" style="float:left; color:#666666">'+data.title+'</div><div class="m-value" style="float:right; color:#111111"> '+parms[0].value+'%</div></div>';
					return res;
				}
			},
			legend: {
				show:false,
				right:20,
				textStyle:{
					color:'#fff'
				},
				data:data.legendData
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				top:90,
				containLabel: true
			},
			xAxis : [
				{
					type : 'category',
					boundaryGap : false,
					axisLine: {
						lineStyle:{
							color:'rgba(30,102,157,1)'
						}
					},
					axisTick: {show:true},
					axisLabel: {
						interval:0,
						clickable:true,
						textStyle:{
							color:'rgba(30,102,157,1)'
						}
					},
					splitArea: {show:false},
					splitLine: {show:false},
					data : data.xAxisData
				}
			],
			yAxis : [
				{
					name:'',
					max:data.max,
					axisLine: {
						lineStyle:{
							color:'rgba(30,102,157,1)'
						}
					},
					axisTick: {show:false},
					axisLabel: {
						interval:0,
						clickable:true,
						textStyle:{
							color:'rgba(30,102,157,1)'
						}
					},
					splitArea: {show:false},
					splitLine: {
						lineStyle:{
							color:'rgba(5,35,63,1)'
						}
					},
					type : 'value'
				}
			],
			series : sery
		};
		option = $.extend(true,{},option,noption);
		chart.setOption(option,true);
	};
	//柱状图
	$.fn.bar = function(options){
		var data ={
				title:'CPU Usage',
				legendData:['全部人数','正常有效人'],
				xAxisData:['分类一','分类二','分类三','分类四'],
				data:[{name:'全部人数',value:[20,30,40,50]},{name:'正常有效人',value:[10,20,30,40]}]
			};
		var option = $.extend(true,defaultopt,options);
		if(option.data){
			data = option.data;
		}
		var sery=[];
		for(var i=0; i<data.data.length;i++){
			sery.push({
				name:data.data[i].name,
				type:'bar',
				stack: 'sum',
				barMinHeight:20,
				clickable:false,
				barCategoryGap: '50%',
				data:data.data[i].value
			});
		}
		var defaultopt = {
			title : {
				show:true,
				x:'center',
				y:20,
				text:data.title,
				textStyle:{
					fontSize: 26,
					fontWeight: 'bolder',
					color: '#00468C'
				}
			},
			tooltip : {
				trigger: 'item',
				axisPointer : { 
					type : 'shadow'
				}
			},
			legend: {
				show:false,
				data:data.legendData,
				x:'right',
				y:50
			},
			dataZoom : {
				show : false,
				realtime : true,
				height: 20,
				backgroundColor: 'rgba(0,0,0,0)',
				dataBackgroundColor: 'rgba(238,238,238,0.5)',
				fillerColor: 'rgba(144,197,237,0.2)',
				handleColor: 'rgba(70,130,180,0.8)',
				showDetail:false,
				zoomLock:true,
				start : 0,
				end : 100
			},
			calculable : false,
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				top:90,
				containLabel: true
			},
			xAxis : [
				{
					name :'',
					type : 'category',
					axisLine: {
						show:true,
						lineStyle:{
							color: '#e4e4e4',
							width: 1,
							type: 'solid'
						}
					},
					axisTick: {
						show:false,
						length:5,
						lineStyle:{
							color: '#333',
    						width: 1
						}
					},
					axisLabel: {
						interval:0,
						rotate:0,
						clickable:true,
						textStyle:{
							color:'#000',
							fontSize:14
						}
					},
					splitArea: {
						show:false,
						areaStyle:{
							color: [
								'rgba(250,250,250,0.3)',
								'rgba(200,200,200,0.3)'
							]
						} 
					},
					splitLine: {
						show:false,
						lineStyle:{
							color: '#48b',
							width: 1,
							type: 'solid'
						}
					},
					data : data.xAxisData
				}
			],
			yAxis : [
				{
					name :'',
					type : 'value',
					nameTextStyle:{
						fontSize: 14,
						color: '#333'
					},
					axisLine: {
						show:true,
						lineStyle:{
							color: 'rgba(228,228,228,1)',
							width: 1,
							type: 'solid'
						}
					},
					axisTick: {
						show:false,
						length:5,
						lineStyle:{
							color: '#333',
    						width: 1
						}
					},
					axisLabel: {
						interval:0,
						rotate:0,
						clickable:true,
						textStyle:{
							color:'#000',
							fontSize:14
						}
					},
					splitArea: {
						show:false,
						areaStyle:{
							color: [
								'rgba(250,250,250,0.3)',
								'rgba(200,200,200,0.3)'
							]
						} 
					},
					splitLine: {
						show:false,
						lineStyle:{
							color: '#e4e4e4',
							width: 1,
							type: 'solid'
						}
					}
				}
			],
			series : sery
		};
		var _option = $.extend(true,defaultopt,option.option);
		
		var chart = echarts.init(this[0]);
		chart.setOption(_option,true);
	};
	$.fn.dbar = function(options){
		var data ={
				title:'引擎',
				legendData:['引擎'],
				xAxisData:['引擎1','引擎2','引擎3','引擎4'],
				data:[{name:'引擎',value:[20,30,40,50]}]
			};
		var noption;
		if(options){
			if(options.data){
				data = options.data;
			}
			if(options.option){
				noption = options.option;
			}
		}
		var sery=[];
		for(var i=0; i<data.data.length;i++){
			sery.push({
				name:data.data[i].name,
				type:'bar',
				//stack: 'sum',
				barMinHeight:20,
				clickable:false,
				barCategoryGap: '50%',
				data:data.data[i].value
			});
		}
		
		var chart = echarts.init(this[0]);
		var option = {
			title : {
				show:true,
				text:data.title,
				y:20,
				x:20,
				textStyle:{
					fontSize: 14,
					fontWeight: 'bolder',
					color: '#333333'
				} 
			},
			tooltip : {
				trigger: 'item',
				backgroundColor:'#fff',
				axisPointer : { 
					type : 'shadow'
				},
				textStyle: {
					color: '#666',
				},
				formatter:'{b}： {c}%'
			},
			legend: {
				show:true,
				data:data.legendData,
				y:20,
				textStyle:{
					color:'#999999'
				}
			},
			dataZoom : {
				show : false,
				realtime : true,
				height: 20,
				backgroundColor: 'rgba(0,0,0,0)',
				dataBackgroundColor: 'rgba(238,238,238,0.5)',
				fillerColor: 'rgba(144,197,237,0.2)',
				handleColor: 'rgba(70,130,180,0.8)',
				showDetail:false,
				zoomLock:true,
				start : 0,
				end : 100
			},
			calculable : false,
			grid: {
				left: 40,
				top:80,
				right:'2%',
				borderWidth:0
			},
			xAxis : [
				{
					name :'',
					type : 'category',
					axisLine: {
						show:true,
						lineStyle:{
							color: '#CCCCCC',
							width: 1,
							type: 'solid'
						}
					},
					axisTick: {
						show:false,
						length:5,
						lineStyle:{
							color: '#333',
    						width: 1
						}
					},
					axisLabel: {
						interval:0,
						rotate:0,
						clickable:true,
						textStyle:{
							color:'#333333',
							fontSize:12
						}
					},
					splitArea: {
						show:false,
						areaStyle:{
							color: [
								'rgba(250,250,250,0.3)',
								'rgba(200,200,200,0.3)'
							]
						} 
					},
					splitLine: {
						show:false,
						lineStyle:{
							color: '#48b',
							width: 1,
							type: 'solid'
						}
					},
					data : data.xAxisData
				}
			],
			yAxis : [
				{
					name :'',
					
					type : 'value',
					nameTextStyle:{
						fontSize: 12,
						color: '#333333'
					},
					axisLine: {
						show:true,
						lineStyle:{
							color: 'rgba(204,204,204,1)'
						}
					},
					axisTick: {
						show:false,
						length:5,
						lineStyle:{
							color: '#333',
    						width: 1
						}
					},
					axisLabel: {
						interval:0,
						rotate:0,
						clickable:true,
						textStyle:{
							color:'#333333',
							fontSize:13
						}
					},
					splitArea: {
						show:false,
						areaStyle:{
							color: [
								'rgba(250,250,250,0.3)',
								'rgba(200,200,200,0.3)'
							]
						} 
					},
					splitLine: {
						show:true,
						lineStyle:{
							color: '#EBEBEB ',
							width: 1,
							type: 'solid'
						}
					}
				}
			],
			series : sery
		};
		
		option = $.extend(true,{},option,noption);
		chart.setOption(option,true);
	};
	
	
	//饼图
	$.fn.pie = function(options){
		var data={
			title:'分类',
			legendData:['分类一','分类二','分类三','分类四','分类五','分类六','分类七','分类八'],
			data:[
				{value:Math.round(Math.random()*100), name:'分类一'},
				{value:Math.round(Math.random()*100), name:'分类二'},
				{value:Math.round(Math.random()*100), name:'分类三'},
				{value:Math.round(Math.random()*100), name:'分类四'},
				{value:Math.round(Math.random()*100), name:'分类五'},
				{value:Math.round(Math.random()*100), name:'分类六'},
				{value:Math.round(Math.random()*100), name:'分类七'},
				{value:Math.round(Math.random()*100), name:'分类八'}
			]
		};
		var noption;
		if(options){
			if(options.data){
				data = options.data;
			}
			if(options.option){
				noption = options.option;
			}
		}
		var chart = echarts.init(this[0]);
		option = {
			title : {
				show:true,
				x:'center',
				y:10,
				text:data.title,
				textStyle:{
					fontSize: 26,
					fontWeight: 'bolder',
					color: '#00468C'
				}
			},
			tooltip : {
				trigger: 'item',
				backgroundColor:'#fff',
				axisPointer : { 
					type : 'shadow'
				},
				textStyle: {
					color: '#666',
				},
				formatter:'{b}： {c}%'
			},
			legend: {
				show:false,
				orient : 'vertical',
				left : 20,
				bottom:'center',
				textStyle:{
					color:'#1E669D'
				},
				data:data.legendData
			},
			series : [
				{
					name:data.name,
					type: 'pie',
					radius : ['0%','60%'],
					center: ['50%','50%'],
					data:data.data,
					selectedOffset:0,
					hoverAnimation:false,
				}
			]
		};
		option = $.extend(true,option,noption);
		chart.setOption(option,true);
	};
	$.fn.doublepie = function(options){
		var data={
			title:"NameNode Uptime",
			name:'分类',
			unit:'%',
			legendData:['分类一','分类二','分类三','分类四','分类五','分类六','分类七','分类八'],
			data1:[
				{value:Math.round(Math.random()*100), name:'分类一'},
				{value:Math.round(Math.random()*100), name:'分类二'},
				{value:Math.round(Math.random()*100), name:'分类三'},
				{value:Math.round(Math.random()*100), name:'分类四'},
				{value:Math.round(Math.random()*100), name:'分类五'},
				{value:Math.round(Math.random()*100), name:'分类六'},
				{value:Math.round(Math.random()*100), name:'分类七'},
				{value:Math.round(Math.random()*100), name:'分类八'}
			],
			data2:[
				{value:Math.round(Math.random()*100), name:'分类一'},
				{value:Math.round(Math.random()*100), name:'分类二'},
				{value:Math.round(Math.random()*100), name:'分类三'},
				{value:Math.round(Math.random()*100), name:'分类四'},
				{value:Math.round(Math.random()*100), name:'分类五'},
				{value:Math.round(Math.random()*100), name:'分类六'},
				{value:Math.round(Math.random()*100), name:'分类七'},
				{value:Math.round(Math.random()*100), name:'分类八'}
			]
		};
		var noption;
		if(options){
			if(options.data){
				data = options.data;
			}
			if(options.option){
				noption = options.option;
			}
		}
		var chart = echarts.init(this[0]);
		var option = {
			title : {
				show:true,
				x:'center',
				y:10,
				text:data.title,
				textStyle:{
					fontSize: 26,
					fontWeight: 'bolder',
					color: '#00468C'
				}
			},
			tooltip : {
				show:true,
				trigger: 'item',
				formatter: function(parms){
					var res = '<div class="tipbox"><div class="m-value">'+parms.value+'%</div><div class="m-name">'+parms.name+'<br>占比</div></div>';
					return res;
				}
			},
			legend: {
				show:false,
				orient : 'vertical',
				x : 5,
				y:10,
				textStyle:{
					color:'#1E669D'
				},
				data:data.legendData
			},
			calculable :false,
			series : [
				{
					name:data.name,
					type:'pie',
					itemStyle: {
						normal: {
							label:{
								show:true,
								position:'outer',
								//formatter:'{b}'
								formatter: function(parms){
									//return parms.name+'  '+parms.value+data.unit;
									return parms.value+data.unit;
								}
							},
							labelLine:{
								show:true
							}
						},
						emphasis: {
							label:{
								show:true
							}
						}
					},
					radius : ['0%','40%'],
					center: ['35%','50%'],
					data:data.data1
				},
				{
					name:data.name,
					type:'pie',
					itemStyle: {
						normal: {
							label:{
								show:true,
								position:'outer',
								//formatter:'{b}'
								formatter: function(parms){
									//return parms.name+'  '+parms.value+data.unit;
									return parms.value+data.unit;
								}
							},
							labelLine:{
								show:true
							}
						},
						emphasis: {
							label:{
								show:true
							}
						}
					},
					radius : ['0%','40%'],
					center: ['75%','50%'],
					data:data.data2
				}
			]
		};
		option = $.extend(true,option,noption);
		chart.setOption(option,true);
	};
	$.fn.circle = function(options){
		var data={
			title:'ResourceManager Heap',
			name:'分类',
			legendData:['分类一','分类二','分类三','分类四','分类五','分类六','分类七','分类八'],
			data:[
				{value:Math.round(Math.random()*100), name:'分类一'},
				{value:Math.round(Math.random()*100), name:'分类二'},
				{value:Math.round(Math.random()*100), name:'分类三'},
				{value:Math.round(Math.random()*100), name:'分类四'},
				{value:Math.round(Math.random()*100), name:'分类五'},
				{value:Math.round(Math.random()*100), name:'分类六'},
				{value:Math.round(Math.random()*100), name:'分类七'},
				{value:Math.round(Math.random()*100), name:'分类八'}
			]
		};
		var noption;
		if(options){
			if(options.data){
				data = options.data;
			}
			if(options.option){
				noption = options.option;
			}
		}
		data = $.extend(data,data);
		var chart = echarts.init(this[0]);
		var option = {
			title : {
				show:true,
				x:'center',
				y:10,
				text:data.title,
				textStyle:{
					fontSize: 26,
					fontWeight: 'bolder',
					color: '#00468C'
				}
			},
			tooltip : {
				show:true,
				trigger: 'item',
				formatter: '{a}<br>{b}：{c}%'
			},
			legend: {
				show:false,
				orient : 'vertical',
				x : 20,
				y:'center',
				textStyle:{
					color:'#000'
				},
				data:data.legendData
			},
			calculable :false,
			series : [
				{
					name:data.name,
					type:'pie',
					itemStyle: {
						normal: {
							label:{
								show:true,
								position:'outer',
								formatter:'{b}'
							},
							labelLine:{
								show:true
							}
						},
						emphasis: {
							label:{
								show:false
							}
						}
					},
					radius : ['40%','60%'],
					center: ['50%','50%'],
					data:data.data
				}
			]
		};
		option = $.extend(true,option,noption);
		chart.setOption(option,true);
	};
	$.fn.circlepie = function(options){
		var data={
			title:'ResourceManager Uptime',
			name:'分类',
			unit:'%',
			legendData:['分类一','分类二','分类三','分类四','分类五','分类六','分类七','分类八'],
			circledata:[
				{value:Math.round(Math.random()*100), name:'分类一'},
				{value:Math.round(Math.random()*100), name:'分类二'},
				{value:Math.round(Math.random()*100), name:'分类三'},
				{value:Math.round(Math.random()*100), name:'分类四'},
				{value:Math.round(Math.random()*100), name:'分类五'},
				{value:Math.round(Math.random()*100), name:'分类六'},
				{value:Math.round(Math.random()*100), name:'分类七'},
				{value:Math.round(Math.random()*100), name:'分类八'}
			],
			piedata:[
				{value:Math.round(Math.random()*100), name:'分类一'},
				{value:Math.round(Math.random()*100), name:'分类二'},
				{value:Math.round(Math.random()*100), name:'分类三'},
				{value:Math.round(Math.random()*100), name:'分类四'},
				{value:Math.round(Math.random()*100), name:'分类五'},
				{value:Math.round(Math.random()*100), name:'分类六'},
				{value:Math.round(Math.random()*100), name:'分类七'},
				{value:Math.round(Math.random()*100), name:'分类八'}
			]
		};
		var noption;
		if(options){
			if(options.data){
				data = options.data;
			}
			if(options.option){
				noption = options.option;
			}
		}
		data = $.extend(data,data);
		var chart = echarts.init(this[0]);
		var option = {
			title : {
				show:true,
				x:'center',
				y:10,
				text:data.title,
				textStyle:{
					fontSize: 26,
					fontWeight: 'bolder',
					color: '#00468C'
				}
			},
			tooltip : {
				show:true,
				trigger: 'item',
				formatter: function(parms){
					var res = '<div class="tipbox"><div class="m-value">'+parms.value+'%</div><div class="m-name">'+parms.name+'<br>占比</div></div>';
					return res;
				}
			},
			legend: {
				show:false,
				orient : 'vertical',
				x : 5,
				y:10,
				textStyle:{
					color:'#1E669D'
				},
				data:data.legendData
			},
			calculable :false,
			series : [
				{
					name:data.name,
					type:'pie',
					itemStyle: {
						normal: {
							label:{
								show:true,
								position:'outer',
								//formatter:'{b}'
								formatter: function(parms){
									return parms.name+'  '+parms.value+data.unit;
								}
							},
							labelLine:{
								show:true
							}
						},
						emphasis: {
							label:{
								show:true
							}
						}
					},
					radius : ['35%','50%'],
					center: ['50%','50%'],
					data:data.circledata
				},
				{
					name:data.name,
					type:'pie',
					itemStyle: {
						normal: {
							label:{
								show:false,
								position:'outer',
								formatter:'{b}'
							},
							labelLine:{
								show:false
							}
						},
						emphasis: {
							label:{
								show:false
							}
						}
					},
					radius : [0,'25%'],
					center: ['50%','50%'],
					data:data.piedata
				}
			]
		};
		option = $.extend(true,option,noption);
		chart.setOption(option,true);
	};
	$.fn.circleDC = function(options){
		var option='';
		var itemstyle = {
				normal : {
					color: '#e6e6e6',
					label : {
						show : true,
						textStyle: {
							color:'#e6e6e6'
						}
					}
				},
				emphasis: {
					color: '#e6e6e6'
				}
			};
		var labelTop = {
				normal : {
					label : {
						show : true,
						position : 'center',
						formatter : '{b}',
						textStyle: {
							color:'#000',
							fontSize:14,
							baseline : 'bottom'
						}
					},
					labelLine : {
						show : false
					}
				}
			};
		var labelBottom = {
				normal : {
					//color: '#ccc',
					label : {
						show : true,
						position : 'center'
					},
					labelLine : {
						show : false
					}
				},
				emphasis: {
					color: 'rgba(0,0,0,0)'
				}
			};
		var data={
			title:'ResourceManager Live',
			name:'分类',
			showData:{value:Math.round(Math.random()*100), name:'分类一',units:'件'},
			legendData:['分类一','分类二','分类三','分类四','分类五','分类六','分类七','分类八'],
			data:[
				{value:Math.round(Math.random()*100), name:'分类一',data:Math.round(Math.random()*100)},
				{value:Math.round(Math.random()*100), name:'分类二',data:Math.round(Math.random()*100)},
				{value:Math.round(Math.random()*100), name:'分类三',data:Math.round(Math.random()*100)},
				{value:Math.round(Math.random()*100), name:'分类四',data:Math.round(Math.random()*100)},
				{value:Math.round(Math.random()*100), name:'分类五',data:Math.round(Math.random()*100)},
				{value:Math.round(Math.random()*100), name:'分类六',data:Math.round(Math.random()*100)},
				{value:Math.round(Math.random()*100), name:'分类七',data:Math.round(Math.random()*100)},
				{value:Math.round(Math.random()*100), name:'分类八',data:Math.round(Math.random()*100)}
			]
		};
		var noption;
		if(options){
			if(options.data){
				data = options.data;
			}
			if(options.option){
				noption = options.option;
			}
		}
		var otdata = {value:0,name:data.showData.name,units:'件',itemStyle:labelTop};
		data.showData.itemStyle = labelBottom;
		var oldname = data.showData.name;
		var showdata = [data.showData,otdata];
		var chart = echarts.init(this[0]);
			option = {
				title : {
					show:true,
					x:'center',
					y:10,
					text:data.title,
					textStyle:{
						fontSize: 26,
						fontWeight: 'bolder',
						color: '#00468C'
					}
				},
				tooltip : {
					show:true,
					trigger: 'item',
					formatter: '{a}<br>{b}：{c}%'
				},
				legend: {
				show:false,
				orient : 'vertical',
				x : 20,
				y:'center',
				textStyle:{
					color:'auto'
				},
				data:data.legendData
			},
			calculable :false,
			series: [
				{
					name:data.name,
					clickable:false,
					hoverAnimation:false,
					type:'pie',
					itemStyle: {
						normal: {
							label : {
								formatter : function (params){
									return String(params.value) + params.data.units;
								},
								textStyle: {
									fontSize:20,
									color:"#000",
									baseline : 'top'
								}
							},
							labelLine:{
								show:true
							}
						},
						emphasis: {
							label:{
								show:false
							}
						}
					},
					radius : ['60%','60%'],
					center: ['50%','50%'],
					data : showdata
				},
				{
					name:data.name,
					hoverAnimation:false,
					clickable:false,
					type:'pie',
					itemStyle: {
						normal: {
							label:{
								show:true,
								position:'outer',
								formatter:function(param){
									var str = '';
									if(param.value > 0){
										str = param.value;
									}
									return str;
								}
							},
							labelLine:{
								show:false
							}
						},
						emphasis: {
							label:{
								show:false
							}
						}
					},
					radius : ['40%','60%'],
					center: ['50%','50%'],
		
					data:data.data
				}
			]
		};
		option = $.extend(true,{},option,noption);
		chart.setOption(option,true);
		chart.on('legendselectchanged', function (param){
			var oldopt = option,value;
			var oldcolor = oldopt.color,newcolor;
			oldopt.legend.selectedMode=false;
			var mdata = oldopt.series[1].data;
			var serdata = oldopt.series[0].data;
			for(x = 0; x<mdata.length; x++){
				if(param.name == mdata[x].name){
					index = x;
					value = mdata[x].value;
					if(index+1 == oldcolor.length){
						oldopt.color[0] = oldcolor[0];
					}else{
						oldopt.color[0] = oldcolor[index+1];
					}
				}else{
					mdata[x].itemStyle = itemstyle;
				}
			}
			for(i = 0; i<serdata.length; i++){
				serdata[i].name = param.name;
				serdata[i].value = value;
			}
			chart.clear();
			chart.setOption(oldopt,true);
			chart.off('click');
			//option='';
		});
		chart.on('click', function (param){
			if(param.name != oldname){
				var oldcolor = option.color,newcolor,value;
				//option.legend.selectedMode=false;
				var mdata = option.series[1].data;
				var serdata = option.series[0].data;
				for(x = 0; x<mdata.length; x++){
					if(param.name == mdata[x].name){
						index = x;
						value = mdata[x].data;
						if(index+1 == oldcolor.length){
							option.color[0] = oldcolor[0];
						}else{
							option.color[0] = oldcolor[index+1];
						}
					}else{
						mdata[x].itemStyle = itemstyle;
					}
				}
				for(i = 0; i<serdata.length; i++){
					serdata[i].name = param.name;
					if(serdata[i].value>0){
						serdata[i].value = value;
					}
				}
				chart.clear();
				chart.setOption(option,false);
				chart.off('click');
			}
		});
	};
	$.fn.circleTC = function(options){
		var data ={
			title:'YARN Memory',
			showData:'60',
			legendData:['提醒','警告'],
			data:[{name:'警告',value:60,showData:100,units:'件',show:false},{name:'提醒',value:40,showData:2928,units:'件',show:true}]
		};
		var baseline ='top';
		var flag = true;
		for(var i = 0; i<data.data.length; i++){
			if(data.data[i].show){
				flag = false;
			}
		}
		if(flag){
			baseline = 'middle';
		}
		var styles,noption;
		if(options){
			if(options.data){
				data = options.data;
			}
			if(options.style){
				styles = options.style;
			}	
			if(options.option){
				noption = options.option;
			}	
		}
		var style = {
			labelTop : {
				normal : {
					label : {
						show : true,
						position : 'center',
						formatter : '{b}',
						textStyle: {
							color:'#000',
							fontSize:14,
							baseline : 'bottom'
						}
					},
					labelLine : {
						show : false
					}
				}
			},
			labelFromatter:{
				normal : {
					label : {
						formatter : function (params){
							var falg = true;
							//for(var i=0; i<params.data.length;i++){
								if(params.data.show){
									falg = false;
									return String(params.data.showData) + params.data.units;
								}	
							//}
							if(falg){
								return data.showData + '%';
							}
						},
						textStyle: {
							fontSize:20,
							color:"#000",
							baseline : baseline
						}
					}
				}
			},
			labelBottom : {
				normal : {
					//color: '#ccc',
					label : {
						show : true,
						position : 'center'
					},
					labelLine : {
						show : false
					}
				}
			}
		};
		style = $.extend(true,{},style,styles);
		
		var sdata = [];
		for(i=0; i<data.data.length;i++){
			if(data.data[i].show){
				sdata.push({
					name:data.data[i].name,
					value:data.data[i].value,
					show:data.data[i].show,
					units:data.data[i].units,
					showData:data.data[i].showData,
					itemStyle:style.labelTop
				});
			}else{
				sdata.push({
					name:data.data[i].name,
					value:data.data[i].value,
					show:data.data[i].show,
					units:data.data[i].units,
					itemStyle:style.labelBottom
				});
			}
		}
		var option = {
			title : {
				show:true,
				x:'center',
				y:10,
				text:data.title,
				textStyle:{
					fontSize: 26,
					fontWeight: 'bolder',
					color: '#00468C'
				}
			},
			legend: {
				show:false,
				x : 'center',
				y : 'center',
				data:data.legendData
			},
			series : [
				{
					type : 'pie',
					center : ['50%', '50%'],
					radius : ['40%', '55%'],
					x: '0%',
					itemStyle : style.labelFromatter,
					data : sdata
				}
			]
		};
		option = $.extend(true,{},option,noption);
		var chart = echarts.init(this[0]);
		chart.setOption(option,true);
	};
	$.fn.circleCC = function(options){
		var data ={
			title:'景区流量预警',
			units:'%',
			sign:'>',
			name:'当前预警',
			data:{value:60}
		};
		var flag = true;
		for(var i = 0; i<data.data.length; i++){
			if(data.data[i].show){
				flag = false;
			}
		}
		if(flag){
			baseline = 'middle';
		}
		var styles,noption;
		if(options){
			if(options.data){
				data = options.data;
			}
			if(options.style){
				styles = options.style;
			}	
			if(options.option){
				noption = options.option;
			}	
		}
		var style = {
			labelTop : {
				normal : {
					label : {
						show : true,
						position : 'center',
						formatter : function (){
							return data.sign+data.data.value+data.units;
						},
						textStyle: {
							fontSize:20,
							color:"#333",
							baseline : 'top'
						}
					},
					labelLine : {
						show : false
					}
				}
			},
			labelFromatter:{
				normal : {
					label : {
						formatter : function (){
							return data.name;
						},
						textStyle: {
							color:'#333',
							fontSize:12,
							baseline : 'bottom'
						}
					}
				}
			},
			labelBottom : {
				normal : {
					//color: '#ccc',
					label : {
						show : true,
						position : 'center'
					},
					labelLine : {
						show : false
					}
				}
			}
		};
		style = $.extend(true,{},style,styles);
		
		var odata = new Object();
		data.data.itemStyle = style.labelTop;
		odata.value = 100-data.data.value;
		odata.itemStyle=style.labelBottom;
		var option = {
			title : {
				show:true,
				x:20,
				y:20,
				text:data.title,
				textStyle:{
					fontSize: 14,
					fontWeight: 'bolder',
					color: '#333'
				}
			},
			legend: {
				show:false,
				x : 'center',
				y : 'center',
				data:data.legendData
			},
			series : [
				{
					type : 'pie',
					hoverAnimation:false,
					center : ['50%', '50%'],
					radius : ['40%', '55%'],
					x: '0%',
					itemStyle : style.labelFromatter,
					data : [data.data,odata]
				}
			]
		};
		option = $.extend(true,{},option,noption);
		var chart = echarts.init(this[0]);
		chart.setOption(option,true);
	};
	$.fn.doubleCircleDC = function(options){
		var labelTop = {
				normal : {
					label : {
						show : true,
						position : 'center',
						formatter : '{b}',
						textStyle: {
							color:'#00468C',
							fontSize:14,
							baseline : 'bottom'
						}
					},
					labelLine : {
						show : false
					}
				}
			};
		var labelBottom = {
				normal : {
					//color: '#ccc',
					label : {
						show : true,
						position : 'center'
					},
					labelLine : {
						show : false
					}
				}
			};
		var data={
			unit:'%',
			title:'YARN Memory',
			legendData:['分类一','分类二','分类三','分类四','分类五','分类六','分类七','分类八'],
			data1:{
				name:'本季度',
				value:[
					{value:Math.round(Math.random()*100), name:'分类一',data:Math.round(Math.random()*100)},
					{value:Math.round(Math.random()*100), name:'分类二',data:Math.round(Math.random()*100)},
					{value:Math.round(Math.random()*100), name:'分类三',data:Math.round(Math.random()*100)},
					{value:Math.round(Math.random()*100), name:'分类四',data:Math.round(Math.random()*100)},
					{value:Math.round(Math.random()*100), name:'分类五',data:Math.round(Math.random()*100)},
					{value:Math.round(Math.random()*100), name:'分类六',data:Math.round(Math.random()*100)},
					{value:Math.round(Math.random()*100), name:'分类七',data:Math.round(Math.random()*100)},
					{value:Math.round(Math.random()*100), name:'分类八',data:Math.round(Math.random()*100)}
				]
			},
			data2:{
				name:'上季度',
				value:[
					{value:Math.round(Math.random()*100), name:'分类一',data:Math.round(Math.random()*100)},
					{value:Math.round(Math.random()*100), name:'分类二',data:Math.round(Math.random()*100)},
					{value:Math.round(Math.random()*100), name:'分类三',data:Math.round(Math.random()*100)},
					{value:Math.round(Math.random()*100), name:'分类四',data:Math.round(Math.random()*100)},
					{value:Math.round(Math.random()*100), name:'分类五',data:Math.round(Math.random()*100)},
					{value:Math.round(Math.random()*100), name:'分类六',data:Math.round(Math.random()*100)},
					{value:Math.round(Math.random()*100), name:'分类七',data:Math.round(Math.random()*100)},
					{value:Math.round(Math.random()*100), name:'分类八',data:Math.round(Math.random()*100)}
				]
			}
		};
		var noption;
		if(options){
			if(options.data){
				data = options.data;
			}
			if(options.option){
				noption = options.option;
			}
		}
		data = $.extend({},data,data);
		var show={value:100, name:data.title,itemStyle:labelBottom};
		var otdata = {value:0,name:data.title,itemStyle:labelTop};
		var showdata = [show,otdata];
		var chart = echarts.init(this[0]);
			option = {
				title : {
					show:true,
					x:'center',
					y:20,
					text:data.title,
					textStyle:{
						fontSize: 26,
						fontWeight: 'bolder',
						color: '#00468C'
					}
				},
				tooltip : {
					show:true,
					trigger: 'item',
					formatter: '{a}<br>{b}：{c}%'
				},
				legend: {
					show:false,
					left:20,
					top:10,
					textStyle:{
						color:'#1E669D'
					},
					data:data.legendData
				},
				calculable :false,
				series: [
					{
						name:data.data1.name,
						clickable:false,
						hoverAnimation:false,
						type:'pie',
						tooltip : {
							show:false
						},
						itemStyle: {
							normal: {
								color:'#0A2A4C',
								label : {
									formatter : '{a}',
									textStyle: {
										fontSize:20,
										color:"#5FD8FF",
										baseline : 'top'
									}
								},
								labelLine:{
									show:false
								}
							},
							emphasis: {
								label:{
									show:false
								}
							}
						},
						radius : ['19%','20%'],
						center: ['25%','50%'],
						data : showdata
					},
					{
						name:data.data1.name,
						hoverAnimation:false,
						clickable:false,
						type:'pie',
						itemStyle: {
							normal: {
								label:{
									show:true,
									position:'outer',
									//formatter:'{b}'
									formatter: function(parms){
										//return parms.name+'  '+parms.value+data.unit;
										return parms.value+data.unit;
									}
								},
								labelLine:{
									show:true
								}
							},
							emphasis: {
								label:{
									show:true
								}
							}
						},
						radius : ['25%','35%'],
						center: ['25%','50%'],
						data:data.data1.value
					},
					{
						name:data.data2.name,
						clickable:false,
						hoverAnimation:false,
						type:'pie',
						tooltip : {
							show:false
						},
						itemStyle: {
							normal: {
								color:'#0A2A4C',
								label : {
									formatter : '{a}',
									textStyle: {
										fontSize:20,
										color:"#5FD8FF",
										baseline : 'top'
									}
								},
								labelLine:{
									show:false
								}
							},
							emphasis: {
								label:{
									show:false
								}
							}
						},
						radius : ['19%','20%'],
						center: ['75%','50%'],
						data : showdata
					},
					{
						name:data.data2.name,
						hoverAnimation:false,
						clickable:false,
						type:'pie',
						itemStyle: {
							normal: {
								label:{
									show:true,
									position:'outer',
									//formatter:'{b}'
									formatter: function(parms){
										//return parms.name+'  '+parms.value+data.unit;
										return parms.value+data.unit;
									}
								},
								labelLine:{
									show:true
								}
							},
							emphasis: {
								label:{
									show:true
								}
							}
						},
						radius : ['25%','35%'],
						center: ['75%','50%'],
						data:data.data2.value
					}
				]
			};
		option = $.extend(true,{},option,noption);
		chart.setOption(option,true);
	};
	$.fn.dcircle = function(options){
		var data={
			quota:50000,
			value:4806
		};
		var color=['#6DD900','#6DD900','#6DD900','#FFD24D','#FFD24D','#FFD24D','#FF9326','#FF9326','#FF9326','#FF4000'];
		var split=10,noption;
		var basedata=[];
		if(options){
			if(options.data){
				data = options.data;
			}
			if(options.option){
				noption = options.option;
			}
		}
		var dan = Math.ceil(data.value/(data.quota/split));
		for(i=0;i<split;i++){
			if(i<dan){
				basedata.push({
					value:data.quota/split,
					itemStyle: {
						normal: {
							color:color[i],
						},
						emphasis: {
							color:color[i]
						}
					}
				});
			}else{
				basedata.push({
					value:data.quota/split,
					itemStyle: {
						normal: {
							color:'#EEEEEE',
						}
					}
				});
			}
		}
		var chart = echarts.init(this[0]);
		var option = {
			title : {
				show:false
			},
			tooltip : {
				show:false
			},
			legend: {
				show:false
			},
			calculable :false,
			series : [
				{
					name:'',
					type:'pie',
					hoverAnimation:false,
					itemStyle: {
						normal: {
							color:'#EEEEEE',
							borderColor: '#fff',
							borderWidth: 2,
							label:{
								show:false
							},
							labelLine:{
								show:false
							}
						},
						emphasis: {
							color:'#EEEEEE',
							label:{
								show:false
							}
						}
					},
					radius : ['40%','55%'],
					center: ['50%','50%'],
					data:basedata
				}
			]
		};
		option = $.extend(true,option,noption);
		chart.setOption(option,true);
	};
	
	$.fn.multiseriateBar = function(options){
		var data={
			title:'YARN Memory',
			legendData:['分类一','分类二','分类三','分类四','分类五','分类六','分类七','分类八'],
			xAxisData:['站点一','站点二','站点三','站点四','站点五','站点六'],
			data:[
				{
					value:[Math.round(Math.random()*100),Math.round(Math.random()*100),Math.round(Math.random()*100),Math.round(Math.random()*100),Math.round(Math.random()*100),Math.round(Math.random()*100)], name:'分类一'
				},
				{
					value:[Math.round(Math.random()*100),Math.round(Math.random()*100),Math.round(Math.random()*100),Math.round(Math.random()*100),Math.round(Math.random()*100),Math.round(Math.random()*100)], name:'分类二'
				}
			]
		};
		var noption;
		if(options){
			if(options.data){
				data = options.data;
			}
			if(options.option){
				noption = options.option;
			}
		}
		var sery=[];
		for(var i=0; i<data.data.length; i++){
			sery.push(
				{
					name: data.data[i].name,
					barCategoryGap:'50%',
					type: 'bar',
					data: data.data[i].value
				}
			);
		}
		console.log(sery);
		var chart = echarts.init(this[0]);
		option = {
			title : {
				show:true,
				x:'center',
				y:20,
				text:data.title,
				textStyle:{
					fontSize: 26,
					fontWeight: 'bolder',
					color: '#00468C'
				}
			},
			tooltip: {
				trigger: 'item',
				formatter:'{b}年<br>{c}%'
			},
			legend: {
				show:data.legendShow,
				x: 'right',
				data:data.legendData
			},
			calculable : false,
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				top:90,
				containLabel: true
			},
			xAxis : [
				{
					name:'',
					nameTextStyle:{
						color:'#000'
					},
					position:'top',
					type : 'category',
					axisLine: {show:false},
					axisTick: {show:false},
					axisLabel: {
						interval:0,
						clickable:true,
						textStyle:{
							color:'rgba(0,0,0,0)'
						}
					},
					splitArea: {show:false},
					splitLine: {show:false},
					data : data.xAxisData
				},
				{
					type : 'category',
					position:'bottom',
					axisLine: {show:false},
					axisTick: {show:false},
					axisLabel: {
						interval:0,
						clickable:true,
						textStyle:{
							color:'#3087a5'
						}
					},
					splitArea: {show:false},
					splitLine: {show:false},
					data :['产值','投资','税收']
				}
			],
			yAxis : [
				{
					name:'',
					nameTextStyle:{
						color:'#999'
					},
					axisLabel: {
						interval:0,
						clickable:true,
						textStyle:{
							color:'#999'
						}
					},
					axisLine: {
						lineStyle:{
							color:'#e4e4e4'
						}
					},
					splitLine: {
						lineStyle:{
							color:'#e4e4e4'
						}
					},
					type : 'value'
				}
			],
			series: sery
		};
		chart.setOption(option,true);
	};
	
	
	$.fn.barLines = function(options){
		var data={
			title:'Menmory Usage',
			barname:'今年',
			linename:'去年',
			legendData:['今年','去年'],
			xAxisData:[1,2,3,4,5,6,7,8,9,10,11,12],
			yAxisMax:150,
			bardata:[
				Math.round(Math.random()*100),Math.round(Math.random()*100),Math.round(Math.random()*100),Math.round(Math.random()*100)
				,Math.round(Math.random()*100),Math.round(Math.random()*100),Math.round(Math.random()*100),Math.round(Math.random()*100)
				,Math.round(Math.random()*100),Math.round(Math.random()*100),Math.round(Math.random()*100),Math.round(Math.random()*100)
			],
			linedata:[
				Math.round(Math.random()*100),Math.round(Math.random()*100),Math.round(Math.random()*100),Math.round(Math.random()*100)
				,Math.round(Math.random()*100),Math.round(Math.random()*100),Math.round(Math.random()*100),Math.round(Math.random()*100)
				,Math.round(Math.random()*100),Math.round(Math.random()*100),Math.round(Math.random()*100),Math.round(Math.random()*100)
			]
		};
		var noption;
		if(options){
			if(options.data){
				data = options.data;
			}
			if(options.option){
				noption = options.option;
			}
		}
		var chart = echarts.init(this[0]);
		option = {
			color: ['#018DC9','#11B8FE'],
			title : {
				show:true,
				x:'center',
				y:20,
				text:data.title,
				textStyle:{
					fontSize: 26,
					fontWeight: 'bolder',
					color: '#00468C'
				}
			},
			tooltip : {
				trigger: 'item',
				backgroundColor:'#fff',
				axisPointer : {            // 坐标轴指示器，坐标轴触发有效
					type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
				},
				formatter: function(parms){
					var res = '<div class="tipbox"><div class="m-name" style="float:left; color:#666666">'+data.title+'<br>次数</div><div class="m-value" style="float:right; color:#111111">'+parms.value+'</div></div>';
					return res;
				}
			},
			legend:{
				show:false,
				left:120,
				top:16,
				textStyle:{
					color:'#1E669D'
				},
				data:data.legendData
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				top:90,
				containLabel: true
			},
			xAxis : [
				{
					type : 'category',
					data : data.xAxisData,
					axisLine: {
						lineStyle:{
							color:'rgba(30,102,157,1)'
						}
					},
					axisTick: {show:false},
					axisLabel: {
						interval:0,
						clickable:true,
						textStyle:{
							color:'rgba(30,102,157,1)'
						}
					},
					splitArea: {show:false},
					splitLine: {show:false}
				}
			],
			yAxis : [
				{
					type : 'value',
					name:'',
					max:data.yAxisMax,
					axisLine: {
						lineStyle:{
							color:'rgba(30,102,157,1)'
						}
					},
					axisTick: {show:false},
					axisLabel: {
						interval:0,
						clickable:false,
						textStyle:{
							color:'rgba(30,102,157,1)'
						}
					},
					splitArea: {show:false},
					splitLine: {
						lineStyle:{
							color:'rgba(5,35,63,1)'
						}
					},
				}
			],
			series : [
				{
					name:data.linename,
					type:'line',
					symbolSize:6,
					z:13,
					barWidth: '60%',
					data:data.linedata
				},
				{
					name:data.barname,
					type:'bar',
					z:2,
					barWidth: '60%',
					data:data.bardata
				}
			]
		};
		option = $.extend(true,{},option,noption);
		chart.setOption(option,true);
	};
	
	$.fn.topstripe = function(options){
		var data = {
			title:"任务进程",
			yAxisData:["任务1","任务2","任务3","任务4"],
			xAxisMax:100,
			name:"任务进程",
			data:[27,35,48,46]
		}
		var option;
		var series = [];
		var legenddata = [];
		var noption;
		if(options){
			if(options.data){
				data = options.data;
			}
			if(options.option){
				noption = options.option;
			}
		}
		var chart = echarts.init(this[0]);
		option = {
			title: {
				show:true,
				x:'center',
				y:20,
				text:data.title,
				textStyle:{
					fontSize: 26,
					fontWeight: 'bolder',
					color: '#00468C'
				}
			},
			tooltip : {
				trigger: 'item',
				backgroundColor:'#fff',
				axisPointer : { 
					type : 'shadow'
				},
				textStyle: {
					color: '#666',
				},
				formatter:'{b}：{c}%'
			},
			calculable : false,
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				top:90,
				containLabel: true
			},
			xAxis : [
				{
					type : 'value',
					axisTick:false,
					position:'top',
					splitLine:false,
					max:data.xAxisMax,
					axisLine:{
						lineStyle:{
							color:'rgba(45,76,99,1)'
						}
					},
					axisLabel:{
						textStyle:{
							color:'#6188a8',
							fontFamily:'arial'
						}
					}
				}
			],
			yAxis : [
				{
					type : 'category',
					data : data.yAxisData,
					axisTick:false,
					axisLine:{
						lineStyle:{
							color:'rgba(45,76,99,1)'
						}
					},
					splitLine:false,
					axisLabel:{
						textStyle:{
							color:'#1E669D',
							fontFamily:'Arial'
						}
					}
				}
			],
			series : [
				{
					name:data.name,
					type:'bar',
					data:data.data,
					barCategoryGap:'50%',
					label: {
						normal: {
							show: true, 
							formatter :'{c} ',
							position: 'right'
						}
					 }
				}
			]
		};
		option = $.extend(true,{},option,noption);
		chart.setOption(option,true);
	};
	$.fn.dbarLine = function(options){
		var data={
			title:'Menmory Usage',
			legendData:['景区内','景区外','去年景区内','去年景区外'],
			xAxisData:[1,2,3,4,5,6,7,8,9,10,11,12],
			yAxisMax:150,
			data:[
				{
					name:'景区内',
					type:'bar',
					value:[
						Math.round(Math.random()*100),Math.round(Math.random()*100),Math.round(Math.random()*100),Math.round(Math.random()*100),
						Math.round(Math.random()*100),Math.round(Math.random()*100),Math.round(Math.random()*100),Math.round(Math.random()*100),
						Math.round(Math.random()*100),Math.round(Math.random()*100),Math.round(Math.random()*100),Math.round(Math.random()*100)
					]
				},
				{
					name:'景区外',
					type:'bar',
					value:[
						Math.round(Math.random()*100),Math.round(Math.random()*100),Math.round(Math.random()*100),Math.round(Math.random()*100),
						Math.round(Math.random()*100),Math.round(Math.random()*100),Math.round(Math.random()*100),Math.round(Math.random()*100),
						Math.round(Math.random()*100),Math.round(Math.random()*100),Math.round(Math.random()*100),Math.round(Math.random()*100)
					]
				},
				{
					name:'去年景区内',
					type:'line',
					value:[
						Math.round(Math.random()*100),Math.round(Math.random()*100),Math.round(Math.random()*100),Math.round(Math.random()*100),
						Math.round(Math.random()*100),Math.round(Math.random()*100),Math.round(Math.random()*100),Math.round(Math.random()*100),
						Math.round(Math.random()*100),Math.round(Math.random()*100),Math.round(Math.random()*100),Math.round(Math.random()*100)
					]
				},
				{
					name:'去年景区外',
					type:'line',
					value:[
						Math.round(Math.random()*100),Math.round(Math.random()*100),Math.round(Math.random()*100),Math.round(Math.random()*100),
						Math.round(Math.random()*100),Math.round(Math.random()*100),Math.round(Math.random()*100),Math.round(Math.random()*100),
						Math.round(Math.random()*100),Math.round(Math.random()*100),Math.round(Math.random()*100),Math.round(Math.random()*100)
					]
				}
			]
		};
		var noption,sery = [];
		if(options){
			if(options.data){
				data = options.data;
			}
			if(options.option){
				noption = options.option;
			}
		}
		for(i=0;i<data.data.length;i++){
			sery.push({
				name:data.data[i].name,
				type:data.data[i].type,
				//z:2,
				//barWidth: '60%',
				data:data.data[i].value
			});
		}
		var chart = echarts.init(this[0]);
		option = {
			color: ['#018DC9','#11B8FE'],
			title : {
				show:true,
				x:'center',
				y:20,
				text:data.title,
				textStyle:{
					fontSize: 26,
					fontWeight: 'bolder',
					color: '#00468C'
				}
			},
			tooltip : {
				trigger: 'item',
				//backgroundColor:'#fff',
				axisPointer : {            // 坐标轴指示器，坐标轴触发有效
					type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
				},
				formatter:'{a}：{c}'
			},
			legend:{
				show:false,
				left:120,
				top:16,
				textStyle:{
					color:'#1E669D'
				},
				data:data.legendData
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				top:90,
				containLabel: true
			},
			xAxis : [
				{
					type : 'category',
					data : data.xAxisData,
					axisLine: {
						lineStyle:{
							color:'rgba(30,102,157,1)'
						}
					},
					axisTick: {show:false},
					axisLabel: {
						interval:0,
						clickable:true,
						textStyle:{
							color:'rgba(30,102,157,1)'
						}
					},
					splitArea: {show:false},
					splitLine: {show:false}
				}
			],
			yAxis : [
				{
					type : 'value',
					name:'',
					max:data.yAxisMax,
					axisLine: {
						lineStyle:{
							color:'rgba(30,102,157,1)'
						}
					},
					axisTick: {show:false},
					axisLabel: {
						interval:0,
						clickable:false,
						textStyle:{
							color:'rgba(30,102,157,1)'
						}
					},
					splitArea: {show:false},
					splitLine: {
						lineStyle:{
							color:'rgba(5,35,63,1)'
						}
					},
				}
			],
			series : sery
		};
		option = $.extend(true,{},option,noption);
		chart.setOption(option,true);
	};
	$.fn.barLine = function(options){
		var data={
			title:'Menmory Usage',
			legendData:['景区内','景区外','去年景区内','去年景区外'],
			xAxisData:[1,2,3,4,5,6,7,8,9,10,11,12],
			data:[
				{
					name:'景区内',
					type:'bar',
					value:[
						Math.round(Math.random()*100),Math.round(Math.random()*100),Math.round(Math.random()*100),Math.round(Math.random()*100),
						Math.round(Math.random()*100),Math.round(Math.random()*100),Math.round(Math.random()*100),Math.round(Math.random()*100),
						Math.round(Math.random()*100),Math.round(Math.random()*100),Math.round(Math.random()*100),Math.round(Math.random()*100)
					]
				},
				{
					name:'去年景区内',
					type:'line',
					value:[
						Math.round(Math.random()*100),Math.round(Math.random()*100),Math.round(Math.random()*100),Math.round(Math.random()*100),
						Math.round(Math.random()*100),Math.round(Math.random()*100),Math.round(Math.random()*100),Math.round(Math.random()*100),
						Math.round(Math.random()*100),Math.round(Math.random()*100),Math.round(Math.random()*100),Math.round(Math.random()*100)
					]
				}
			]
		};
		var noption,sery = [];
		if(options){
			if(options.data){
				data = options.data;
			}
			if(options.option){
				noption = options.option;
			}
		}
		for(i=0;i<data.data.length;i++){
			sery.push({
				name:data.data[i].name,
				type:data.data[i].type,
				data:data.data[i].value
			});
		}
		var chart = echarts.init(this[0]);
		option = {
			color: ['#018DC9','#11B8FE'],
			title : {
				show:true,
				x:90,
				y:18,
				text:data.title,
				textStyle:{
					fontSize: 14,
					fontWeight: 'normal',
					color: '#5867C3'
				}
			},
			tooltip : {
				trigger: 'axis',
				backgroundColor:'rgba(0,0,0,0.4)',
				axisPointer : {
					type : 'shadow'
				},
				padding:[5,10,5,10],
				formatter:'{b}<br>{a}：{c}'
			},
			legend:{
				show:true,
				top:18,
				textStyle:{
					color:'#999999'
				},
				data:data.legendData
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				top:90,
				containLabel: true
			},
			xAxis : [
				{
					type : 'category',
					data : data.xAxisData,
					axisLine: {
						lineStyle:{
							color:'#CCCCCC'
						}
					},
					axisTick: {show:false},
					axisLabel: {
						interval:0,
						clickable:true,
						textStyle:{
							color:'#333333'
						}
					},
					splitArea: {show:false},
					splitLine: {show:false}
				}
			],
			yAxis : [
				{
					type : 'value',
					name:'',
					nameTextStyle: {
						color: '#999999'
					},
					axisLine: {
						lineStyle:{
							color:'#CCCCCC'
						}
					},
					axisTick: {show:false},
					axisLabel: {
						interval:0,
						clickable:false,
						textStyle:{
							color:'#333333'
						}
					},
					splitArea: {show:false},
					splitLine: {
						lineStyle:{
							color:'#EBEBEB'
						}
					},
				}
			],
			series : sery
		};
		option = $.extend(true,{},option,noption);
		chart.setOption(option,true);
	};
	
	//
	$.fn.moregauge = function(options){
		var data = {
			name :'使用率',
			data : [
				[{value: 40, name: 'CPU'}],
				[{value: 40, name: '内存'}],
				[{value: 40, name: '磁盘存储'}]
			]
		};
		var noption,sery = [];
		if(options){
			if(options.data){
				data = options.data;
			}
			if(options.option){
				noption = options.option;
			}
		}
		var centers = 100/(data.data.length+1);
		for(i=0;i<data.data.length;i++){
			var l = centers*(i+1);
			l = l.toString()+'%';
			sery.push(
			{
				name:data.name,
				type:'gauge',
				min:0,
				max:100,
				splitNumber:10,
				radius: '50%',
				center : [l, '50%'],
				axisLine: {            // 坐标轴线
					lineStyle: {       // 属性lineStyle控制线条样式
						color: [[0.09, 'lime'],[0.82, '#1e90ff'],[1, '#ff4500']],
						width: 3,
						shadowColor : '#fff', //默认透明
						shadowBlur: 10
					}
				},
				axisLabel: {            // 坐标轴小标记
					textStyle: {       // 属性lineStyle控制线条样式
						fontWeight: 'bolder',
						color: '#000',
						shadowColor : '#fff', //默认透明
						shadowBlur: 10
					}
				},
				axisTick: {            // 坐标轴小标记
					length :15,        // 属性length控制线长
					lineStyle: {       // 属性lineStyle控制线条样式
						color: 'auto',
						shadowColor : '#fff', //默认透明
						shadowBlur: 10
					}
				},
				splitLine: {           // 分隔线
					length :25,         // 属性length控制线长
					lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
						width:3,
						color: '#fff',
						shadowColor : '#fff', //默认透明
						shadowBlur: 10
					}
				},
				pointer: {           // 分隔线
					shadowColor : '#fff', //默认透明
					shadowBlur: 5
				},

				title : {
					offsetCenter:[0,'120%'],
					textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
						fontSize: 30,
						//fontStyle: 'italic',
						color: '#000',
						shadowColor : '#fff', //默认透明
						shadowBlur: 10
					}
				},
				detail : {
					shadowBlur: 5,
					offsetCenter: [0, '40%'],       // x, y，单位px
					textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
						fontSize: 20,
						color: '#000'
					},
					formatter:function(value){
						return value.toFixed(0)+'%'
					}
				},
				data:data.data[i]
			})
		}
		var chart = echarts.init(this[0]);
		option = {
			tooltip : {
				formatter: "{b}{a} <br/>{c}%"
			},
			series : sery
		};
		option = $.extend(true,{},option,noption);
		chart.setOption(option,true);
		setInterval(function (){
			option.series[0].data[0].value = (Math.random()*100).toFixed(2) - 0;
			option.series[1].data[0].value = (Math.random()*100).toFixed(2) - 0;
			option.series[2].data[0].value = (Math.random()*100).toFixed(2) - 0;
			chart.setOption(option);
		},2000)
	}
	
	$.fn.zdmap = function(options){
		var data = {
			legendData:['企业诉求'],
			name:'企业诉求',
			dataMin:0,
			dataMax:1000,
			data : [
				{name: '金堂县',value: Math.round(Math.random()*100)},
				{name: '青白江区',value: Math.round(Math.random()*100)},
				{name: '新都区',value: Math.round(Math.random()*100)},
				{name: '彭州市',value: Math.round(Math.random()*100)},
				{name: '都江堰市',value: Math.round(Math.random()*100)},
				{name: '郫县',value: Math.round(Math.random()*100)},
				{name: '金牛区',value: Math.round(Math.random()*100)},
				{name: '成华区',value: Math.round(Math.random()*100)},
				{name: '龙泉驿区',value: Math.round(Math.random()*100)},
				{name: '锦江区',value: Math.round(Math.random()*100)},
				{name: '武侯区',value: Math.round(Math.random()*100)},
				{name: '青羊区',value: Math.round(Math.random()*100)},
				{name: '温江区',value: Math.round(Math.random()*100)},
				{name: '双流区',value: Math.round(Math.random()*100)},
				{name: '新津县',value: Math.round(Math.random()*100)},
				{name: '崇州市',value: Math.round(Math.random()*100)},
				{name: '大邑县',value: Math.round(Math.random()*100)},
				{name: '邛崃市',value: Math.round(Math.random()*100)},
				{name: '蒲江县',value: Math.round(Math.random()*100)},
				{name: '天府新区',value: Math.round(Math.random()*100)},
				{name: '高新区',value: Math.round(Math.random()*100)}
			],
			mapUrl : '/andyui/admin/js/map/chengdushi.json',
		};
		var noption;
		var chart = echarts.init(this[0]);
		if(options){
			if(options.data){
				data = options.data;
			}
			if(options.option){
				noption = options.option;
			}
		}
		$.get(data.mapUrl, function (mapjson) {
			echarts.registerMap('mymap', mapjson);
			/*var features = mapjson.features;
			var array = [];
			for(i=0;i<features.length;i++){
				array.push(features[i].properties.name);
			}
			console.log(array);*/
			option = {
				title : {
					show:true,
					text: data.title,
					x:'center',
					y:10,
					textStyle:{
						fontSize: 22,
						fontWeight: 'bolder',
						color: '#333'
					}
				},
				tooltip : {
					trigger: 'item'
				},
				legend: {
					orient: 'vertical',
					x:-100,
					data:data.legendData
				},
				visualMap: {
					min: data.dataMin,
					max: data.dataMax,
					left: 'right',
					color:['#18a3de','#ebf763','#f57874'],
					top: 'bottom',
					text: ['高','低'],           // 文本，默认为数值文本
					calculable: true
				},
				roamController: {
					show: true,
					x: 'right',
					mapTypeControl: {
						'MAP': true
					}
				},
				series : [
					{
						name: data.name,
						type: 'map',
            			map: 'mymap',
						roam: false,
						mapLocation:{
							x:'center',
							y:'13%',
							height:'85%'
						},
						tooltip: {
							trigger: 'item',
							padding:0
						},
						
						itemStyle:{
							normal:{
								borderWidth:0,
								borderColor:'rgba(0,0,0,0.1)',
								label:{
									show:true,
									textStyle: {
									   color: "#303244"
									}
								}
							},
							emphasis:{color:'rgba(255,255,255,0.76)',label:{show:true}}
						},
						data:data.data
					}
				]
			};
			option = $.extend(true,{},option,noption);
			chart.setOption(option,true);
			if(options.calbacks){
				chart.on('click', function (parmas) {
					options.calbacks(parmas.name);
				});
			}
		});
	};
})($);