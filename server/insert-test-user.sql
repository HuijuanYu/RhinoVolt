-- 插入测试用户（密码: 123456）
-- 密码已用 bcrypt 加密: $2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi

INSERT INTO users (phone, password, name, role, created_at) 
VALUES ('13800138000', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '测试监理', 'supervisor', NOW())
ON DUPLICATE KEY UPDATE 
  password = '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
  name = '测试监理';

-- 查看用户
SELECT id, phone, name, role, created_at FROM users WHERE phone = '13800138000';