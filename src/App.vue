<template>
  <div id="app">
    <!-- 路由的跳转 -->
     <router-view/>
   
  </div>
</template>

<script>
import router from './router';

export default {
  name: 'App',
  methods: {
    // handleOpen() {
    // },
    // handleClose() {
    // }
  }
}
</script>

<style>

</style>
<!--登录的话
测试账户：admin3
密码：admin3
-->