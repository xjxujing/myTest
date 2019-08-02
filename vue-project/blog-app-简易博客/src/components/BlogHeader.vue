<template>
  <div id="blog-header">
    <nav>
      <ul>
        <li>
          <router-link to="/" exact>博客</router-link>
        </li>
        <li>
          <router-link to="/add" exact>写博客</router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'blog-header',

}
</script>

<style scoped>
nav {
  background: crimson;
  margin-bottom: 40px;
}
ul {
  list-style: none;
  text-align: center;
  padding: 30px 0;
  margin: 0;
}
ul li {
  display: inline-block;
}
a {
  color: #fff;
  text-decoration: none;
  padding: 12px;
  border-radius: 5px;
}
.router-link-active {
  background: rgba(255, 255, 255, .8);
  color: #444;
}
</style>

