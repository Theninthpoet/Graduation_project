// 云函数入口文件
const cloud = require('wx-server-sdk')


cloud.init({
  env:"yxc-project-0gpprif4ff665fe3"
})

// 云函数入口函数
exports.main = async () => {
  return cloud.getWXContext()
}