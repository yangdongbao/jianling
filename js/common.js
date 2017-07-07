
function $id(id) {
    return document.getElementById(id);
}

/**
 *
 * @param element 要移动的元素
 * @param target 要移动到的位置
 */
function animate(element,target) {
    //1 先清除元素上已经存在的计时器
    clearInterval(element.timer);
    //设置每次移动的步长
    var step = 40;
    //重新设置定时器
    element.timer = setInterval(function(){
        //获取当前位置
        var currentLeft = element.offsetLeft;//offsetLeft看不懂就去看预习的讲义
        //判断方向，如果当前的位置在目标位置的左边，就是正方向，反之是负方向
        var temp = currentLeft < target ? step : - step;
        //计算新的的位置
        currentLeft += temp;
        //判断是否到达目标位置
        //当目标位置-当前位置的绝对值比步长要小的时候，我们认为到达目标位置了
        if (  Math.abs(target - currentLeft) <= Math.abs(step) ){
            //清除计时器
            clearInterval(element.timer);
            element.style.left = target + "px";
        }else {
            element.style.left = currentLeft + "px";
        }
    },20);
}



    var arrow  = document.getElementById("arrow")
    var box = $id("box");
    var inner = $id("inner");
    var ul = inner.children[0];
    var imgWidth = ul.children[0].offsetWidth;
    var list = inner.children[1].children;
    var leftBtn = inner.children[2].children[0];
    var rightBtn = inner.children[2].children[1];
    var currentIndex = 0;

    arrow.onmouseover = function(){
        arrow.style.display = "block";
    }
    arrow.onmouseout = function(){
        arrow.style.display = "none";
    }

    for(var i = 0; i < list.length ; i++){
        list[i].onmouseover = mouseOverHandle;
        list[i].index = i;
    }
    function mouseOverHandle(){

        var target = this.index * imgWidth * -1;
        currentIndex = this.index;
        animate(ul,target);
        for(var j = 0; j < list.length ; j++){
            list[j].removeAttribute("class");
        }
        this.className = "current";
    }

    rightBtn.onclick = moveRight;

    function moveRight(){
        if(currentIndex == ul.children.length - 1){
            currentIndex = 0;
            ul.style.left = 0;
        }
        currentIndex++;
        var target = currentIndex * imgWidth * -1;
        animate(ul,target);
        for(var j = 0; j < list.length ; j++){
            list[j].removeAttribute("class");
        }
        if(currentIndex == ul.children.length - 1){
            list[0].className = "current";
        }else{
            list[currentIndex].className = "current";
        }
    }

    leftBtn.onclick = function(){
        if(currentIndex == 0){
            currentIndex = ul.children.length -1;
            ul.style.left = imgWidth * currentIndex * -1 + "px";
        }
        currentIndex--;
        var target = currentIndex * imgWidth * -1;
        animate(ul,target);
    }

    box.timer = setInterval(moveRight,1500);

    box.onmouseover = function(){
        clearInterval(box.timer);
    }
    box.onmouseout = function(){
        box.timer = setInterval(moveRight,1500);
    }
