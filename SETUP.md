# Quick Start Guide

## 🚀 Getting Started

### 1. Install Dependencies and Run
```bash
npm install
npm run dev
```

The app will open at `http://localhost:3000`

### 2. Using Sample Data (Default)
The app is pre-configured with sample YouTube videos to demonstrate functionality. No additional setup needed!

### 3. Connect Your Google Sheet

#### Step 1: Create Your Google Sheet
Create a Google Sheet with these column headers:
- `title` - Video title
- `url` - YouTube video URL  
- `description` - Video description

#### Step 2: Make Sheet Public
1. Open your Google Sheet
2. Click **Share** button (top right)
3. Change from "Restricted" to **"Anyone with the link"**
4. Set permission to **"Viewer"**
5. Click **Done**

#### Step 3: Get CSV Export URL
1. Copy your sheet URL: `https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/edit`
2. Replace in this format: `https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/export?format=csv&gid=0`

#### Step 4: Update Configuration
Edit `src/config.js`:
```javascript
export const config = {
  googleSheets: {
    url: 'YOUR_CSV_EXPORT_URL_HERE'
  },
  app: {
    useSampleData: false  // Change to false
  }
}
```

## 📝 Google Sheet Example

| title | url | description |
|-------|-----|-------------|
| Learning ABCs | https://www.youtube.com/watch?v=VIDEO_ID | Fun alphabet song |
| Counting Numbers | https://www.youtube.com/watch?v=VIDEO_ID | Learn to count 1-10 |
| Animal Sounds | https://www.youtube.com/watch?v=VIDEO_ID | What sounds do animals make? |

## 🛠️ Available Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production  
- `npm run preview` - Preview production build

## ✨ Features

- ✅ YouTube-like interface
- ✅ Google Sheets integration
- ✅ Modal video player
- ✅ Responsive design
- ✅ Sample data included

## 🔧 Troubleshooting

**Videos not loading?**
- Check that your Google Sheet is public
- Verify the CSV export URL is correct
- Ensure YouTube URLs are valid and embeddable

**Sheet access issues?**
- Make sure sharing is set to "Anyone with the link"
- Check that the sheet contains the required columns
- Try accessing the CSV URL directly in your browser
