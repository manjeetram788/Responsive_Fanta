#!/bin/bash
# Simple startup script for local server

echo "=========================================="
echo "   Responsive Fanta - Local Server"
echo "=========================================="
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
fi

echo "✅ Starting server..."
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

node server-local.js
