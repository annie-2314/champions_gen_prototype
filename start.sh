#!/bin/bash

echo "========================================"
echo "   CHAMPIONS GEN - Football Analytics"
echo "========================================"
echo

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "ERROR: Python 3 is not installed"
    echo "Please install Python 3.8 or higher"
    exit 1
fi

# Check Python version
python_version=$(python3 -c "import sys; print(f'{sys.version_info.major}.{sys.version_info.minor}')")
required_version="3.8"

if [ "$(printf '%s\n' "$required_version" "$python_version" | sort -V | head -n1)" != "$required_version" ]; then
    echo "ERROR: Python 3.8 or higher is required"
    echo "Current version: $python_version"
    exit 1
fi

echo "✅ Python $python_version detected"

# Install dependencies
echo "📦 Installing dependencies..."
pip3 install -r requirements.txt > /dev/null 2>&1

# Start the server
echo
echo "========================================"
echo "   Platform Starting..."
echo "   Open: http://localhost:5000"
echo "========================================"
echo

python3 app.py
