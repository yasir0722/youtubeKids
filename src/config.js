// Application Configuration
export const config = {
  // Google Sheets Configuration
  googleSheets: {
    // Your Google Sheets CSV export URL
    url: 'https://docs.google.com/spreadsheets/d/1ekgKmzdg4k7xb1spluvSOd87uddkQMCd0rUQKtNXWlY/export?format=csv&gid=0',
    
    // Expected column names in your Google Sheet (case insensitive)
    columns: {
      title: 'title',
      url: 'url', 
      description: 'description'
    }
  },

  // App Settings
  app: {
    name: 'YouTube Kids',
    // Switch between sample data and Google Sheets
    // Set to false to use Google Sheets, true for sample data
    useSampleData: false,
    
    // Fallback to sample data if Google Sheets fails
    fallbackToSample: true,
    
    // Number of videos to show per page (future feature)
    videosPerPage: 12,
    
    // Theme settings
    theme: {
      defaultMode: 'auto', // 'light', 'dark', or 'auto' (follows system preference)
      persistTheme: true   // Save user's theme preference
    },
    
    // Video player settings
    player: {
      autoplay: true,
      showRelated: false,
      modestBranding: true
    }
  },

  // Sample data for demonstration
  sampleVideos: [
    {
      title: "Bluey - Dance Mode! | Kids Songs", 
      url: "https://www.youtube.com/watch?v=ScMzIvxBSi4",
      description: "Join Bluey and Bingo for some dancing fun with catchy tunes."
    }
  ]
}
