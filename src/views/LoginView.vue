<template>
    <div class="login-container"> 
       <div class="login-box">
            <div class="login-title">登录</div>
            <div style="margin-top: 25px;text-align:center; height:300px;">
                <el-form :model="admin">
                    <el-form-item class="input-group">
                        <el-input v-model="admin.name" class="input"  prefix-icon="el-icon-user"placeholder="请输入用户名"></el-input>
                    </el-form-item>

                    <el-form-item class="input-group">                        <!--show-password表示可以隐藏密码-->
                        <el-input v-model="admin.password" show-password prefix-icon="el-icon-lock" class="input"placeholder="请输入密码"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button  type="primary" @click="login()" class="login-button">登陆</el-button>
                        <p class="register-link">没有账号？<a href="/register">注册</a></p>
                    </el-form-item>
                </el-form>

            </div>
       </div>
    </div>
</template>

<script>
import request from '@/utils/request';

export default {
    name: 'LoginView',
    data() {
        return {
        admin:{}

        }
        },
        created() {},
        methods: {
            login(){
                request.post("/admin/login",this.admin).then(res =>{
                    if(res.code === '0'){
                        this.$message({
                            message: '登陆成功',
                            type:'success'
                        })                  //key           value
                        localStorage.setItem("user",JSON.stringify(res.data));  //data是用户返回的登陆信息   JSON.stringify(res.data)表示存储为字符串的形式，然后将其存放在localStorage里面
                        this.$router.push("/")

                    }else{
                        this.$message({
                            message:res.msg,
                            type:'error'
                        })

                    }
                })

            }

        }
        
    }
</script>
<style scoped>
.login-container {
  width: 100%;
  height: 100vh;
  background-image: url('https://img.dpm.org.cn/Public/static/themes/image/ld/l1.jpg'); /* 古风背景图片 */
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-box {
  width: 400px;
  padding: 20px;
  height: 400px;
  background: rgba(255, 255, 255, 0.8);
  /* 边框圆角 */
  border-radius: 25px;  

  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.login-title {
  text-align: center;
  font-size: 45px;
  color: #35280b;
  margin-bottom: 25px;
}

.input-group {
  margin-bottom: 10px;
  /* display: flex; */
  align-items: center;
}

.input {
  width: 95%;
  padding: 5px;
  margin-top: 20px;
  border: 1px solid #ddd;
  font-size: 16px;
  
}
.login-button {
margin-top: 30px;
  width: 80%;
  padding-top: 20px;
  padding: 20px;
  background-color: #a47843;
  color: white;
  border: none;
  border-radius: 45px;
  font-size: 18px;
  /* cursor: pointer; */
  transition: background-color 0.3s;
  /* 如何实现按钮往下一点 */
  
}

.login-button:hover {
  background-color: #bdac6e;
}

.register-link a {
  color: #5cb85c;
  text-decoration: none;
}
</style>