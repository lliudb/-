;(function($WIN,$){

	var getMousePos = function(e){
		if (!e) e = window.event;  
	    if (e.pageX || e.pageY) {  
	        return { x: e.pageX, y: e.pageY };  
	    }  
	    return {  
	        x: e.clientX + document.documentElement.scrollLeft - document.body.clientLeft,  
	        y: e.clientY + document.documentElement.scrollTop - document.body.clientTop  
	    };  
	}

	var SME_TEMPLATE = {
		"EIDTER":{
			"village":"<div></div>",
		},
	}

	//状态表
	var STATUS = {
		"CURR_STATUS":{desc:"无操作",k:"IDLE",v:0},
		"DRAWING":{desc:"绘制中...",v:1,k:"DRAWING"},
		"EDITING":{desc:"编辑中...",v:2,k:"EDITING"},
		"SAVING":{desc:"正在保存...",v:3,k:"SAVING"},
		"SELECTING":{desc:"正在选择...",v:4,k:"SELECTING"},
		"IDLE":{desc:"无操作",v:0,k:"IDLE"},
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
			//startRender();
			//加载驱动事件
			//loadEventDrivers();
 			return that;
 		}
 		
 		/**
 		 * 开启帧刷新
 		 */
 		var startRender = function(){
 			that.frameRender = undefined;
 			that.frameRender = setInterval(function(){
 				that.render();
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
 		 * 清空画布方法
 		 */
 		var clearCanvas = function(){
 			that.__context.clearRect(0,0,that.__canvas.width,that.__canvas.height);
 		}

 		/**
 		 * 单帧渲染地图原件
 		 */
 		that.render = function(){
 			//清空当前画布内容
 			clearCanvas();

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
 		var relistIndex = function(idx,oidx){
 			var new_idx = that.mapData[idx].zindex;
 			for(var i = idx ; i < that.mapData.length; i++){
 				that.mapData[i].zindex++;
 			}
 			//将当前zindex设置成
 			that.mapData[oidx].zindex = new_idx;
 			//对当前数据进行排序
 			that.mapData.sort(function(a,b){
 				return a.zindex > b.zindex;
 			});
 		}

        /**
         * 参数 will指跳转状态码或字段,turn不传默认跳转
         * 状态切换检查,状态切换允许则默认不跳转
         * 返回检查结果true/false
         */
        var changeCurrStatus2Next = function(will,turn){
        	var flag = false , willName = "";
        	turn = turn==null?true:false;
        	switch(STATUS.CURR_STATUS.k) {
        		case "IDLE":
        			if(will == STATUS["SELECTING"].v || will == STATUS["SELECTING"].k ){
        				willName = "SELECTING" , flag = true;
        			}else if(will == STATUS["DRAWING"].v || will == STATUS["DRAWING"].k ){
        				willName = "DRAWING" , flag = true;
        			}
        			break;
        		case "DRAWING":
        			break;
        		case "EDITING":
        			break;
        		case "SAVING":
        			break;
        		case "SELECTING":
        			break;
        	}
        	if(flag && turn){//如果跳转成功，则
        		STATUS["CURR_STATUS"] = STATUS[willName];
        	}
        	return flag;
        }
        

        /**
         * 根据当前状态加载不同界面
         */
        var loadStatusPanel = function(){
        	switch(STATUS.CURR_STATUS.k) {
        		case "IDLE":
        			// doNothing();
        			break;
        		case "DRAWING":
        			// doDraw();
        			break;
        		case "EDITING":
        			// doEdit();
        			break;
        		case "SAVING":
        			// doSave();
        			break;
        		case "SELECTING":
        			// doSelect();
        			break;
        	}
        }



        //返回上下文信息
		return that;
	}


	$WIN.SME = SME;

})(window,$)