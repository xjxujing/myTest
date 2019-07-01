function FileLoader(file, events) {
    this.file = file;
    this.step = 1024 * 1024;
    this.reader = new FileReader();
    this.total = file.size;
    this.loaded = 0;
    this.events = events;
    this.readBlob(this.reader, 0, this.step);
    this.blobEvent();
}

FileLoader.prototype = {
    // 读取文件数据
    readBlob: function (reader, start, step) {
        // 文件分段读取之前要判断浏览器是否支持slice
        var file = this.file
        var reader = this.reader;
        if (file.slice) {
            var blob = file.slice(start, start + step);
        } else {
            var blob = file;
        }
        reader.readAsText(blob);
    },

    // 读取过程中的发生的一些事
    blobEvent: function () {
        var reader = this.reader;
        var _this = this;
        // 数据读取中
        reader.onprogress = function (e) {
            // e.loaded存储的是这次上传的是多少
            _this.onProgress(e.loaded);
        }
        // 数据读取完成
        reader.onload = function () {
            _this.onLoad();
        }
    },

    onProgress: function (num) {
        this.loaded += num;
        var per = this.loaded / this.total
        // val.style.width = per * 250 + "px";
        // if (per > 1) {
        //     per = 1;
        // }
        // text.innerHTML = Math.round(per * 100) + "%";
        this.events.progressIng(per);
    },
    onLoad: function () {
        var result = this.reader.result;

        // 这里应该是执行文件上传的操作 Ajx
        // console.log("上传" + loaded + "部分");
        this.events.stepLoad(this.loaded);

        // 判断当前文件是否读取完成
        if (this.loaded < this.total) {
            // 如果没有上传完成，重复前面的相应过程
            this.readBlob(this.reader, this.loaded, this.step);
        } else {
            // console.log("上传完成");
            this.events.finish();
        }
    }


}




// var file;
// var reader = new FileReader();
// // 定义一个已经上传了多少的全局变量,初始值0
// var loaded = 0;
// // 定义一个文件数据总长度的变量
// var total;
// // 1M
// var step = 1024 * 1024;



// 封装: 把方法都放到某一个对象下，前面定义的值也要放在对象下当作属性值
// 也就是变成了对象的属性、方法


function Aa() {
    this.age = 18;
    console.log(999);
}
Aa.prototype =  {
    b: function() {
        // console.log("b");
        console.log(this.age);
    }
}

var obj = new Aa();
