/****************************************************************************
 * 							位置信息获取
 ***************************************************************************/


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

/**
 * 获取鼠标在某元素中的相对位置
 */
var getMousePos2Ele(eve,ele){
	var pos = getMousePos(eve);
	var offset = getElementOffset(ele);
	return {x:pos.x-offset.x,y:pos.y-offset.y,4}
}





/****************************************************************************
 * 							时间信息格式化
 *对Date的扩展，将 Date 转化为指定格式的String * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q)
 *可以用 1-2 个占位符 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 *(new Date()).pattern("yyyy-MM-dd hh:mm:ss.S")==> 2006-07-02 08:09:04.423
 *(new Date()).pattern("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04
 *(new Date()).pattern("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04
 *(new Date()).pattern("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04
 *(new Date()).pattern("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18
 ***************************************************************************/

Date.prototype.format=function(fmt) {
    var o = {
    "M+" : this.getMonth()+1, //月份
    "d+" : this.getDate(), //日
    "h+" : this.getHours()%12 == 0 ? 12 : this.getHours()%12, //小时
    "H+" : this.getHours(), //小时
    "m+" : this.getMinutes(), //分
    "s+" : this.getSeconds(), //秒
    "q+" : Math.floor((this.getMonth()+3)/3), //季度
    "S" : this.getMilliseconds() //毫秒
    };
    var week = {
    "0" : "/u65e5",
    "1" : "/u4e00",
    "2" : "/u4e8c",
    "3" : "/u4e09",
    "4" : "/u56db",
    "5" : "/u4e94",
    "6" : "/u516d"
    };
    if(/(y+)/.test(fmt)){
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
    if(/(E+)/.test(fmt)){
        fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "/u661f/u671f" : "/u5468") : "")+week[this.getDay()+""]);
    }
    for(var k in o){
        if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }
    return fmt;
}


/**
 * JS版格式化时间位移量
 * 例如： 刚刚|24分钟前|1小时前|一天前
 */
Date.prototype.getOffset2Now = function(now){
    var diff=Date.parse(new Date()) - now;
    var obj={
            0:{t:'31536000',d:'年'},
            1:{t:'2592000',d:'个月'},
            2:{t:'604800',d:'周'},
            3:{t:'86400',d:'天'},
            4:{t:'3600',d:'小时'},
            5:{t:'60',d:'分钟'},
            6:{t:'1',d:'秒'}
        };
    for (prop in obj) {
        var count = Math.floor(diff/parseInt(obj[prop]['t']));
        console.log(count,prop,obj[prop],obj[prop]['d']);
        if (0 != count) {
            if(obj[prop]['d'] == '秒'){
                return '刚刚';
            }
            console.log(count,prop,obj[prop],obj[prop]['d']);
            return count+obj[prop]['d']+'前';
        }
    }
}
