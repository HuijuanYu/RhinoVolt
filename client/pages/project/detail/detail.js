Page({
  data: {
    project: {
      id: '1',
      name: '城市轨道交通1号线一期工程',
      code: 'GC2023001',
      owner: '城市轨道交通集团有限公司',
      constructor: '中建一局集团有限公司',
      supervisor: '中交路桥技术有限公司',
      designer: '中铁工程设计咨询集团有限公司',
      location: '城市中心区域',
      cost: '500000万元',
      progress: 65,
      startDate: '2023-01-01',
      endDate: '2025-12-31',
      actualStartDate: '2023-01-15',
      estimatedEndDate: '2026-03-31',
      status: 'in_progress',
      companies: [
        {
          id: '1',
          name: '城市轨道交通集团有限公司',
          type: '建设单位',
          contact: '张三',
          phone: '13800138001'
        },
        {
          id: '2',
          name: '中建一局集团有限公司',
          type: '施工单位',
          contact: '李四',
          phone: '13900139001'
        },
        {
          id: '3',
          name: '中交路桥技术有限公司',
          type: '监理单位',
          contact: '王五',
          phone: '13700137001'
        },
        {
          id: '4',
          name: '中铁工程设计咨询集团有限公司',
          type: '设计单位',
          contact: '赵六',
          phone: '13600136001'
        }
      ],
      milestones: [
        {
          id: '1',
          title: '工程开工',
          description: '举行开工仪式，正式开始工程建设',
          date: '2023-01-15',
          status: 'completed'
        },
        {
          id: '2',
          title: '车站主体结构施工',
          description: '完成所有车站主体结构的施工',
          date: '2023-12-31',
          status: 'completed'
        },
        {
          id: '3',
          title: '区间隧道贯通',
          description: '完成所有区间隧道的贯通',
          date: '2024-06-30',
          status: 'completed'
        },
        {
          id: '4',
          title: '轨道铺设完成',
          description: '完成所有轨道的铺设工作',
          date: '2024-12-31',
          status: 'in_progress'
        },
        {
          id: '5',
          title: '机电设备安装',
          description: '完成所有机电设备的安装',
          date: '2025-06-30',
          status: 'pending'
        },
        {
          id: '6',
          title: '工程竣工验收',
          description: '完成工程的竣工验收',
          date: '2025-12-31',
          status: 'pending'
        }
      ],
      inspections: [
        {
          id: '1',
          title: '车站主体结构检查',
          date: '2024-01-15',
          result: 'pass'
        },
        {
          id: '2',
          title: '区间隧道质量检查',
          date: '2024-07-10',
          result: 'pass'
        },
        {
          id: '3',
          title: '轨道铺设质量检查',
          date: '2024-12-05',
          result: 'fail'
        }
      ]
    }
  },

  onLoad: function(options) {
    // 从页面参数中获取工程ID
    const projectId = options.id;
    console.log('工程ID:', projectId);
    
    // 这里可以根据projectId从服务器获取工程详情数据
    // 目前使用模拟数据
    this.loadProjectDetail(projectId);
    
    // 检查登录状态
    this.checkLoginStatus();
  },

  // 加载工程详情数据
  loadProjectDetail: function(projectId) {
    // 模拟从服务器获取数据
    // 实际项目中应该调用API
    console.log('加载工程详情:', projectId);
    
    // 这里可以根据projectId获取对应工程的数据
    // 目前使用固定的模拟数据
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

  // 开始巡检
  handleStartInspection: function() {
    const projectId = this.data.project.id;
    wx.navigateTo({
      url: `/pages/inspection/inspection?projectId=${projectId}&projectName=${this.data.project.name}`
    });
  },

  // 编辑工程
  handleEditProject: function() {
    const projectId = this.data.project.id;
    wx.navigateTo({
      url: `/pages/project/edit/edit?id=${projectId}`
    });
  },

  // 查看文档
  handleViewDocuments: function() {
    const projectId = this.data.project.id;
    wx.navigateTo({
      url: `/pages/document/document?projectId=${projectId}&projectName=${this.data.project.name}`
    });
  },

  // 返回上一页
  handleBack: function() {
    wx.navigateBack();
  }
});