var url = "http://localhost:3000/playlist/detail"
var listId = 2794345340;


// ajax(method, url, callback, data, flag)
ajax("GET", url, getPlayList, "id=" + listId, true);

// var idList = [];
var nameList = [];
var infoList = [];
var imgList = [];

var onlineMusicList = [];


function getPlayList(data) {
    var data = JSON.parse(data);
    console.log(data);
    var playlist = data.playlist.tracks;
    // console.log(playlist);
    // console.log(playlist);
    playlist.forEach((item,index)=>{
        // idList.push(item.id);
        nameList.push(item.name);
        infoList.push(item.alia[0]);
        imgList.push(item.al.picUrl);

        var musicUrl = "http://localhost:3000/song/url";
        var musicId = item.id
        ajax("GET", musicUrl, getMusicSrc, "id=" + musicId, true);
    });
}

function getMusicSrc(data) {
    // console.log(JSON.parse(data));
    var data = JSON.parse(data);
    onlineMusicList.push(data.data[0].url);
}

console.log(onlineMusicList);
console.log(nameList);
console.log(infoList);




var musicList = ["六三四 - 沸き上がる闘志",
    "六三四 - 木ノ叶の午后",
    "六三四 - NARUTO Main Theme",
    "井上ジョー - CLOSER"
]


