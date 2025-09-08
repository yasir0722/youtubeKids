<template>
  <div id="app">
    <!-- Header -->
    <header class="header">
      <div class="container">
        <div class="header-content">
          <div class="logo">
            <div class="logo-icon">YK</div>
            <span>YouTube Kids</span>
          </div>
          <div>
            <span v-if="videos.length > 0">{{ videos.length }} videos available</span>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="main-content">
      <div class="container">
        <!-- Loading State -->
        <div v-if="loading" class="loading">
          <p>Loading videos from Google Sheets...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="error">
          <h3>Error Loading Videos</h3>
          <p>{{ error }}</p>
          <p style="margin-top: 10px; font-size: 14px;">
            Make sure your Google Sheet is public and contains columns: title, url, description
          </p>
        </div>

        <!-- Videos Grid -->
        <div v-else>
          <div class="stats">
            <h2>Available Videos</h2>
            <p>Curated content from our Google Sheets playlist</p>
          </div>

          <div class="video-grid">
            <div 
              v-for="video in videos" 
              :key="video.id"
              class="video-card"
              @click="openVideo(video)"
            >
              <div class="video-thumbnail">
                <img :src="video.thumbnail" :alt="video.title" />
                <div class="play-overlay">▶</div>
              </div>
              <div class="video-info">
                <h3 class="video-title">{{ video.title }}</h3>
                <p class="video-description">{{ video.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Video Modal -->
    <div v-if="selectedVideo" class="modal-overlay" @click="closeVideo">
      <div class="modal-content" @click.stop>
        <button class="close-button" @click="closeVideo">×</button>
        <iframe
          class="video-player"
          :src="selectedVideo.embedUrl"
          frameborder="0"
          allowfullscreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        ></iframe>
        <div class="modal-info">
          <h3 class="modal-title">{{ selectedVideo.title }}</h3>
          <p class="modal-description">{{ selectedVideo.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { GoogleSheetsService } from './services/googleSheets.js'
import { config } from './config.js'

export default {
  name: 'App',
  setup() {
    const videos = ref([])
    const loading = ref(true)
    const error = ref(null)
    const selectedVideo = ref(null)

    const fetchVideos = async () => {
      try {
        loading.value = true
        error.value = null

        if (config.app.useSampleData) {
          // Use sample data for demonstration
          const sheetsService = new GoogleSheetsService('')
          videos.value = sheetsService.processVideoData(config.sampleVideos)
        } else {
          // Use Google Sheets service
          const sheetsService = new GoogleSheetsService(config.googleSheets.url)
          videos.value = await sheetsService.fetchVideoData()
        }

      } catch (err) {
        console.error('Error fetching videos:', err)
        error.value = config.app.useSampleData 
          ? 'Failed to load sample videos.'
          : 'Failed to load videos. Please check the Google Sheets URL in config.js and try again.'
      } finally {
        loading.value = false
      }
    }

    const openVideo = (video) => {
      selectedVideo.value = video
    }

    const closeVideo = () => {
      selectedVideo.value = null
    }

    onMounted(() => {
      fetchVideos()
    })

    return {
      videos,
      loading,
      error,
      selectedVideo,
      openVideo,
      closeVideo
    }
  }
}
</script>
