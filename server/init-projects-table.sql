-- 创建 projects（工程/项目）表
CREATE TABLE IF NOT EXISTS projects (
  id INT AUTO_INCREMENT PRIMARY KEY COMMENT '工程ID',
  name VARCHAR(200) NOT NULL COMMENT '工程名称',
  location VARCHAR(500) COMMENT '工程位置',
  description TEXT COMMENT '工程描述',
  status VARCHAR(50) DEFAULT 'planning' COMMENT '状态: planning(规划中), ongoing(进行中), completed(已完成)',
  supervisor_id INT COMMENT '监理负责人ID',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  FOREIGN KEY (supervisor_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='工程/项目管理表';

-- 插入示例数据
INSERT INTO projects (name, location, description, status) VALUES
('城市轨道交通1号线一期工程', '市中心区域', '地铁1号线一期建设工程', 'ongoing'),
('新能源光伏电站A区', '郊区A地块', '50MW光伏发电项目', 'planning'),
('变电站扩建工程', '工业园区', '110kV变电站扩建', 'ongoing'),
('风电场道路工程', '山区风电场', '风电场配套道路建设', 'completed');

-- 查看表结构
DESCRIBE projects;

-- 查看数据
SELECT * FROM projects;