@echo off
chcp 65001 >nul
echo 正在启动 RhinoVolt 小程序调试...
echo.

set DEVTOOLS="D:\Program Files (x86)\Tencent\微信web开发者工具\微信开发者工具.exe"
set PROJECT="D:\Work\projects\RhinoVolt\client"

if exist %DEVTOOLS% (
    echo [OK] 微信开发者工具: %DEVTOOLS%
    echo [OK] 项目路径: %PROJECT%
    echo.
    echo 正在打开项目...
    start "" %DEVTOOLS% %PROJECT%
) else (
    echo [ERROR] 微信开发者工具未找到: %DEVTOOLS%
    pause
)
