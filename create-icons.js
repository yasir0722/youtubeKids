const fs = require('fs');
const { createCanvas } = require('canvas');

function createIcon(size) {
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext('2d');
    
    // Red background
    ctx.fillStyle = '#FF0000';
    ctx.fillRect(0, 0, size, size);
    
    // White play button triangle
    ctx.fillStyle = 'white';
    ctx.beginPath();
    const centerX = size / 2;
    const centerY = size / 2;
    const playSize = size * 0.25;
    
    // Triangle
    ctx.moveTo(centerX - playSize/2, centerY - playSize/2);
    ctx.lineTo(centerX + playSize/2, centerY);
    ctx.lineTo(centerX - playSize/2, centerY + playSize/2);
    ctx.closePath();
    ctx.fill();
    
    // YK text
    ctx.fillStyle = 'white';
    ctx.font = `bold ${size * 0.1}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('YK', centerX, centerY + playSize/2 + size * 0.12);
    
    return canvas.toBuffer('image/png');
}

// Create icons
const icon192 = createIcon(192);
const icon512 = createIcon(512);

// Save files
fs.writeFileSync('./public/icon-192x192.png', icon192);
fs.writeFileSync('./public/icon-512x512.png', icon512);

console.log('Icons created successfully!');
