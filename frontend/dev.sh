#!/bin/bash

echo "🚀 Starting Spice & Sweet Development Environment..."
echo ""
echo "📂 Project Structure:"
echo "   Frontend: spice-and-sweet/"
echo "   API:      ../server/"
echo "   Database: ../supabase/"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

echo "✅ Node.js $(node -v) detected"
echo ""

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing Next.js dependencies..."
    npm install
    echo ""
fi

if [ ! -d "../server/node_modules" ]; then
    echo "📦 Installing API server dependencies..."
    cd ../server && npm install && cd ../spice-and-sweet
    echo ""
fi

# Check for .env files
if [ ! -f ".env.local" ]; then
    echo "⚠️  Warning: .env.local not found!"
    echo "   Please create .env.local with your configuration."
    echo "   See .env.local.example for reference."
    echo ""
fi

if [ ! -f "../server/.env" ]; then
    echo "⚠️  Warning: ../server/.env not found!"
    echo "   Please create ../server/.env with your configuration."
    echo "   See ../server/.env.example for reference."
    echo ""
fi

echo "🔧 Starting servers..."
echo ""
echo "📝 API Server will run on: http://localhost:4000"
echo "📝 Next.js App will run on: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

# Use trap to kill all background processes on script exit
trap 'kill $(jobs -p) 2>/dev/null' EXIT

# Start API server in background
cd ../server && npm run dev &
API_PID=$!

# Wait a bit for API server to start
sleep 3

# Start Next.js in background (from spice-and-sweet directory)
cd ../spice-and-sweet && npm run dev &
NEXT_PID=$!

# Wait for both processes
wait
