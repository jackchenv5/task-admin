<template>
  <Home active-name="项目跟踪"></Home>
  <div>
    <h3>Error:你没有当前页面的访问权限！<a :href="homeUrl">回到首页</a></h3>
  </div>
</template>
<script setup>
import Home from './Home.vue'
const homeUrl = import.meta.env.VITE_MAIN_URL
</script>