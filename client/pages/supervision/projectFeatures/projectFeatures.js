Page({
  data: {
    difficulties: [
      { id: '1', name: '大体积混凝土浇筑', description: '光伏支架基础混凝土浇筑量大，需控制温度裂缝' },
      { id: '2', name: '高空作业安全', description: '升压站设备安装高度高，安全风险大' },
      { id: '3', name: '电气设备调试', description: '电气系统复杂，调试技术要求高' }
    ],
    keyPoints: [
      { id: '1', name: '光伏组件安装', description: '组件排列整齐度、倾角控制' },
      { id: '2', name: '逆变器安装', description: '设备安装精度、接线可靠性' },
      { id: '3', name: '升压站建设', description: '主变压器、GIS设备安装质量' }
    ]
  },

  onLoad() {
    console.log('工程特点分析页面加载');
  }
});