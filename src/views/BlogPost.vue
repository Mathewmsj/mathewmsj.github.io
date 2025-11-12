<template>
  <div class="blog-post">
    <div class="container">
      <div v-if="loading" class="loading">
        <p>Loading post...</p>
      </div>
      
      <div v-else-if="error" class="error">
        <p>{{ error }}</p>
        <router-link to="/blog" class="btn-back">← Back to Blog</router-link>
      </div>
      
      <article v-else-if="post" class="post-content">
        <button @click="goBack" class="btn-back">← Back to Blog</button>
        
        <header class="post-header">
          <h1>{{ post.title }}</h1>
          <p class="post-date">{{ formatDate(post.date) }}</p>
        </header>
        
        <div class="post-body">
          <div class="post-text" v-html="formatContent(post.content)"></div>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const post = ref(null)
const loading = ref(true)
const error = ref(null)

const fetchPost = async () => {
  try {
    loading.value = true
    const response = await fetch('/data/blog.json')
    if (!response.ok) {
      throw new Error('Failed to fetch blog posts')
    }
    const data = await response.json()
    const foundPost = data.find(p => p.id === parseInt(route.params.id))
    
    if (foundPost) {
      post.value = foundPost
    } else {
      error.value = 'Post not found'
    }
  } catch (err) {
    error.value = 'Failed to load post. Please try again later.'
    console.error('Error fetching post:', err)
  } finally {
    loading.value = false
  }
}

const goBack = () => {
  router.push('/blog')
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}

const formatContent = (content) => {
  // Convert line breaks to paragraphs
  return content.split('\n').map(para => {
    if (para.trim()) {
      return `<p>${para.trim()}</p>`
    }
    return ''
  }).join('')
}

onMounted(() => {
  fetchPost()
})
</script>

<style scoped>
.blog-post {
  min-height: calc(100vh - 200px);
  padding: 2rem 0;
}

.container {
  max-width: 800px;
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

.post-content {
  background: white;
  border-radius: 10px;
  padding: 3rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.post-header {
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid #eee;
}

.post-header h1 {
  color: #2c3e50;
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  line-height: 1.2;
}

.post-date {
  color: #666;
  font-size: 1rem;
}

.post-body {
  line-height: 1.8;
  color: #555;
}

.post-text {
  font-size: 1.1rem;
}

.post-text :deep(p) {
  margin-bottom: 1.5rem;
}

.post-text :deep(p:last-child) {
  margin-bottom: 0;
}

@media (max-width: 768px) {
  .post-content {
    padding: 1.5rem;
  }

  .post-header h1 {
    font-size: 1.8rem;
  }

  .post-text {
    font-size: 1rem;
  }
}
</style>

