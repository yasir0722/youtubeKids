# Google Sheets Setup Guide

## 🔗 Your Sheet URL
**Edit URL:** https://docs.google.com/spreadsheets/d/1ekgKmzdg4k7xb1spluvSOd87uddkQMCd0rUQKtNXWlY/edit?usp=sharing
**CSV Export URL:** https://docs.google.com/spreadsheets/d/1ekgKmzdg4k7xb1spluvSOd87uddkQMCd0rUQKtNXWlY/export?format=csv&gid=0

## 📋 Required Steps

### 1. Make Your Sheet Public
1. Open your Google Sheet: [Click Here](https://docs.google.com/spreadsheets/d/1ekgKmzdg4k7xb1spluvSOd87uddkQMCd0rUQKtNXWlY/edit?usp=sharing)
2. Click the **"Share"** button (top right)
3. Click **"Change to anyone with the link"**
4. Set permission to **"Viewer"**
5. Click **"Done"**

### 2. Required Column Headers
Your Google Sheet should have these column headers (exact names):

| title | url | description |
|-------|-----|-------------|
| Video Title Here | https://www.youtube.com/watch?v=VIDEO_ID | Description here |

### 3. Example Data Format
```
title,url,description
"Kids Learning Video","https://www.youtube.com/watch?v=dQw4w9WgXcQ","Educational content for children"
"Fun Dance Song","https://www.youtube.com/watch?v=ScMzIvxBSi4","Interactive dancing and singing"
```

## 🧪 Testing Your Sheet

### Quick Test
1. Open this URL in your browser: 
   `https://docs.google.com/spreadsheets/d/1ekgKmzdg4k7xb1spluvSOd87uddkQMCd0rUQKtNXWlY/export?format=csv&gid=0`
2. You should see CSV data, not an error

### App Test
1. Run `npm run dev`
2. Open `http://localhost:3000`
3. Check if your videos load

## 🔄 Switching Between Sample and Live Data

Edit `src/config.js`:
```javascript
app: {
  useSampleData: false  // true = sample data, false = Google Sheets
}
```

## 🚨 Troubleshooting

**"Invalid URL" or Access Denied?**
- Make sure the sheet is public (step 1 above)
- Verify the sheet ID is correct
- Try the CSV URL directly in your browser

**Videos not showing?**
- Check column headers match exactly: `title`, `url`, `description`
- Ensure YouTube URLs are complete and valid
- Check browser console for errors

**Still having issues?**
- Temporarily set `useSampleData: true` to test the app
- Check that your sheet has data in the correct format
