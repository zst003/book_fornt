<template>
  <div class="home-container">
    <!-- 欢迎横幅区域 -->
    <div class="welcome-banner">
      <div class="banner-content">
        <h1 class="welcome-title">欢迎使用智阅书阁</h1>
        <p class="welcome-subtitle">智能化管理您的图书资源，让阅读更加便捷</p>
        <div class="user-info" v-if="user.name">
          <i class="el-icon-user-solid"></i>
          <span>欢迎您，{{ user.name }}</span>
        </div>
      </div>
    </div>

    <!-- 功能卡片区域 -->
    <div class="features-section">
      <h2 class="section-title">核心功能</h2>
      <div class="cards-container">
        <div class="feature-card" @click="navigateTo('/home/book')">
          <div class="card-icon book-icon">
            <i class="el-icon-collection"></i>
          </div>
          <h3 class="card-title">图书管理</h3>
          <p class="card-description">管理图书基本信息，包括添加、编辑和删除图书</p>
          <div class="card-footer">
            <span>查看详情</span>
            <i class="el-icon-arrow-right"></i>
          </div>
        </div>

        <div class="feature-card" @click="navigateTo('/home/borrow')">
          <div class="card-icon borrow-icon">
            <i class="el-icon-document"></i>
          </div>
          <h3 class="card-title">借阅管理</h3>
          <p class="card-description">处理图书借阅和归还，跟踪借阅状态</p>
          <div class="card-footer">
            <span>查看详情</span>
            <i class="el-icon-arrow-right"></i>
          </div>
        </div>

        <div class="feature-card" @click="navigateTo('/home/reader')">
          <div class="card-icon reader-icon">
            <i class="el-icon-user"></i>
          </div>
          <h3 class="card-title">读者管理</h3>
          <p class="card-description">管理读者信息，维护读者档案</p>
          <div class="card-footer">
            <span>查看详情</span>
            <i class="el-icon-arrow-right"></i>
          </div>
        </div>

        <div class="feature-card" @click="navigateTo('/home/admin')">
          <div class="card-icon admin-icon">
            <i class="el-icon-s-custom"></i>
          </div>
          <h3 class="card-title">管理员管理</h3>
          <p class="card-description">管理系统管理员账号和权限</p>
          <div class="card-footer">
            <span>查看详情</span>
            <i class="el-icon-arrow-right"></i>
          </div>
        </div>
      </div>
    </div>

    <!-- 快捷操作区域 -->
    <div class="quick-actions">
      <h2 class="section-title">快捷操作</h2>
      <div class="actions-grid">
        <el-button type="primary" icon="el-icon-plus" @click="navigateTo('/home/book')">添加图书</el-button>
        <el-button type="success" icon="el-icon-check" @click="navigateTo('/home/borrow')">处理借阅</el-button>
        <el-button type="warning" icon="el-icon-edit" @click="navigateTo('/home/reader')">更新读者信息</el-button>
        <el-button type="info" icon="el-icon-user" @click="navigateTo('/home/admin')">管理员管理</el-button>
      </div>
    </div>

    <!-- 底部信息 -->
    <div class="footer-info">
      <p>© 2026 智阅书阁后台管理系统 - 让阅读更智能</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  data() {
    return {
      user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}
    };
  },
  methods: {
    navigateTo(path) {
      this.$router.push(path);
    }
  }
};
</script>

<style scoped>
.home-container {
  width: 100%;
  min-height: calc(100vh - 60px);
  padding: 0;
}

/* 欢迎横幅样式 */
.welcome-banner {
  background: linear-gradient(135deg, #e2c17c 0%, #d4a84b 100%);
  color: white;
  padding: 60px 40px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.banner-content {
  max-width: 1200px;
  margin: 0 auto;
}

.welcome-title {
  font-size: 42px;
  font-weight: 700;
  margin: 0 0 15px 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.welcome-subtitle {
  font-size: 18px;
  margin: 0 0 20px 0;
  opacity: 0.95;
}

.user-info {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
  background: rgba(255, 255, 255, 0.2);
  padding: 10px 20px;
  border-radius: 25px;
  backdrop-filter: blur(10px);
}

.user-info i {
  font-size: 20px;
}

/* 功能卡片区域 */
.features-section {
  max-width: 1200px;
  margin: 50px auto;
  padding: 0 40px;
}

.section-title {
  font-size: 28px;
  color: #333;
  margin-bottom: 30px;
  text-align: center;
  position: relative;
  padding-bottom: 15px;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 4px;
  background: linear-gradient(135deg, #e2c17c 0%, #d4a84b 100%);
  border-radius: 2px;
}

.cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 25px;
  margin-top: 30px;
}

.feature-card {
  background: white;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  cursor: pointer;
  border: 2px solid transparent;
}

.feature-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
  border-color: #e2c17c;
}

.card-icon {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  font-size: 32px;
  color: white;
}

.book-icon {
  background: linear-gradient(135deg, #e2c17c 0%, #d4a84b 100%);
}

.borrow-icon {
  background: linear-gradient(135deg, #5c2223 0%, #7a3334 100%);
}

.reader-icon {
  background: linear-gradient(135deg, #c9a86c 0%, #b8935a 100%);
}

.admin-icon {
  background: linear-gradient(135deg, #8b6914 0%, #a67c1a 100%);
}

.card-title {
  font-size: 22px;
  color: #333;
  margin: 0 0 12px 0;
  font-weight: 600;
}

.card-description {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  margin: 0 0 20px 0;
}

.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #e2c17c;
  font-size: 14px;
  font-weight: 500;
  padding-top: 15px;
  border-top: 1px solid #eee;
}

.card-footer i {
  transition: transform 0.3s ease;
}

.feature-card:hover .card-footer i {
  transform: translateX(5px);
}

/* 快捷操作区域 */
.quick-actions {
  max-width: 1200px;
  margin: 50px auto;
  padding: 0 40px;
}

.actions-grid {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 30px;
}

.actions-grid .el-button {
  min-width: 160px;
  height: 50px;
  font-size: 16px;
  border-radius: 25px;
  transition: all 0.3s ease;
}

.actions-grid .el-button--primary {
  background: linear-gradient(135deg, #e2c17c 0%, #d4a84b 100%);
  border: none;
}

.actions-grid .el-button--success {
  background: linear-gradient(135deg, #5c2223 0%, #7a3334 100%);
  border: none;
}

.actions-grid .el-button--warning {
  background: linear-gradient(135deg, #c9a86c 0%, #b8935a 100%);
  border: none;
}

.actions-grid .el-button--info {
  background: linear-gradient(135deg, #8b6914 0%, #a67c1a 100%);
  border: none;
}

.actions-grid .el-button:hover {
  transform: scale(1.05);
}

/* 底部信息 */
.footer-info {
  text-align: center;
  padding: 30px;
  color: #999;
  font-size: 14px;
  margin-top: 50px;
  border-top: 1px solid #e0e0e0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .welcome-title {
    font-size: 32px;
  }

  .welcome-subtitle {
    font-size: 16px;
  }

  .cards-container {
    grid-template-columns: 1fr;
  }

  .actions-grid {
    flex-direction: column;
    align-items: center;
  }

  .actions-grid .el-button {
    width: 100%;
    max-width: 300px;
  }
}
</style>
