#!/bin/bash

echo "======================================"
echo "🚀 Fruitizzzz FULL AUTO START SYSTEM"
echo "======================================"

# Kill old servers (frontend + backend)
echo "🧹 Killing old servers..."

pkill -f "node app.js" 2>/dev/null
pkill -f http.server 2>/dev/null

sleep 1

# Start backend
echo "📦 Starting Backend..."

cd ~/fruitizzzz-backend
node app.js &
BACKEND_PID=$!

sleep 2

# Start frontend
echo "🌐 Starting Frontend..."

cd ~/fruitizzzz-backend/fruitizzzz-frontend
python3 -m http.server 5501 &
FRONTEND_PID=$!

sleep 2

echo "======================================"
echo "✅ SYSTEM RUNNING SUCCESSFULLY"
echo "--------------------------------------"
echo "🌍 Frontend: http://127.0.0.1:5501"
echo "⚙️ Backend:  http://127.0.0.1:3000"
echo "--------------------------------------"
echo "🧠 Backend PID: $BACKEND_PID"
echo "🧠 Frontend PID: $FRONTEND_PID"
echo "======================================"
