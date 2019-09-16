
var dots = document.querySelectorAll('.dottes span');
var con = document.getElementById('container');
var prev = document.getElementsByClassName('prev')[0];
var next = document.getElementsByClassName('next')[0];
var business = document.getElementsByClassName('business')[0];
var info = document.getElementsByClassName('new-information')[0];


var interval;

var num = 0;         //轮播图起始位置
var offsetX = 1534; //轮播图偏移
var pages = 5;      //轮播图页数

function showActiveDot() {  //active点移动;
    for (var i = 0; i < pages; i++) {
        if (dots && dots[i]) {
            dots[i].className = '';
            dots[num / -offsetX].className = 'active';
        }
    }
}

function Carousel() { //轮播函数
    num = num - offsetX;
    if (num < -offsetX * (pages - 1)) {
        return num = offsetX;
    }
    showActiveDot()
    con.style.left = num + 'px';
}

interval = setInterval(Carousel, 3000);

prev.onclick = function () {
    oprate(true);
}

next.onclick = function () {
    oprate(false);
}

function oprate(params) {
    clearInterval(interval);
    if (params) {
        num = num + offsetX;
        if (num > 0) num = -offsetX * (pages - 1);
    } else {
        num = num - offsetX;
        if (num < -offsetX * 4) num = 0;
    }

    showActiveDot();
    con.style.left = num + 'px';
    interval = setInterval(Carousel, 3000);
}


window.onscroll = function () {
    //检测鼠标滚轮距离顶部位置
    var top = document.documentElement.scrollTop || document.body.scrollTop;

    /**
    offsetHeight ==> div自身的高度 高度值包括:元素内容+内边距+边框
    offsetWidth  ==> div自身宽度  宽度值包括:元素内容+内边距+边框
    **/
    if (top > 400) {

        // business.style.left = '0';
        business.style.width = '100%';
        business.style.opacity = '1';
        // setTimeout(() => {
        //     business.style.opacity = '1';
        // }, 1000);


        //     // box.style.animation = "key .25s linear forwards" //添加动画  
        //     box.style.left = "500px" //添加动画  
        //     box.style.opacity = "1" //添加动画  
        //     // box.style.transform = "scale(1)" //添加动画  
        // }


        // if (top > (pic1.offsetTop - pic1.offsetHeight)) {
        //     console.log('12222223');

        //     pic1.style.opacity = "1" //添加动画  
        // }

    }

    console.log(top, 'top');
    console.log(info.offsetTop - info.offsetHeight);

    if (top > (info.offsetTop - info.offsetHeight)) {
        info.style.right = '0';
        info.style.opacity = '1';
    }
}

