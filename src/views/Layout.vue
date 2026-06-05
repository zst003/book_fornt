<template>
     <!-- Header -->
    <div>
      <!-- el-container 包裹整个页面 -->
        <el-container>  
      <el-header style="background-color: #e2c17c">
        <!-- position: relative;top: 10px;  让图标和文字垂直居中 -->
        <img src="@/assets/图标.png" style="width: 30px;position: relative;top: 10px;">
        <span style="font-size:25px;margin-left: 15px;color: #fff">智阅书阁后台管理系统</span>
        <el-dropdown style="float: right;height: 60px; line-height: 60px;">
            <span class="el-dropdown-link" style="color: white; font-size:15px ;">{{user.name}}<i class="el-icon-arrow-down el-icon--right"></i></span>
            <el-dropdown-menu slot="dropdown">
              <!-- @click.native：表示点击事件，.native表示绑定原生事件，而不是组件内部的事件。 -->
              <el-dropdown-item @click.native="logout()">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
      </el-header>

    </el-container>

    <!--  Main+Aside-->
    <el-container>
      <el-aside style="overflow: hidden;min-height:100vh; width: 250px;background-color:#5c2223;"> 
        <!-- default-active="$route.path"表示默认选中当前路由 再加上一个router属性，表示使用vue-router  
         vue-router的路由跳转，可以用this.$router.push("/login")，this.$router.replace("/login")，this.$router.go(-1)-->
        <el-menu default-active="$route.path" router class="el-menu-vertical-demo" @open="handleOpen"@close="handleClose" background-color="#5c2223" text-color="#fff" active-text-color="#ffd04b">  <!--active-text-color表示选中菜单项的文字颜色 -->
      <el-menu-item index="/">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>

      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-s-management"></i>
          <span>图书管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/book">图书基本信息</el-menu-item> <!--index="/book"表示点击菜单项后跳转到"/book"页面-->
          <el-menu-item index="/borrow">借阅信息管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-s-custom"></i>
          <span>信息管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/admin">管理员信息</el-menu-item>
          <el-menu-item index="/reader">读者信息</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      
      </el-menu>
      </el-aside>
      <!-- 读取内容 -->
      <el-main>
        <router-view/>
      </el-main>
      
    </el-container>
   
    </div>
</template>

<script>
    export default {
        name: 'Layout',
        data() {
            return {   //判断localStorage.getItem("user")里面是否有东西，如果有东西我就把localStorage.getItem("user")转成JSON给user，如果没有我就给空对象{}
              user:localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}
            }
        },
        //路由
        components: {

        },
        //路由钩子
        methods: {  //
            handleOpen(key, keyPath) {  //打开菜单时触发
              console.log(key, keyPath);
            },
            handleClose(key, keyPath) {  //关闭菜单时触发
              console.log(key, keyPath);
            },
            logout() {  //退出登录
              localStorage.removeItem("user"); //清除localStorage里面的user
              this.$router.push("/login"); //给它一个路由，跳转到登录页面
        }
      }
       
    }
</script>

<style scoped>
.el-menu{
  border-right: none !important;

}
</style>