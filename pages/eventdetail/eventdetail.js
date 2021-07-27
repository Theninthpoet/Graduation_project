const db = wx.cloud.database({
  env:"yxc-project-0gpprif4ff665fe3"
})
const _ = db.command

Page({
  data: {
    disabled:false,
    time:30 * 60 * 60 * 1000,// 小时 分 秒 毫秒
    id:"",
    num:0,//参与活动的人数
    show:false
  },

//关闭弹出层
onClose() {
  this.setData({ show: false });
},
//把活动加入我的活动列表 并加入活动和人员对应的表
intothelist:function(){
  let that = this
  db.collection('my_activities').where({
    activity_id:that.data.id
  }).get({
    success:function(res){
      console.log(res)
      if(res.data == ""){
        db.collection('my_activities').add({
          data:{
          activity_name:that.data.r_name,
          activity_src:that.data.r_img,
          activity_time:that.data.r_s_time,
          activity_id:that.data.id,
          activity_address:that.data.r_address,
          activity_checked:""    
          },success:function(res){
            console.log('报名成功',res)
            wx.showToast({
              title: '报名成功',
            })
          },fail:function(res){
            console.log('报名失败',res)
          }
        })
        // 点击后把button设置为禁用
        that.setData({
          disabled:!that.data.disabled,
          show:true
        })  
        //加入活动和人的关系对应表
        db.collection("participate_in").add({
          data:{
            p_a_id:that.data.id,
            p_p_id:this.openid,
            p_a_name:that.data.r_name
          }
        }).then(res=>{
          console.log("openid 和活动id加入成功")
        })

      }else{
        wx.showToast({
          title: '已报名该活动',
          icon:'none'
        })
      }
    },fail:function(res){
      console.log("失败了")
    }
  })
  
},

//倒计时
onChange(e) {
  this.setData({
    timeData: e.detail,
  });
},

  /**
   * 生命周期函数--监听页面加载
   */
  
  onLoad: async function (options) {
    console.log("open id",this.openid = await getApp().getOpenid())
    let that = this
    console.log('活动信息获取成功',options.id)
    db.collection("recent_activities").doc(options.id)
    .get()
    .then(res=>{
      //时间戳相减操作
      var time=(new Date(res.data.r_stime).getTime())
      
      console.log("数据库获得的时间戳",time)
      time = time/1000
      var timestamp = Date.parse(new Date());  
      timestamp = timestamp / 1000;  //当前时间戳
      console.log("当前时间戳为：" + timestamp); 
     var tim = (time-timestamp)*1000
     console.log("相减得到",tim)
      //
      that.setData({
        data:res.data,
        r_name:res.data.r_name,
        r_img:res.data.r_img,
        r_s_time:res.data.r_s_time,
        r_address:res.data.r_address,
        id:res.data._id,
        time:tim
      })  
      
    })
    
   // 获取活动参与的人数    考虑写进云函数
    db.collection("participate_in").where({
      p_a_id:this.data.id
    }).count()
    .then(res=>{
      console.log("活动id",this.data.id)
      console.log("参与人数为：",res)
    })
  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})