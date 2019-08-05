var oLi = document.getElementsByTagName("li");
// console.log(oLi);
var falg = false; // 是否在请求中
var num = 1;

function send() {
    if (!falg) {
        ajax("GET", "http://localhost/02fall/fall/getPics.php", dealData, "cpage=" + num, true);
        falg = true;
        num++;
    }

}

send();
// 根据文档模拟数据
// var data = '[{\
// 	"id": "672900",\
// 	"title": "Cafe Racer & Scrambler on Inspirationde", \
// 	"width": "770", \
// 	"height": "770", \
// 	"image": "http:\/\/www.wookmark.com\/images\/original\/672900_wookmark.jpg" \
// }, {"id": "672921",\
// 	"title": "House in Bonfim \/ AZO. Sequeira Arquitectos Associados on Inspirationde",\
// 	"width": "679",\
// 	"height": "1000",\
// 	"image": "http:\/\/www.wookmark.com\/images\/original\/672921_wookmark.jpg"\
// }]';


function dealData(data) {
    // 执行了回调函数表示数据回来了
    falg = false;
    var data = JSON.parse(data);
    console.log(data);

    if(data.length > 0) {
        data.forEach(function (ele, index) {
            var oItem = document.createElement("div");
            oItem.className = "item"
            var oImg = new Image();
            oImg.src = ele.image;
            // oItem.appendChild(oImg);
    
            // 每个图片占好位置高度
            oImg.height = 230 * ele.height / ele.width
            // 注意for循环所用时间会比图片请求回来的所用的时间快
            // oImg.onload = function () {
            oItem.appendChild(oImg);
            oLi[findShort(oLi)].appendChild(oItem);
            // };
        });
    }else {
        alert("没有更多数据")
    }
    
}
// dealData(data);

function findShort(list) {
    var len = list.length;
    // var minH = list[0].height;
    var minH = list[0].offsetHeight;
    console.log(minH);
    var index = 0;

    for (var i = 1; i < len; i++) {

        var h = list[i].offsetHeight;
        // console.log(h + "-" + minH);
        if (h < minH) {
            minH = h;
            index = i;
        }
    }
    return index;
}
// console.log(findShort(oLi));

window.onscroll = function () {
    var index = findShort(oLi);
    var h = oLi[index].offsetHeight;
    var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffrset;
    var clientHeight = document.documentElement.clientHeight;

    if (scrollHeight + clientHeight > h) {
        // 注意请求需要时间, 导致一段时间都符合这个if条件，会不断发送请求
        send();
    }
}