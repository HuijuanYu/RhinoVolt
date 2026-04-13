Page({
  data: {
    controlPoints: [
      { id: '1', icon: '📦', name: '材料质量控制', description: '原材料、构配件、设备进场验收' },
      { id: '2', icon: '🔨', name: '工序质量控制', description: '关键工序、特殊工序质量控制' },
      { id: '3', icon: '👁️', name: '隐蔽工程验收', description: '隐蔽工程检查验收管理' },
      { id: '4', icon: '✅', name: '分部分项验收', description: '分部分项工程质量验收' },
      { id: '5', icon: '📊', name: '质量检验检测', description: '见证取样、平行检验' }
    ],
    records: [
      { id: '1', title: '3#楼混凝土浇筑质量检查', status: 'qualified', statusText: '合格', time: '2024-02-18 10:30', checker: '张监理' },
      { id: '2', title: '钢筋绑扎质量检查', status: 'pending', statusText: '待整改', time: '2024-02-17 14:00', checker: '李监理' }
    ],
    issues: [
      { id: '1', title: '墙面平整度不达标', priority: 'high', priorityText: '紧急', description: '2#楼3层墙面平整度偏差超过规范要求', deadline: '2024-02-20', status: 'rectifying', statusText: '整改中' },
      { id: '2', title: '防水层厚度不足', priority: 'medium', priorityText: '一般', description: '屋面防水层厚度未达到设计要求', deadline: '2024-02-25', status: 'pending', statusText: '待整改' }
    ]
  },

  onLoad() {
    console.log('质量控制页面加载');
  },

  navigateToDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.showToast({
      title: '查看详情',
      icon: 'none'
    });
  },

  addRecord() {
    wx.showToast({
      title: '新增记录',
      icon: 'none'
    });
  }
});