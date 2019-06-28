(function ($) {

    var page = {
        // 入口函数 通过入口函数初始化
        init: function (dom, obj) {
            this.fillHtml(dom, obj);
            this.bindEvent(dom, obj);
        },

        // 生成dom结构
        fillHtml: function (dom, obj) {
            dom.empty();
            console.log(dom, obj);
            if (obj.pageCount < 1 || obj.current < 1 || obj.current > obj.pageCount) {
                return;
            }
            // 上一页
            if (obj.current == 1) {
                dom.append('<a href="javascript:;" class="disabled"><上一页</a>');
            } else {
                dom.append('<a href="javascript:;" class="prev"><上一页</a>');
            }


            // 页码
            if (obj.pageCount <= 7) { // 小于7页
                for (var i = 1; i <= obj.pageCount; i++) {
                    if (i == obj.current) {
                        dom.append('<span class="active">' + i + '</span>');
                    } else {
                        dom.append('<a href="javascript:;" class="page">' + i + '</a>');
                    }
                }
            } else {  // 大于7页
                var start = obj.current - 2, end = obj.current + 2;

                if (obj.current > 4) { // 当前页大于4 要生成1 和 ...
                    dom.append('<a href="javascript:;" class="page">1</a>');
                    dom.append('<span class="omit">...</span>');
                }
                if (obj.current <= 4) { // 当前页小于4 要生成1-6页码
                    start = 1;
                    end = 6
                } else if (obj.current >= obj.pageCount - 3) { // 当前页接近总页数 要生成后面6个页码
                    start = obj.pageCount - 5;
                    end = obj.pageCount;
                    console.log(end);
                }

                for (; start <= end; start++) {
                    // console.log(end);
                    if (start == obj.current) {
                        dom.append('<span class="active">' + start + '</span>');
                    } else {
                        dom.append('<a href="javascript:;" class="page">' + start + '</a>');
                    }
                }
                if (obj.current < obj.pageCount - 3) {
                    dom.append('<span class="omit">...</span>');
                    dom.append('<a href="javascript:;" class="page">' + obj.pageCount + '</a>');
                }

            }


            // 下一页
            if (obj.current == obj.pageCount) {
                dom.append('<a href="javascript:;" class="disabled">下一页></a>');
            } else {
                dom.append('<a href="javascript:;" class="next">下一页></a>');
            }

        },

        // 绑定事件
        bindEvent: function (dom, obj) {
            var _this = this;
            dom.on("click", function (e) {
                var target = e.target;
                // target.hasclass("prev")
                if (target.className == "prev") {
                    obj.current--;
                }
                if (target.className == "next") {
                    obj.current++;
                }
                _this.fillHtml(dom, obj);
                obj.cb();


            });
            dom.on("click", ".page", function (e) {
                console.log(this);
                // 为什么这里要用parseInt(),不加的话一下出来好多页
                obj.current = parseInt($(this).text());
                _this.fillHtml(dom, obj);
                obj.cb();
            });
        }
    };


    $.fn.paging = function (options) {
        // console.log(options);
        // console.log(this); this指向$(".pagediv")
        // 用户不设置的时候 默认的处理
        var obj = {
            pageCount: 10,
            current: 1,
            cb: function () {
                console.log("默认处理");
            }
        };

        var agrs = $.extend(obj, options)

        page.init(this, agrs);
    };
})($);