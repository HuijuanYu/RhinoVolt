Page({
  data: {
    // 巡检任务信息
    inspectionTask: {
      id: '1',
      title: '车站主体结构安全检查',
      projectName: '城市轨道交通1号线一期工程',
      type: '安全检查',
      area: '1号车站主体结构',
      planTime: '2024-02-20 09:00',
      inspector: '张三',
      status: 'in_progress'
    },
    
    // 巡检项列表
    inspectionItems: [
      {
        id: '1',
        title: '混凝土结构强度',
        standard: 'GB50204-2015',
        description: '检查混凝土结构的强度是否符合设计要求，无裂缝、蜂窝、麻面等缺陷',
        result: '',
        remark: '',
        photos: [],
        needRectification: false,
        rectificationOrder: null
      },
      {
        id: '2',
        title: '钢筋保护层厚度',
        standard: 'GB50204-2015',
        description: '检查钢筋保护层厚度是否符合设计要求，允许偏差为±5mm',
        result: '',
        remark: '',
        photos: [],
        needRectification: false,
        rectificationOrder: null
      },
      {
        id: '3',
        title: '模板支撑系统',
        standard: 'JGJ162-2008',
        description: '检查模板支撑系统的稳定性、刚度和强度是否符合要求',
        result: '',
        remark: '',
        photos: [],
        needRectification: false,
        rectificationOrder: null
      },
      {
        id: '4',
        title: '脚手架安全',
        standard: 'JGJ130-2011',
        description: '检查脚手架的搭设是否符合安全要求，无松动、变形等现象',
        result: '',
        remark: '',
        photos: [],
        needRectification: false,
        rectificationOrder: null
      },
      {
        id: '5',
        title: '临时用电安全',
        standard: 'JGJ46-2005',
        description: '检查临时用电的布置是否符合安全要求，无私拉乱接现象',
        result: '',
        remark: '',
        photos: [],
        needRectification: false,
        rectificationOrder: null
      }
    ],
    
    // 总体评价
    overallEvaluation: '',
    
    // 是否为查看模式
    viewOnly: false,
    
    // 当前检查的项目索引
    currentItemIndex: 0,
    
    // 是否显示整改确认弹窗
    showRectificationConfirm: false,
    
    // 当前需要整改的项目
    currentRectificationItem: null,
    
    // 是否显示人员确认弹窗
    showPersonConfirm: false,
    
    // 人员确认方式
    confirmMethod: '', // 'onsite' 或 'remote'
    
    // 人员确认信息
    personConfirmInfo: {
      name: '',
      idNumber: '',
      signature: ''
    },
    
    // 是否所有项目都已检查
    allItemsChecked: false,
    
    // 是否有不合格项
    hasUnqualifiedItems: false
  },

  onLoad: function(options) {
    // 从页面参数中获取任务ID和查看模式
    const taskId = options.id;
    const viewOnly = options.viewOnly === 'true';
    console.log('巡检任务ID:', taskId);
    console.log('查看模式:', viewOnly);
    
    // 设置查看模式
    this.setData({
      viewOnly: viewOnly
    });
    
    // 加载巡检任务详情
    this.loadInspectionTask(taskId);
    
    // 检查登录状态
    this.checkLoginStatus();
    
    // 初始化检查流程
    this.initInspectionProcess();
  },
  
  // 初始化检查流程
  initInspectionProcess: function() {
    console.log('初始化检查流程');
    // 可以在这里添加检查流程的初始化逻辑
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

  // 加载巡检任务详情
  loadInspectionTask: function(taskId) {
    console.log('加载巡检任务详情:', taskId);
    // 实际项目中应该调用API获取巡检任务详情
    
    // 如果是查看模式，加载已完成的巡检记录
    if (this.data.viewOnly) {
      this.loadInspectionRecord(taskId);
    }
  },

  // 加载巡检记录
  loadInspectionRecord: function(taskId) {
    console.log('加载巡检记录:', taskId);
    // 实际项目中应该调用API获取巡检记录
    
    // 模拟已完成的巡检记录
    const completedItems = [
      {
        id: '1',
        title: '混凝土结构强度',
        standard: 'GB50204-2015',
        description: '检查混凝土结构的强度是否符合设计要求，无裂缝、蜂窝、麻面等缺陷',
        result: 'pass',
        remark: '',
        photos: []
      },
      {
        id: '2',
        title: '钢筋保护层厚度',
        standard: 'GB50204-2015',
        description: '检查钢筋保护层厚度是否符合设计要求，允许偏差为±5mm',
        result: 'fail',
        remark: '部分区域钢筋保护层厚度不足，最小厚度仅为15mm，设计要求为25mm',
        photos: ['https://example.com/photo1.jpg', 'https://example.com/photo2.jpg']
      },
      {
        id: '3',
        title: '模板支撑系统',
        standard: 'JGJ162-2008',
        description: '检查模板支撑系统的稳定性、刚度和强度是否符合要求',
        result: 'pass',
        remark: '',
        photos: []
      },
      {
        id: '4',
        title: '脚手架安全',
        standard: 'JGJ130-2011',
        description: '检查脚手架的搭设是否符合安全要求，无松动、变形等现象',
        result: 'pass',
        remark: '',
        photos: []
      },
      {
        id: '5',
        title: '临时用电安全',
        standard: 'JGJ46-2005',
        description: '检查临时用电的布置是否符合安全要求，无私拉乱接现象',
        result: 'fail',
        remark: '部分区域存在私拉乱接现象，电线未套管保护',
        photos: ['https://example.com/photo3.jpg']
      }
    ];
    
    this.setData({
      inspectionItems: completedItems,
      overallEvaluation: '本次巡检发现2项问题，主要是钢筋保护层厚度不足和临时用电安全隐患，已要求施工单位限期整改。'
    });
  },

  // 处理检查结果
  handleCheckResult: function(e) {
    const itemId = e.currentTarget.dataset.id;
    const result = e.detail.value;
    console.log('检查结果，项目ID:', itemId, '结果:', result);
    
    // 更新巡检项的检查结果
    const inspectionItems = this.data.inspectionItems.map(item => {
      if (item.id === itemId) {
        return {
          ...item,
          result: result,
          // 如果结果不是不合格，清空问题描述和照片
          remark: result !== 'fail' ? '' : item.remark,
          photos: result !== 'fail' ? [] : item.photos,
          needRectification: result === 'fail'
        };
      }
      return item;
    });
    
    // 检查是否所有项目都已检查
    const allItemsChecked = inspectionItems.every(item => item.result);
    
    // 检查是否有不合格项
    const hasUnqualifiedItems = inspectionItems.some(item => item.result === 'fail');
    
    this.setData({
      inspectionItems: inspectionItems,
      allItemsChecked: allItemsChecked,
      hasUnqualifiedItems: hasUnqualifiedItems
    });
    
    // 如果检查不合格，显示整改确认弹窗
    if (result === 'fail') {
      const currentItem = inspectionItems.find(item => item.id === itemId);
      this.setData({
        currentRectificationItem: currentItem,
        showRectificationConfirm: true
      });
    } else {
      // 检查是否完成所有项目
      this.checkInspectionCompletion();
    }
  },
  
  // 检查是否完成所有项目
  checkInspectionCompletion: function() {
    if (this.data.allItemsChecked) {
      console.log('所有项目检查完成');
      // 检查是否有不合格项
      if (this.data.hasUnqualifiedItems) {
        console.log('存在不合格项，需要生成整改单');
      } else {
        console.log('所有项目合格，准备人员确认');
        this.showPersonConfirmDialog();
      }
    }
  },
  
  // 显示人员确认弹窗
  showPersonConfirmDialog: function() {
    this.setData({
      showPersonConfirm: true
    });
  },

  // 处理问题描述
  handleRemark: function(e) {
    const itemId = e.currentTarget.dataset.id;
    const remark = e.detail.value;
    console.log('问题描述，项目ID:', itemId, '描述:', remark);
    
    // 更新巡检项的问题描述
    const inspectionItems = this.data.inspectionItems.map(item => {
      if (item.id === itemId) {
        return {
          ...item,
          remark: remark
        };
      }
      return item;
    });
    
    this.setData({
      inspectionItems: inspectionItems
    });
  },

  // 处理照片上传
  handleUploadPhoto: function(e) {
    const itemId = e.currentTarget.dataset.id;
    console.log('上传照片，项目ID:', itemId);
    
    // 选择图片
    wx.chooseImage({
      count: 5, // 最多选择5张图片
      sizeType: ['original', 'compressed'], // 原图或压缩图
      sourceType: ['album', 'camera'], // 相册或相机
      success: (res) => {
        const tempFilePaths = res.tempFilePaths;
        console.log('选择的图片:', tempFilePaths);
        
        // 更新巡检项的照片
        const inspectionItems = this.data.inspectionItems.map(item => {
          if (item.id === itemId) {
            // 合并现有照片和新选择的照片，最多保留5张
            const newPhotos = [...item.photos, ...tempFilePaths].slice(0, 5);
            return {
              ...item,
              photos: newPhotos
            };
          }
          return item;
        });
        
        this.setData({
          inspectionItems: inspectionItems
        });
        
        // 这里可以调用上传图片的API，将图片上传到服务器
        this.uploadPhotosToServer(tempFilePaths, itemId);
      }
    });
  },

  // 上传照片到服务器
  uploadPhotosToServer: function(tempFilePaths, itemId) {
    console.log('上传照片到服务器:', tempFilePaths, '项目ID:', itemId);
    // 实际项目中应该调用API上传图片
    
    // 模拟上传成功
    wx.showToast({
      title: '照片上传成功',
      icon: 'success',
      duration: 1500
    });
  },

  // 处理照片删除
  handleDeletePhoto: function(e) {
    const itemId = e.currentTarget.dataset.itemId;
    const photoIndex = e.currentTarget.dataset.photoIndex;
    console.log('删除照片，项目ID:', itemId, '照片索引:', photoIndex);
    
    // 更新巡检项的照片
    const inspectionItems = this.data.inspectionItems.map(item => {
      if (item.id === itemId) {
        const newPhotos = [...item.photos];
        newPhotos.splice(photoIndex, 1);
        return {
          ...item,
          photos: newPhotos
        };
      }
      return item;
    });
    
    this.setData({
      inspectionItems: inspectionItems
    });
  },
  
  // 处理整改确认
  handleRectificationConfirm: function() {
    console.log('确认需要整改');
    
    // 生成整改单
    const rectificationOrder = this.generateRectificationOrder();
    
    // 更新巡检项的整改单信息
    const inspectionItems = this.data.inspectionItems.map(item => {
      if (item.id === this.data.currentRectificationItem.id) {
        return {
          ...item,
          rectificationOrder: rectificationOrder
        };
      }
      return item;
    });
    
    this.setData({
      inspectionItems: inspectionItems,
      showRectificationConfirm: false
    });
    
    // 检查是否完成所有项目
    this.checkInspectionCompletion();
  },
  
  // 取消整改确认
  handleRectificationCancel: function() {
    console.log('取消整改');
    
    // 更新巡检项的结果为合格
    const inspectionItems = this.data.inspectionItems.map(item => {
      if (item.id === this.data.currentRectificationItem.id) {
        return {
          ...item,
          result: 'pass',
          remark: '',
          photos: [],
          needRectification: false
        };
      }
      return item;
    });
    
    // 重新检查是否所有项目都已检查
    const allItemsChecked = inspectionItems.every(item => item.result);
    const hasUnqualifiedItems = inspectionItems.some(item => item.result === 'fail');
    
    this.setData({
      inspectionItems: inspectionItems,
      showRectificationConfirm: false,
      allItemsChecked: allItemsChecked,
      hasUnqualifiedItems: hasUnqualifiedItems
    });
    
    // 检查是否完成所有项目
    this.checkInspectionCompletion();
  },
  
  // 生成整改单
  generateRectificationOrder: function() {
    console.log('生成整改单');
    
    // 模拟生成整改单
    return {
      id: 'RO' + Date.now(),
      itemId: this.data.currentRectificationItem.id,
      itemName: this.data.currentRectificationItem.title,
      problem: this.data.currentRectificationItem.remark,
      requirement: '请按照相关标准进行整改',
      deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7天后
      status: 'pending'
    };
  },
  
  // 处理人员确认方式选择
  handleConfirmMethod: function(e) {
    const method = e.currentTarget.dataset.method;
    console.log('选择确认方式:', method);
    
    this.setData({
      confirmMethod: method
    });
    
    if (method === 'onsite') {
      // 现场确认
      this.handleOnsiteConfirm();
    } else if (method === 'remote') {
      // 远程确认
      this.handleRemoteConfirm();
    }
  },
  
  // 现场确认
  handleOnsiteConfirm: function() {
    console.log('现场确认');
    // 模拟现场确认流程
    wx.showToast({
      title: '现场确认成功',
      icon: 'success',
      duration: 1500
    });
    
    this.setData({
      showPersonConfirm: false
    });
    
    // 完成巡检
    this.completeInspection();
  },
  
  // 远程确认
  handleRemoteConfirm: function() {
    console.log('远程确认');
    // 模拟远程确认流程
    wx.showModal({
      title: '远程确认',
      content: '请输入确认人员信息',
      success: (res) => {
        if (res.confirm) {
          // 模拟远程确认成功
          wx.showToast({
            title: '远程确认成功',
            icon: 'success',
            duration: 1500
          });
          
          this.setData({
            showPersonConfirm: false
          });
          
          // 完成巡检
          this.completeInspection();
        }
      }
    });
  },
  
  // 完成巡检
  completeInspection: function() {
    console.log('完成巡检');
    
    // 检查是否有需要整改的项目
    const needRectificationItems = this.data.inspectionItems.filter(item => item.needRectification);
    
    if (needRectificationItems.length > 0) {
      // 有整改项，生成整改单
      console.log('生成整改单');
      this.generateFinalRectificationOrders();
    }
    
    // 提交巡检结果
    this.handleSubmitInspection();
  },
  
  // 生成最终整改单
  generateFinalRectificationOrders: function() {
    console.log('生成最终整改单');
    // 这里可以添加生成整改单的逻辑
  },

  // 处理总体评价
  handleOverallEvaluation: function(e) {
    const evaluation = e.detail.value;
    console.log('总体评价:', evaluation);
    
    this.setData({
      overallEvaluation: evaluation
    });
  },

  // 保存草稿
  handleSaveDraft: function() {
    console.log('保存草稿');
    
    // 收集表单数据
    const formData = {
      inspectionItems: this.data.inspectionItems,
      overallEvaluation: this.data.overallEvaluation,
      status: 'draft'
    };
    
    console.log('草稿数据:', formData);
    
    // 模拟保存草稿
    wx.showToast({
      title: '草稿保存成功',
      icon: 'success',
      duration: 1500
    });
    
    // 实际项目中应该调用API保存草稿
  },

  // 提交巡检
  handleSubmitInspection: function() {
    console.log('提交巡检');
    
    // 验证表单数据
    if (!this.validateForm()) {
      return;
    }
    
    // 收集表单数据
    const formData = {
      inspectionItems: this.data.inspectionItems,
      overallEvaluation: this.data.overallEvaluation,
      status: 'completed',
      completeTime: new Date().toISOString(),
      // 检查是否有整改单
      rectificationOrders: this.data.inspectionItems
        .filter(item => item.rectificationOrder)
        .map(item => item.rectificationOrder)
    };
    
    console.log('提交数据:', formData);
    
    // 模拟提交巡检
    wx.showLoading({
      title: '提交中...'
    });
    
    setTimeout(() => {
      wx.hideLoading();
      wx.showToast({
        title: '巡检提交成功',
        icon: 'success',
        duration: 1500
      });
      
      // 跳转到巡检列表页面
      setTimeout(() => {
        wx.navigateBack({
          delta: 1
        });
      }, 1500);
    }, 1500);
    
    // 实际项目中应该调用API提交巡检
  },

  // 验证表单数据
  validateForm: function() {
    // 检查是否所有巡检项都已填写
    const hasUncheckedItems = this.data.inspectionItems.some(item => !item.result);
    if (hasUncheckedItems) {
      wx.showToast({
        title: '请完成所有巡检项的检查',
        icon: 'none',
        duration: 1500
      });
      return false;
    }
    
    // 检查不合格项是否填写了问题描述
    const hasUnfilledRemarks = this.data.inspectionItems.some(item => 
      item.result === 'fail' && !item.remark
    );
    if (hasUnfilledRemarks) {
      wx.showToast({
        title: '请为不合格项填写问题描述',
        icon: 'none',
        duration: 1500
      });
      return false;
    }
    
    return true;
  },

  // 返回上一页
  handleBack: function() {
    wx.navigateBack();
  }
});