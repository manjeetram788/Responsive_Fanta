@echo off
REM Windows startup script for local server

cls
echo ==========================================
echo    Responsive Fanta - Local Server
echo ==========================================
echo.

REM Check if node_modules exists
if not exist "node_modules" (
    echo Downloading dependencies...
    call npm install
    echo.
)

echo Starting server...
echo.
echo Server will run on http://localhost:5000
echo.
echo Press Ctrl+C to stop the server
echo.

node server-local.js
pause
