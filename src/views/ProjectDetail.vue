<template>
  <div class="project-detail">
    <div class="container">
      <div v-if="loading" class="loading">
        <p>{{ siteConfig.messages.loading.projectDetails }}</p>
      </div>
      
      <div v-else-if="error" class="error">
        <p>{{ error }}</p>
        <router-link to="/projects" class="btn-back">{{ siteConfig.messages.buttons.backToProjects }}</router-link>
      </div>
      
      <div v-else-if="project" class="project-detail-content">
        <button @click="goBack" class="btn-back">{{ siteConfig.messages.buttons.backToProjects }}</button>
        
        <div class="project-header">
          <h1>{{ project.name }}</h1>
          <p class="project-meta">{{ project.role }} • {{ project.time }}</p>
        </div>
        
        <!-- 视频播放器（如果是五子棋项目且有视频） -->
        <div v-if="project.id === 6 && project.video" class="video-container">
          <video 
            :src="project.video" 
            controls 
            class="project-video"
            preload="metadata"
          >
            Your browser does not support the video tag.
          </video>
        </div>
        
        <!-- 图片轮播（如果有多个图片） -->
        <div v-else-if="projectImages && projectImages.length > 0" class="image-carousel-container">
          <div 
            class="image-carousel"
            @touchstart="handleTouchStart"
            @touchmove="handleTouchMove"
            @touchend="handleTouchEnd"
            @mousedown="handleMouseDown"
            @mousemove="handleMouseMove"
            @mouseup="handleMouseUp"
            @mouseleave="handleMouseUp"
          >
            <div 
              class="carousel-track"
              :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
            >
              <div 
                v-for="(img, index) in projectImages" 
                :key="index"
                class="carousel-slide"
              >
                <img 
                  :src="img" 
                  :alt="`${project.name} - Image ${index + 1}`" 
                  decoding="async" 
                  loading="lazy"
                />
              </div>
            </div>
            <!-- 左右箭头 -->
            <button 
              v-if="projectImages.length > 1"
              class="carousel-btn carousel-btn-prev"
              @click.stop="prevImage"
              aria-label="Previous image"
            >
              ‹
            </button>
            <button 
              v-if="projectImages.length > 1"
              class="carousel-btn carousel-btn-next"
              @click.stop="nextImage"
              aria-label="Next image"
            >
              ›
            </button>
            <!-- 指示器 -->
            <div v-if="projectImages.length > 1" class="carousel-indicators">
              <button
                v-for="(img, index) in projectImages"
                :key="index"
                class="indicator"
                :class="{ active: index === currentIndex }"
                @click.stop="goToImage(index)"
                :aria-label="`Go to image ${index + 1}`"
              ></button>
            </div>
          </div>
        </div>
        
        <!-- 单张图片（如果没有轮播图和视频） -->
        <div class="project-image-large" v-else-if="project.image && !(project.id === 6 && project.video)">
          <img :src="project.image" :alt="project.name" decoding="async" loading="lazy" />
        </div>
        
        <div class="project-body">
          <div class="project-description">
            <h2>Description</h2>
            <p>{{ project.description }}</p>
          </div>
          
          <div class="project-tech-stack">
            <h2>Technology Stack</h2>
            <div class="tech-tags">
              <span 
                v-for="tech in project.technologies" 
                :key="tech" 
                class="tech-tag-large"
              >
                {{ tech }}
              </span>
            </div>
          </div>
          
          <div v-if="project.contribution" class="project-contribution">
            <h2>My Contribution</h2>
            <p>{{ project.contribution }}</p>
          </div>
          
          <div class="project-links-section" v-if="project.github || project.demo || project.video">
            <h2>Links</h2>
            <div class="links">
              <a 
                v-if="project.github" 
                :href="project.github" 
                target="_blank" 
                class="link-btn github"
              >
                {{ siteConfig.messages.buttons.viewOnGitHub }}
              </a>
              <a 
                v-if="project.video" 
                :href="project.video" 
                target="_blank" 
                class="link-btn video"
              >
                {{ siteConfig.messages.buttons.watchVideo }}
              </a>
              <a 
                v-if="project.demo" 
                :href="project.demo" 
                target="_blank" 
                class="link-btn demo"
              >
                {{ siteConfig.messages.buttons.liveDemo }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, onUnmounted, nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { siteConfig } from '../config/site.js'

const router = useRouter()
const route = useRoute()
const project = ref(null)
const loading = ref(true)
const error = ref(null)
const currentIndex = ref(0)
const autoPlayInterval = ref(null)
const baseUrl = import.meta.env.BASE_URL

// 触摸/鼠标拖拽相关
const touchStartX = ref(0)
const touchStartY = ref(0)
const isDragging = ref(false)
const dragStartX = ref(0)

// 处理图片路径，添加 BASE_URL 前缀
const projectImages = computed(() => {
  if (!project.value) {
    return []
  }
  if (!project.value.images || !Array.isArray(project.value.images)) {
    return []
  }
  // 路径已经在 fetchProject 中处理过了，直接返回
  return project.value.images
})

const fetchProject = async () => {
  try {
    loading.value = true
    const response = await fetch(`${baseUrl}data/projects.json`)
    if (!response.ok) {
      throw new Error('Failed to fetch projects')
    }
    const data = await response.json()
    const foundProject = data.find(p => p.id === parseInt(route.params.id))
    
    if (foundProject) {
      // 修复图片路径，添加 BASE_URL 前缀
      project.value = {
        ...foundProject,
        image: foundProject.image && typeof foundProject.image === 'string' && foundProject.image.startsWith('/images/')
          ? (baseUrl === '/' ? foundProject.image : `${baseUrl}images/${foundProject.image.split('/images/')[1]}`)
          : foundProject.image,
        images: foundProject.images && Array.isArray(foundProject.images) ? foundProject.images.map(img => {
          if (img && typeof img === 'string' && img.startsWith('/images/')) {
            // 处理路径：/images/span/xxx.jpeg -> baseUrl + images/span/xxx.jpeg
            // 如果 baseUrl 是 '/'，则直接使用原路径；否则添加 baseUrl 前缀
            const pathAfterImages = img.substring('/images/'.length)
            const finalPath = baseUrl === '/' ? img : `${baseUrl}images/${pathAfterImages}`
            return finalPath
          }
          return img
        }) : (foundProject.images || []),
        video: foundProject.video && foundProject.video.startsWith('/videos/')
          ? `${baseUrl}videos/${foundProject.video.split('/videos/')[1]}`
          : foundProject.video
      }
      
      // 如果有轮播图，启动自动播放（使用 nextTick 确保 DOM 更新完成）
      await nextTick()
      console.log('Project loaded:', {
        hasImages: !!project.value.images,
        imagesLength: project.value.images?.length,
        images: project.value.images,
        projectImages: projectImages.value
      })
      if (project.value.images && Array.isArray(project.value.images) && project.value.images.length > 0) {
        if (project.value.images.length > 1) {
          startAutoPlay()
        }
      }
    } else {
      error.value = 'Project not found'
    }
  } catch (err) {
    error.value = siteConfig.messages.error.projectDetails
    console.error('Error fetching project:', err)
  } finally {
    loading.value = false
  }
}

// 轮播控制
const nextImage = () => {
  if (projectImages.value.length === 0) return
  currentIndex.value = (currentIndex.value + 1) % projectImages.value.length
  resetAutoPlay()
}

const prevImage = () => {
  if (projectImages.value.length === 0) return
  currentIndex.value = (currentIndex.value - 1 + projectImages.value.length) % projectImages.value.length
  resetAutoPlay()
}

const goToImage = (index) => {
  currentIndex.value = index
  resetAutoPlay()
}

// 自动播放
const startAutoPlay = () => {
  if (projectImages.value.length <= 1) return
  autoPlayInterval.value = setInterval(() => {
    nextImage()
  }, 3000) // 每3秒切换
}

const stopAutoPlay = () => {
  if (autoPlayInterval.value) {
    clearInterval(autoPlayInterval.value)
    autoPlayInterval.value = null
  }
}

const resetAutoPlay = () => {
  stopAutoPlay()
  startAutoPlay()
}

// 触摸事件处理
const handleTouchStart = (e) => {
  touchStartX.value = e.touches[0].clientX
  touchStartY.value = e.touches[0].clientY
  isDragging.value = true
  stopAutoPlay()
}

const handleTouchMove = (e) => {
  if (!isDragging.value) return
  e.preventDefault()
}

const handleTouchEnd = (e) => {
  if (!isDragging.value) return
  const touchEndX = e.changedTouches[0].clientX
  const touchEndY = e.changedTouches[0].clientY
  const deltaX = touchEndX - touchStartX.value
  const deltaY = touchEndY - touchStartY.value
  
  // 如果主要是水平滑动
  if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
    if (deltaX > 0) {
      prevImage()
    } else {
      nextImage()
    }
  }
  
  isDragging.value = false
  startAutoPlay()
}

// 鼠标拖拽事件处理
const handleMouseDown = (e) => {
  isDragging.value = true
  dragStartX.value = e.clientX
  stopAutoPlay()
  e.preventDefault()
}

const handleMouseMove = (e) => {
  if (!isDragging.value) return
  e.preventDefault()
}

const handleMouseUp = (e) => {
  if (!isDragging.value) return
  const dragEndX = e.clientX
  const deltaX = dragEndX - dragStartX.value
  
  if (Math.abs(deltaX) > 50) {
    if (deltaX > 0) {
      prevImage()
    } else {
      nextImage()
    }
  }
  
  isDragging.value = false
  startAutoPlay()
}

const goBack = () => {
  router.push('/projects')
}

onMounted(() => {
  fetchProject()
})

onUnmounted(() => {
  stopAutoPlay()
})
</script>

<style scoped>
.project-detail {
  min-height: calc(100vh - 200px);
  padding: 2rem 0;
}

.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 2rem;
}

.loading,
.error {
  text-align: center;
  padding: 3rem;
  font-size: 1.2rem;
  color: #666;
}

.error {
  color: #e74c3c;
}

.btn-back {
  background: #2c3e50;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  margin-bottom: 2rem;
  transition: background 0.3s;
  text-decoration: none;
  display: inline-block;
}

.btn-back:hover {
  background: #34495e;
}

.project-detail-content {
  background: white;
  border-radius: 10px;
  padding: 2.5rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.project-header {
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid #eee;
}

.project-header h1 {
  color: #2c3e50;
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.project-meta {
  color: #666;
  font-size: 1.1rem;
}

.project-image-large {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto 2rem;
  border-radius: 10px;
  overflow: hidden;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  box-sizing: border-box;
}

.project-image-large img {
  width: 100%;
  height: auto;
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
  display: block;
}

/* 视频播放器样式 */
.video-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto 2rem;
  border-radius: 10px;
  overflow: hidden;
  background: #000;
  aspect-ratio: 16 / 10;
}

.project-video {
  width: 100%;
  height: 100%;
  display: block;
}

/* 图片轮播样式 */
.image-carousel-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto 2rem;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  background: #f5f5f5;
  min-height: 400px;
  display: flex;
  align-items: center;
}

.image-carousel {
  position: relative;
  width: 100%;
  overflow: hidden;
  user-select: none;
  touch-action: pan-y;
  display: flex;
  align-items: center;
  min-height: 400px;
}

.carousel-track {
  display: flex;
  transition: transform 0.5s ease-in-out;
  will-change: transform;
}

.carousel-slide {
  width: 100%;
  min-width: 100%;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  box-sizing: border-box;
}

.carousel-slide img {
  width: 100%;
  height: auto;
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
  display: block;
  background: transparent;
}

.carousel-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  font-size: 2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  transition: background 0.3s, transform 0.2s;
  user-select: none;
}

.carousel-btn:hover {
  background: rgba(0, 0, 0, 0.7);
  transform: translateY(-50%) scale(1.1);
}

.carousel-btn:active {
  transform: translateY(-50%) scale(0.95);
}

.carousel-btn-prev {
  left: 1rem;
}

.carousel-btn-next {
  right: 1rem;
}

.carousel-indicators {
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.5rem;
  z-index: 10;
}

.indicator {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 2px solid white;
  background: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: all 0.3s;
  padding: 0;
}

.indicator:hover {
  background: rgba(255, 255, 255, 0.8);
  transform: scale(1.2);
}

.indicator.active {
  background: white;
  transform: scale(1.3);
}

@media (max-width: 768px) {
  .image-carousel-container {
    max-width: 100%;
    min-height: 300px;
  }
  
  .project-image-large {
    padding: 10px;
  }
  
  .project-image-large img {
    max-height: 60vh;
  }
  
  .carousel-slide {
    padding: 10px;
  }
  
  .carousel-slide img {
    max-height: 60vh;
  }
  
  .carousel-btn {
    width: 40px;
    height: 40px;
    font-size: 1.5rem;
  }
  
  .carousel-btn-prev {
    left: 0.5rem;
  }
  
  .carousel-btn-next {
    right: 0.5rem;
  }
  
  .indicator {
    width: 8px;
    height: 8px;
  }
}

.project-links-below-image {
  padding: 1rem 2.5rem;
  background: #f8f8f8;
  border-bottom: 1px solid #eee;
  margin-bottom: 2rem;
}

.link-btn-below {
  padding: 0.75rem 1.5rem;
  border-radius: 5px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s;
  display: inline-block;
}

.link-btn-below.github {
  background: #24292e;
  color: white;
}

.link-btn-below.github:hover {
  background: #1a1e22;
  transform: translateY(-2px);
}

.link-btn-below.video {
  background: #ff0000;
  color: white;
}

.link-btn-below.video:hover {
  background: #cc0000;
  transform: translateY(-2px);
}

.project-body {
  line-height: 1.8;
}

.project-body h2 {
  color: #2c3e50;
  margin-top: 2rem;
  margin-bottom: 1rem;
  font-size: 1.8rem;
}

.project-body p {
  color: #555;
  margin-bottom: 1rem;
}

.project-tech-stack {
  margin: 2rem 0;
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1rem;
}

.tech-tag-large {
  background: #f0f0f0;
  color: #2c3e50;
  padding: 0.5rem 1.25rem;
  border-radius: 4px;
  font-weight: 500;
  border: 1px solid #e0e0e0;
}

.project-links-section {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 2px solid #eee;
}

.links {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
}

.link-btn {
  padding: 0.75rem 1.5rem;
  border-radius: 5px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s;
  display: inline-block;
}

.link-btn.github {
  background: #24292e;
  color: white;
}

.link-btn.github:hover {
  background: #1a1e22;
  transform: translateY(-2px);
}

.link-btn.demo {
  background: #42b883;
  color: white;
}

.link-btn.demo:hover {
  background: #35a372;
  transform: translateY(-2px);
}

.link-btn.video {
  background: #ff0000;
  color: white;
}

.link-btn.video:hover {
  background: #cc0000;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .project-detail-content {
    padding: 1.5rem;
  }

  .project-header h1 {
    font-size: 1.8rem;
  }

  .links {
    flex-direction: column;
  }

  .link-btn {
    width: 100%;
    text-align: center;
  }
}
</style>

