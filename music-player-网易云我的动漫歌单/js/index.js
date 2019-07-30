var oAudio = document.getElementById("audio");
var oBtn = document.getElementsByClassName("btn")[0];
var oIsPlay = oBtn.getElementsByTagName("i")[0];
var oProActive = document.getElementsByClassName("pro-active")[0];
var oRadioBox = document.getElementsByClassName("radio-box")[0];
var oProBox = document.getElementsByClassName("pro-box")[0];
var oVolume = document.getElementsByClassName("volume")[0];
var oVolBox = document.getElementsByClassName("volume-box")[0];
var oNext = document.getElementsByClassName("next")[0];
var oPrev = document.getElementsByClassName("prev")[0];
var oTool = document.getElementsByClassName("tool")[0].getElementsByTagName("div");
var oImg = document.getElementsByTagName("img")[0];
var oName = document.getElementsByClassName("name")[0];
var oInfo = document.getElementsByClassName("info")[0];

var oBox = document.getElementsByClassName("box")[0];
var oContent = document.getElementsByClassName("content")[0];

var timer;
var bgwidth = 252;
var volHeight = 92;

var url = "http://localhost:3000/playlist/detail"
var listId = 2794345340;



// 点击播放音乐
oBtn.onmouseup = function () {
    if (oAudio.paused) {
        musicPlay();
    } else {
        musicPause();
    }
}

function musicPlay() {
    oAudio.play();
    oIsPlay.className = "iconfont icon-zanting";
    timer = setInterval(movPro, 200);
}

function musicPause() {
    oAudio.pause();
    oIsPlay.className = "iconfont icon-bofang";
    clearInterval(timer);
}


// 播放的时候进度条会动
function movPro() {
    // 进度条宽度 / 总共要走的宽度 = oAudio.currentTime / oAudio.duration
    oProActive.style.width = oAudio.currentTime / oAudio.duration * bgwidth + 8 + "px";
}


// 音乐播放结束的处理
oAudio.onended = function () {
    musicPause();
    oIsPlay.className = "iconfont icon-bofang";
    NextPrev(1);
};

var i = 0;
oNext.onmouseup = function () {
    NextPrev(1)
};

// 点击上一首
oPrev.onmouseup = function () {
    // getPrev();
    NextPrev(-1)
};

NextPrev(1);
// 上下首切换
function NextPrev(num) {
    clearInterval(timer);
    i += num;
    ajax("GET", url, getPlayList, "id=" + listId, true);
}

function getPlayList(data) {
    var data = JSON.parse(data);
    var idList = data.playlist.trackIds;

    var len = idList.length;

    if (i > len - 1) {
        i = 0;
    } else if (i < 0) {
        i = len - 1;
    }

    var musicUrl1 = "http://localhost:3000/song/detail";
    var musicUrl2 = "http://localhost:3000/song/url";
    var musicId = idList[i].id;


    Promise.all([
        $.ajax({ type: "GET", url: musicUrl1, data: { ids: musicId }, xhrFields: { withCredentials: true } }),
        $.ajax({ type: "GET", url: musicUrl2, data: { id: musicId }, xhrFields: { withCredentials: true } }),
    ]).then((data) => {
        var songsInfo = data[0].songs;
        var songSrc = data[1].data[0];
        console.log(songsInfo);
        oName.innerHTML = songsInfo[0].name;
        oInfo.innerHTML = songsInfo[0].alia;
        oImg.src = songsInfo[0].al.picUrl;

        console.log(songSrc);

        oAudio.src = songSrc.url;
        musicPlay();
    });
}


// 拖动鼠标 
oRadioBox.onmousedown = function () {
    document.body.onmousemove = function (e) {
        // 这里要清除计时器，不然拖动进度条会闪动,左边的事件也会闪动
        clearInterval(timer);
        var c;
        // 鼠标位置
        var newWidth = e.clientX - oProBox.getBoundingClientRect().left;
        if (newWidth < 8) {
            newWidth = 8;
        }
        if (newWidth > 260) {
            newWidth = 260
        }

        // 拖动的进度条宽度 / 总共要走的宽度 = oAudio.currentTime / oAudio.duration
        oProActive.style.width = newWidth + "px";
        c = (newWidth - 8) / bgwidth * oAudio.duration

        document.body.onmouseup = function () {
            document.body.onmousemove = null;
            // 这里一定要置为空，前面有个oBtn.onmouseup，不取消的话事件会冒泡
            document.body.onmouseup = null;
            musicPlay();
            oAudio.currentTime = c;

        }
    }
}