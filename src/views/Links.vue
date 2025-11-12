<template>
  <div class="links">
    <div class="container">
      <h1 class="page-title">Links</h1>

      <div class="links-section">
        <div class="links-grid">
          <a 
            v-for="link in profileLinks" 
            :key="link.id"
            :href="link.url" 
            target="_blank" 
            class="link-card"
          >
            <h3>{{ link.title }}</h3>
            <p>{{ link.description }}</p>
            <span class="link-arrow">→</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const profileLinks = [
  {
    id: 1,
    title: 'GitHub (Personal)',
    description: 'My repositories and personal projects',
    url: 'https://github.com/Mathewmsj'
  },
  {
    id: 2,
    title: 'GitHub (School)',
    description: 'Hangzhou Yungu School - High School',
    url: 'https://github.com/Yungu-HZ-Highschool'
  },
  {
    id: 3,
    title: 'YouTube',
    description: 'Project demos and showcases',
    url: 'https://youtu.be/vJgpagHTskc'
  }
]
</script>

<style scoped>
.links {
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

/* simplified: no subsection titles */
.links-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

.link-card {
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 2rem;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s;
  display: flex;
  flex-direction: column;
  position: relative;
  border-left: 3px solid #42b883;
}

.link-card:hover {
  transform: translateX(5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  border-left-color: #35a372;
}

.link-card h3 {
  color: #2c3e50;
  margin-bottom: 0.75rem;
  font-size: 1.3rem;
  font-weight: 600;
}

.link-card p {
  color: #666;
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 0.5rem;
}

.link-arrow {
  position: absolute;
  right: 2rem;
  top: 50%;
  transform: translateY(-50%);
  color: #42b883;
  font-size: 1.5rem;
  font-weight: 300;
  transition: transform 0.3s;
}

.link-card:hover .link-arrow {
  transform: translate(5px, -50%);
}

@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }

  .links-grid {
    grid-template-columns: 1fr;
  }
}
</style>

