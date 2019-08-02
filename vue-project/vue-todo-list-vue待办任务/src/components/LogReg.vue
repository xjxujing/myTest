<template>
  <header class="log-reg">
    <div class="main">
      <ul class="top">
        <li>
          <a @click="isSelected(1)" :class="{selected: selected}" href="javascript:;">登录</a>
        </li>
        <span>|</span>
        <li>
          <a @click="isSelected(-1)" :class="{selected: !selected}" href="javascript:;">注册</a>
        </li>
      </ul>
      <form action>
        <div class="email">
          <!-- <label for>邮箱</label> -->
          <input type="text" placeholder="用户名" v-model="username" required />
        </div>
        <div class="password">
          <!-- <label for>密码</label> -->
          <input type="password" placeholder="密码" v-model="pass1" required />
        </div>
        <div class="password2" v-if="!selected">
          <!-- <label for>确认密码</label> -->
          <input type="password" placeholder="确认密码" v-model="pass2" required />
        </div>
      </form>
      <!-- <a href="javascript:;">忘记密码</a> -->
      <input class="btn" type="submit" :value="btntext" @click.prevent="submit()" />
    </div>
  </header>
</template>

<script>
let AV = require("leancloud-storage");

export default {
  name: "log-reg",
  data() {
    return {
      selected: false,
      username: "",
      pass1: "",
      pass2: "",
      btntext: "注册"
    };
  },
  // methods开始
  methods: {
    isSelected(flag) {
      if (flag == 1) {
        this.selected = true;
      }else {
        this.selected = false;
      }
      this.btntext = this.selected ? "登录" : "注册";
    },

    submit: function() {
      // 新建 AVUser 对象实例
      let user = new AV.User();

      // 用户注册
      if (this.btntext == "注册") {
        if (this.username && this.pass1 && this.pass2) {
          // 设置密码
          if (this.pass1 == this.pass2) {
            user.setUsername(this.username);
            user.setPassword(this.pass1);
            user.signUp().then(
              function(loggedInUser) {
                // console.log(loggedInUser);
              },
              function(error) {
                if (
                  error.code == 202 &&
                  error.rawMessage == "Username has already been taken."
                ) {
                  alert("用户名已被注册!");
                  return;
                }
              }
            );
          } else {
            alert("两次密码不一致!");
            return;
          }
        } else {
          alert("请输入有效信息!");
          return;
        }
      }
      // 用户登录
      AV.User.logIn(this.username, this.pass1).then(
        function(loggedInUser) {
          // console.log(loggedInUser);
        },
        function(error) {
          if (
            error == 210 &&
            error.rawMessage == "The username and password mismatch."
          ) {
            alert("密码错误");
            return;
          } else if (
            error == 211 &&
            error.rawMessage == "Could not find user."
          ) {
            alert("用户名不存在");
            return;
          }
        }
      );
    }
  },
  // methods结束
  // computed开始
  computed: {}
  // computed结束
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
.log-reg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 999;
}
.main {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 200px;
  background: #fff;
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
  color: #db4c3f;
  font-weight: 700;
}
.top li a {
  display: block;
  text-align: center;
  color: #000;
  overflow: hidden;
}
.top li a:hover {
  border-bottom: 3px solid #db4c3f;
}
.top li .selected {
  border-bottom: 3px solid #db4c3f;
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
  outline-color: #db4c3f;
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
  background: #db4c3f;
  border-radius: 50px;
  cursor: pointer;
}
</style>