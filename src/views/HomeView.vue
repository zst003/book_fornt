<template>
  <!-- 整个页面的容器 -->
  <div class="home-container">
    <!-- 背景图片容器 -->
    <div class="background-image">
      <!-- 主题标题 -->
      <h1 class="title">欢迎进入智阅书阁后台管理系统</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeView",
};
</script>

<style scoped>
/* 页面容器的样式 */
.home-container {
  width: 100%; /* 容器宽度为100% */
  height: 100vh; /* 容器高度为视口高度 */
  overflow: hidden; /* 隐藏超出容器的内容 */
}

/* 背景图片的样式 */
.background-image {
  width: 100%; /* 图片宽度为100% */
  height: 99%; /* 图片高度为100% */
  background-image: url('../assets/首页背景图.png'); /* 设置背景图片 */
  background-size: cover; /* 背景图片铺满容器 */
  background-position: center; /* 背景图片居中 */
  position: relative; /* 相对定位，为标题提供定位上下文 */
}

/* 主题标题的样式 */
.title {
  color: #fff; /* 标题颜色为白色 */
  font-size: 2em; /* 标题字体大小 */
  text-align: center; /* 标题居中 */
  position: absolute; /* 绝对定位，使其位于图片上方 */
  top: 50%; /* 从顶部偏移50% */
  left: 50%; /* 从左侧偏移50% */
  transform: translate(-50%, -50%); /* 使用transform进行居中定位 */
  padding: 20px; /* 标题的内边距 */
  background-color: rgba(0, 0, 0, 0.5); /* 背景颜色半透明，增加对比度 */
  border-radius: 10px; /* 边框圆角 */
}
</style>
