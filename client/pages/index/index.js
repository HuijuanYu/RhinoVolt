// index.js
Page({
  data: {
    userInfo: {},
    todoList: [],
    recentProjects: []
  },

  // 生命周期函数：页面加载
  onLoad() {
    this.checkLoginStatus();
    this.loadTodoList();
    this.loadRecentProjects();
  },

  // 检查登录状态
  checkLoginStatus() {
    // 从存储中获取用户信息（登录时存的是storage）
    const userInfo = wx.getStorageSync('userInfo');
    if (userInfo) {
      this.setData({
        userInfo: userInfo
      });
    } else {
      // 未登录，跳转到登录页
      wx.redirectTo({
        url: '../login/login'
      });
    }
  },

  // 加载待办事项
  loadTodoList() {
    // 模拟待办事项数据
    const todoList = [
      {
        id: '1',
        title: '检查3#楼混凝土浇筑质量',
        time: '2024-02-18 09:00',
        status: 'urgent'
      },
      {
        id: '2',
        title: '审核施工单位提交的进度计划',
        time: '2024-02-18 14:00',
        status: 'normal'
      },
      {
        id: '3',
        title: '参加周例会',
        time: '2024-02-19 10:00',
        status: 'normal'
      }
    ];
    
    this.setData({
      todoList: todoList
    });
  },

  // 加载最近工程
  loadRecentProjects() {
    // 模拟最近工程数据
    const recentProjects = [
      {
        id: '1',
        name: 'XX住宅小区一期工程',
        progress: 75
      },
      {
        id: '2',
        name: 'XX商业综合体项目',
        progress: 45
      },
      {
        id: '3',
        name: 'XX道路改造工程',
        progress: 60
      }
    ];
    
    this.setData({
      recentProjects: recentProjects
    });
  },

  // 处理退出登录
  handleLogout() {
    wx.showModal({
      title: '退出登录',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          // 调用App实例的登出方法
          getApp().logout();
          
          // 跳转到登录页
          wx.redirectTo({
            url: '../login/login'
          });
        }
      }
    });
  },

  // 跳转到工程管理页面
  navigateToProject() {
    wx.switchTab({
      url: '../project/project'
    });
  },

  // 跳转到巡检页面
  navigateToInspection() {
    wx.switchTab({
      url: '../inspection/inspection'
    });
  },

  // 跳转到文档管理页面
  navigateToDocument() {
    wx.switchTab({
      url: '../document/document'
    });
  },

  // 跳转到审批页面
  navigateToApproval() {
    wx.navigateTo({
      url: '../approval/approval'
    });
  },

  // 跳转到工地概况页面
  navigateToSiteOverview() {
    wx.navigateTo({
      url: '../supervision/siteOverview/siteOverview'
    });
  },

  // 跳转到监理工作依据页面
  navigateToWorkBasis() {
    wx.navigateTo({
      url: '../supervision/workBasis/workBasis'
    });
  },

  // 跳转到工程特点分析页面
  navigateToProjectFeatures() {
    wx.navigateTo({
      url: '../supervision/projectFeatures/projectFeatures'
    });
  },

  // 跳转到监理工作流程页面
  navigateToWorkFlow() {
    wx.navigateTo({
      url: '../supervision/workFlow/workFlow'
    });
  },

  // 跳转到监理工作方法页面
  navigateToWorkMethod() {
    wx.navigateTo({
      url: '../supervision/workMethod/workMethod'
    });
  },

  // 跳转到监理工作措施页面
  navigateToWorkMeasure() {
    wx.navigateTo({
      url: '../supervision/workMeasure/workMeasure'
    });
  },

  // 跳转到质量控制页面
  navigateToQualityControl() {
    wx.navigateTo({
      url: '../supervision/qualityControl/qualityControl'
    });
  },

  // 跳转到进度控制页面
  navigateToScheduleControl() {
    wx.navigateTo({
      url: '../supervision/scheduleControl/scheduleControl'
    });
  },

  // 生命周期函数：页面显示
  onShow() {
    // 页面显示时，重新检查登录状态
    this.checkLoginStatus();
  }
});