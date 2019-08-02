<template>
  <div id="add-blog">
    <h1>编辑博客</h1>
    <form v-if="!summited">
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

    <div v-if="summited">
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
      id: this.$route.params.id, // 注意这里是$route 拿到链接的id
      blog: {},
      authors: ["Henry", "Bucky", "Amy"],
      summited: false
    };
  },
  methods: {
    post() {
      // 编辑数据 编辑的是指定的数据注意地址，所以put(传输)的地址也是指定的地址 还有put请求注意传参数
      this.$http
        .put("https://test-67e9c.firebaseio.com/posts/" + this.id + ".json", this.blog)
        .then(data => {
          // console.log(data);
          this.summited = true;
        });
    },
    fetchData() {
      // console.log(this.id) 在页面显示前把数据获取到 然后填到页面上
      this.$http
        .get("https://test-67e9c.firebaseio.com/posts/" + this.id + ".json")
        .then(data => {
          // console.log(data);
          this.blog = data.body
        });
    }
  },
  created() {
    this.fetchData();
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
