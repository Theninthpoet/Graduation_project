// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database({
  env:"yxc-project-0gpprif4ff665fe3"
})
// 云函数入口函数
exports.main = async (event, context) => {
  var num = event.num;
  var page = event.page;
  return await db.collection("r_activities").skip(page).limit(num).get()
  //skip是翻页，里面的个数是指翻多少页
}