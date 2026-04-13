const mysql = require('mysql2/promise');

const dbConfig = {
  host: 'rm-bp1bclk1q07od6b5d.mysql.rds.aliyuncs.com',
  user: 'supervisor',
  password: '198110aS',
  database: 'supervisor_db',
  port: 3306,
  connectTimeout: 10000
};

async function checkTables() {
  const pool = mysql.createPool(dbConfig);
  try {
    // 获取所有表
    const [tables] = await pool.query("SHOW TABLES");
    console.log('===== 数据库表列表 =====\n');
    
    const tableNames = tables.map(t => Object.values(t)[0]);
    console.log('共有 ' + tableNames.length + ' 个表:');
    console.log(tableNames.map((name, i) => (i + 1) + '. ' + name).join('\n'));
    
    console.log('\n===== 各表结构 =====\n');
    
    for (const tableName of tableNames) {
      console.log('--- 表: ' + tableName + ' ---');
      const [columns] = await pool.query("DESCRIBE " + tableName);
      columns.forEach(col => {
        console.log('  ' + col.Field + ' | ' + col.Type + ' | ' + (col.Null === 'YES' ? '可空' : '非空') + (col.Key === 'PRI' ? ' | 主键' : ''));
      });
      console.log('');
    }
    
  } catch (err) {
    console.error('查询失败:', err.message);
    if (err.code === 'ETIMEDOUT') {
      console.log('\n连接超时，可能原因：');
      console.log('1. 阿里云安全组未开放当前IP');
      console.log('2. 数据库未运行');
      console.log('3. 网络不通');
    }
  } finally {
    await pool.end();
  }
}

checkTables();