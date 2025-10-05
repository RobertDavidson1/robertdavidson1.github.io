#!/bin/bash

# Start Live Server on port 5500 in the background
echo "Starting Live Server..."
live-server --port=5500 --quiet &

# Wait a few seconds to ensure server starts
sleep 3

# Start ngrok tunnel for port 5500
echo "Starting ngrok tunnel..."
ngrok http 5500

