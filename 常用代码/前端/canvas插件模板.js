;(function($WIN,$){


	var SME_TEMPLATE = {
		"EIDTER":{
			"village":"<div></div>",
		},
	}
	
	var STATUS = {
		"CURR_STATUS":{desc:"无操作",k:"DRAWING",v:0},
		"DRAWING":{desc:"绘制中...",v:1,k:"DRAWING"},
		"EDITING":{desc:"编辑中...",v:2,k:"EDITING"},
		"SAVING":{desc:"正在保存...",v:3,k:"SAVING"},
		"SELECTING":{desc:"正在选择...",v:4,k:"SELECTING",cursor:"move"},
		"MOVING":{desc:"画布移动中...",v:5,k:"MOVING",cursor:"move"},
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
			frames:config.frames|| 60,
			offsetLeft:-150,//当前画布对容器最左相对偏移量
			offsetTop:-20,//当前画布对容器最顶相对偏移量
			canvas_w:config.can_w || 1200,
			canvas_h:config.can_h || 600,
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

		/**
		 * 初始化所有组件信息
		 */ 
 		that.init = function(){
 			that.__canvas = document.getElementById("SmeCanvas");
 			that.__context = that.__canvas.getContext("2d");
 			that.__canvas.width = that.config.canvas_w;
			that.__canvas.height = that.config.canvas_h;
			that.__canvas.style.left = that.config.offsetLeft+"px";
			that.__canvas.style.top = that.config.offsetTop+"px";
			//加载基本的操作界面
			//loadBasicPanel();
			//渲染绘图区域
			// startRender();
			//加载驱动事件
			loadEventDrivers();
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
 			that.__context.clearRect(0,0,that.config.canvas_w,that.config.canvas_h);
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
        			if(will == STATUS["EDITING"].v || will == STATUS["EDITING"].k ){
        				willName = "EDITING" , flag = true;
        			}else if(will == STATUS["SAVING"].v || will == STATUS["SAVING"].k ){
        				willName = "SAVING" , flag = true;
        			}
        			break;
        		case "EDITING":
        			if(will == STATUS["SAVING"].v || will == STATUS["SAVING"].k ){
        				willName = "SAVING" , flag = true;
        			}
        			break;
        		case "SELECTING":
        			if(will == STATUS["EDITING"].v || will == STATUS["EDITING"].k ){
        				willName = "EDITING" , flag = true;
        			}else if(will == STATUS["SAVING"].v || will == STATUS["SAVING"].k ){
        				willName = "SAVING" , flag = true;
        			}
        			break;
        		case "MOVING":
        	}
        	if(flag && turn){//如果判定成功则转换当前状态
        		STATUS["CURR_STATUS"] = STATUS[willName];
        	}
        	return flag;
        }
        

        /**
         * 绘制编辑点
         */
        var drawEditPoint = function(x,y,r){
        	that.__context.beginPath();
			that.__context.arc(x, y, r,0, Math.PI * 2, true);
			that.__context.closePath();
			that.__context.fillStyle = 'rgba(255, 0, 0, 0.45)';
			that.__context.fill();
        }

        /**
         * 根据当前状态加载不同界面
         */
        var doSomethingOnSomeStatus = function(eve){
    		var pos = getMousePos(eve);
    		var offset = getElementOffset(that.__canvas);
    		var currStatus = STATUS.CURR_STATUS.k;
    		// console.log(pos.x-offset.x,pos.y-offset.y);
        	if(eve.type == "mousemove"){
        		if(STATUS.CURR_STATUS.k == "DRAWING"){
        			
        		}else if(STATUS.CURR_STATUS.k == "MOVING"){

        		}else if(STATUS.CURR_STATUS.k == "SELECTING"){

        		}
        	}else if(eve.type == "click"){
        		if(STATUS.CURR_STATUS.k == 'SELECTING'){
        			//检索当前是否有选中的图形，有的话就找到该图形进行编辑
        		}else if(STATUS.CURR_STATUS.k == 'DRAWING'){
        			//检查当前是否存在正在绘制的图形，无生成图形，有继续添加一个点,当点到最开始的点时结束
        			drawEditPoint(pos.x-offset.x,pos.y-offset.y,4);
        		}
        	}else if(eve.type == "dblClick"){
        		//暂无使用
        	}
        }

        /**
         * 事件和状态混驱动
         * @return null
         */
        var loadEventDrivers = function(){
        	//画布鼠标移动时间
        	that.__canvas.addEventListener("mousemove",function(ev){
        		doSomethingOnSomeStatus(ev);
        	});
        	//画布鼠标点击事件
			that.__canvas.addEventListener("click",function(ev){
				doSomethingOnSomeStatus(ev);
        	});
        	//画布鼠标双击事件
        	that.__canvas.addEventListener("dblClick",function(ev){
				doSomethingOnSomeStatus(ev);
        	});
        	//画布鼠标按下事件MouseDown
        	//MouseUp
        }




//////////////////////////////////////////////////////////////////////////////////////////
///
///                              *****以下为接口方法*****
///                                      
//////////////////////////////////////////////////////////////////////////////////////////

		/**
		 * 保存成图片
		 * @param  待定
		 * @return base64的图片,地图数据，uri资源定位
		 */
		that.saveAsImg = function(type){
			return {img:'',data:that.mapData,uri:''};
		}

		/**
		 * 设置地图数据
		 * @param {[type]} data [description]
		 */
		that.setMapData = function(data,idx) {
			if(idx){
				that.mapData[idx] = data;
			}else{
				that.mapData = data;
			}
		}

		/**
		 * 获取地图数据
		 * @return {[type]} [description]
		 */
		that.getMapData = function(idx){
			if (idx) {
				return that.mapData[idx];
			}
			return that.mapData;
		}

//////////////////////////////////////////////////////////////////////////////////////////
///
///                              *****以下为辅助函数*****
///                                      
//////////////////////////////////////////////////////////////////////////////////////////

		/**
		 * 获取鼠标相对于当前画布的位置
		 * @return {x,y}
		 */
		var getMousePos = function(event){
		    var e = event || window.event;
	        var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
	        var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
		    return {  
		        x:e.pageX || e.clientX + scrollX,  
		        y:e.pageY || e.clientY + scrollY
		    };  
		}
		/**
		 * 获取元素相距文档最左/最顶部距离
		 */
		var getElementOffset = function(element){
	　　　　var actualLeft = element.offsetLeft;
	　　　　var actualTop = element.offsetTop;
	　　　　var current = element.offsetParent;
	　　　　while (current !== null){
	　　　　　　actualLeft += current.offsetLeft;
	　　　　　　actualTop += current.offsetTop;
	　　　　　　current = current.offsetParent;
	　　　　}
	　　　　return {x:actualLeft,y:actualTop};
　　　　}

        //返回上下文信息
		return that;
	}


	$WIN.SME = SME;

})(window,$)