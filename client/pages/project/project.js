// project.js
const app = getApp();

Page({
  data: {
    projects: [],
    filteredProjects: [],
    searchText: '',
    currentFilter: 'all',
    loading: false
  },

  // 生命周期函数：页面加载
  onLoad() {
    this.loadProjects();
  },

  // 页面显示时刷新
  onShow() {
    this.loadProjects();
  },

  // 加载工程列表
  loadProjects() {
    this.setData({ loading: true });
    
    const apiUrl = `${app.globalData.apiUrl}/api/projects`;
    const token = wx.getStorageSync('token');
    
    console.log('请求URL:', apiUrl);
    console.log('Token:', token ? '存在' : '不存在');
    
    wx.request({
      url: apiUrl,
      method: 'GET',
      header: {
        'Authorization': `Bearer ${token}`
      },
      success: (res) => {
        console.log('响应:', res);
        if (res.data.success) {
          // 转换数据格式
          const projects = res.data.data.map(item => ({
            id: item.id.toString(),
            name: item.name,
            owner: item.owner || '',
            constructor: item.constructor || '',
            supervisor: item.supervisor || '',
            startDate: item.start_date || '',
            endDate: item.end_date || '',
            progress: item.progress || 0,
            status: item.status || 'ongoing',
            location: item.location || '',
            description: item.description || ''
          }));
          
          this.setData({
            projects: projects,
            filteredProjects: projects,
            loading: false
          });
        } else {
          this.setData({ loading: false });
          wx.showToast({
            title: res.data.error || '加载失败',
            icon: 'none'
          });
        }
      },
      fail: (err) => {
        console.error('加载工程列表失败:', err);
        this.setData({ loading: false });
        wx.showModal({
          title: '网络错误',
          content: '无法连接到服务器，请检查：\n1. 电脑IP是否为 192.168.1.9\n2. 手机和电脑是否在同一WiFi\n3. 后端服务是否运行',
          showCancel: false
        });
      }
    });
  },

  // 绑定搜索输入
  bindSearchInput(e) {
    this.setData({
      searchText: e.detail.value
    });
  },

  // 处理搜索
  handleSearch() {
    this.filterProjects();
  },

  // 处理状态筛选
  handleFilter(e) {
    const status = e.currentTarget.dataset.status;
    this.setData({
      currentFilter: status
    });
    this.filterProjects();
  },

  // 筛选工程
  filterProjects() {
    const { projects, searchText, currentFilter } = this.data;
    
    let filtered = projects;
    
    // 按状态筛选
    if (currentFilter !== 'all') {
      filtered = filtered.filter(project => project.status === currentFilter);
    }
    
    // 按搜索文本筛选
    if (searchText) {
      const searchLower = searchText.toLowerCase();
      filtered = filtered.filter(project => 
        project.name.toLowerCase().includes(searchLower) ||
        project.owner.toLowerCase().includes(searchLower) ||
        project.constructor.toLowerCase().includes(searchLower)
      );
    }
    
    this.setData({
      filteredProjects: filtered
    });
  },

  // 获取状态颜色
  getStatusColor(status) {
    switch (status) {
      case 'ongoing':
        return '#1890ff';
      case 'completed':
        return '#52c41a';
      case 'delayed':
        return '#ff4d4f';
      case 'planning':
        return '#faad14';
      default:
        return '#666666';
    }
  },

  // 获取状态文本
  getStatusText(status) {
    switch (status) {
      case 'ongoing':
        return '进行中';
      case 'completed':
        return '已完成';
      case 'delayed':
        return '延期';
      case 'planning':
        return '规划中';
      default:
        return '未知';
    }
  },

  // 跳转到工程详情页面
  navigateToProjectDetail(e) {
    const projectId = e.currentTarget.dataset.projectId;
    wx.navigateTo({
      url: `../project/detail/detail?id=${projectId}`
    });
  },

  // 查看工程详情
  handleViewDetail(e) {
    e.stopPropagation();
    const projectId = e.currentTarget.dataset.projectId;
    wx.navigateTo({
      url: `../project/detail/detail?id=${projectId}`
    });
  },

  // 编辑工程
  handleEditProject(e) {
    e.stopPropagation();
    const projectId = e.currentTarget.dataset.projectId;
    wx.navigateTo({
      url: `../project/edit/edit?id=${projectId}`
    });
  },

  // 添加工程
  handleAddProject() {
    wx.navigateTo({
      url: '../project/edit/edit'
    });
  }
});