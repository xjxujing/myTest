(function ($) {
    let idx = 0, itemWidth = 590;
    let timer = null;
    timerFunc();

    function carsouel(num) {
        clearTimeout(timer);
        $(".pic").stop(false, true); // 注意取消动画队列
        idx = idx + num;
        // 4张图的轮播 第五张图与第一张重复
        if (idx > 4) {
            $(".pic").css("left", 0)
            idx = 1;
        }
        if (idx < 0) {
            $(".pic").css("left", -4 * itemWidth)
            idx = 3;
        }
        let oLeft = -idx * itemWidth;
        $(".pic").animate({ "left": oLeft + "px" });
        active(idx == 4 ? 0 : idx);
        timerFunc();
    }

    // 圆点切换
    function active(idx) {
        $(".active").removeClass("active");
        $(".order>li").eq(idx).addClass("active");
    }

    // 自动轮播
    function timerFunc() {
        timer = setTimeout(function () {
            carsouel(1);
        }, 3000)
    }


    $(".next").click(function () {
        carsouel(1);
    });
    $(".prev").click(function () {
        carsouel(-1);
    });

    $(".order>li").click(function () {
        idx = $(this).index();
        carsouel(0);
    })
})($)
