require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// 数据库配置
const dbConfig = {
  host: process.env.DB_HOST || 'rm-bp1bclk1q07od6b5d.mysql.rds.aliyuncs.com',
  user: process.env.DB_USER || 'supervisor',
  password: process.env.DB_PASSWORD || '198110aS',
  database: process.env.DB_NAME || 'supervisor_db',
  port: parseInt(process.env.DB_PORT) || 3306
};

// 创建数据库连接池
const pool = mysql.createPool(dbConfig);

// JWT密钥
const JWT_SECRET = process.env.JWT_SECRET || 'supervisor_miniprogram_2024';

// 健康检查接口（无需认证）
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: '服务运行正常', time: new Date().toISOString() });
});

// 验证token中间件
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ error: '未授权' });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'token无效' });
  }
};

// ============ 用户接口 ============

// 注册
app.post('/api/register', async (req, res) => {
  try {
    const { phone, password, name } = req.body;
    if (!phone || !password) {
      return res.status(400).json({ error: '手机号和密码必填' });
    }
    
    // 检查手机号是否已存在
    const [rows] = await pool.query('SELECT id FROM users WHERE phone = ?', [phone]);
    if (rows.length > 0) {
      return res.status(400).json({ error: '手机号已注册' });
    }
    
    // 加密密码
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // 插入用户
    const [result] = await pool.query(
      'INSERT INTO users (phone, password, name, role) VALUES (?, ?, ?, ?)',
      [phone, hashedPassword, name || phone, 'supervisor']
    );
    
    const token = jwt.sign({ id: result.insertId, phone, role: 'supervisor' }, JWT_SECRET, { expiresIn: '7d' });
    
    res.json({ 
      success: true, 
      data: { 
        user: { id: result.insertId, phone, name, role: 'supervisor' },
        token 
      } 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '注册失败' });
  }
});

// 登录
app.post('/api/login', async (req, res) => {
  try {
    const { phone, password } = req.body;
    if (!phone || !password) {
      return res.status(400).json({ error: '手机号和密码必填' });
    }
    
    const [rows] = await pool.query('SELECT * FROM users WHERE phone = ?', [phone]);
    if (rows.length === 0) {
      return res.status(400).json({ error: '用户不存在' });
    }
    
    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: '密码错误' });
    }
    
    const token = jwt.sign({ id: user.id, phone: user.phone, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    
    res.json({ 
      success: true, 
      data: { 
        user: { id: user.id, phone: user.phone, name: user.name, role: user.role },
        token 
      } 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '登录失败' });
  }
});

// 获取用户信息
app.get('/api/user', authenticate, async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, phone, name, role, avatar FROM users WHERE id = ?', [req.user.id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: '用户不存在' });
    }
    res.json({ success: true, data: rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '获取用户信息失败' });
  }
});

// ============ 项目接口 ============

// 获取项目列表
app.get('/api/projects', authenticate, async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM projects ORDER BY created_at DESC');
    res.json({ success: true, data: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '获取项目失败' });
  }
});

// 创建项目
app.post('/api/projects', authenticate, async (req, res) => {
  try {
    const { name, owner, constructor, supervisor, location, description, start_date, end_date, progress, status } = req.body;
    if (!name) {
      return res.status(400).json({ error: '项目名称必填' });
    }
    
    const [result] = await pool.query(
      `INSERT INTO projects (name, owner, constructor, supervisor, location, description, start_date, end_date, progress, status, supervisor_id) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, owner, constructor, supervisor, location, description, start_date, end_date, progress || 0, status || 'planning', req.user.id]
    );
    
    res.json({ success: true, data: { id: result.insertId } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '创建项目失败' });
  }
});

// 获取单个项目
app.get('/api/projects/:id', authenticate, async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM projects WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: '项目不存在' });
    }
    res.json({ success: true, data: rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '获取项目失败' });
  }
});

// 更新项目
app.put('/api/projects/:id', authenticate, async (req, res) => {
  try {
    const { name, owner, constructor, supervisor, location, description, start_date, end_date, progress, status } = req.body;
    await pool.query(
      `UPDATE projects SET name = ?, owner = ?, constructor = ?, supervisor = ?, location = ?, description = ?, start_date = ?, end_date = ?, progress = ?, status = ? WHERE id = ?`,
      [name, owner, constructor, supervisor, location, description, start_date, end_date, progress, status, req.params.id]
    );
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '更新项目失败' });
  }
});

// 删除项目
app.delete('/api/projects/:id', authenticate, async (req, res) => {
  try {
    await pool.query('DELETE FROM projects WHERE id = ?', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '删除项目失败' });
  }
});

// ============ 巡检接口 ============

// 获取巡检列表
app.get('/api/inspections', authenticate, async (req, res) => {
  try {
    const { project_id } = req.query;
    let sql = 'SELECT i.*, p.name as project_name, u.name as inspector_name FROM inspections i LEFT JOIN projects p ON i.project_id = p.id LEFT JOIN users u ON i.inspector_id = u.id';
    let params = [];
    if (project_id) {
      sql += ' WHERE i.project_id = ?';
      params.push(project_id);
    }
    sql += ' ORDER BY i.created_at DESC';
    
    const [rows] = await pool.query(sql, params);
    res.json({ success: true, data: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '获取巡检记录失败' });
  }
});

// 创建巡检
app.post('/api/inspections', authenticate, async (req, res) => {
  try {
    const { project_id, title, content, photos, location } = req.body;
    if (!project_id || !title) {
      return res.status(400).json({ error: '项目ID和标题必填' });
    }
    
    const [result] = await pool.query(
      'INSERT INTO inspections (project_id, inspector_id, title, content, photos, location, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [project_id, req.user.id, title, content, photos, location, 'pending']
    );
    
    res.json({ success: true, data: { id: result.insertId } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '创建巡检失败' });
  }
});

// 更新巡检状态
app.put('/api/inspections/:id', authenticate, async (req, res) => {
  try {
    const { status } = req.body;
    await pool.query('UPDATE inspections SET status = ? WHERE id = ?', [status, req.params.id]);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '更新巡检失败' });
  }
});

// ============ 文档接口 ============

// 获取文档列表
app.get('/api/documents', authenticate, async (req, res) => {
  try {
    const { project_id } = req.query;
    let sql = 'SELECT d.*, p.name as project_name, u.name as uploader_name FROM documents d LEFT JOIN projects p ON d.project_id = p.id LEFT JOIN users u ON d.uploaded_by = u.id';
    let params = [];
    if (project_id) {
      sql += ' WHERE d.project_id = ?';
      params.push(project_id);
    }
    sql += ' ORDER BY d.created_at DESC';
    
    const [rows] = await pool.query(sql, params);
    res.json({ success: true, data: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '获取文档失败' });
  }
});

// 创建文档
app.post('/api/documents', authenticate, async (req, res) => {
  try {
    const { project_id, title, file_url, file_type } = req.body;
    if (!title) {
      return res.status(400).json({ error: '文档标题必填' });
    }
    
    const [result] = await pool.query(
      'INSERT INTO documents (project_id, title, file_url, file_type, uploaded_by) VALUES (?, ?, ?, ?, ?)',
      [project_id, title, file_url, file_type, req.user.id]
    );
    
    res.json({ success: true, data: { id: result.insertId } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '创建文档失败' });
  }
});

// ============ 审批接口 ============

// 获取审批列表
app.get('/api/approvals', authenticate, async (req, res) => {
  try {
    const { project_id, status } = req.query;
    let sql = 'SELECT a.*, p.name as project_name, u1.name as applicant_name, u2.name as approver_name FROM approvals a LEFT JOIN projects p ON a.project_id = p.id LEFT JOIN users u1 ON a.applicant_id = u1.id LEFT JOIN users u2 ON a.approver_id = u2.id';
    let params = [];
    let conditions = [];
    if (project_id) {
      conditions.push('a.project_id = ?');
      params.push(project_id);
    }
    if (status) {
      conditions.push('a.status = ?');
      params.push(status);
    }
    if (conditions.length > 0) {
      sql += ' WHERE ' + conditions.join(' AND ');
    }
    sql += ' ORDER BY a.created_at DESC';
    
    const [rows] = await pool.query(sql, params);
    res.json({ success: true, data: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '获取审批失败' });
  }
});

// 创建审批
app.post('/api/approvals', authenticate, async (req, res) => {
  try {
    const { project_id, title, content, type } = req.body;
    if (!title) {
      return res.status(400).json({ error: '审批标题必填' });
    }
    
    const [result] = await pool.query(
      'INSERT INTO approvals (project_id, title, content, type, applicant_id, status) VALUES (?, ?, ?, ?, ?, ?)',
      [project_id, title, content, type || 'quality', req.user.id, 'pending']
    );
    
    res.json({ success: true, data: { id: result.insertId } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '创建审批失败' });
  }
});

// 审批操作
app.put('/api/approvals/:id', authenticate, async (req, res) => {
  try {
    const { status } = req.body;
    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ error: '状态无效' });
    }
    await pool.query(
      'UPDATE approvals SET status = ?, approver_id = ? WHERE id = ?',
      [status, req.user.id, req.params.id]
    );
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '审批操作失败' });
  }
});

// ============ 统计接口 ============

// 统计数据
app.get('/api/statistics', authenticate, async (req, res) => {
  try {
    const [[projectCount]] = await pool.query('SELECT COUNT(*) as count FROM projects');
    const [[inspectionCount]] = await pool.query('SELECT COUNT(*) as count FROM inspections');
    const [[pendingApprovalCount]] = await pool.query("SELECT COUNT(*) as count FROM approvals WHERE status = 'pending'");
    const [[documentCount]] = await pool.query('SELECT COUNT(*) as count FROM documents');
    
    res.json({ 
      success: true, 
      data: {
        projects: projectCount.count,
        inspections: inspectionCount.count,
        pendingApprovals: pendingApprovalCount.count,
        documents: documentCount.count
      } 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '获取统计数据失败' });
  }
});

// 启动服务器
const PORT = process.env.PORT || 8080;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 服务器运行在 http://0.0.0.0:${PORT}`);
});