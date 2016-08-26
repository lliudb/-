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