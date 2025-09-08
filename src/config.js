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
      description: 'description',
      type: 'type'  // New column for video categories
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
      description: "Join Bluey and Bingo for some dancing fun with catchy tunes.",
      type: "Music"
    },
    {
      title: "Educational Numbers 1-10",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      description: "Learn to count from 1 to 10 with fun animations.",
      type: "Education"
    },
    {
      title: "Animal Sounds for Kids",
      url: "https://www.youtube.com/watch?v=e_04ZrNroTo",
      description: "Learn what sounds different animals make.",
      type: "Education"
    },
    {
      title: "Kids Yoga and Exercise",
      url: "https://www.youtube.com/watch?v=vTIIMJ9tUc8",
      description: "Fun yoga poses and exercises for children.",
      type: "Exercise"
    },
    {
      title: "Storytime - Three Little Pigs",
      url: "https://www.youtube.com/watch?v=wxrbOVeRonQ",
      description: "Classic fairy tale story for bedtime.",
      type: "Stories"
    },
    {
      title: "ABC Learning Song",
      url: "https://www.youtube.com/watch?v=CeNLyzKhXKA",
      description: "Learn the alphabet with this catchy song.",
      type: "Music"
    }
  ],

  // Default video types
  defaultTypes: [
    "All"
  ]
}
