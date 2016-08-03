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

	//
	var SmeSelector = {
		"point":{item:{"village":{val:1,bg:""},"castle":2,"altar":3,"wreckage":4}},
		"line":{item:{"river":5,"mountRange":6}},
		"block":{item:{"mount":7,"lake":8,"city":9,"forest":10,"stones":11}}
	}

	var SME = function(content,config){
		var that = this;
		that.__cont = document.getElementById(content);
		that.config = {
			version:"0.1.0",
			content_w:that.__cont.clientWidth,
			content_h:that.__cont.clientHeight,
		};
		//地图数据类型
		that.mapData = {};
		//块状区域
		var regionLandforms = function(name,type,conf){
			var o = {
				zindex:that.mapData.length,
				name:name,
				type:type,
				points:[[0,2],[2,3],[3,5]],
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
		var pointLandForms = function(name,type,conf){
	 		var o = {
				zindex:that.mapData.length,
				name:name,
				type:type,
				center:{x:2,y:3},
				radius:12,
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
		var lineLandForms = function(name,type,conf){
	 		var o = {
				zindex:that.mapData.length,
				name:name,
				type:type,
				start:{x:9,y:0},
				end:{x:0,y:0},
				points:[[0,2],[2,3],[3,5]],
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

			that.render();
 			return that;
 		}
 
 		/**
 		 * 单帧渲染操作，根据当前
 		 */
 		that.render = function(){
 			var cxt = that.__context;
 			//根据当前数据渲染绘制界面
 		}

		return that;
	}


	$WIN.SME = SME;

})(window,$)