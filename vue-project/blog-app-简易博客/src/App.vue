<template>
  <div id="app">
    <blog-header></blog-header>
    <!-- <add-blog></add-blog> -->
    <!-- <show-blogs></show-blogs> -->
    <router-view></router-view>
  </div>
</template>

<script>
import BlogHeader from './components/BlogHeader'
import AddBlog from "./components/AddBlog";
import ShowBlogs from "./components/ShowBlogs";

export default {
  name: "App",
  components: {
    BlogHeader,
    AddBlog,
    ShowBlogs,
  }
};
</script>

<style>

</style>
