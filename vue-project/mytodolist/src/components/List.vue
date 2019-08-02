<template>
  <div class="list">
    <header>
      <div class="container">
        <h1>任务计划列表</h1>
      </div>
    </header>

    <div class="container">
      <div class="add-todo">
        <h3>添加任务</h3>
        <input placeholder="请输入待办任务" autofocus v-model.trim="newtodo" @keyup.enter="addTodo" />
      </div>

      <div class="remind" v-if="!todos.length">
        <p>祝您拥有愉快的一天!</p>
      </div>

      <nav class="nav-count" v-if="todos.length">
        <span class="todo-count">
          <strong>{{ remain }}</strong>个任务未完成
        </span>
        <div class="mark">
          <div class="all">
            <input id="todo-list" class="toggle-all" type="checkbox" v-model="isAll" />
            <label for="todo-list">标记全部</label>
          </div>
          <button @click="clear">清理完成任务</button>
        </div>
      </nav>

      <section class="main" v-if="todos.length">
        <div class="nav">
          <h3>任务列表</h3>
          <!-- 切换完成、未完成 -->
          <ul class="filters">
            <li :class="{selected: hashName == 'all'}">
              <a href="#/">全部任务</a>
              <a class="small" href="#/">全部</a>
            </li>
            <li :class="{selected: hashName == 'active'}">
              <a href="#/active">待办任务</a>
              <a class="small" href="#/active">待办</a>
            </li>
            <li :class="{selected: hashName == 'completed'}">
              <a href="#/completed">完成任务</a>
              <a class="small" href="#/completed">完成</a>
            </li>
          </ul>
        </div>
        <!-- 任务列表 -->
        <transition-group tag="ul" class="todo-list">
          <li
            v-for="(todo,index) in filterTodos"
            :key="index+1"
            :class="{completed: todo.completed, editing: todo === editTodoed}"
          >
            <div class="view">
              <!-- v-model 这里v-model绑定了todo.completed -->
              <input :id="'toggle'+index" type="checkbox" v-model="todo.completed" />
              <label :for="'toggle'+index">
                <i class="fa fa-check-square-o"></i>
              </label>
              <span @dblclick="editTodo(todo)">{{ todo.content }}</span>
              <i class="fa fa-trash-o" @click="remove(index)"></i>
            </div>
            <!-- 编辑框 -->
            <input
              class="edit"
              v-model.trim="todo.content"
              v-focus
              @blur="doneEdit(todo,index)"
              @keyup.esc="cancleEdit(todo)"
              @keyup.enter="doneEdit(todo,index)"
            />
          </li>
        </transition-group>
      </section>
      <!-- 待办任务开始 -->
    </div>
  </div>
</template>

<script>
import { filters } from "../filters";
export default {
  name: "list",
  data() {
    return {
      msg: "hello",
      newtodo: "",
      todos: [
        // { content: "任务一", complated: false },
        // { content: "任务二", complated: false }
      ],
      editTodoed: null,
      editCache: "",
      hashName: "all"
    };
  },
  methods: {
    addTodo(e) {
      if (!this.newtodo) {
        return;
      }
      this.todos.push({ content: this.newtodo, completed: false });
      this.newtodo = "";
    },
    remove(index) {
      this.todos.splice(index, 1);
    },
    editTodo(todo) {
      this.editCache = todo.content;
      // 做标记
      this.editTodoed = todo;
    },
    doneEdit(todo, index) {
      // 这时候editTodoed和todo的值不一样 控制样式
      this.editTodoed = null;
      if (!todo.content) {
        this.remove(index);
      }
    },
    cancleEdit(todo) {
      this.editTodoed = null;
      todo.content = this.editCache;
    },
    // 点击清理已完成
    clear() {
      this.todos = filters.active(this.todos);
    },
    hashChange() {
      let hashName = location.hash.replace(/#\/?/, "");
      if (filters[hashName]) {
        this.hashName = hashName;
      } else {
        location.hash = "";
        this.hashName = "all";
      }
    }
  },
  watch: {
    todos: {
      handler: function() {
        localStorage.setItem("todos", JSON.stringify(this.todos));
      },
      deep: true
    }
  },
  // 自定义指令获取焦点
  directives: {
    focus(el, value) {
      el.focus();
    }
  },
  computed: {
    // 标记有几个待办
    remain() {
      return filters.active(this.todos).length;
    },
    // 全选控制
    isAll: {
      // 获取是否有剩下的任务，有剩下的就是不等于0 返回false
      get() {
        return this.remain === 0;
      },
      // 全选的值发生变化 设置所有的样式completed都是true
      set(value) {
        this.todos.forEach(todo => {
          todo.completed = value;
        });
      }
    },
    filterTodos() {
      return filters[this.hashName](this.todos);
    },
    getStorage() {
      let todos = JSON.parse(localStorage.getItem("todos"));
      if (todos) {
        this.todos = todos;
      }
    }
  },
  mounted() {
    // 这是值
    this.getStorage;
    // 这是方法
    this.hashChange();
    window.addEventListener("hashchange", this.hashChange);
  }
};
</script>

<style scoped>
.v-enter,
.v-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.v-enter-active,
.v-leave-active {
  transition: all 1s;
}

.v-move {
  transition: transform 1s;
}

/* 要让删除的元素先脱离文档流，旁边的元素才能过渡过来 */
.v-leave-active {
  position: absolute;
}

.list > .container {
  margin-top: 56px;
}

.list ul,
h1,
h3,
input,
button,
a {
  margin: 0;
  padding: 0;
  list-style-type: none;
  text-decoration: none;
  border: 0;
}
* {
  transition: color 0.3s;
}
h3 {
  padding: 15px 0;
}
.container {
  max-width: 50%;
  margin: 0 auto;
}
input[type="checkbox"] {
  display: none;
}

header {
  position: fixed;
  top: 0;
  width: 100%;
  padding: 10px 0;
  color: #ccc;
  background-color: #db4c3f;
}
header h1 {
  color: #fff;
}
@media (max-width: 768px) {
  header {
    text-align: center;
  }
  .container {
    max-width: 85%;
    margin: 0 auto;
  }
}

/* 添加任务 */
.add-todo {
  width: 100%;
}
input {
  box-sizing: border-box;
  width: 100%;
  height: 30px;
  padding: 0 10px;
  outline-color: #db4c3f;
}
.add-todo input {
  background-color: rgba(255, 255, 255, 0.6);
}

/* 标记任务数量 */
.nav-count {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}
.nav-count span {
  display: inline-block;
}
.mark {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.mark label,
.mark button {
  display: inline-block;
  padding: 5px;
  margin: 0 5px;
  min-width: 25px;
  border: none;
  outline: none;
  background-color: #db4c3f;
  color: #fff;
  font-size: 14px;
}
.nav {
  display: flex;
  margin-top: 15px;
  height: 30px;
  line-height: 30px;
  justify-content: space-between;
}
.nav h3 {
  padding: 0;
}
.nav ul {
  display: flex;
}
.nav ul li {
  padding: 0 10px;
}
.nav ul li a {
  color: #808080;
}
.nav ul li a[class="small"] {
  display: none;
}
.nav ul .selected {
  border: 1px dotted #db4c3f;
  border-radius: 5px;
}
@media (max-width: 768px) {
  .nav ul li a {
    display: none;
  }
  .nav ul li a[class="small"] {
    display: block;
  }
}

/* 任务列表 */
.main .todo-list {
  margin-top: 10px;
}
.main .todo-list li {
  background-color: rgba(255, 255, 255, 0.6);
  margin: 10px 0;
  color: #808080;
}
.view {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
}
.view label {
  display: inline-block;
  min-width: 40px;
  height: 40px;
  cursor: pointer;
}
.view label i {
  line-height: 2;
  color: #d9d9d9;
}
.completed .view input[type="checkbox"]:checked + label i {
  color: #808080;
}
.view span {
  flex-grow: 1;
  margin: 10px;
  word-break: break-all;
}
.view i {
  font-size: 22px;
  color: #d9d9d9;
  cursor: pointer;
}

.view > i:hover {
  color: #808080;
}
@media (max-width: 768px) {
  .view > i {
    color: #808080;
  }
}
.todo-list .completed .view span {
  text-decoration: line-through;
}
.todo-list li .edit {
  display: none;
}
.todo-list .editing .edit {
  margin-left: 50px;
  width: 80%;
  height: 40px;
}
.todo-list .editing .view {
  display: none;
}
.todo-list .editing .edit {
  display: block;
}
</style>
