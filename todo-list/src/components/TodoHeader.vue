<template>
  <header class="todo-header">
    <div class="main">
      <ul class="top">
        <li>
          <a @click="isSelected" :class="{selected: selected}" href="javascript:;">登录</a>
        </li>
        <span>|</span>
        <li>
          <a @click="isSelected" :class="{selected: !selected}" href="javascript:;">注册</a>
        </li>
      </ul>
      <form action>
        <div class="email">
          <!-- <label for>邮箱</label> -->
          <input type="text" placeholder="邮箱" />
        </div>
        <div class="password">
          <!-- <label for>密码</label> -->
          <input type="password" placeholder="密码" />
        </div>
        <div class="password2" v-if="!selected">
          <!-- <label for>确认密码</label> -->
          <input type="password" placeholder="确认密码" />
        </div>
      </form>
      <!-- <a href="javascript:;">忘记密码</a> -->
      <input class="btn" type="submit" value="确认" />
    </div>
  </header>
</template>

<script>
export default {
  name: "todo-header",
  data() {
    return {
      selected: false
    };
  },
  methods: {
    isSelected() {
      this.selected = !this.selected;
    },
  }
};
</script>

<style scoped>
ul,
li,
a {
  margin: 0;
  padding: 0;
  list-style: none;
  text-decoration: none;
}
.todo-header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
}
.main {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 200px;
  background: #fff;
  z-index: 999;
  border-radius: 5px;
}
.top {
  display: flex;
  margin-bottom: 20px;
  padding: 10px 10px 0;
  height: 30px;
  line-height: 30px;
  justify-content: space-around;
}
.top span {
  color: #469aea;
  font-weight: 700;
}
.top li a {
  display: block;
  text-align: center;
  color: #000;
  overflow: hidden;
}
.top li a:hover {
  border-bottom: 3px solid rgba(70, 155, 235);
}
.top li .selected {
  border-bottom: 3px solid rgba(70, 155, 235);
}
form {
  width: 100%;
  height: 60%;
}

form div {
  height: 33.3%;
  padding: 0 20px;
}
form div input {
  display: block;
  padding: 0 10px;
  width: 80%;
  height: 70%;
  margin: 0 auto;
  outline-color: #469aea;
  border-color: rgba(0, 0, 0, 0.4);
}
.main > a {
  display: block;
  text-align: center;
  font-size: 12px;
  text-decoration: underline;
  color: #757575;
}
.main > a:hover {
  color: #46a7ef;
}
.btn {
  display: block;
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 150px;
  height: 30px;
  margin: 0 auto;
  border: none;
  outline: none;
  background: #46a7ef;
  border-radius: 50px;
  cursor: pointer;
}
</style>