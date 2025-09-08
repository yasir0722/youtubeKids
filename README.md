# YouTube Kids App

A Vue.js web application that reads YouTube video links from a public Google Sheet and displays them in a YouTube-like interface.

## Features

- 📺 Clean, YouTube-inspired interface
- 📊 Reads video data from Google Sheets
- 🎬 Modal video player with YouTube embed
- 📱 Responsive design for all devices
- ⚡ Fast loading with Vite

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Google Sheets

1. Create a Google Sheet with the following columns:
   - `title` - Video title
   - `url` - YouTube video URL
   - `description` - Video description

2. Make your Google Sheet public:
   - Go to File → Share → Share with others
   - Change "Restricted" to "Anyone with the link"
   - Set permission to "Viewer"

3. Get your sheet's CSV export URL:
   - Copy your sheet URL: `https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/edit`
   - Replace `YOUR_SHEET_ID` in the CSV URL format: 
     `https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/export?format=csv&gid=0`

4. Update the Google Sheets URL in `src/App.vue`:
   - Find the `GOOGLE_SHEET_URL` constant
   - Replace with your actual Google Sheets CSV URL
   - Uncomment the Google Sheets fetching code

### 3. Run the Application

```bash
npm run dev
```

The app will open in your browser at `http://localhost:3000`

## Google Sheets Setup Example

| title | url | description |
|-------|-----|-------------|
| Educational Video 1 | https://www.youtube.com/watch?v=VIDEO_ID_1 | Learning numbers and letters |
| Fun Song for Kids | https://www.youtube.com/watch?v=VIDEO_ID_2 | Catchy educational song |
| Science Experiment | https://www.youtube.com/watch?v=VIDEO_ID_3 | Safe experiments for children |

## Code Structure

```
src/
├── App.vue          # Main application component
├── main.js          # Application entry point
└── style.css        # Global styles
```

## Customization

- **Styling**: Modify `src/style.css` for custom colors and layout
- **Video Processing**: Update the video processing logic in `App.vue`
- **Sheet Format**: Adjust column names in the Papa Parse configuration

## Technologies Used

- Vue 3 (Composition API)
- Vite (Build tool)
- Axios (HTTP requests)
- Papa Parse (CSV parsing)
- YouTube Embed API

## Production Build

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment.

## Notes

- The app currently shows sample data for demonstration
- Uncomment the Google Sheets integration code and add your sheet URL
- Make sure your Google Sheet is publicly accessible
- YouTube videos must be embeddable (not restricted)
