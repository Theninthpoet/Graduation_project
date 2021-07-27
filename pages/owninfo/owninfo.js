const db = wx.cloud.database({
  env:"yxc-project-0gpprif4ff665fe3"
})

Page({

  /**
   * 页面的初始数据
   */
  data: {
    show_tips:"true",
    disabled:"",
    show_t:"false",
    value:"",
    name:"",
    s_number:"",
    phone:"",
    college:"",//学院名
    show: false,
    actions: [
      {
        name: '计算机学院',
      },
      {
        name: '软件学院',
      },
      {
        name: '网络空间安全学院',
      },
      {
        name: '文学与新闻学院',
      },
      {
        name: '艺术学院',
      },
      {
        name: '化学学院',
      },
      {
        name: '外国语学院',
      },
      {
        name: '历史文化旅游学院',
      },
      {
        name: '艺术学院',
      },
      {
        name: '艺术学院',
      },
    ],
    date: '',
    cal_show: false,
    minDate: new Date(2017, 0, 1).getTime(),
    maxDate: new Date(2021, 0, 31).getTime(),
  },
  //开头提示框
  onCloseTips() {
    this.setData({ show_tips: false });
  },
    //重置表单
    delbtnre(){
      this.setData({
        value:"",
        name:"",
        college:"",
        date:""
      })
    },
  //选择学院js
  onTap(){
    this.setData({
      show:true
    })
  },
  onClose() {
    this.setData({ show: false });
  },
  onSelect(event) {
    console.log(event.detail);
    this.setData({
      college:event.detail.name
    })
  },
  //文本框填写
  onChange_n(event) {
    // event.detail 为当前输入的值
    console.log(event.detail);
  },
  onChange_s(event) {
    // event.detail 为当前输入的值
    console.log(event.detail);
  },
  onChange_p(event) {
    // event.detail 为当前输入的值
    console.log(event.detail);
  },
  onChange_i(event) {
    // event.detail 为当前输入的值
    console.log(event.detail);
  },
  //日历选择
  onDisplay() {
    this.setData({ cal_show: true });
  },
  OnClose() {
    this.setData({ cal_show: false });
  },
  formatDate(date) {
    date = new Date(date);
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  },
  onConfirm(event) {
    this.setData({
      cal_show: false,
      date: this.formatDate(event.detail),
    });
  },
  btnSub:function(event){
    var{m_name,m_snumber,m_phone,m_info}=event.detail.value
    console.log(event.detail)
    var date = event.detail.date
    db.collection("my_info").add({
      data:{
        m_name:m_name,
        m_snumber:m_snumber,
        m_phone:m_phone,
        m_info:m_info,
        m_college:this.data.college,
        m_time:this.data.date,
      }
    }).then(res=>{
     wx.showToast({
       title: '提交成功',
       duration: 1000,
      icon:"success",
       mask: true,
     })
     this.setData({
      disabled:"true"
     })
    wx.reLaunch({
      url: '/pages/index/index',
    })
    })
    
  },
//判断该openid 是否填写过信息
 judgefunc:function(){
  db.collection("my_info").get()
  .then(res=>{
    console.log("页面的openid",this.openid)
    //console.log("数据库",res.data[0]._openid)
    if(this.openid == res.data[0]._openid){
      console.log("从数据库读出的",res.data[0].openid)
      this.setData({
        disabled:"true"
      })
    }
    wx.showToast({
      title: '您已填写',
      icon: 'error',
      duration: 2000
    })
    wx.reLaunch({
      url: '/pages/index/index',
    })
  })
 },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function () {
    console.log(this.openid = await getApp().getOpenid())
    this.judgefunc()
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