#!/bin/bash

# Preview Accordion Documentation Locally
# This script starts a simple HTTP server to preview the documentation

echo "🚀 Starting Accordion Documentation Preview..."
echo ""
echo "Choose a method:"
echo "1) Python (recommended - usually pre-installed)"
echo "2) Node.js (requires npx)"
echo "3) PHP (if available)"
echo ""
read -p "Enter choice (1-3): " choice

PORT=8000

case $choice in
  1)
    echo ""
    echo "Starting Python HTTP server..."
    echo "📖 Documentation will be available at: http://localhost:$PORT"
    echo "Press Ctrl+C to stop the server"
    echo ""
    python3 -m http.server $PORT 2>/dev/null || python -m SimpleHTTPServer $PORT
    ;;
  2)
    echo ""
    echo "Starting Node.js HTTP server..."
    echo "📖 Documentation will be available at: http://localhost:$PORT"
    echo "Press Ctrl+C to stop the server"
    echo ""
    npx http-server -p $PORT
    ;;
  3)
    echo ""
    echo "Starting PHP HTTP server..."
    echo "📖 Documentation will be available at: http://localhost:$PORT"
    echo "Press Ctrl+C to stop the server"
    echo ""
    php -S localhost:$PORT
    ;;
  *)
    echo "Invalid choice. Please run the script again."
    exit 1
    ;;
esac

