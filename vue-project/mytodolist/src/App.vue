<template>
  <div id="app">
    <List class="layout" />
  </div>
</template>

<script>
import List from "./components/List";

export default {
  name: "App",
  components: {
    List
  }
};
</script>

<style>
/* body {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-image: url("./assets/2.jpeg");
  background-size: cover;
  background-attachment: fixed; 
  background-repeat: no-repeat; 
} */
body {
  height: 100vh;
  width: 100vw;
  background-image: url("./assets/2.jpeg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: center;
}
</style>
