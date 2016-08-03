;(function($WIN,$){

	var getMousePos = function(e){

		return {x:1,y:2};
	}

	var mapData = {};
	//块状区域
	var regionLandforms = function(name,type,conf){
		var o = {
			zindex:mapData.length,
			name:name,
			type:type,
		}
		if(type == "mount"){//山类型 
		
		}else if(type=="lake"){//湖类型

		}else if(type=="village"){//村庄类型

		}else if(type=="city"){//城市类型

		}else if(type=="forest"){//城堡类型
			
		}else if(type=="stones"){//石林类型

		}
		return o;
	}

	//点状区域
	var pointLandForms = function(name,type,conf){
 		var o = {
			zindex:mapData.length,
			name:name,
			type:type,
		} 
 		if(type=="village"){//村庄类型

		}else if(type=="castle"){//城堡类型
			
		}else if(type=="altar"){//祭坛类型
			
		}else if(type=="wreckage"){//残骸类型
			
		}
		return o;
	}

	//线型区域
	var lineLandForms = function(name,type,conf){
 		var o = {
			zindex:mapData.length,
			name:name,
			type:type,
		} 
 		if(type=="river"){//长河类型

		}else if(type=="mountRange"){//山脉类型
			
		}else if(type=="altar"){//祭坛类型
			
		}else if(type=="wreckage"){//残骸类型
			
		}
		return o;
	}

	var SME = function(content,config){
		var that = this;
		that.__cont = document.getElementById(content);
		that.config = {
			version:"0.1.0",
			content_w:that.__cont.clientWidth,
			content_h:that.__cont.clientHeight,
		};
 			
 		that.init = function(){
 			that.__canvas = document.getElementById("SmeCanvas");
 			that.__context = that.__canvas.getContext("2d");
 			that.__canvas.width = that.config.content_w;
			that.__canvas.height = that.config.content_h;

			that.render();
 			return that;
 		}
 

 		that.render = function(){
 			var cxt = that.__context;
 			cxt.fillStyle = "#ccc";
			cxt.fillRect(20,20,150,100);
 		}

		return that;
	}


	$WIN.SME = SME;

})(window,$)