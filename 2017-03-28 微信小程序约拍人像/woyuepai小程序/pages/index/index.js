//index.js
//获取应用实例
var app = getApp();
Page({
  data: {
    motto: 'Hello World',
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    });
  },
  onLoad: function () {

    wx.request({
         url:"https://www.woyuepai.com/getName",
         header:{
            // "Content-Type":"application/json"
         },
         success:function(res){
             console.log(res.data)
         },
         fail:function(err){
             console.log(err)
         }

     })

    console.log('onLoad');
    var that = this;
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      });
    });
  }
});
