# 🦏 RhinoVolt - 绿犀牛数字化平台

> 绿色能源项目监理数字化平台

## 📁 项目结构

```
RhinoVolt/
├── client/              # 微信小程序客户端
│   ├── pages/           # 页面目录
│   │   ├── index/      # 首页
│   │   ├── login/      # 登录页
│   │   ├── register/   # 注册页
│   │   ├── project/    # 项目管理
│   │   ├── inspection/ # 巡检管理
│   │   ├── supervision/# 旁站监理
│   │   ├── document/   # 文档管理
│   │   ├── approval/   # 审批管理
│   │   └── statistics/ # 统计分析
│   ├── components/     # 组件
│   ├── images/         # 图片资源
│   └── utils/          # 工具函数
├── server/             # 服务端（Node.js/Express）
│   ├── tests/          # 测试文件
│   ├── init-*.sql      # 数据库初始化脚本
│   └── server.js       # 主入口
├── resources/          # 资源配置
│   ├── config/         # 配置文件模板
│   ├── doc/            # 项目文档
│   └── assets/         # 静态资源
└── tests/              # 端到端测试
```

## 🚀 快速开始

### 服务端

```bash
cd server
npm install
npm start
```

### 微信小程序

1. 打开微信开发者工具
2. 导入 `client/` 目录
3. 配置 AppID
4. 编译运行

## 📋 功能模块

- ✅ 用户认证（登录/注册）
- ✅ 项目管理
- ✅ 巡检管理
- ✅ 旁站监理
- ✅ 文档管理
- ✅ 审批流程
- ✅ 数据统计

## 🏗️ 技术栈

| 模块 | 技术 |
|------|------|
| 服务端 | Node.js + Express + MySQL |
| 客户端 | 微信小程序 |
| 认证 | JWT Token |
| 数据库 | MySQL |

## 🔧 环境配置

服务端配置文件：`server/project.private.config.json`

```json
{
  "database": {
    "host": "localhost",
    "port": 3306,
    "user": "root",
    "password": "your_password",
    "database": "rhino_volt"
  },
  "server": {
    "port": 3000,
    "jwtSecret": "your_secret_key"
  }
}
```

## 📄 数据库初始化

```bash
# 进入server目录
cd server

# 执行SQL脚本初始化数据库
mysql -u root -p < init-projects-table.sql
mysql -u root -p < init-projects-simple.sql
mysql -u root -p < insert-test-user.sql
```

## 🏷️ 版本历史

- **v1.0.0** (2026-04-13) - 基础版本，包含客户端和服务端核心功能

## 👥 团队

- 开发：Rhino开发Agent 🦏

## 📄 许可证

MIT License
