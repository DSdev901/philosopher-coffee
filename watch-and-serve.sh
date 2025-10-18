#!/bin/bash

# Script to watch for changes, rebuild, and serve on port 3001

echo "🔍 Watching for changes and serving on port 3001..."
echo "📦 Building initial version..."

# Initial build
npm run build

# Kill any existing process on port 3001
lsof -ti:3001 | xargs kill -9 2>/dev/null

# Start serve in background
serve -s build -l 3001 &
SERVE_PID=$!

echo "✅ Server started on http://localhost:3001"
echo "🌐 Network: http://$(ipconfig getifaddr en0):3001"
echo ""
echo "👀 Watching for file changes (press Ctrl+C to stop)..."

# Watch for changes in src directory
fswatch -o src/ public/ | while read f; do
  echo "🔄 Changes detected! Rebuilding..."
  
  # Kill the serve process
  kill $SERVE_PID 2>/dev/null
  
  # Rebuild
  npm run build
  
  # Restart serve
  serve -s build -l 3001 &
  SERVE_PID=$!
  
  echo "✅ Rebuild complete! Server refreshed."
done
