<template>
  <div class="blog">
    <div class="container">
      <h1 class="page-title">{{ siteConfig.pageTitles.blog }}</h1>
      
      <div v-if="loading" class="loading">
        <p>{{ siteConfig.messages.loading.blogPosts }}</p>
      </div>
      
      <div v-else-if="error" class="error">
        <p>{{ error }}</p>
      </div>
      
      <div v-else class="blog-posts">
        <article 
          v-for="post in posts" 
          :key="post.id" 
          class="blog-card"
          @click="goToPost(post.id)"
        >
          <div class="blog-header">
            <h2>{{ post.title }}</h2>
            <span class="blog-date">{{ formatDate(post.date) }}</span>
          </div>
          <p class="blog-excerpt">{{ getExcerpt(post.content) }}</p>
          <div class="blog-footer">
            <span class="read-more">{{ siteConfig.messages.buttons.readMore }}</span>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { siteConfig } from '../config/site.js'

const router = useRouter()
const posts = ref([])
const loading = ref(true)
const error = ref(null)

const fetchPosts = async () => {
  try {
    loading.value = true
    const response = await fetch(`${import.meta.env.BASE_URL}data/blog.json`)
    if (!response.ok) {
      throw new Error('Failed to fetch blog posts')
    }
    const data = await response.json()
    posts.value = data.sort((a, b) => new Date(b.date) - new Date(a.date))
  } catch (err) {
    error.value = siteConfig.messages.error.blogPosts
    console.error('Error fetching blog posts:', err)
  } finally {
    loading.value = false
  }
}

const goToPost = (id) => {
  router.push(`/blog/${id}`)
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}

const getExcerpt = (content) => {
  const maxLength = 150
  if (content.length <= maxLength) return content
  return content.substring(0, maxLength) + '...'
}

onMounted(() => {
  fetchPosts()
})
</script>

<style scoped>
.blog {
  min-height: calc(100vh - 200px);
  padding: 2rem 0;
}

.container {
  max-width: 900px;
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

.blog-posts {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.blog-card {
  background: white;
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;
}

.blog-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

.blog-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
  gap: 1rem;
}

.blog-header h2 {
  color: #2c3e50;
  font-size: 1.8rem;
  flex: 1;
}

.blog-date {
  color: #666;
  font-size: 0.9rem;
  white-space: nowrap;
}

.blog-excerpt {
  color: #555;
  line-height: 1.8;
  margin-bottom: 1rem;
}

.blog-footer {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
}

.read-more {
  color: #42b883;
  font-weight: 600;
}

@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }

  .blog-header {
    flex-direction: column;
  }

  .blog-header h2 {
    font-size: 1.5rem;
  }
}
</style>

