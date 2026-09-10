@echo off
title RepostAI Server + Public Internet Tunnel
cd /d "D:\projects\content-repurposer"

echo ==============================================
echo       Starting RepostAI (Production)
echo ==============================================
echo.

start "RepostAI Server" cmd /k "npm run start"
timeout /t 3 >nul

echo Starting Public Internet Tunnel...
start "RepostAI Public Tunnel" cmd /k "ssh -o StrictHostKeyChecking=no -R 80:localhost:3000 nokey@localhost.run"

echo.
echo ==============================================
echo RepostAI is running in production mode!
echo Local URL: http://localhost:3000
echo Public URL is displayed in the Tunnel window.
echo ==============================================
echo.
pause
