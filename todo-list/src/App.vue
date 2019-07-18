<template>
  <div id="app">
    <todo-header></todo-header>
    <list></list>
  </div>
</template>

<script>
import TodoHeader from "./components/TodoHeader";
import List from "./components/List";

export default {
  name: "App",
  components: {
    list: List,
    "todo-header": TodoHeader
  }
};
</script>

<style>
body {
  background-color: rgba(70, 155, 235, 0.6);
}
</style>
