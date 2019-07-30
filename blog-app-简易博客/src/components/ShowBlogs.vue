<template>
  <div id="show-blogs" v-theme:colomn="'narrow'">
    <h1>博客总览</h1>
    <input type="text" v-model="search" placeholder="搜索" />
    <div class="single-blog" v-for="(blog,index) in filterBlogs" :key="index">
      <!-- 自定义指令v-rainbow 传的参数可以是字符串 数组 或者对象 -->
      <router-link v-bind:to="'/blog/' + blog.index">
        <h2 v-rainbow>{{blog.title | to-uppercase}}</h2>
      </router-link>
      <!-- 注意这里循环的内容要与对象的属性一致 -->
      <article>{{blog.content | snippet}}</article>
    </div>
  </div>
</template>

<script>
import { async } from "q";
export default {
  name: "show-blogs",
  data() {
    return {
      blogs: [],
      search: ""
    };
  },
  created() {
    // ../../static/posts.json 请求本地数据
    // http://jsonplaceholder.typicode.com/posts 请求测试数据的接口
    // https://test-67e9c.firebaseio.com/posts.json  这是firebase数据库接口
    // let blogsArr = [];
    // this.$http
    //   .get("https://test-67e9c.firebaseio.com/posts.json")
    //   .then(data => {
    //     return data.json();
    //   })
    //   .then(function (data) {
    //     console.log(data);
    //     for(let key in data) {

    //       console.log(key);
    //       data[key].id = key;
    //       blogsArr.push(data[key]);
    //     }
    //   })
    //   this.blogs = blogsArr;
    let blogs_copy = this.blogs;

    // 从数据库中查询数据
    //  function Query() {
    let AV = require("leancloud-storage");
    let query = new AV.Query("blogTest");
    query.find().then(
      function(datas) {
        console.log(datas);
        // console.log(JSON.parse(datas));
        for (var index in datas) {
          blogs_copy.push(datas[index].attributes);
        }
      },
      function(datas) {
        console.log(datas);
      }
    );
    // }
    // Query();
  },
  watch: {
    // blogs: {
    //   handler: function() {
    //     location.reload();
    //   }
    // },
    $route: "Query"
  },

  computed: {
    // 实现搜索博客
    filterBlogs: function() {
      return this.blogs.filter(blog => {
        return blog.title.match(this.search);
      });
    }
  },

  // 自定义过滤器 把标题改大写，内容不全部显示
  filters: {
    toUppercase(value) {
      return value.toUpperCase();
    },
    snippet(value) {
      return value.slice(0, 100) + "...";
    }
  },

  // 组件内自定义指令
  directives: {
    rainbow: {
      bind(el, binding, vnode) {
        el.style.color =
          "#" +
          Math.random()
            .toString(16)
            .slice(2, 8);
      }
    },
    theme: {
      bind(el, binding, vnode) {
        if (binding.value == "wide") {
          el.style.maxWidth = "1260px";
        } else if (binding.value == "narrow") {
          el.style.maxWidth = "560px";
        }
        if (binding.arg == "colomn") {
          el.style.background = "#67c";
          el.style.padding = "50px";
        }
      }
    }
  }
};
</script>

<style scoped>
#show-blogs {
  max-width: 800px;
  margin: 0 auto;
}
.single-blog {
  padding: 20px;
  margin: 20px 0;
  background: #ccc;
}
.single-blog a {
  text-decoration: none;
  color: #444;
}
input[type="text"] {
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
}
</style>
