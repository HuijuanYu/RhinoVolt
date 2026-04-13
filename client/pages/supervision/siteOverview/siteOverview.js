Page({
  data: {
    projectInfo: {
      name: 'XX新能源发电项目',
      location: 'XX省XX市XX区',
      scale: '装机容量 100MW',
      type: '光伏发电工程',
      duration: '2024年1月 - 2025年6月',
      investment: '约 5.2 亿元'
    },
    units: [
      {
        type: '建设单位',
        name: 'XX新能源开发有限公司',
        contact: '张经理',
        phone: '138-xxxx-xxxx'
      },
      {
        type: '设计单位',
        name: 'XX电力设计院',
        contact: '李工',
        phone: '139-xxxx-xxxx'
      },
      {
        type: '施工单位',
        name: 'XX电力建设集团有限公司',
        contact: '王经理',
        phone: '137-xxxx-xxxx'
      },
      {
        type: '监理单位',
        name: 'XX工程监理有限公司',
        contact: '刘总监',
        phone: '136-xxxx-xxxx'
      }
    ],
    progress: [
      { label: '总体进度', value: 45 },
      { label: '土建工程', value: 60 },
      { label: '设备安装', value: 30 },
      { label: '电气安装', value: 20 }
    ]
  },

  onLoad() {
    // 页面加载时执行
    console.log('工地概况页面加载');
  },

  onPullDownRefresh() {
    // 下拉刷新
    setTimeout(() => {
      wx.stopPullDownRefresh();
    }, 1000);
  }
});