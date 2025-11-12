<template>
  <div class="skills">
    <div class="container">
      <h1 class="page-title">Basic Info</h1>
      
      <div class="skills-section">
        <h2>Technical Skills</h2>
        <div class="skill-bars">
          <div v-for="skill in skills" :key="skill.name" class="skill-item">
            <div class="skill-header">
              <span class="skill-name">{{ skill.name }}</span>
              <span class="skill-level">{{ skill.level }}%</span>
            </div>
            <div class="skill-bar">
              <div 
                class="skill-progress" 
                :style="{ width: skill.level + '%' }"
                :data-level="skill.level"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div class="education-section">
        <h2>Education</h2>
        <div class="education-card">
          <h3>Hangzhou Yungu School</h3>
          <p class="period">2023 – 2026</p>
          <p class="gpa"><strong>GPA:</strong> 3.99</p>
          <div class="courses">
            <h4>Relevant Courses:</h4>
            <ul>
              <li>CL/AP Python</li>
              <li>Computer Science</li>
              <li>Physics C</li>
              <li>Statistics</li>
              <li>Calculus</li>
              <li>Business Studies</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="awards-section">
        <h2>Awards & Achievements</h2>
        <div class="awards-grid">
          <div v-for="award in awards" :key="award.id" class="award-card">
            <div class="award-category">{{ award.category }}</div>
            <h3>{{ award.title }}</h3>
            <p>{{ award.description }}</p>
            <span class="award-year">{{ award.year }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const skills = ref([
  { name: 'Python', level: 90 },
  { name: 'JavaScript', level: 80 },
  { name: 'Vue.js', level: 75 },
  { name: 'Arduino/C++', level: 85 },
  { name: 'Java', level: 70 },
  { name: 'HTML/CSS', level: 80 }
])

const awards = ref([
  {
    id: 1,
    category: 'Mathematics',
    title: 'AMC 12',
    description: 'Top 5% Global',
    year: '2024'
  },
  {
    id: 2,
    category: 'Mathematics',
    title: 'UKMT Senior Math Challenge',
    description: 'Global Gold & Best in Year',
    year: '2024'
  },
  {
    id: 3,
    category: 'Science',
    title: 'Science & Tech Innovation',
    description: 'Lanzhou City 1st, Gansu Province 3rd',
    year: '2024'
  },
  {
    id: 4,
    category: 'Engineering',
    title: 'Destination Imagination',
    description: 'Engineering Award (China)',
    year: '2024'
  },
  {
    id: 5,
    category: 'Scholarship',
    title: 'Creativity Scholarship',
    description: '¥10,000, Yungu School',
    year: '2023'
  }
])

onMounted(() => {
  // Animate skill bars on mount
  setTimeout(() => {
    const progressBars = document.querySelectorAll('.skill-progress')
    progressBars.forEach(bar => {
      const level = bar.getAttribute('data-level')
      bar.style.width = '0%'
      setTimeout(() => {
        bar.style.width = level + '%'
      }, 100)
    })
  }, 100)
})
</script>

<style scoped>
.skills {
  min-height: calc(100vh - 200px);
  padding: 2rem 0;
}

.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 2rem;
}

.page-title {
  font-size: 2.4rem;
  margin-bottom: 1.5rem;
  text-align: center;
  color: #2c3e50;
}

.skills-section,
.education-section,
.awards-section {
  background: white;
  padding: 1.75rem;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  margin-bottom: 1.25rem;
}

h2 {
  color: #2c3e50;
  margin-bottom: 1.25rem;
  font-size: 1.6rem;
}

.skill-item {
  margin-bottom: 1rem;
}

.skill-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.skill-name {
  font-weight: 600;
  color: #2c3e50;
}

.skill-level {
  color: #42b883;
  font-weight: 600;
}

.skill-bar {
  height: 8px;
  background-color: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
}

.skill-progress {
  height: 100%;
  background: #42b883;
  border-radius: 4px;
  transition: width 0.8s ease-in-out;
}

.education-card {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  border-left: 4px solid #42b883;
}

.education-card h3 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.period {
  color: #666;
  font-style: italic;
  margin-bottom: 0.5rem;
}

.gpa {
  margin-bottom: 1rem;
  color: #555;
}

.courses {
  margin-top: 1rem;
}

.courses h4 {
  color: #2c3e50;
  margin-bottom: 0.75rem;
  font-size: 1.1rem;
}

.courses ul {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 0.4rem;
}

.courses li {
  padding: 0.5rem;
  background: white;
  border-radius: 5px;
  color: #555;
}

.awards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1rem;
}

.award-card {
  background: white;
  border: 1px solid #e0e0e0;
  padding: 1.25rem 1.25rem 1rem;
  border-radius: 8px;
  transition: all 0.3s;
  border-left: 3px solid #42b883;
}

.award-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  border-left-color: #35a372;
}

.award-category {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  color: #42b883;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.award-card h3 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
  font-size: 1.15rem;
  font-weight: 600;
}

.award-card p {
  color: #666;
  margin-bottom: 0.75rem;
  line-height: 1.55;
}

.award-year {
  display: inline-block;
  color: #999;
  font-size: 0.8rem;
  font-weight: 500;
}

@media (max-width: 768px) {
  .page-title {
    font-size: 1.8rem;
  }

  .skills-section,
  .education-section,
  .awards-section {
    padding: 1.25rem;
  }

  .awards-grid {
    grid-template-columns: 1fr;
  }

  .courses ul {
    grid-template-columns: 1fr;
  }
}
</style>

