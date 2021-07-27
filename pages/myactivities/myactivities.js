const db = wx.cloud.database({
  env:"yxc-project-0gpprif4ff665fe3"
})
const _= db.command
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activities:[],
    delet_id:[]
  },
    // 选择事件
xuanze:function(e){
  let that = this
      console.log(e)
      that.setData({
        delet_id:that.data.delet_id.concat(e.detail.value[0])
      })
      if(e.detail.value.length !== 0){
        db.collection('my_activities').doc(e.target.dataset.id).update({
          data:{
            activity_checked:"true"
          },success:function(res){
            that.onLoad()
            console.log("check更改成功")
          }
        })
      }else{
        db.collection('my_activities').doc(e.target.dataset.id).update({
          data:{
            product_checked:""
          },success:function(){
            that.onLoad()
          }
        })
      }
    },
  // 活动删除
  delete:function(){
    let that = this
    wx.cloud.callFunction({
      name:"activityDelet",
      success:function(res){
        console.log('退出成功',res)
        that.onLoad()
      },fail:function(res){
        console.log('退出失败',res)
      }
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    db.collection('my_activities').get({
      success:function(res){
        console.log('活动列表获取成功',res)
        that.setData({
          activities:res.data,
        })
      },fail:function(res){
        console.log('活动列表获取失败',res)
      }
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
    let that = this
    db.collection('my_activities').get({
      success:function(res){
        console.log('更新成功',res)
        that.setData({
          activities:res.data,
        })
      },fail:function(res){
        console.log('更新失败',res)
      }
    })
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