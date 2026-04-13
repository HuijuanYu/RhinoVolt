// pages/login/login.js
const app = getApp();

Page({
  data: {
    phone: '',
    password: '',
    loading: false
  },

  onLoad: function() {
    // 检查是否已经登录
    const userInfo = wx.getStorageSync('userInfo');
    if (userInfo) {
      wx.switchTab({
        url: '/pages/index/index'
      });
    }
  },

  // 绑定手机号输入
  bindPhoneInput: function(e) {
    this.setData({
      phone: e.detail.value
    });
  },

  // 绑定密码输入
  bindPasswordInput: function(e) {
    this.setData({
      password: e.detail.value
    });
  },

  // 处理登录
  handleLogin: function() {
    const { phone, password } = this.data;
    
    // 表单验证
    if (!phone) {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none'
      });
      return;
    }
    
    if (!password) {
      wx.showToast({
        title: '请输入密码',
        icon: 'none'
      });
      return;
    }
    
    if (!/^1[3-9]\d{9}$/.test(phone)) {
      wx.showToast({
        title: '手机号格式不正确',
        icon: 'none'
      });
      return;
    }
    
    this.setData({ loading: true });
    
    // 真实登录
    const apiUrl = app.globalData.apiUrl;
    console.log('登录请求URL:', `${apiUrl}/api/login`);
    
    wx.request({
      url: `${apiUrl}/api/login`,
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      data: {
        phone: phone,
        password: password
      },
      success: (res) => {
        this.setData({ loading: false });
        
        if (res.data && res.data.success) {
          const userData = res.data.data;
          
          wx.setStorageSync('userInfo', userData.user);
          wx.setStorageSync('token', userData.token);
          
          wx.showToast({
            title: '登录成功',
            icon: 'success'
          });
          
          setTimeout(() => {
            wx.switchTab({
              url: '/pages/index/index'
            });
          }, 1000);
        } else {
          wx.showToast({
            title: res.data.error || '登录失败',
            icon: 'none'
          });
        }
      },
      fail: (err) => {
        this.setData({ loading: false });
        console.error('登录请求失败:', err);
        console.error('请求URL:', `${apiUrl}/api/login`);
        wx.showModal({
          title: '网络错误',
          content: '无法连接到服务器，请检查：\n1. 电脑和手机是否在同一WiFi\n2. 微信开发者工具是否勾选"不校验合法域名"',
          showCancel: false
        });
      }
    });
  },

  // 跳转到注册页面
  goToRegister: function() {
    wx.navigateTo({
      url: '/pages/register/register'
    });
  },

  // 忘记密码
  forgotPassword: function() {
    wx.showToast({
      title: '请联系管理员重置密码',
      icon: 'none'
    });
  }
});