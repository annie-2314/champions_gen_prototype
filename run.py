#!/usr/bin/env python3
"""
Champions Gen - Quick Start Script
Run this script to start the Champions Gen platform with all services
"""

import subprocess
import sys
import os
import webbrowser
import time
from pathlib import Path

def check_python_version():
    """Check if Python version is compatible"""
    if sys.version_info < (3, 8):
        print("❌ Python 3.8 or higher is required")
        print(f"   Current version: {sys.version}")
        sys.exit(1)
    print(f"✅ Python {sys.version.split()[0]} detected")

def install_dependencies():
    """Install required Python packages"""
    print("📦 Installing dependencies...")
    try:
        subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"], 
                            stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        print("✅ Dependencies installed successfully")
    except subprocess.CalledProcessError:
        print("❌ Failed to install dependencies")
        print("   Please run: pip install -r requirements.txt")
        sys.exit(1)

def check_files():
    """Check if required files exist"""
    required_files = ["app.py", "index.html", "styles.css", "script.js", "data.js"]
    missing_files = []
    
    for file in required_files:
        if not Path(file).exists():
            missing_files.append(file)
    
    if missing_files:
        print(f"❌ Missing required files: {', '.join(missing_files)}")
        sys.exit(1)
    
    print("✅ All required files found")

def start_server():
    """Start the Flask development server"""
    print("🚀 Starting Champions Gen Platform...")
    print("📊 AI-Powered Football Analytics")
    print("🌐 Server will be available at: http://localhost:5000")
    print("📋 API documentation at: http://localhost:5000/api/health")
    print("\n" + "="*50)
    print("🎯 CHAMPIONS GEN - READY TO LAUNCH")
    print("="*50)
    
    # Wait a moment for user to read
    time.sleep(2)
    
    try:
        # Try to open browser automatically
        webbrowser.open("http://localhost:5000")
        print("🌐 Opening browser automatically...")
    except:
        print("🌐 Please open http://localhost:5000 in your browser")
    
    # Start Flask app
    os.system("python app.py")

def main():
    """Main execution function"""
    print("🏆 Champions Gen - Football Analytics Platform")
    print("="*50)
    
    # Check system requirements
    check_python_version()
    check_files()
    
    # Install dependencies
    install_dependencies()
    
    # Start the server
    start_server()

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\n👋 Champions Gen stopped. Thank you for using our platform!")
        sys.exit(0)
    except Exception as e:
        print(f"\n❌ Error starting Champions Gen: {e}")
        print("   Please check the README.md for troubleshooting steps")
        sys.exit(1)
