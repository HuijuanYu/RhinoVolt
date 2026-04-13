Page({
  data: {
    laws: [
      { id: '1', name: '《中华人民共和国建筑法》', description: '规范建筑活动，维护建筑市场秩序' },
      { id: '2', name: '《建设工程质量管理条例》', description: '加强工程质量管理，保证工程质量' },
      { id: '3', name: '《建设工程安全生产管理条例》', description: '加强安全生产监督管理，防止和减少生产安全事故' },
      { id: '4', name: '《中华人民共和国招标投标法》', description: '规范招标投标活动，保护国家利益' }
    ],
    contracts: [
      { id: '1', name: '监理合同', description: '明确监理范围、内容、权利和义务' },
      { id: '2', name: '施工合同', description: '明确施工范围、工期、质量要求' },
      { id: '3', name: '设计合同', description: '明确设计范围、设计深度、交付时间' }
    ],
    designs: [
      { id: '1', name: '初步设计文件', description: '包括设计说明书、图纸、主要设备材料表' },
      { id: '2', name: '施工图设计文件', description: '包括施工图纸、设计说明、计算书' },
      { id: '3', name: '设计变更文件', description: '施工过程中的设计变更通知单' }
    ],
    standards: [
      { id: '1', name: 'GB 50300《建筑工程施工质量验收统一标准》', description: '统一建筑工程施工质量验收标准' },
      { id: '2', name: 'GB/T 50319《建设工程监理规范》', description: '规范建设工程监理工作' },
      { id: '3', name: 'DL/T 5161《电气装置安装工程质量检验及评定规程》', description: '电力工程电气装置安装质量标准' }
    ]
  },

  onLoad() {
    console.log('监理工作依据页面加载');
  }
});