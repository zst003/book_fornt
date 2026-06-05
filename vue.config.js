const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  devServer:{
    port:8082,  //启动端口号
    open:true   //启动后自动打开网页
  },
  // devServer:{
  // port:8082,  //启动端口号
  // open:true   //启动后自动打开网页
  // },
  transpileDependencies: true

})
