Page({
  data: {
    // 文档列表
    documents: [
      {
        id: '1',
        title: '城市轨道交通1号线一期工程设计说明书',
        category: 'design',
        categoryName: '设计文档',
        projectName: '城市轨道交通1号线一期工程',
        uploadTime: '2024-02-18 10:30',
        uploader: '李四',
        fileSize: '2.5MB',
        needApproval: false,
        approvalStatus: '',
        approvalStatusText: ''
      },
      {
        id: '2',
        title: '车站主体结构施工方案',
        category: 'construction',
        categoryName: '施工文档',
        projectName: '城市轨道交通1号线一期工程',
        uploadTime: '2024-02-17 14:20',
        uploader: '张三',
        fileSize: '1.8MB',
        needApproval: true,
        approvalStatus: 'pending',
        approvalStatusText: '待审批'
      },
      {
        id: '3',
        title: '监理规划大纲',
        category: 'supervision',
        categoryName: '监理文档',
        projectName: '城市轨道交通1号线一期工程',
        uploadTime: '2024-02-16 09:15',
        uploader: '王五',
        fileSize: '3.2MB',
        needApproval: false,
        approvalStatus: '',
        approvalStatusText: ''
      },
      {
        id: '4',
        title: '1号车站主体结构巡检报告',
        category: 'inspection',
        categoryName: '巡检记录',
        projectName: '城市轨道交通1号线一期工程',
        uploadTime: '2024-02-15 16:45',
        uploader: '赵六',
        fileSize: '4.5MB',
        needApproval: false,
        approvalStatus: '',
        approvalStatusText: ''
      },
      {
        id: '5',
        title: '工程进度款支付申请表',
        category: 'approval',
        categoryName: '审批文件',
        projectName: '城市轨道交通1号线一期工程',
        uploadTime: '2024-02-14 11:30',
        uploader: '张三',
        fileSize: '0.8MB',
        needApproval: true,
        approvalStatus: 'approved',
        approvalStatusText: '已审批'
      },
      {
        id: '6',
        title: '区间隧道防水施工方案',
        category: 'construction',
        categoryName: '施工文档',
        projectName: '城市轨道交通1号线一期工程',
        uploadTime: '2024-02-13 15:20',
        uploader: '李四',
        fileSize: '2.1MB',
        needApproval: true,
        approvalStatus: 'rejected',
        approvalStatusText: '已拒绝'
      }
    ],
    
    // 过滤后的文档列表
    filteredDocuments: [],
    
    // 搜索关键词
    searchKeyword: '',
    
    // 当前激活的分类
    activeCategory: 'all'
  },

  onLoad: function(options) {
    // 从页面参数中获取工程ID和名称（如果有）
    const projectId = options.projectId;
    const projectName = options.projectName;
    console.log('工程ID:', projectId);
    console.log('工程名称:', projectName);
    
    // 这里可以根据projectId筛选文档
    if (projectId) {
      this.filterDocumentsByProject(projectId);
    } else {
      // 否则显示所有文档
      this.setData({
        filteredDocuments: this.data.documents
      });
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

  // 根据工程ID筛选文档
  filterDocumentsByProject: function(projectId) {
    // 模拟根据工程ID筛选文档
    console.log('根据工程ID筛选文档:', projectId);
    // 实际项目中应该调用API获取对应工程的文档
    
    // 模拟筛选结果
    const filteredDocuments = this.data.documents.filter(doc => doc.projectName === '城市轨道交通1号线一期工程');
    this.setData({
      filteredDocuments: filteredDocuments
    });
  },

  // 处理搜索输入
  handleSearchInput: function(e) {
    const keyword = e.detail.value;
    this.setData({
      searchKeyword: keyword
    });
  },

  // 处理搜索
  handleSearch: function() {
    const keyword = this.data.searchKeyword;
    const category = this.data.activeCategory;
    this.filterDocuments(keyword, category);
  },

  // 切换分类
  switchCategory: function(e) {
    const category = e.currentTarget.dataset.category;
    this.setData({
      activeCategory: category
    });
    
    // 重新筛选文档
    this.filterDocuments(this.data.searchKeyword, category);
  },

  // 筛选文档
  filterDocuments: function(keyword, category) {
    let filtered = this.data.documents;
    
    // 按分类筛选
    if (category !== 'all') {
      filtered = filtered.filter(doc => doc.category === category);
    }
    
    // 按关键词筛选
    if (keyword) {
      const lowerKeyword = keyword.toLowerCase();
      filtered = filtered.filter(doc => 
        doc.title.toLowerCase().includes(lowerKeyword) ||
        doc.projectName.toLowerCase().includes(lowerKeyword)
      );
    }
    
    this.setData({
      filteredDocuments: filtered
    });
  },

  // 查看文档
  viewDocument: function(e) {
    const docId = e.currentTarget.dataset.id;
    console.log('查看文档，文档ID:', docId);
    
    // 跳转到文档详情页面
    wx.navigateTo({
      url: `/pages/document/detail/detail?id=${docId}`
    });
  },

  // 下载文档
  downloadDocument: function(e) {
    const docId = e.currentTarget.dataset.id;
    console.log('下载文档，文档ID:', docId);
    
    // 模拟下载文档
    wx.showLoading({
      title: '下载中...'
    });
    
    setTimeout(() => {
      wx.hideLoading();
      wx.showToast({
        title: '文档下载成功',
        icon: 'success',
        duration: 1500
      });
    }, 1500);
    
    // 实际项目中应该调用API下载文档
  },

  // 审批文档
  approveDocument: function(e) {
    const docId = e.currentTarget.dataset.id;
    console.log('审批文档，文档ID:', docId);
    
    // 跳转到审批页面
    wx.navigateTo({
      url: `/pages/approval/approval?id=${docId}`
    });
  },

  // 上传文档
  uploadDocument: function() {
    console.log('上传文档');
    
    // 选择文件
    wx.chooseMessageFile({
      count: 1,
      type: 'file',
      success: (res) => {
        const tempFilePaths = res.tempFiles;
        console.log('选择的文件:', tempFilePaths);
        
        // 跳转到上传文档页面
        wx.navigateTo({
          url: `/pages/document/upload/upload?filePath=${tempFilePaths[0].path}&fileName=${tempFilePaths[0].name}`
        });
      }
    });
  },

  // 页面刷新
  onPullDownRefresh: function() {
    console.log('页面刷新');
    // 重新加载文档列表
    this.loadDocuments();
    // 停止下拉刷新
    wx.stopPullDownRefresh();
  },

  // 加载文档列表
  loadDocuments: function() {
    console.log('加载文档列表');
    // 模拟从服务器获取数据
    // 实际项目中应该调用API
    
    // 模拟数据加载完成
    setTimeout(() => {
      console.log('文档列表加载完成');
    }, 1000);
  }
});