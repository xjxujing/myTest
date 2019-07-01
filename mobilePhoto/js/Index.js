var w = $(window).width();
var h = $(window).height();
var listWidth = (w - 12) / 4;
// console.log(listWidth);
var aspectRatio = h / w;
var total = $("li").length;
// console.log(num);


// 列表排列的图片初始化
function init() {
    $("li").css({ width: listWidth, height: listWidth });
    // if(aspectRatio)

    $("img").each(function (i, ele) {
        var imgAspectRatio = $(ele).height() / $(ele).width();
        // console.log(imgAspectRatio < 1);
        if (imgAspectRatio < 1) {
            // 如果长宽比小于1,以高为准
            $(ele).css({ height: "100%", width: "auto" });
        }
    });
}
init();


// 点击后边大图模式，像展开的轮播图
function show() {
    // console.log("123");
    $(".list").css({ width: total * w + "px", height: "100%", left: 0 });
    $("li").css({ width: "100vw", height: "100vh" });
    $("img").css({ height: "auto", width: "100%" });
    radio();
}

$(".list").on("tap", "li", function () {
    // console.log("li-tap");
    show();
    index = $(".list li").index($(this));
    // console.log(index);
    $(".list").css({ left: index * -w + "px"});
   
});

// 左右滑动图片
$(".list").on("swipeLeft swipeRight", function (e) {
    console.log("list-swipe");
    if (e.type == "swipeLeft") {
        slider(1);
    } else {
        slider(-1);
    }
}).on("swipeUp", function () {
    init();
    $(".list").off("swipeLeft swipeRight swipeUp")
});


function slider(num) {
    index += num;
    if (index < 0) {
        index = 0;
        alert("第一张！")
        return;
    } if (index > total - 1) {
        index = total - 1;
        alert("最后一张！")
        return;
    }
    console.log(index);
    $(".list").stop(false,true).animate({ left: index * -w + "px" }, 200);
}


function radio() {
    $('img').each(function(i, ele) {
        var imgAspectRatio = $(ele).height()/$(ele).width();
        if(imgAspectRatio > aspectRatio) {
            $(ele).css({height: '100%', width:'auto'});
        }
    }); 
}