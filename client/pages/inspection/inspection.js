Page({
  data: {
    // 待巡检任务列表
    pendingTasks: [
      {
        id: '1',
        title: '车站主体结构安全检查',
        projectName: '城市轨道交通1号线一期工程',
        type: '安全检查',
        planTime: '2024-02-20 09:00',
        area: '1号车站主体结构',
        status: 'pending'
      },
      {
        id: '2',
        title: '区间隧道防水质量检查',
        projectName: '城市轨道交通1号线一期工程',
        type: '质量检查',
        planTime: '2024-02-21 14:00',
        area: '1-2号区间隧道',
        status: 'pending'
      },
      {
        id: '3',
        title: '轨道铺设精度检查',
        projectName: '城市轨道交通1号线一期工程',
        type: '精度检查',
        planTime: '2024-02-22 10:00',
        area: '2号车站至3号车站轨道',
        status: 'pending'
      }
    ],
    
    // 已完成巡检任务列表
    completedTasks: [
      {
        id: '4',
        title: '车站主体结构检查',
        projectName: '城市轨道交通1号线一期工程',
        type: '安全检查',
        planTime: '2024-02-15 09:00',
        completeTime: '2024-02-15 11:30',
        area: '1号车站主体结构',
        result: 'pass',
        status: 'completed'
      },
      {
        id: '5',
        title: '区间隧道质量检查',
        projectName: '城市轨道交通1号线一期工程',
        type: '质量检查',
        planTime: '2024-02-18 14:00',
        completeTime: '2024-02-18 16:00',
        area: '1-2号区间隧道',
        result: 'pass',
        status: 'completed'
      },
      {
        id: '6',
        title: '轨道铺设质量检查',
        projectName: '城市轨道交通1号线一期工程',
        type: '质量检查',
        planTime: '2024-02-19 10:00',
        completeTime: '2024-02-19 12:00',
        area: '2号车站至3号车站轨道',
        result: 'fail',
        status: 'completed'
      }
    ]
  },

  onLoad: function(options) {
    // 从页面参数中获取工程ID和名称（如果有）
    const projectId = options.projectId;
    const projectName = options.projectName;
    console.log('工程ID:', projectId);
    console.log('工程名称:', projectName);
    
    // 这里可以根据projectId筛选巡检任务
    if (projectId) {
      this.filterTasksByProject(projectId);
    }
    
    // 检查登录状态
    this.checkLoginStatus();
  },

  // 检查登录状态
  checkLoginStatus: function() {
    const userInfo = wx.getStorageSync('userInfo');
    if (!userInfo) {
      wx.redirectTo({
        url: '/pages/login/login'
      });
    }
  },

  // 根据工程ID筛选任务
  filterTasksByProject: function(projectId) {
    // 模拟根据工程ID筛选任务
    console.log('根据工程ID筛选任务:', projectId);
    // 实际项目中应该调用API获取对应工程的巡检任务
  },

  // 开始巡检
  startInspection: function(e) {
    const taskId = e.currentTarget.dataset.id;
    console.log('开始巡检，任务ID:', taskId);
    
    // 跳转到巡检详情页面
    wx.navigateTo({
      url: `/pages/inspection/detail/detail?id=${taskId}`
    });
  },

  // 查看任务详情
  viewTaskDetail: function(e) {
    const taskId = e.currentTarget.dataset.id;
    console.log('查看任务详情，任务ID:', taskId);
    
    // 跳转到任务详情页面
    wx.navigateTo({
      url: `/pages/inspection/detail/detail?id=${taskId}&viewOnly=true`
    });
  },

  // 查看巡检记录
  viewInspectionRecord: function(e) {
    const taskId = e.currentTarget.dataset.id;
    console.log('查看巡检记录，任务ID:', taskId);
    
    // 跳转到巡检记录详情页面
    wx.navigateTo({
      url: `/pages/inspection/record/record?id=${taskId}`
    });
  },

  // 新建巡检任务
  createInspectionTask: function() {
    console.log('新建巡检任务');
    
    // 跳转到新建巡检任务页面
    wx.navigateTo({
      url: '/pages/inspection/create/create'
    });
  },

  // 页面刷新
  onPullDownRefresh: function() {
    console.log('页面刷新');
    // 重新加载巡检任务列表
    this.loadInspectionTasks();
    // 停止下拉刷新
    wx.stopPullDownRefresh();
  },

  // 加载巡检任务列表
  loadInspectionTasks: function() {
    console.log('加载巡检任务列表');
    // 模拟从服务器获取数据
    // 实际项目中应该调用API
    
    // 这里可以添加加载动画
    wx.showLoading({
      title: '加载中...'
    });
    
    // 模拟网络请求延迟
    setTimeout(() => {
      // 模拟数据加载完成
      console.log('巡检任务列表加载完成');
      wx.hideLoading();
    }, 1000);
  }
});