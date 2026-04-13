@app.route('/feishu/webhook', methods=['POST'])
def feishu_webhook():
    """飞书Webhook处理"""
    print(f"\n{'='*60}")
    print(f"收到飞书请求: {time.strftime('%Y-%m-%d %H:%M:%S')}")
    print(f"{'='*60}")
    print(f"方法: {request.method}")
    print(f"Content-Type: {request.content_type}")
    print(f"URL: {request.url}")
    
    # 获取数据
    try:
        request_data = request.get_json(force=True, silent=True) or {}
    except:
        request_data = {}
    
    print(f"数据: {request_data}")
    
    # 处理challenge
    challenge = request_data.get('challenge')
    if challenge:
        print(f"URL验证，返回challenge: {challenge}")
        return jsonify({'challenge': challenge})
    
    # 获取事件类型 - 从header中获取
    header = request_data.get('header', {})
    event_type = header.get('event_type', '')
    print(f"事件类型: {event_type}")
    
    if event_type == 'im.message.receive_v1':
        # 消息接收事件
        event = request_data.get('event', {})
        message = event.get('message', {})
        content = message.get('content', '')
        chat_id = message.get('chat_id', '')
        
        # 解析消息内容
        if isinstance(content, str):
            try:
                content = json.loads(content)
            except:
                content = {}
        
        text = content.get('text', '').strip().lower()
        print(f"收到消息: {text}")
        print(f"群聊ID: {chat_id}")
        
        # 处理命令
        response_text = ""
        
        # 帮助命令
        if text in ['help', '帮助', '?']:
            response_text = """🤖 舵机控制机器人帮助

📌 舵机控制：
  base 90 - 控制底座到90度
  shoulder 45 - 控制肩部到45度
  elbow 135 - 控制肘部到135度
  wrist 90 - 控制手腕到90度
  gripper 0 - 控制夹爪到0度

🎯 预置动作：
  home - 回到初始位置
  pick - 抓取动作
  place - 放置动作
  wave - 挥手动作
  ready - 准备动作
  grab - 抓取动作（夹爪闭合）
  release - 释放动作（夹爪张开）
  dance - 舞蹈动作

ℹ️ 其他命令：
  help - 显示帮助信息
  status - 查看舵机状态
  presets - 查看所有预置动作"""
        
        # 状态命令
        elif text in ['status', '状态']:
            status_info = "\n".join([f"{name}: Pin {pin}" for name, pin in SERVO_PINS.items()])
            response_text = f"📊 舵机状态:\n{status_info}"
        
        # 预置动作列表
        elif text in ['presets', '预置']:
            presets_info = "\n".join([f"- {name}: {angles}" for name, angles in PRESETS.items()])
            response_text = f"🎯 预置动作:\n{presets_info}"
        
        # 预置动作
        elif text in PRESETS:
            success, result = execute_preset(text)
            response_text = f"✅ {result}" if success else f"❌ {result}"
        
        # 舵机控制
        else:
            parts = text.split()
            if len(parts) >= 2:
                servo_name = parts[0]
                try:
                    angle = int(parts[1])
                    success, result = set_servo_angle(servo_name, angle)
                    response_text = f"✅ {result}" if success else f"❌ {result}"
                except ValueError:
                    response_text = "❌ 角度必须是数字"
            else:
                response_text = "❓ 未知命令，发送 'help' 查看帮助"
        
        print(f"回复消息: {response_text}")
        
        # 发送飞书消息（如果已配置）
        if chat_id and response_text:
            send_feishu_message(chat_id, response_text)
    
    return jsonify({'status': 'ok'})