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
                    <div class="header-right">
                        <button class="theme-toggle" @click="toggleTheme">
                            <span class="theme-icon">{{ isDarkMode ? '☀️' : '🌙' }}</span>
                            <span>{{ isDarkMode ? 'Light' : 'Dark' }}</span>
                        </button>
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
                    <!-- Simple Filter Dropdown -->
                    <div class="filter-section">
                        <div class="filter-controls">
                            <label for="type-filter" class="filter-label">Filter by Type:</label>
                            <select 
                                id="type-filter" 
                                v-model="selectedType" 
                                class="type-select"
                                @change="filterVideos"
                            >
                                <option value="All">All Types</option>
                                <option 
                                    v-for="type in availableTypes" 
                                    :key="type" 
                                    :value="type"
                                >
                                    {{ type }}
                                </option>
                            </select>
                            <span class="filter-count">
                                {{ filteredVideos.length }} of {{ videos.length }} videos
                            </span>
                        </div>
                    </div>

                    <!-- Video Grid -->
                    <div class="video-grid">
                        <div 
                            v-for="video in filteredVideos" 
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
                                <span class="video-type">{{ video.type || 'Uncategorized' }}</span>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Video Count -->
                    <div class="video-stats">
                        <span v-if="videos.length > 0">
                            Showing {{ filteredVideos.length }} of {{ videos.length }} videos
                            <span v-if="selectedType !== 'All'"> in "{{ selectedType }}"</span>
                        </span>
                    </div>
                </div>
            </div>
        </main>

        <!-- Video Modal -->
        <div v-if="selectedVideo" class="modal-overlay" @click="closeVideo" @touchend="closeVideo">
            <div class="modal-content" @click.stop @touchend.stop>
                <button class="close-button" @click="closeVideo" @touchend="closeVideo" aria-label="Close video player">×</button>
                <iframe
                    class="video-player"
                    :src="selectedVideo.embedUrl"
                    frameborder="0"
                    allowfullscreen
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin"
                    loading="lazy"
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
import { ref, onMounted, watch } from 'vue'
import { GoogleSheetsService } from './services/googleSheets.js'
import { config } from './config.js'

export default {
    name: 'App',
    setup() {
        const videos = ref([])
        const loading = ref(true)
        const error = ref(null)
        const selectedVideo = ref(null)
        const isDarkMode = ref(false)

        // Filter management
        const selectedType = ref('All')
        const availableTypes = ref([])
        const filteredVideos = ref([])

        // Mobile detection
        const isMobile = ref(false)

        // Initialize mobile detection
        const initializeMobile = () => {
            const checkMobile = () => {
                isMobile.value = window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
            }
            
            checkMobile()
            window.addEventListener('resize', checkMobile)
            
            return () => window.removeEventListener('resize', checkMobile)
        }

        // Initialize theme from localStorage or default to light mode
        const initializeTheme = () => {
            const savedTheme = localStorage.getItem('youtube-kids-theme')
            if (savedTheme) {
                isDarkMode.value = savedTheme === 'dark'
            } else {
                // Check user's system preference
                isDarkMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches
            }
            applyTheme()
        }

        const applyTheme = () => {
            if (isDarkMode.value) {
                document.documentElement.setAttribute('data-theme', 'dark')
            } else {
                document.documentElement.removeAttribute('data-theme')
            }
        }

        const toggleTheme = () => {
            isDarkMode.value = !isDarkMode.value
            localStorage.setItem('youtube-kids-theme', isDarkMode.value ? 'dark' : 'light')
            applyTheme()
        }

        const fetchVideos = async () => {
            try {
                loading.value = true
                error.value = null

                if (config.app.useSampleData) {
                    // Use sample data for demonstration
                    const sheetsService = new GoogleSheetsService('')
                    videos.value = sheetsService.processVideoData(config.sampleVideos)
                    // Use default types for sample data
                    initializeTypes()
                } else {
                    try {
                        // Try to use Google Sheets service
                        const sheetsService = new GoogleSheetsService(config.googleSheets.url)
                        
                        // Fetch both videos and types
                        const [videosData, typesData] = await Promise.all([
                            sheetsService.fetchVideoData(),
                            sheetsService.fetchVideoTypes()
                        ])
                        
                        videos.value = videosData
                        
                        // Initialize types with data from second sheet
                        initializeTypes(typesData)
                        
                    } catch (sheetsError) {
                        console.warn('Google Sheets failed, trying fallback:', sheetsError)
                        
                        if (config.app.fallbackToSample) {
                            // Fallback to sample data
                            const sheetsService = new GoogleSheetsService('')
                            videos.value = sheetsService.processVideoData(config.sampleVideos)
                            initializeTypes()
                            error.value = 'Using sample data. Please check Google Sheets setup in GOOGLE_SHEETS_SETUP.md'
                        } else {
                            throw sheetsError
                        }
                    }
                }

                // Filter videos after loading
                filterVideos()

            } catch (err) {
                console.error('Error fetching videos:', err)
                error.value = config.app.useSampleData 
                    ? 'Failed to load sample videos.'
                    : 'Failed to load videos from Google Sheets. Please check GOOGLE_SHEETS_SETUP.md for help.'
            } finally {
                loading.value = false
            }
        }

        // Initialize available types from videos and config
        const initializeTypes = (sheetTypes = []) => {
            const videoTypes = [...new Set(videos.value.map(video => video.type).filter(Boolean))]
            
            // Combine types from: sheet second tab, video data, and default types
            const allTypes = [...new Set([
                ...config.defaultTypes.slice(1), // Skip 'All' from defaults
                ...sheetTypes, // Types from second sheet
                ...videoTypes // Types found in video data
            ])]
            
            availableTypes.value = allTypes.sort()
        }

        // Filter videos by selected type
        const filterVideos = () => {
            if (selectedType.value === 'All') {
                filteredVideos.value = videos.value
            } else {
                filteredVideos.value = videos.value.filter(video => 
                    video.type === selectedType.value
                )
            }
        }

        // Watch for type changes to trigger filtering
        watch(selectedType, () => {
            filterVideos()
        })

        const openVideo = (video) => {
            selectedVideo.value = video
            // Prevent body scroll when modal is open (mobile)
            if (isMobile.value) {
                document.body.style.overflow = 'hidden'
            }
        }

        const closeVideo = () => {
            selectedVideo.value = null
            // Restore body scroll (mobile)
            if (isMobile.value) {
                document.body.style.overflow = ''
            }
        }

        onMounted(() => {
            initializeTheme()
            const cleanupMobile = initializeMobile()
            fetchVideos()
            
            // Remove initial loading spinner
            const loadingElement = document.querySelector('.initial-loading')
            if (loadingElement) {
                setTimeout(() => {
                    loadingElement.style.opacity = '0'
                    setTimeout(() => {
                        loadingElement.remove()
                    }, 300)
                }, 500)
            }
            
            // Cleanup on unmount
            return cleanupMobile
        })

        return {
            videos,
            loading,
            error,
            selectedVideo,
            isDarkMode,
            isMobile,
            selectedType,
            filteredVideos,
            availableTypes,
            openVideo,
            closeVideo,
            toggleTheme,
            filterVideos
        }
    }
}
</script>
