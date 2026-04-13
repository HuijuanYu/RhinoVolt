# RhinoVolt 微信小程序调试指南

## 项目信息
- **项目名称**: 电力新能源 (RhinoVolt)
- **类型**: 监理工作助手小程序
- **位置**: `D:\Work\projects\RhinoVolt\client`
- **AppID**: wx7655f3a0e3583247

## 功能模块
- 首页 - 项目概览
- 工程 - 工程管理
- 巡检 - 现场巡检
- 文档 - 文档管理
- 监理工作: 现场概况、工作依据、工程特点、工作流程、工作方法、工作措施、质量控制、进度控制

## VSCode 调试配置

### 1. 打开项目
```bash
# 方式1: 双击打开工作区文件
D:\Work\projects\RhinoVolt\RhinoVolt.code-workspace

# 方式2: 用 VSCode 打开 client 目录
code D:\Work\projects\RhinoVolt\client
```

### 2. 推荐插件 (已配置)
- **minapp** - 小程序标签/属性智能补全
- **WXML** - WXML 语法高亮
- **wxapp-helper** - 微信小程序开发助手

### 3. 文件关联 (已配置)
- `.wxml` → HTML
- `.wxss` → CSS
- `.wxs` → JavaScript

## 微信开发者工具调试

### 启动方式
```bash
# 方式1: 直接打开微信开发者工具
"D:\Program Files (x86)\Tencent\微信web开发者工具\微信开发者工具.exe"

# 方式2: 命令行导入项目
"D:\Program Files (x86)\Tencent\微信web开发者工具\cli.bat" open --project "D:\Work\projects\RhinoVolt\client"
```

### 调试步骤
1. 打开微信开发者工具
2. 点击「导入项目」
3. 选择目录: `D:\Work\projects\RhinoVolt\client`
4. AppID 填写: `wx7655f3a0e3583247` (或点击测试号)
5. 点击「确定」

### 调试功能
- **模拟器**: 实时预览小程序效果
- **调试器**: Console/Network/Storage/Source
- **真机调试**: 扫码在手机预览

## API 配置
当前后端地址: `https://theatrically-noncontrolled-eliana.ngrok-free.dev`

如需修改，编辑 `app.js` 中的 `globalData.apiUrl`。

## 开发工作流
1. **VSCode** 写代码 (WXML/WXSS/JS/JSON)
2. **微信开发者工具** 实时预览和调试
3. 修改保存后自动热重载

## 常见问题

### 1. 编译报错
检查 `project.config.json` 中的 `devToolsPath` 是否正确指向:
```json
"devToolsPath": "D:/Program Files (x86)/Tencent/微信web开发者工具"
```

### 2. API 请求失败
- 检查 ngrok 隧道是否在线
- 在开发者工具「详情」→「本地设置」中关闭「不校验合法域名」

### 3. 登录问题
小程序使用本地存储保存登录状态，如需重新登录，清除 Storage 中的 `userInfo`。
