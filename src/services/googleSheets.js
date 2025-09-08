// Google Sheets Integration Service
import axios from 'axios'
import Papa from 'papaparse'

export class GoogleSheetsService {
  constructor(sheetUrl) {
    this.sheetUrl = sheetUrl
    // Extract the base URL for multiple tabs
    if (sheetUrl) {
      const urlParts = sheetUrl.split('/export?')
      this.baseUrl = urlParts[0]
    }
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

  async fetchVideoTypes() {
    try {
      // Construct URL for second tab (gid=1 for second sheet)
      const typesUrl = `${this.baseUrl}/export?format=csv&gid=1`
      const response = await axios.get(typesUrl)
      const parsed = Papa.parse(response.data, {
        header: true,
        skipEmptyLines: true,
        transformHeader: (header) => header.toLowerCase().trim()
      })

      if (parsed.errors.length > 0) {
        console.warn('Error parsing types CSV data, using defaults')
        return []
      }

      // Extract types from the parsed data
      // Assuming the second sheet has a column named 'type' or 'types'
      return parsed.data
        .map(row => row.type || row.types || row.name)
        .filter(type => type && type.trim())
        .map(type => type.trim())
    } catch (error) {
      console.warn('Error fetching types from second sheet:', error)
      return []
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
        type: row.type || 'Uncategorized',
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
