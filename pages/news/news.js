const db =wx.cloud.database({
  env:"yxc-project-0gpprif4ff665fe3"
})
Page({

  /**
   * 页面的初始数据
   */
  data: {
      active:0,
      newslist_1:[],
      newslist_2:[],
      newslist_3:[]
  },
  getData(num=6,page=0){
    wx.cloud.callFunction({
      name:"getNews1",
      data:{
        num:num,
        page:page
      }
    }).then(res=>{
      //console.log(res.result.data)
      var oldData = this.data.newslist_1
      var newData = oldData.concat(res.result.data);
      this.setData({
        newslist_1 : newData
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
//头部标签函数
  // onChange(event) {
  //   wx.showToast({
  //     title: ` ${event.detail.name}`,
  //     icon: 'none',
  //   });
  // },
  onLoad: function (options) {
    this.getData()
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
    var page = this.data.newslist_1.length
    this.getData(5,page)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})