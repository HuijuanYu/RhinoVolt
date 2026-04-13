-- 创建完整的 projects（工程管理）表
CREATE TABLE IF NOT EXISTS projects (
  id INT AUTO_INCREMENT PRIMARY KEY COMMENT '工程ID',
  name VARCHAR(200) NOT NULL COMMENT '工程名称',
  owner VARCHAR(200) COMMENT '建设单位',
  constructor VARCHAR(200) COMMENT '施工单位',
  supervisor VARCHAR(200) COMMENT '监理单位',
  location VARCHAR(500) COMMENT '工程位置',
  description TEXT COMMENT '工程描述',
  start_date DATE COMMENT '开工日期',
  end_date DATE COMMENT '竣工日期',
  progress INT DEFAULT 0 COMMENT '进度百分比(0-100)',
  status VARCHAR(50) DEFAULT 'ongoing' COMMENT '状态: planning(规划中), ongoing(进行中), completed(已完成), delayed(延期)',
  supervisor_id INT COMMENT '监理负责人ID(关联users表)',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  FOREIGN KEY (supervisor_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='工程管理表';

-- 插入示例数据
INSERT INTO projects (name, owner, constructor, supervisor, location, description, start_date, end_date, progress, status) VALUES
('城市轨道交通1号线一期工程', '市轨道交通集团', '中铁建设集团', 'XX工程监理有限公司', '市中心区域', '地铁1号线一期建设工程，全长15公里', '2023-01-15', '2025-06-30', 65, 'ongoing'),
('新能源光伏电站A区', '新能源投资公司', '光伏建设集团', 'XX工程监理有限公司', '郊区A地块', '50MW光伏发电项目，占地200亩', '2024-03-01', '2024-12-31', 30, 'ongoing'),
('变电站扩建工程', '市供电公司', '电力工程公司', 'XX工程监理有限公司', '工业园区', '110kV变电站扩建，新增2台主变', '2023-06-01', '2024-03-30', 100, 'completed'),
('风电场道路工程', '风电开发公司', '市政工程公司', 'XX工程监理有限公司', '山区风电场', '风电场配套道路建设，全长8公里', '2023-02-01', '2023-08-31', 100, 'completed'),
('XX住宅小区一期工程', 'XX房地产开发有限公司', 'XX建筑工程有限公司', 'XX工程监理有限公司', '城东新区', '住宅楼5栋，建筑面积8万平米', '2023-01-01', '2024-12-31', 75, 'ongoing'),
('XX商业综合体项目', 'XX商业投资有限公司', 'XX建设集团有限公司', 'XX工程监理有限公司', 'CBD核心区', '商业综合体，建筑面积12万平米', '2023-03-15', '2024-09-15', 45, 'ongoing'),
('XX道路改造工程', 'XX市交通运输局', 'XX市政工程有限公司', 'XX工程监理有限公司', '市区主干道', '道路改造全长3.5公里', '2023-05-01', '2023-11-30', 100, 'completed'),
('XX医院扩建工程', 'XX市卫生健康委员会', 'XX建筑工程有限公司', 'XX工程监理有限公司', '市医院院区', '新建住院楼1栋，床位500张', '2023-02-01', '2023-12-31', 85, 'delayed');

-- 查看表结构
DESCRIBE projects;

-- 查看数据
SELECT * FROM projects;