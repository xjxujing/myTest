<template>
  <section class="list">
    <header class="header">
      <h1>{{ title }}</h1>
      <div class="add-todo">
        <span>+</span>
        <input placeholder="请输入待办事项" autofocus v-model.trim="newtodo" @keyup.enter="addTodo" />
      </div>
      <!-- @input="addTodo($event)" -->
    </header>
    <!-- This section should be hidden by default and shown when there are todos -->
    <section class="main" v-if="todos.length">
      <div class="about">
        <div class="all">
          <input
            id="todo-list"
            class="toggle-all"
            type="checkbox"
            v-model="isAll"
            @change="saveStates"
          />
          <label for="todo-list"></label>
          <span>全部完成</span>
        </div>
        <span class="todo-count">
          <strong>{{ remain }}</strong>个待办事项
        </span>
        <button class="clear-completed" @click="clear()">清理完成事项</button>
      </div>
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
    </section>
    <!-- This footer should hidden by default and shown when there are todos -->
    <footer class="footer" v-if="todos.length">
      <!-- This should be `0 items left` by default -->

      <!-- Remove this if you don't implement routing -->
      <ul class="filters">
        <li>
          <a :class="{selected: hashName == 'all'}" href="#/">全部事项</a>
        </li>
        <li>
          <a :class="{selected: hashName == 'active'}" href="#/active">待办事项</a>
        </li>
        <li>
          <a :class="{selected: hashName == 'completed'}" href="#/completed">完成事项</a>
        </li>
      </ul>
      <!-- Hidden if no completed items are left ↓ -->
    </footer>
  </section>
</template>

<script>
import { filters } from "../filters";

export default {
  name: "list",
  data() {
    return {
      msg: "hello",
      title: "我的待办",
      newtodo: "",
      todos: [
        // { content: "vuevue", complated: false },
        // { content: "vuex", complated: false }
      ],
      editTodoed: null,
      editCache: "",
      hashName: "all"
      // hashName: location.hash.replace(/#\/?/, "")
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
input,
button,
a {
  margin: 0;
  padding: 0;
  list-style-type: none;
  text-decoration: none;
}

.list {
  margin: 100px auto;
  width: 400px;
}

/* 列表头部分 */
.list input[type="text"] {
  outline-color: #af7eeb;
}

.header h1 {
  line-height: 50px;
  text-align: center;
  background-color: #efd5d5;
}
.add-todo {
  display: flex;
  padding: 10px 0;
  width: 100%;
  height: 30px;
}
.add-todo span {
  flex-basis: 30px;
  font-size: 22px;
  text-align: center;
}
.add-todo input {
  flex-grow: 1;
  border: none;
  border: 2px solid #ccc;
  outline-color: #af7eeb;
}

/* 中间小部分 */
.about {
  height: 30px;
  display: flex;
  line-height: 30px;
  justify-content: space-between;
}

.about #todo-list {
  display: none;
}
.about .todo-count {
  display: inline-block;
  text-align: center;
}
.clear-completed {
  float: right;
  border: none;
  background-color: #af7eeb;
}
.about #todo-list + label {
  display: inline-block;
  width: 10px;
  height: 10px;
  border: 2px solid #af7eeb;
}

/* 待办列表 */
.todo-list {
  border-radius: 5px 5px 0 0;
  background-color: rgba(175, 126, 235, 0.2);
}
.todo-list li {
  position: relative;
  border-bottom: 1px solid #af7eeb;
}
.todo-list li:last-child {
  border-bottom: none;
}

.todo-list .view {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
}

/* 待办列表的小圆点 */
.todo-list .view input {
  display: none;
}

.todo-list .view input + label {
  box-sizing: border-box;
  min-width: 15px;
  height: 15px;
  border-radius: 50%;
  border: 2px solid #af7eeb;
}

.todo-list .view input:checked + label,
#todo-list:checked + label {
  background-color: rgba(175, 126, 235, 0.6);
}

/* 待办列表的删除 */
.todo-list .view button {
  min-width: 15px;
  font-size: 16px;
  border: none;
}

.todo-list .view > span {
  display: inline-block;
  flex-grow: 1;
  box-sizing: border-box;
  max-width: 350px;
  padding: 10px;
  font-size: 18px;
  word-wrap: break-word;
}

.todo-list li .edit {
  display: none;
}
.todo-list .editing .view {
  display: none;
}
.todo-list .editing .edit {
  display: inline-block;
  margin-left: 35px;
  max-width: 365px;
  padding: 10px;
  font-size: 24px;
  background-color: #e3e9ff;
  border: none;
  outline-color: #af7eeb;
  /* word-wrap: break-word; */
}
.footer span {
  display: block;
  width: 100%;
  text-align: center;
}

.footer .filters {
  display: flex;
  justify-content: space-around;
}
.footer .filters li {
  flex-grow: 1;
  height: 30px;
  line-height: 30px;
  text-align: center;
  background-color: #af7eeb;
}
.footer .filters li a {
  display: block;
  color: #000;
}
.footer .filters .selected {
  background-color: #ccc;
}
</style>