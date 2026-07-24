@echo off
chcp 65001 >nul
title PhotoAI Studio - 光影智助

echo.
echo   ╔══════════════════════════════════════════╗
echo   ║                                          ║
echo   ║     📷  PhotoAI Studio  光影智助         ║
echo   ║     AI 摄影创作助手                      ║
echo   ║                                          ║
echo   ╚══════════════════════════════════════════╝
echo.
echo   [1/3] 正在进入项目目录...
echo.

cd /d "D:\产品开发测试\photoai-studio"

if errorlevel 1 (
    echo   ❌ 无法进入项目目录，请检查路径是否正确
    pause
    exit /b 1
)

echo   [2/3] 正在启动 Next.js 开发服务器...
echo.
echo   提示：首次启动可能需要 10-30 秒编译
echo   关闭此窗口即可停止服务
echo.
echo   ═══════════════════════════════════════════
echo.

:: 等待 2 秒后自动打开浏览器
start "" /b cmd /c "timeout /t 3 /nobreak >nul && start http://localhost:3000"

:: 启动 Next.js 开发服务器
call npm run dev

pause
