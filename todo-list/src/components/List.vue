<template>
  <div class="list">
    <div class="status" :style="{right: right + 'px'}" @click="apear()">已登录</div>
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

      <nav class="nav" v-if="todos.length">
        <span class="todo-count">
          <strong>{{ remain }}</strong>个任务未完成
        </span>
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
      </nav>

      <!-- 待办任务开始 -->
      <section class="main" v-if="todos.length">
        <h3>任务列表</h3>

        <ul class="todo-list">
          <li
            v-for="(todo,index) in filterTodos"
            :key="todo.index"
            :class="{completed: todo.completed, editing: todo === editTodoed}"
          >
            <div class="view">
              <!-- v-model 这里v-model绑定了todo.completed -->
              <input
                :id="'toggle'+index"
                type="checkbox"
                v-model="todo.completed"
                @change="saveStates"
              />
              <label :for="'toggle'+index"></label>
              <span @dblclick="editTodo(todo)">{{ todo.content }}</span>
              <button class="destroy" @click="remove(index)">
                <span>X</span>
              </button>
            </div>

            <input
              class="edit"
              value="Rule the web"
              v-model.trim="todo.content"
              v-focus
              @blur="doneEdit(todo,index)"
              @keyup.esc="cancleEdit(todo)"
              @keyup.enter="doneEdit(todo,index)"
              @change="saveStates"
            />
          </li>
        </ul>
        <br />
        <footer>
          <div class="all">
            <input
              id="todo-list"
              class="toggle-all"
              type="checkbox"
              v-model="isAll"
              @change="saveStates"
            />
            <label for="todo-list">全部标记完成</label>
            <!-- <span></span> -->
          </div>
          <button class="clear-completed" @click="clear()">清理完成任务</button>
        </footer>
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
        // { content: "vuevue", complated: false },
        // { content: "vuex", complated: false }
      ],
      editTodoed: null,
      editCache: "",
      hashName: "all",
      // hashName: location.hash.replace(/#\/?/, "")
      right: ""
    };
  },
  watch: {
    todos: {
      handler: function() {
        localStorage.setItem("todos", JSON.stringify(this.todos));
      },
      deep: true
    }
  },
  methods: {
    addTodo(e) {
      if (!this.newtodo) {
        return;
      }
      this.todos.push({ content: this.newtodo, completed: false });
      this.newtodo = "";
      // localStorage.setItem("todos", JSON.stringify(this.todos));
    },
    remove(index) {
      this.todos.splice(index, 1);
      // localStorage.setItem("todos", JSON.stringify(this.todos));
    },
    saveStates() {
      // localStorage.setItem("todos", JSON.stringify(this.todos));
    },
    editTodo(todo) {
      this.editCache = todo.content;
      // 这里是做标记
      this.editTodoed = todo;
    },
    doneEdit(todo, index) {
      this.editTodoed = null; // 这时候editTodoed和todo的值也不一样了
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
      // localStorage.setItem("todos", JSON.stringify(this.todos));
    },
    hashChange() {
      let hashName = location.hash.replace(/#\/?/, "");
      if (filters[hashName]) {
        this.hashName = hashName;
      } else {
        location.hash = "";
        this.hashName = "all";
      }
    },
    apear() {
      this.right = 0;
    }
  },
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
    isAll: {
      // 注意这里的写法 首先是获取是否有剩下的任务，有剩下的就是不等于0 返回false
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

  // 组件挂载后,此方法执行,页面显示 获取本地存储
  mounted() {
    this.getStorage;
    window.addEventListener("hashchange", () => {
      let hashName = location.hash.replace(/#\/?/, "");
      if (filters[hashName]) {
        this.hashName = hashName;
      } else {
        location.hash = "";
        this.hashName = "all";
      }
    });
  }
};
</script>

<style scoped>
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

/* 头部分 */
header {
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

/* 添加任务部分 */
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

/* nav部分 */
.nav {
  display: flex;
  margin-top: 15px;
  height: 30px;
  line-height: 30px;
  justify-content: space-between;
}
.nav span {
  color: #db4c3f;
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

/* 任务列表部分 */
.main .todo-list li {
  position: relative;
  background-color: #fff;
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
  background: url("data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23ededed%22%20stroke-width%3D%223%22/%3E%3C/svg%3E")
    no-repeat 50% 50%;
}
.view input[type="checkbox"]:checked + label {
  background-image: url("data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23bddad5%22%20stroke-width%3D%223%22/%3E%3Cpath%20fill%3D%22%235dc2af%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22/%3E%3C/svg%3E");
}
.view span {
  flex-grow: 1;
  margin: 0 10px;
}
.todo-list .completed .view span {
  text-decoration: line-through;
  color: #d9d9d9;
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

/* 尾部 */
footer {
  display: flex;
  margin-top: 20px;
  justify-content: space-between;
  align-items: center;
}

footer label,
footer button {
  min-width: 25px;
  border: none;
  background-color: #db4c3f;
  color: #fff;
  padding: 10px;
  font-size: 14px;
}
.status {
  position: fixed;
  right: -50px;
  top: 80px;
  width: 60px;
  text-align: center;
  height: 30px;
  line-height: 30px;
  background-color: #db4c3f;
  border-radius: 10px 0 0 10px;
  z-index: 100;
}
</style>