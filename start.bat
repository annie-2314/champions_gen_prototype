@echo off
echo ========================================
echo    CHAMPIONS GEN - Football Analytics
echo ========================================
echo.
echo Starting the platform...
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python is not installed or not in PATH
    echo Please install Python 3.8 or higher
    pause
    exit /b 1
)

REM Install dependencies
echo Installing dependencies...
pip install -r requirements.txt >nul 2>&1

REM Start the server
echo.
echo ========================================
echo    Platform Starting...
echo    Open: http://localhost:5000
echo ========================================
echo.
python app.py

pause
