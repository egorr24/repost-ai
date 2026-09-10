@echo off
title RepostAI Server + Public Internet Tunnel
cd /d "D:\projects\content-repurposer"

echo ==============================================
echo       Starting RepostAI (Next.js 14)
echo ==============================================
echo.

start "RepostAI Next.js Server" cmd /k "npm run dev"
timeout /t 5 >nul

echo Starting Public Internet Tunnel...
start "RepostAI Public Tunnel" cmd /k "ssh -o StrictHostKeyChecking=no -R 80:localhost:3000 nokey@localhost.run"

echo.
echo ==============================================
echo RepostAI is launching!
echo Local URL: http://localhost:3000
echo Check the 'RepostAI Public Tunnel' window for your public https URL
echo ==============================================
echo.
pause
