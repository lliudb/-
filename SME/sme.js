;(function($WIN,$){

	var getMousePos = function(e){

		return {x:1,y:2};
	}

	//状态表
	var STATUS = {
		"DRAWING":{desc:"绘制中...",val:1,},
		"EDITING":{desc:"编辑中...",val:2},
		"SAVING":{desc:"正在保存...",val:3,},
		"SUCES":{desc:"成功",val:4},
		"ERROR":{desc:"错误",val:5},
		"WAIT":{desc:"等待",val:6},
		"STAY":{desc:"停留",val:7},
	}

	//选择器数据
	var SmeSelector = {
		"point":{item:{"village":{type:1,bg:""},"castle":{type:2,bg:""},"altar":{type:3,bg:""},"wreckage":{type:4,bg:""}}},
		"line":{item:{"river":{type:5,bg:""},"mountRange":{type:6,bg:""}}},
		"block":{item:{"mount":{type:7,bg:""},"lake":{type:8,bg:""},"city":{type:9,bg:""},"forest":{type:10,bg:""},"stones":{type:11,bg:""}}}
	}

	var SME = function(content,config){
		var that = this;
		that.__cont = document.getElementById(content);
		that.config = {
			version:"0.1.0",
			content_w:that.__cont.clientWidth,
			content_h:that.__cont.clientHeight,
			frames:config.frames,
		};
		//地图数据类型
		that.mapData = [];
		//块状区域
		var addBlockLandforms = function(name,type,conf){
			var o = {
				zindex:that.mapData.length,
				name:name,
				type:type,
				points:[[0,2],[2,3],[3,5]],
				shape:"block",
			}
			if(type == "mount"){//山类型 
			
			}else if(type=="lake"){//湖类型

			}else if(type=="city"){//城市类型

			}else if(type=="forest"){//城堡类型
				
			}else if(type=="stones"){//石林类型

			}else{
				return ;
			}
		}

		//点状区域
		var addPointLandForms = function(name,type,conf){
	 		var o = {
				zindex:that.mapData.length,
				name:name,
				type:type,
				center:{x:2,y:3},
				radius:12,
				shape:"point",
			} 
	 		if(type=="village"){//村庄类型

			}else if(type=="castle"){//城堡类型
				
			}else if(type=="altar"){//祭坛类型
				
			}else if(type=="wreckage"){//残骸类型
				
			}else{
				return ;
			}
		}

		/**
		 * 生成线状区域对象
		 */
		var addLineLandForms = function(name,type,conf){
	 		var o = {
				zindex:that.mapData.length,
				name:name,
				type:type,
				start:{x:9,y:0},
				end:{x:0,y:0},
				points:[[0,2],[2,3],[3,5]],
				shape:"line",
			} 
	 		if(type=="river"){//长河类型

			}else if(type=="mountRange"){//山脉类型
				
			}else{
				return ;
			}
		}

 		that.init = function(){
 			that.__canvas = document.getElementById("SmeCanvas");
 			that.__context = that.__canvas.getContext("2d");
 			that.__canvas.width = that.config.content_w;
			that.__canvas.height = that.config.content_h;
			//加载基本的操作界面
			//loadBasicPanel();

			//渲染绘图区域
			// startRender();
 			return that;
 		}
 		
 		/**
 		 * 开启帧刷新
 		 */
 		var startRender = function(){
 			that.frameRender = undefined;
 			that.frameRender = setInterval(function(){
 				that.render(that.__context);
 			},1000/that.config.frames);
 		}

 		/**
 		 * 关闭帧刷新
 		 */
 		var stopRender = function(){
 			clearInterval(that.frameRender);
 			console.log("已关闭帧刷新");
 		}

 		/**
 		 * 单帧渲染操作，根据当前
 		 */
 		that.render = function(cxt){
 			// var cxt = that.__context;
 			//根据当前数据渲染绘制界面
 			for(data in that.mapData){
 				if(data.shape == "point"){
 					drawPointLandForms(data);
 				}else if(data.shape == "line"){
 					drawLineLandForms(data);
 				}else if(data.shape == "block"){
 					drawBlockLandForms(data);
 				}
 			}
 		}

 		/**
 		 * 绘制点类型区域
 		 */
 		var drawPointLandForms = function(obj){}

 		/**
 		 * 绘制线型类型区域
 		 */
 		var drawLineLandForms = function(obj){}

 		/**
 		 * 绘制块类型区域
 		 */
 		var drawBlockLandForms = function(obj){}
 
 		/**
 		 * 调节缩放尺寸
 		 */
 		var sacleCanvas = function(cxt,size){}

 		/**
 		 * 重置画布尺寸
 		 */
 		var resizeCanvas = function(w,h){}

 		/**
 		 * 将位置调整到指定的位置，并重新排序
 		 */
 		var relistIndex = function(idx,now){}

		return that;
	}


	$WIN.SME = SME;

})(window,$)