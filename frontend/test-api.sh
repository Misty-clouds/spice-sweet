#!/bin/bash

# Quick test script for the API server
echo "🧪 Testing Spice & Sweet API Server..."
echo ""
echo "📍 Testing API at: http://localhost:4000"
echo "📂 API Server location: ../server/"
echo ""

# Check if server is running on port 4000
if lsof -Pi :4000 -sTCP:LISTEN -t >/dev/null ; then
    echo "✅ Server is running on port 4000"
    echo ""
    
    echo "Testing /health endpoint..."
    curl -s http://localhost:4000/health | jq . || echo "Response received but jq not installed"
    echo ""
    
    echo "Testing /api/products endpoint..."
    curl -s http://localhost:4000/api/products | head -c 200
    echo ""
    echo "..."
    echo ""
    echo "✅ API Server is responding correctly!"
    
else
    echo "❌ Server is not running on port 4000"
    echo ""
    echo "Start the server with one of these commands:"
    echo "  Option 1: cd ../server && npm run dev"
    echo "  Option 2: ./dev.sh (starts both API and frontend)"
fi
