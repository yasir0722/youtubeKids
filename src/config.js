// Application Configuration
export const config = {
  // Google Sheets Configuration
  googleSheets: {
    // Replace YOUR_SHEET_ID with your actual Google Sheets ID
    // Example: 'https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/export?format=csv&gid=0'
    url: 'https://docs.google.com/spreadsheets/d/1YOUR_SHEET_ID/export?format=csv&gid=0',
    
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
    // Set to false when you have your Google Sheet configured
    useSampleData: true,
    
    // Number of videos to show per page (future feature)
    videosPerPage: 12,
    
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
      title: "Peppa Pig - Best Episodes Compilation",
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      description: "Fun adventures with Peppa and her family. Educational content for kids."
    },
    {
      title: "Bluey - Dance Mode! | Kids Songs", 
      url: "https://www.youtube.com/watch?v=ScMzIvxBSi4",
      description: "Join Bluey and Bingo for some dancing fun with catchy tunes."
    },
    {
      title: "Cocomelon - Wheels on the Bus",
      url: "https://www.youtube.com/watch?v=e_04ZrNroTo",
      description: "Classic nursery rhyme with colorful animation and learning."
    },
    {
      title: "Paw Patrol - Chase is on the Case",
      url: "https://www.youtube.com/watch?v=vTIIMJ9tUc8",
      description: "Adventure Bay needs help from Chase and the Paw Patrol team."
    },
    {
      title: "Sesame Street - Elmo's World",
      url: "https://www.youtube.com/watch?v=wxrbOVeRonQ",
      description: "Learn and explore with Elmo in his wonderful world of discovery."
    },
    {
      title: "Daniel Tiger's Neighborhood - Kindness",
      url: "https://www.youtube.com/watch?v=CeNLyzKhXKA",
      description: "Life lessons about kindness and friendship with Daniel Tiger."
    },
    {
      title: "Blippi - Learning Colors and Numbers",
      url: "https://www.youtube.com/watch?v=tRNQRzJqUGw",
      description: "Educational content with Blippi teaching colors and numbers."
    },
    {
      title: "Super Simple Songs - If You're Happy",
      url: "https://www.youtube.com/watch?v=l4WNrvVjiTw",
      description: "Interactive songs that get kids moving and singing along."
    }
  ]
}
