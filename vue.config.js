const { defineConfig } = require('@vue/cli-service')
const path = require('path')
const resolve = (dir) => path.join(__dirname, '.', dir)
// console.log(process.env.NODE_ENV)
module.exports = defineConfig({
  transpileDependencies: true,
  // eslint-loader 是否在保存的时候检查
  lintOnSave: false,
  publicPath: process.env.NODE_ENV === 'development' ? '/' : '/',
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [
        // 这个是加上自己的路径,不能使用(如下:alias)中配置的别名路径
        path.resolve(__dirname, "./src/assets/styles/theme/style.less")
      ],
    },
  },
  devServer: {
    port: 8080, // 端口
    host: '', // 开发运行时域名
    proxy: {
      ['/api']: {
        target: 'http://localhost:6080',
        changeOrigin: true,
        // pathRewrite: {
        //   ['/api']: '',
        // },
      },
    },
  },
  chainWebpack: (config) => {
    //修改文件引入自定义路径
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
  }
})
