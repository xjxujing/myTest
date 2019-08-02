<template>
  <div id="add-blog">
    <h1>写博客</h1>
    <form v-if="!submited">
      <label>博客标题</label>
      <!-- required 为什么这里有 还是可以提交 -->
      <input type="text" v-model="blog.title" required />
      <label for>博客内容</label>
      <textarea v-model="blog.content"></textarea>

      <!-- 博客类型 -->
      <div id="checkboxes">
        <input type="checkbox" value="vue.js" v-model="blog.categories" />
        <label>Vue.js</label>

        <input type="checkbox" value="node.js" v-model="blog.categories" />
        <label>Node.js</label>

        <input type="checkbox" value="angular4" v-model="blog.categories" />
        <label>Angular4</label>

        <input type="checkbox" value="React.js" v-model="blog.categories" />
        <label>React.js</label>
      </div>
      <!-- 选择作者 -->
      <label>作者</label>
      <select v-model="blog.author">
        <option v-for="author in authors" :key="author">{{author}}</option>
      </select>

      <!-- 提交表单注意取消默认刷新事件 -->
      <button @click.prevent="post">添加博客</button>
    </form>

    <div v-if="submited">
      <h3>博客添加成功!</h3>
    </div>
    <hr />

    <!-- 总览博客 -->
    <div id="preview">
      <h3>博客总览</h3>
      <p>博客标题: {{blog.title}}</p>
      <p>博客内容:</p>
      <p>{{blog.content}}</p>
      <ul>
        <li v-for="category in blog.categories" :key="category">{{category}}</li>
      </ul>

      <p>作者: {{blog.author}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "add-blog",
  data() {
    return {
      blog: {
        title: "",
        content: "",
        categories: [],
        author: ""
      },
      authors: ["Henry", "Bucky", "Amy"],
      submited: false,
    };
  },
  methods: {
    // post() {
    //   // http://jsonplaceholder.typicode.com/posts 这是测试地址
    //   this.$http
    //     .post("https://test-67e9c.firebaseio.com/posts.json", this.blog)
    //     .then(data => {
    //       console.log(data);
    //       this.submited = true;
    //     });
    // }
    post: function() {
      var AV = require("leancloud-storage");
      var _Blog = AV.Object.extend("blogTest");
      var myBlog = new _Blog();
      myBlog.save({
        author: this.blog.author,
        categories: this.blog.categories,
        content: this.blog.content,
        title: this.blog.title
      });
      // 添加博客成功之后，改变页面中的内容
      this.submited = true;
      // this.pageTitle = "博客添加成功";
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#add-blog * {
  box-sizing: border-box;
}
#add-blog {
  margin: 20px auto;
  max-width: 600px;
  padding: 20px;
}
label {
  display: block;
  margin: 20px 0 20px;
}
input[type="text"],
textarea,
select {
  display: block;
  width: 100%;
}
textarea {
  height: 200px;
}
#checkboxes label {
  display: inline-block;
  margin-right: 10px;
}
#checkboxes input {
  display: inline-block;
}
button {
  display: block;
  margin: 20px 0;
  padding: 14px;
  background: crimson;
  color: #fff;
  border: 0;
  border-radius: 4px;
  font-size: 18px;
  cursor: pointer;
}
#preview {
  padding: 10px 20px;
  border: 3px dotted #ccc;
  margin: 30px 0;
}
h3 {
  margin-top: 10px;
}
</style>
