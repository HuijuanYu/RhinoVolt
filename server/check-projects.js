const mysql = require('mysql2/promise');

const dbConfig = {
  host: 'rm-bp1bclk1q07od6b5d.mysql.rds.aliyuncs.com',
  user: 'supervisor',
  password: '198110aS',
  database: 'supervisor_db',
  port: 3306
};

async function getProjects() {
  const pool = mysql.createPool(dbConfig);
  try {
    const [rows] = await pool.query('SELECT id, name, location, status, created_at FROM projects ORDER BY id');
    console.log('===== 工程管理 - 工程名称列表 =====');
    console.log('');
    console.log('共 ' + rows.length + ' 个工程');
    console.log('');
    rows.forEach((row, index) => {
      console.log((index + 1) + '. ' + row.name);
      console.log('   ID: ' + row.id);
      console.log('   位置: ' + (row.location || '未设置'));
      console.log('   状态: ' + row.status);
      console.log('   创建时间: ' + row.created_at);
      console.log('');
    });
  } catch (err) {
    console.error('查询失败:', err.message);
  } finally {
    await pool.end();
  }
}

getProjects();