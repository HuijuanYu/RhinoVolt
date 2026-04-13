// register.js
Page({
  data: {
    phone: '',
    code: '',
    password: '',
    confirmPassword: '',
    loading: false,
    sendingCode: false,
    countdown: 0,
    timer: null
  },

  bindPhoneInput(e) {
    this.setData({
      phone: e.detail.value
    });
  },

  bindCodeInput(e) {
    this.setData({
      code: e.detail.value
    });
  },

  bindPasswordInput(e) {
    this.setData({
      password: e.detail.value
    });
  },

  bindConfirmPasswordInput(e) {
    this.setData({
      confirmPassword: e.detail.value
    });
  },

  validatePhone(phone) {
    const phoneReg = /^1[3-9]\d{9}$/;
    return phoneReg.test(phone);
  },

  handleSendCode() {
    const { phone, countdown } = this.data;
    
    if (countdown > 0) {
      return;
    }
    
    if (!phone) {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none'
      });
      return;
    }
    
    if (!this.validatePhone(phone)) {
      wx.showToast({
        title: '手机号格式不正确',
        icon: 'none'
      });
      return;
    }
    
    this.setData({
      sendingCode: true
    });
    
    wx.showLoading({
      title: '发送中...'
    });
    
    // TODO: 调用真实发送验证码API
    // 这里先模拟发送成功
    setTimeout(() => {
      wx.hideLoading();
      
      wx.showToast({
        title: '验证码已发送',
        icon: 'success'
      });
      
      this.setData({
        sendingCode: false,
        countdown: 60
      });
      
      this.startCountdown();
    }, 1000);
  },

  startCountdown() {
    const timer = setInterval(() => {
      const { countdown } = this.data;
      
      if (countdown <= 1) {
        clearInterval(timer);
        this.setData({
          countdown: 0,
          timer: null
        });
      } else {
        this.setData({
          countdown: countdown - 1
        });
      }
    }, 1000);
    
    this.setData({
      timer: timer
    });
  },

  handleRegister() {
    const { phone, code, password, confirmPassword } = this.data;
    
    if (!phone) {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none'
      });
      return;
    }
    
    if (!this.validatePhone(phone)) {
      wx.showToast({
        title: '手机号格式不正确',
        icon: 'none'
      });
      return;
    }
    
    /*
    if (!code) {
      wx.showToast({
        title: '请输入验证码',
        icon: 'none'
      });
      return;
    }
    */
    
    if (!password) {
      wx.showToast({
        title: '请输入密码',
        icon: 'none'
      });
      return;
    }
    
    if (password.length < 6) {
      wx.showToast({
        title: '密码长度不能少于6位',
        icon: 'none'
      });
      return;
    }
    
    if (password !== confirmPassword) {
      wx.showToast({
        title: '两次密码输入不一致',
        icon: 'none'
      });
      return;
    }
    
    this.setData({
      loading: true
    });
    
    wx.showLoading({
      title: '注册中...'
    });
    
    const app = getApp();
    const apiUrl = app.globalData.apiUrl;
    
    // 调用真实注册API
    wx.request({
      url: `${apiUrl}/api/register`,
      method: 'POST',
      data: {
        phone: phone,
        password: password,
        name: '监理工程师'
      },
      success: (res) => {
        wx.hideLoading();
        
        if (res.data && res.data.success) {
          // 注册成功，自动登录
          const userInfo = res.data.data.user;
          const token = res.data.data.token;
          
          wx.setStorageSync('userInfo', userInfo);
          wx.setStorageSync('token', token);
          
          app.login(userInfo);
          
          wx.showToast({
            title: '注册成功',
            icon: 'success',
            duration: 2000
          });
          
          setTimeout(() => {
            wx.switchTab({
              url: '../index/index'
            });
          }, 2000);
        } else {
          wx.showToast({
            title: res.data.error || '注册失败',
            icon: 'none'
          });
        }
      },
      fail: (err) => {
        wx.hideLoading();
        wx.showToast({
          title: '网络请求失败',
          icon: 'none'
        });
        console.error('注册失败:', err);
      },
      complete: () => {
        this.setData({
          loading: false
        });
      }
    });
  },

  goToLogin() {
    wx.navigateBack();
  },

  onUnload() {
    const { timer } = this.data;
    if (timer) {
      clearInterval(timer);
    }
  }
});