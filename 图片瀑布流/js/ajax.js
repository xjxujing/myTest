// （1） web浏览器
// （2） ajax对象       
// （3） 初始化 HTTP 请求参数(请求方式, 地址, 同步异步)
// （4） 发送请求
// （5） 监控数据        
// （6） 检查数据 使用


function ajax(method, url, callback, data, flag) {
    // 创建ajax对象,IE6及以下没有XMLHttpRequest方法,注意兼容
    var xml;
    if (window.XMLHttpRequest) {
        xml = new XMLHttpRequest();
    } else {
        xml = new ActiveXObject("Microsoft.XMLHttp");
    }

    // 注意HTTP请求方式用大写(请求方式, 地址, 同步false异步true)
    // xml.open("GET", "./getNews.php?" + data, true); // GET请求 获取数据
    // xml.open("POST", "./post.php", true);  // POST请求 传数据


    // 发送请求
    // xml.send();
    // xml.setRequestHeader("Content-type", "application/x-www-form-urlencoded ");  // 传递请求头
    // xml.send(data); // 在这里传数据


    method = method.toUpperCase();  // 兼容小写写法的协议，注意应该要大写

    if (method == "GET") {  // 注意GET有缓存 向同一个地址(url)多次发送请求,会有缓存,不从服务器拿,导致不能及时拿到新数据(比如验证码获取),可以加时间戳或随机数
        var date = new Date();
        timer = date.getTime();
        xml.open(method, url + "?" + data + "&timer=" + timer, flag); // GET请求 获取数据
        xml.send();

    } else if (method == "POST") {
        xml.open(method, url, flag);  // POST请求 传数据
        xml.setRequestHeader("Content-type", "application/x-www-form-urlencoded ");  // 传递请求头
        xml.send(data); // 在这里传数据
    }


    // 监控数据 0 1 2 3 4
    xml.onreadystatechange = function () {
        // console.log(xml.readyState);
        if (xml.readyState == 4) {

            // 检查数据 
            if (xml.status == 200) {
                // cbs(xml.responseText);
                // cbs2(xml.responseText);
                callback(xml.responseText)
            }
        }
    }
}

