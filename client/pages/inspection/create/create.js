// pages/inspection/create/create.js
Page({
  data: {
    // 巡检模板列表
    templates: [
      { id: 1, name: '安全检查模板', description: '适用于日常安全巡检' },
      { id: 2, name: '质量检查模板', description: '适用于工程质量检查' },
      { id: 3, name: '设备检查模板', description: '适用于设备运行检查' },
      { id: 4, name: '自定义模板', description: '自定义巡检内容' }
    ],
    selectedTemplate: null,
    
    // 巡检信息
    projectId: '',
    projectName: '',
    title: '',
    content: '',
    location: '',
    
    // 照片列表
    photos: [],
    
    // 录音列表
    audios: [],
    
    // 录音状态
    isRecording: false,
    recordTime: 0,
    recordTimer: null,
    
    // 提交状态
    loading: false,
    
    // 项目列表
    projects: []
  },

  onLoad: function(options) {
    // 获取项目列表
    this.loadProjects();
  },

  // 加载项目列表
  loadProjects: function() {
    const app = getApp();
    const apiUrl = app.globalData.apiUrl;
    const token = wx.getStorageSync('token');
    
    if (!token) {
      wx.showToast({ title: '请先登录', icon: 'none' });
      return;
    }
    
    wx.request({
      url: `${apiUrl}/api/projects`,
      method: 'GET',
      header: {
        'Authorization': `Bearer ${token}`
      },
      success: (res) => {
        if (res.data && res.data.success) {
          this.setData({
            projects: res.data.data
          });
        }
      },
      fail: (err) => {
        console.error('获取项目列表失败:', err);
      }
    });
  },

  // 选择模板
  selectTemplate: function(e) {
    const templateId = e.currentTarget.dataset.id;
    const template = this.data.templates.find(t => t.id === templateId);
    this.setData({
      selectedTemplate: template
    });
  },

  // 绑定标题输入
  bindTitleInput: function(e) {
    this.setData({
      title: e.detail.value
    });
  },

  // 绑定内容输入
  bindContentInput: function(e) {
    this.setData({
      content: e.detail.value
    });
  },

  // 绑定位置输入
  bindLocationInput: function(e) {
    this.setData({
      location: e.detail.value
    });
  },

  // 选择项目
  bindProjectChange: function(e) {
    const index = e.detail.value;
    const project = this.data.projects[index];
    this.setData({
      projectId: project.id,
      projectName: project.name
    });
  },

  // 调用相机拍照
  takePhoto: function() {
    const that = this;
    wx.chooseMedia({
      count: 9 - this.data.photos.length,
      mediaType: ['image'],
      sourceType: ['camera', 'album'],
      success: function(res) {
        const newPhotos = res.tempFiles.map(item => item.tempFilePath);
        that.setData({
          photos: that.data.photos.concat(newPhotos)
        });
      },
      fail: function(err) {
        console.error('拍照失败:', err);
        wx.showToast({ title: '拍照失败', icon: 'none' });
      }
    });
  },

  // 删除照片
  deletePhoto: function(e) {
    const index = e.currentTarget.dataset.index;
    const photos = this.data.photos;
    photos.splice(index, 1);
    this.setData({ photos });
  },

  // 预览照片
  previewPhoto: function(e) {
    const index = e.currentTarget.dataset.index;
    wx.previewImage({
      current: this.data.photos[index],
      urls: this.data.photos
    });
  },

  // 开始录音
  startRecord: function() {
    const that = this;
    const recorderManager = wx.getRecorderManager();
    
    recorderManager.onStart(function() {
      that.setData({
        isRecording: true,
        recordTime: 0
      });
      
      // 开始计时
      const timer = setInterval(() => {
        that.setData({
          recordTime: that.data.recordTime + 1
        });
      }, 1000);
      
      that.setData({ recordTimer: timer });
    });
    
    recorderManager.onStop(function(res) {
      clearInterval(that.data.recordTimer);
      
      const audio = {
        tempPath: res.tempFilePath,
        duration: res.duration,
        time: that.data.recordTime
      };
      
      that.setData({
        isRecording: false,
        audios: that.data.audios.concat(audio)
      });
    });
    
    recorderManager.onError(function(err) {
      console.error('录音失败:', err);
      wx.showToast({ title: '录音失败', icon: 'none' });
    });
    
    recorderManager.start({
      format: 'mp3',
      sampleRate: 16000,
      numberOfChannels: 1,
      encodeBitRate: 48000
    });
  },

  // 停止录音
  stopRecord: function() {
    const recorderManager = wx.getRecorderManager();
    recorderManager.stop();
  },

  // 播放录音
  playAudio: function(e) {
    const index = e.currentTarget.dataset.index;
    const audioPath = this.data.audios[index].tempPath;
    
    const audioContext = wx.createInnerAudioContext();
    audioContext.src = audioPath;
    audioContext.play();
    
    wx.showToast({ title: '播放中', icon: 'none' });
  },

  // 删除录音
  deleteAudio: function(e) {
    const index = e.currentTarget.dataset.index;
    const audios = this.data.audios;
    audios.splice(index, 1);
    this.setData({ audios });
  },

  // 提交巡检记录
  submitInspection: function() {
    const { projectId, title, content, location, photos, audios } = this.data;
    
    // 表单验证
    if (!projectId) {
      wx.showToast({ title: '请选择项目', icon: 'none' });
      return;
    }
    
    if (!title) {
      wx.showToast({ title: '请输入巡检标题', icon: 'none' });
      return;
    }
    
    if (!content && photos.length === 0 && audios.length === 0) {
      wx.showToast({ title: '请输入巡检内容或添加照片/录音', icon: 'none' });
      return;
    }
    
    this.setData({ loading: true });
    wx.showLoading({ title: '提交中...' });
    
    const app = getApp();
    const apiUrl = app.globalData.apiUrl;
    const token = wx.getStorageSync('token');
    
    // 将照片和录音转换为JSON字符串
    const photosJson = JSON.stringify(photos);
    
    wx.request({
      url: `${apiUrl}/api/inspections`,
      method: 'POST',
      header: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      data: {
        project_id: projectId,
        title: title,
        content: content,
        location: location,
        photos: photosJson
      },
      success: (res) => {
        wx.hideLoading();
        
        if (res.data && res.data.success) {
          wx.showToast({ title: '提交成功', icon: 'success' });
          
          setTimeout(() => {
            wx.navigateBack();
          }, 1500);
        } else {
          wx.showToast({ title: res.data.error || '提交失败', icon: 'none' });
        }
      },
      fail: (err) => {
        wx.hideLoading();
        wx.showToast({ title: '网络请求失败', icon: 'none' });
        console.error('提交巡检失败:', err);
      },
      complete: () => {
        this.setData({ loading: false });
      }
    });
  },

  // 格式化录音时间
  formatTime: function(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec.toString().padStart(2, '0')}`;
  },

  onUnload: function() {
    // 页面卸载时停止录音
    if (this.data.isRecording) {
      const recorderManager = wx.getRecorderManager();
      recorderManager.stop();
    }
    if (this.data.recordTimer) {
      clearInterval(this.data.recordTimer);
    }
  }
});