const db = wx.cloud.database({
  env:"yxc-project-0gpprif4ff665fe3"
})
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newslist:[],
    activitylist:[]
  },
  yourFunc: function(){
    console.log("openid2是",this.openid)
  },
  //拿近期新闻里的数据
  getNews(num=6,page=0){
    wx.cloud.callFunction({
      name:"getRNews",
      data:{
        num:num,
        page:page
      }
    }).then(res=>{
      console.log(res.result.data)
      var oldData = this.data.newslist
      var newData = oldData.concat(res.result.data);
      this.setData({
        newslist : newData
      })
    })
  },
  //拿近期活动的数据
  getActivity(num=6,page=0){
    wx.cloud.callFunction({
      name:"getRActivity",
      data:{
        num:num,
        page:page
      }
    }).then(res=>{
      console.log(res.result.data)
      var oldData = this.data.activitylist
      var newData = oldData.concat(res.result.data);
      this.setData({
        activitylist : newData
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function () {
     console.log("open id 是",this.openid = await getApp().getOpenid())
     this.getNews()
     this.getActivity()
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