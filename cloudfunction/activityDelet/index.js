// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database({
  env:"yxc-project-0gpprif4ff665fe3"
})
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  try{
    return await db.collection('my_activities').where({
      activity_checked:"true"
    }).remove()
  }catch(e){
    console.error(e);
  }
}