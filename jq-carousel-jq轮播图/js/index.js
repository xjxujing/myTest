var index = 0;
var imgWidth = 590;
var num = 5;
var timer = null;

timerFunc();

function move(direction) {
    clearTimeout(timer);
    $(".list").stop(false, true);
    if (direction == "next") {
        index++;
        if (index > 5) {
            $(".list").css({
                left: 0
            });
            index = 1;
        }
    } else if (direction == "prev") {
        index--;
        if (index < 0) {
            $(".list").css({
                left: num * -imgWidth
            });
            index = 4;
        }
    }
    console.log(index);

    $(".list").animate({
        left: index * - imgWidth
    }, function () {
        timerFunc();
    });
    active(index == 5 ? 0 : index);
}

// 改变小圆点样式
function active(index) {
    $(".active").removeClass("active");
    // console.log(index);
    $(".item").eq(index).addClass("active");
}

// 自动播放下一张  有点奇怪连续快速点击上一张按钮 感觉接着播放两张时间会变短 或者是我的错觉???..
function timerFunc() {
    timer = setTimeout(function () {
        move("next");
    }, 3000);
}


// 点击左右两边箭头
$(".prev").click(function () {
    move("prev");
});
$(".next").click(function () {
    move("next");
});

// 点击小圆点
$(".item").click(function () {
    index = $(this).index();
    move("");
})