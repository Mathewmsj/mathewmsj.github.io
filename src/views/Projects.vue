<template>
  <div class="projects">
    <div class="container">
      <h1 class="page-title">My Projects</h1>
      
      <div v-if="loading" class="loading">
        <p>Loading projects...</p>
      </div>
      
      <div v-else-if="error" class="error">
        <p>{{ error }}</p>
      </div>
      
      <div v-else class="projects-grid">
        <div 
          v-for="project in projects" 
          :key="project.id" 
          class="project-card"
          @click="goToDetail(project.id)"
        >
          <div class="project-image">
            <img 
              v-if="project.image" 
              :src="project.image" 
              :alt="project.name"
              loading="lazy"
              decoding="async"
              @error="handleImageError"
            />
            <div v-else class="placeholder-image">
              <div class="placeholder-icon"></div>
            </div>
          </div>
          <div class="project-content">
            <h3>{{ project.name }}</h3>
            <p class="project-role">{{ project.role }} • {{ project.time }}</p>
            <p class="project-description">{{ project.description }}</p>
            <div class="project-tech">
              <span 
                v-for="tech in project.technologies" 
                :key="tech" 
                class="tech-tag"
              >
                {{ tech }}
              </span>
            </div>
            <div class="project-links">
              <a 
                v-if="project.github" 
                :href="project.github" 
                target="_blank" 
                class="project-link"
                @click.stop
              >
                GitHub →
              </a>
              <a 
                v-if="project.video && !project.github" 
                :href="project.video" 
                target="_blank" 
                class="project-link"
                @click.stop
              >
                Video →
              </a>
              <a 
                v-if="project.demo" 
                :href="project.demo" 
                target="_blank" 
                class="project-link"
                @click.stop
              >
                Live Demo →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const projects = ref([])
const loading = ref(true)
const error = ref(null)

const fetchProjects = async () => {
  try {
    loading.value = true
    const response = await fetch(`${import.meta.env.BASE_URL}data/projects.json`)
    if (!response.ok) {
      throw new Error('Failed to fetch projects')
    }
    const data = await response.json()
    projects.value = data
  } catch (err) {
    error.value = 'Failed to load projects. Please try again later.'
    console.error('Error fetching projects:', err)
  } finally {
    loading.value = false
  }
}

const goToDetail = (id) => {
  router.push(`/projects/${id}`)
}

const handleImageError = (event) => {
  event.target.style.display = 'none'
  const placeholder = document.createElement('div')
  placeholder.className = 'placeholder-image'
  placeholder.innerHTML = '<div class="placeholder-icon"></div>'
  event.target.parentElement.appendChild(placeholder)
}

onMounted(() => {
  fetchProjects()
})
</script>

<style scoped>
.projects {
  min-height: calc(100vh - 200px);
  padding: 2rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.page-title {
  font-size: 3rem;
  margin-bottom: 3rem;
  text-align: center;
  color: #2c3e50;
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

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
}

.project-card {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;
}

.project-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

.project-image {
  width: 100%;
  height: 200px;
  overflow: hidden;
  background: #f5f5f5;
}

.project-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.placeholder-image {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
}

.placeholder-icon {
  width: 60px;
  height: 60px;
  border: 2px solid #ddd;
  border-radius: 4px;
  position: relative;
}

.placeholder-icon::before,
.placeholder-icon::after {
  content: '';
  position: absolute;
  background: #ddd;
}

.placeholder-icon::before {
  width: 2px;
  height: 30px;
  left: 50%;
  top: 10px;
  transform: translateX(-50%);
}

.placeholder-icon::after {
  width: 30px;
  height: 2px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.project-content {
  padding: 1.5rem;
}

.project-content h3 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
  font-size: 1.3rem;
}

.project-role {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.project-description {
  color: #555;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.project-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.tech-tag {
  background: #f0f0f0;
  color: #2c3e50;
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.85rem;
}

.project-links {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.project-link {
  color: #2c3e50;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9rem;
  transition: all 0.3s;
  padding: 0.5rem 0;
  border-bottom: 1px solid transparent;
}

.project-link:hover {
  color: #42b883;
  border-bottom-color: #42b883;
}

@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }

  .projects-grid {
    grid-template-columns: 1fr;
  }
}
</style>

