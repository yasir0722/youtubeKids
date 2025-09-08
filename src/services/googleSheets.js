// Google Sheets Integration Service
import axios from 'axios'
import Papa from 'papaparse'

export class GoogleSheetsService {
  constructor(sheetUrl) {
    this.sheetUrl = sheetUrl
  }

  async fetchVideoData() {
    try {
      const response = await axios.get(this.sheetUrl)
      const parsed = Papa.parse(response.data, {
        header: true,
        skipEmptyLines: true,
        transformHeader: (header) => header.toLowerCase().trim()
      })

      if (parsed.errors.length > 0) {
        throw new Error('Error parsing CSV data')
      }

      return this.processVideoData(parsed.data)
    } catch (error) {
      console.error('Error fetching Google Sheets data:', error)
      throw new Error('Failed to fetch data from Google Sheets')
    }
  }

  processVideoData(data) {
    return data.map((row, index) => {
      const videoId = this.extractVideoId(row.url || '')
      if (!videoId) return null

      return {
        id: index + 1,
        title: row.title || 'Untitled Video',
        description: row.description || 'No description available',
        url: row.url,
        videoId,
        thumbnail: this.getVideoThumbnail(videoId),
        embedUrl: this.getEmbedUrl(videoId)
      }
    }).filter(Boolean)
  }

  extractVideoId(url) {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /youtube\.com\/watch\?.*v=([^&\n?#]+)/
    ]
    
    for (const pattern of patterns) {
      const match = url.match(pattern)
      if (match) return match[1]
    }
    return null
  }

  getVideoThumbnail(videoId) {
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
  }

  getEmbedUrl(videoId) {
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`
  }
}

// Example usage:
// const sheetsService = new GoogleSheetsService('https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/export?format=csv&gid=0')
// const videos = await sheetsService.fetchVideoData()
