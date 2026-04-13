Page({
  data: {
    plans: [
      {
        id: '1',
        name: '土建工程',
        status: 'normal',
        statusText: '正常',
        progress: 60,
        startDate: '2024-01-15',
        endDate: '2024-08-30'
      },
      {
        id: '2',
        name: '设备安装',
        status: 'delay',
        statusText: '滞后',
        progress: 30,
        startDate: '2024-06-01',
        endDate: '2024-12-31'
      },
      {
        id: '3',
        name: '电气安装',
        status: 'normal',
        statusText: '正常',
        progress: 20,
        startDate: '2024-08-01',
        endDate: '2025-03-31'
      },
      {
        id: '4',
        name: '调试运行',
        status: 'pending',
        statusText: '未开始',
        progress: 0,
        startDate: '2025-04-01',
        endDate: '2025-06-30'
      }
    ],
    warnings: [
      {
        id: '1',
        level: 'high',
        levelText: '严重',
        title: '设备安装进度滞后',
        description: '设备到货延迟，预计影响整体工期15天'
      },
      {
        id: '2',
        level: 'medium',
        levelText: '一般',
        title: '施工人员不足',
        description: '电气安装班组人员配置不足，需增加人手'
      }
    ]
  },

  onLoad() {
    console.log('进度控制页面加载');
  }
});