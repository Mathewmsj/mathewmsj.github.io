<template>
  <div class="project-detail">
    <div class="container">
      <div v-if="loading" class="loading">
        <p>Loading project details...</p>
      </div>
      
      <div v-else-if="error" class="error">
        <p>{{ error }}</p>
        <router-link to="/projects" class="btn-back">← Back to Projects</router-link>
      </div>
      
      <div v-else-if="project" class="project-detail-content">
        <button @click="goBack" class="btn-back">← Back to Projects</button>
        
        <div class="project-header">
          <h1>{{ project.name }}</h1>
          <p class="project-meta">{{ project.role }} • {{ project.time }}</p>
        </div>
        
        <div class="project-image-large" v-if="project.image">
          <img :src="project.image" :alt="project.name" decoding="async" loading="lazy" />
        </div>
        
        <div class="project-links-below-image" v-if="project.github">
          <a 
            :href="project.github" 
            target="_blank" 
            class="link-btn-below github"
          >
            View on GitHub →
          </a>
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
          
          <div class="project-links-section" v-if="project.demo || project.video">
            <h2>Links</h2>
            <div class="links">
              <a 
                v-if="project.demo" 
                :href="project.demo" 
                target="_blank" 
                class="link-btn demo"
              >
                Live Demo →
              </a>
              <a 
                v-if="project.video" 
                :href="project.video" 
                target="_blank" 
                class="link-btn video"
              >
                Watch Video →
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
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const project = ref(null)
const loading = ref(true)
const error = ref(null)

const fetchProject = async () => {
  try {
    loading.value = true
    const response = await fetch('/data/projects.json')
    if (!response.ok) {
      throw new Error('Failed to fetch projects')
    }
    const data = await response.json()
    const foundProject = data.find(p => p.id === parseInt(route.params.id))
    
    if (foundProject) {
      project.value = foundProject
    } else {
      error.value = 'Project not found'
    }
  } catch (err) {
    error.value = 'Failed to load project details. Please try again later.'
    console.error('Error fetching project:', err)
  } finally {
    loading.value = false
  }
}

const goBack = () => {
  router.push('/projects')
}

onMounted(() => {
  fetchProject()
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
  margin-bottom: 2rem;
  border-radius: 10px;
  overflow: hidden;
}

.project-image-large img {
  width: 100%;
  height: auto;
  display: block;
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

