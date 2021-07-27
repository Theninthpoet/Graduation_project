// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database({
  env:"yxc-project-0gpprif4ff665fe3"
})
const _ = db.command
const $ = _.aggregate

// 云函数入口函数
exports.main = async (event, context) => {
  return await db.collection('participate_in').aggregate()
  .lookup({
    from: 'my_info',
    localField: 'openid',
    foreignField:'openid',
    as:'stuin'
  })
  .match({
    p_a_name:"情满旅途"
  })
  .replaceRoot({
    newRoot:'$stuin'
  })

  .end()
}