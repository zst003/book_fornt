<template>
    <div class="register-container"> 
       <div class="register-box">
            <!-- Logo和标题 -->
            <div class="register-header">
                <img src="@/assets/图标.png" class="logo" alt="logo">
                <h2 class="register-title">用户注册</h2>
                <p class="register-subtitle">创建您的智阅书阁账号</p>
            </div>
            
            <!-- 注册表单 -->
            <el-form :model="admin" :rules="rules" ref="registerForm" class="register-form">
                <el-form-item prop="name">
                    <el-input 
                        v-model="admin.name" 
                        prefix-icon="el-icon-user" 
                        placeholder="请输入用户名"
                        size="large"
                        class="custom-input">
                    </el-input>
                </el-form-item>

                <el-form-item prop="password">
                    <el-input 
                        v-model="admin.password" 
                        show-password 
                        prefix-icon="el-icon-lock" 
                        placeholder="请输入密码（6-20位）"
                        size="large"
                        class="custom-input">
                    </el-input>
                </el-form-item>

                <el-form-item prop="confirmPassword">
                    <el-input 
                        v-model="admin.confirmPassword" 
                        show-password 
                        prefix-icon="el-icon-lock" 
                        placeholder="请确认密码"
                        size="large"
                        class="custom-input"
                        @keyup.enter.native="register">
                    </el-input>
                </el-form-item>

                <el-form-item>
                    <el-button  
                        type="primary" 
                        @click="register()" 
                        class="register-button"
                        size="large"
                        :loading="loading">
                        {{ loading ? '注册中...' : '注 册' }}
                    </el-button>
                </el-form-item>
                
                <div class="login-link">
                    <span>已有账号？</span>
                    <router-link to="/login">立即登录</router-link>
                </div>
            </el-form>
       </div>
    </div>
</template>

<script>
import request from '@/utils/request';

export default {
    name: 'RegisterView',
    data() {
        // 自定义验证：确认密码
        const validateConfirmPassword = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.admin.password) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };

        return {
            admin: {
                name: '',
                password: '',
                confirmPassword: ''
            },
            loading: false,
            rules: {
                name: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
                ],
                confirmPassword: [
                    { validator: validateConfirmPassword, trigger: 'blur' }
                ]
            }
        }
    },
    created() {},
    methods: {
        register(){
            // 表单验证
            this.$refs.registerForm.validate((valid) => {
                if (valid) {
                    this.loading = true;
                    // 提交时只发送用户名和密码
                    const registerData = {
                        name: this.admin.name,
                        password: this.admin.password
                    };
                    
                    request.post("/admin/register", registerData).then(res => {
                        if(res.code === '0'){
                            this.$message({
                                message: '注册成功',
                                type: 'success'
                            });
                            // 跳转到登录页
                            this.$router.push("/login");
                        } else {
                            this.$message({
                                message: res.msg,
                                type: 'error'
                            });
                        }
                    }).finally(() => {
                        this.loading = false;
                    });
                } else {
                    return false;
                }
            });
        }
    }
}
</script>

<style scoped>
.register-container {
  width: 100%;
  height: 100vh;
  background: linear-gradient(135deg, #5c2223 0%, #e2c17c 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
}

/* 背景装饰 */
.register-container::before {
  content: '';
  position: absolute;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(226, 193, 124, 0.1) 0%, transparent 70%);
  animation: rotate 30s linear infinite;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.register-box {
  width: 450px;
  padding: 40px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  position: relative;
  z-index: 1;
  animation: slideIn 0.5s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.register-header {
  text-align: center;
  margin-bottom: 30px;
}

.logo {
  width: 60px;
  height: 60px;
  margin-bottom: 10px;
}

.register-title {
  font-size: 32px;
  color: #5c2223;
  margin: 10px 0 5px;
  font-weight: 600;
}

.register-subtitle {
  font-size: 14px;
  color: #999;
  margin: 0;
}

.register-form {
  margin-top: 20px;
}

.custom-input >>> .el-input__inner {
  height: 45px;
  border-radius: 8px;
  border: 1px solid #dcdfe6;
  transition: all 0.3s;
}

.custom-input >>> .el-input__inner:focus {
  border-color: #e2c17c;
  box-shadow: 0 0 0 2px rgba(226, 193, 124, 0.2);
}

.register-button {
  width: 100%;
  height: 45px;
  background: linear-gradient(135deg, #e2c17c 0%, #a47843 100%);
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  color: white;
  cursor: pointer;
  transition: all 0.3s;
  margin-top: 10px;
}

.register-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(226, 193, 124, 0.4);
}

.register-button:active {
  transform: translateY(0);
}

.login-link {
  text-align: center;
  margin-top: 20px;
  font-size: 14px;
  color: #666;
}

.login-link a {
  color: #5c2223;
  text-decoration: none;
  font-weight: 600;
  margin-left: 5px;
  transition: color 0.3s;
}

.login-link a:hover {
  color: #e2c17c;
  text-decoration: underline;
}
</style>