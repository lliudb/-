;(function($WIN,$){

	// var opts = {
	// 	menu:[
	// 		{
	// 			ico:"ico-x",
	// 			text:"地貌",
	// 			sub:[{ico:"ico-x1",text:"山",type:1,},
	// 					{ico:"ico-x2",text:"川",type:2,},
	// 					{ico:"ico-x3",text:"城",type:3,}]
	// 		},
	// 	],
	// 	option:[
	// 		{ico:"ico-x",text:"保存",click:function(items,curr){return null;},},
	// 		{ico:"ico-x",text:"撤销",click:function(items,curr){return null;},},
	// 		{ico:"ico-x",text:"重绘",click:function(items,curr){return null;},},
	// 		{ico:"ico-x",text:"删除",click:function(items,curr){return null;},}
	// 	]
	// }

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
 			console.log(that)
 			that.__canvas.clientWidth = that.config.content_w;
			that.__canvas.clientHeight = that.config.content_h;
 			return that;
 		}
 
		return that;
	}


	$WIN.SME = SME;

})(window,$)