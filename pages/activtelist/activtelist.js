const db = wx.cloud.database({
  env:"yxc-project-0gpprif4ff665fe3"
})
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value:'',
    datalist:[],
    search:[]
  },
//实现搜索

search:function(e){
  let that = this
  console.log(e.detail.value,"接受到的输入框")
  db.collection("recent_activities").where({
    r_name:e.detail.value
  }).get({
    success:function(res){
      that.setData({
        search:res.data
      })
      console.log('搜索成功')
      if(that.data.search ==""){
        wx.showToast({
          title: '未找到该活动',
          icon:"none"
        })
      }
    },
    fail:function(res){
      console.log('搜索失败')
    },
  })
},

// 实现下滑触底加载
  getData(num=6,page=0){
    wx.cloud.callFunction({
      name:"getActivity",
      data:{
        num:num,
        page:page
      }
    }).then(res=>{
      //console.log(res.result.data)
      var oldData = this.data.datalist
      var newData = oldData.concat(res.result.data);
      this.setData({
        datalist : newData
      })
    })
  },



    /**
   * 生命周期函数--监听页面加载
   */
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
    var page = this.data.datalist.length
    this.getData(5,page)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})