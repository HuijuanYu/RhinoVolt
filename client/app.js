// app.js
App({
  onLaunch() {
    // 小程序初始化时执行
    console.log('小程序启动');
    
    // 检查本地存储的登录状态
    const userInfo = wx.getStorageSync('userInfo');
    if (userInfo) {
      this.globalData.userInfo = userInfo;
    }
  },
  
  onShow() {
    // 小程序显示时执行
    console.log('小程序显示');
  },
  
  onHide() {
    // 小程序隐藏时执行
    console.log('小程序隐藏');
  },
  
  globalData: {
    userInfo: null, // 用户信息
    currentProject: null, // 当前工程
    apiUrl: 'https://theatrically-noncontrolled-eliana.ngrok-free.dev' // API接口地址（ngrok公网隧道）
  },
  
  // 登录方法
  login(userInfo) {
    this.globalData.userInfo = userInfo;
    wx.setStorageSync('userInfo', userInfo);
  },
  
  // 登出方法
  logout() {
    this.globalData.userInfo = null;
    this.globalData.currentProject = null;
    wx.removeStorageSync('userInfo');
  }
});