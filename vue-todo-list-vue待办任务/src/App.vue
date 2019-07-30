<template>
  <div id="app">
    <log-reg></log-reg>
    <list></list>
  </div>
</template>

<script>
import LogReg from "./components/LogReg";
import List from "./components/List";

export default {
  name: "App",
  components: {
    list: List,
    "log-reg": LogReg
  }
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
  background-color: #FAFAFA;
}
.log-reg {
  display: none;
}
</style>
