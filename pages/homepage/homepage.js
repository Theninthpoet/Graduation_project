const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden:false,
    // user_Info: {}, // 用户公开信息
    hasUserInfo: false // 是否获取了用户公开信息
  },

  onLoad: function (options) {
  },
  getUserProfile: function () {
    let that = this
    wx.getUserProfile({
      desc: '获取你的昵称、头像、地区及性别',
      success: res => {
        console.log(res)
        that.setData({
          hidden: true,
          userInfo: res.userInfo,
          hasUserInfo: true
        })
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
  }
})