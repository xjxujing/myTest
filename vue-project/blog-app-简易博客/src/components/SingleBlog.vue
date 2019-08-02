<template>
  <div id="single-blog">

    <div class="box" v-if="!submited">
      <h1>{{blog.title}}</h1>
      <p>作者: {{blog.author}}</p>
      <p>分类:</p>
      <ul>
        <li v-for="category in blog.categories" :key="category">{{category}}</li>
      </ul>
      <article>{{blog.content}}</article>
      <button @click="deletSinglegBlog">删除</button>
      <router-link :to="'/edit/' + id">编辑</router-link>
    </div>

    <div v-if="submited">
      <h3>博客已删除</h3>
    </div>

  </div>
</template>

<script>
export default {
  name: "single-blog",
  data() {
    return {
      blog: {
        title: "",
        content: "",
        author: "",
        categories: []
      },
      id: this.$route.params.id,
      // 因为删除后,用leancloudm没有重新请求,这里加个提示
      submited: false
    };
  },
  created() {
    // 注意这里路径拼接
    // this.$http
    //   .get("https://test-67e9c.firebaseio.com/posts/" + this.id + ".json")
    //   .then(data => {
    //     // console.log(data.json());
    //     return data.json();
    //   })
    //   .then(function(data) {
    //     // console.log(data);
    //     this.blog = data;
    //   });
    var searchBlog = this.blog;
    var blogId = this.id;

    // 从数据库中查询数据
    var AV = require("leancloud-storage");
    var query = new AV.Query("blogTest");
    query.find().then(function(datas) {
      console.log(datas);
      for (var index in datas) {
        if (datas[index].attributes.index == blogId) {
          searchBlog.title = datas[index].attributes.title;
          searchBlog.content = datas[index].attributes.content;
          searchBlog.author = datas[index].attributes.author;
          searchBlog.categories = datas[index].attributes.categories;
        }
      }
    });
  },
  methods: {
    deletSinglegBlog() {
      // 删除博客也是借助id值
      // this.$http
      //   .delete("https://test-67e9c.firebaseio.com/posts/" + this.id + ".json")
      //   .then(function(data) {
      //     // console.log(data);
      //     // 删除后直接跳转到展示博客页面
      //     this.$router.push({ path: "/" });
      //   });

      var searchBlog = this.blog;
      var blogId = this.id;

      // 从数据库中查询数据
      var AV = require("leancloud-storage");
      var query = new AV.Query("blogTest");
      query.find().then(datas => {
        console.log(datas);
        for (var index in datas) {
          if (datas[index].attributes.index == blogId) {
            datas[index].destroy();
          }
        }
      });
      this.submited = !this.submited;
    },
    // 点击编辑，编辑博客页面和添加博客的页面是一样的
    editBlog() {
      this.$http
        .put("https://test-67e9c.firebaseio.com/posts/" + this.id + ".json")
        .then();
    }
  }
};
</script>

<style scoped>
#single-blog {
  max-width: 960px;
  margin: 0 auto;
  padding: 20px;
  background: #eee;
  border: 2px dotted #aaa;
}
</style>