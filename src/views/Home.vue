<template>
  <div class="home" :style="homeStyle">
    <div class="container">
      <div class="hero">
        <h1 class="welcome-title">{{ siteConfig.personal.title }} <span class="highlight">{{ siteConfig.personal.name }}</span></h1>
        <p class="subtitle">
          {{ siteConfig.personal.subtitle }} <strong>{{ siteConfig.personal.subtitleHighlight }}</strong>.
        </p>
        <p class="description">
          {{ siteConfig.personal.description }}
        </p>
        <div class="quick-links">
          <router-link 
            v-for="btn in siteConfig.homeButtons" 
            :key="btn.to"
            :to="btn.to" 
            :class="`btn ${btn.class}`"
          >
            {{ btn.text }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { siteConfig } from '../config/site.js'

const baseUrl = import.meta.env.BASE_URL
const homeStyle = ref({
  backgroundImage: `url('${baseUrl}${siteConfig.personal.avatar}')`
})

onMounted(async () => {
  try {
    const res = await fetch(`${baseUrl}data/projects.json`)
    if (!res.ok) return
    const projects = await res.json()
    projects.forEach(p => {
      if (p.image) {
        const img = new Image()
        // 修复图片路径，添加 BASE_URL 前缀
        const imagePath = p.image.startsWith('/images/')
          ? `${baseUrl}images/${p.image.split('/images/')[1]}`
          : p.image
        img.src = imagePath
        img.decoding = 'async'
      }
    })
  } catch (_) {}
})
</script>

<style scoped>
.home {
  height: calc(100vh - 120px);
  min-height: calc(100vh - 120px);
  display: flex;
  align-items: center;
  justify-content: center;
  background: #2c3e50;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  color: white;
  margin: -2rem 0;
  padding: 2rem 0;
  width: 100%;
  box-sizing: border-box;
}

.home::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(44, 62, 80, 0.6);
  z-index: 1;
}

.home > * {
  position: relative;
  z-index: 2;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

.hero {
  max-width: 800px;
  margin: 0 auto;
}


.welcome-title {
  font-size: 3rem;
  margin-bottom: 1rem;
  font-weight: 700;
}

.highlight {
  color: #42b883;
}

.subtitle {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  opacity: 0.95;
}

.description {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.quick-links {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  padding: 0.75rem 2rem;
  border-radius: 5px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s;
  display: inline-block;
}

.btn-primary {
  background-color: #42b883;
  color: white;
  border: none;
}

.btn-primary:hover {
  background-color: #35a372;
  transform: translateY(-2px);
}

.btn-secondary {
  background-color: transparent;
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.5);
}

.btn-secondary:hover {
  background-color: rgba(255, 255, 255, 0.1);
  border-color: white;
  transform: translateY(-2px);
}

.btn-outline {
  background-color: transparent;
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.5);
}

.btn-outline:hover {
  background-color: rgba(255, 255, 255, 0.1);
  border-color: white;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .welcome-title {
    font-size: 2rem;
  }

  .subtitle {
    font-size: 1.2rem;
  }

  .description {
    font-size: 1rem;
  }

  .quick-links {
    flex-direction: column;
    align-items: center;
  }

  .btn {
    width: 200px;
  }
}
</style>

