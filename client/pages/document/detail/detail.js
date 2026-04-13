Page({
  data: {
    // 文档详情
    documentDetail: {
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
      approvalStatusText: '待审批',
      fileUrl: 'https://example.com/files/construction-plan.pdf'
    },
    
    // 审批记录
    approvalRecords: [
      {
        approver: '李四',
        time: '2024-02-18 09:15',
        status: 'pending',
        statusText: '待审批',
        comment: ''
      }
    ],
    
    // 是否为审批人
    isApprover: true
  },

  onLoad: function(options) {
    const docId = options.id;
    console.log('文档ID:', docId);
    
    // 这里可以根据docId获取文档详情
    this.loadDocumentDetail(docId);
    
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

  // 加载文档详情
  loadDocumentDetail: function(docId) {
    console.log('加载文档详情，文档ID:', docId);
    
    // 模拟从服务器获取文档详情
    // 实际项目中应该调用API
    
    // 模拟数据加载完成
    setTimeout(() => {
      console.log('文档详情加载完成');
      // 这里可以更新文档详情数据
    }, 1000);
  },

  // 审批文档
  approveDocument: function() {
    console.log('审批文档');
    
    // 跳转到审批页面
    wx.navigateTo({
      url: `/pages/approval/approval?id=${this.data.documentDetail.id}&type=document`
    });
  },

  // 下载文档
  downloadDocument: function() {
    console.log('下载文档');
    
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
    // wx.downloadFile({
    //   url: this.data.documentDetail.fileUrl,
    //   success: function(res) {
    //     if (res.statusCode === 200) {
    //       console.log('下载成功');
    //       // 打开文档
    //       wx.openDocument({
    //         filePath: res.tempFilePath,
    //         success: function(res) {
    //           console.log('打开文档成功');
    //         }
    //       });
    //     }
    //   },
    //   fail: function(res) {
    //     console.log('下载失败:', res);
    //     wx.showToast({
    //       title: '下载失败，请重试',
    //       icon: 'none',
    //       duration: 1500
    //     });
    //   }
    // });
  },

  // 分享文档
  shareDocument: function() {
    console.log('分享文档');
    
    wx.showModal({
      title: '分享文档',
      content: '请选择分享方式',
      confirmText: '复制链接',
      cancelText: '发送给好友',
      success: function(res) {
        if (res.confirm) {
          // 复制链接
          wx.setClipboardData({
            data: 'https://example.com/documents/2',
            success: function() {
              wx.showToast({
                title: '链接已复制',
                icon: 'success',
                duration: 1500
              });
            }
          });
        } else if (res.cancel) {
          // 发送给好友
          wx.showToast({
            title: '分享功能开发中',
            icon: 'none',
            duration: 1500
          });
        }
      }
    });
  },

  // 页面分享
  onShareAppMessage: function() {
    return {
      title: this.data.documentDetail.title,
      path: `/pages/document/detail/detail?id=${this.data.documentDetail.id}`,
      success: function(res) {
        console.log('分享成功');
      },
      fail: function(res) {
        console.log('分享失败');
      }
    };
  }
});