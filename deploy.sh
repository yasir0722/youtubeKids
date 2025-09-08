#!/bin/bash

# YouTube Kids App - Deployment Script

echo "🚀 Deploying YouTube Kids App to GitHub Pages..."

# Build the app
echo "📦 Building the app..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    
    # Deploy to GitHub Pages
    echo "🌐 Deploying to GitHub Pages..."
    npx gh-pages -d dist
    
    if [ $? -eq 0 ]; then
        echo "🎉 Deployment successful!"
        echo "🔗 Your app will be available at: https://yasir0722.github.io/youtubeKids"
        echo "⏰ It may take a few minutes to become available."
    else
        echo "❌ Deployment failed!"
        exit 1
    fi
else
    echo "❌ Build failed!"
    exit 1
fi
