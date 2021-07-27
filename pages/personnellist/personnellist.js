const db = wx.cloud.database({
  env:"yxc-project-0gpprif4ff665fe3"
})

Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    stuinfo:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    db.collection('qingmanlvtu')
    .get()
    .then(res=>{
      this.setData({
        stuinfo:res.data
      })
    })
    db.collection('zhumeishequ')
    .get()
    .then(res=>{
      this.setData({
        stuinfo2:res.data
      })
    })
    db.collection('ledongshenghuo').get()
    .then(res=>{
      this.setData({
        stuinfo3:res.data
      })
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