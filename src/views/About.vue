<template>
  <div class="about">
    <div class="container">
      <h1 class="page-title">About Me</h1>
      
      <div class="content-section">
        <div class="text-content">
          <h2>Personal Aspirations</h2>
          <p>
            {{ siteConfig.about.personalAspirations }}
          </p>
        </div>
        
      </div>
      <div class="basic-info">
        <section class="education-section">
          <h2>Education</h2>
          <div class="education-card">
            <h3>{{ siteConfig.about.education.school }}</h3>
            <p class="period">{{ siteConfig.about.education.period }}</p>
            <p class="gpa"><strong>GPA:</strong> {{ siteConfig.about.education.gpa }}</p>
            <div class="courses">
              <h4>Relevant Courses:</h4>
              <ul>
                <li v-for="course in siteConfig.about.education.courses" :key="course">{{ course }}</li>
              </ul>
            </div>
          </div>
        </section>

        <section class="skills-section">
          <h2>Technical Skills</h2>
          <div class="skill-bars">
            <div v-for="skill in skills" :key="skill.name" class="skill-item">
              <div class="skill-header">
                <span class="skill-name">{{ skill.name }}</span>
                <span class="skill-level">{{ skill.level }}%</span>
              </div>
              <div class="skill-bar">
                <div class="skill-progress" :style="{ width: skill.level + '%' }" :data-level="skill.level"></div>
              </div>
            </div>
          </div>
        </section>

        <section class="awards-section">
          <h2>Awards & Achievements</h2>
          <div class="awards-grid">
            <div v-for="award in awards" :key="award.id" class="award-card">
              <div class="award-category">{{ award.category }}</div>
              <h3>{{ award.title }}</h3>
              <p>{{ award.description }}</p>
              <span class="award-year">{{ award.year }}</span>
            </div>
          </div>
        </section>

        <section class="skills-tags-section">
          <h2>Skills & Interests</h2>
          <div class="tags">
            <span v-for="tag in siteConfig.about.skillsAndInterests" :key="tag" class="tag">{{ tag }}</span>
          </div>
        </section>

        <section class="links-section">
          <h2>Links</h2>
          <div class="links-grid">
            <a 
              v-for="link in siteConfig.links" 
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
        </section>

        <section class="contact-section">
          <h2>Contact Me</h2>
          <div class="contact-info">
            <div class="contact-item">
              <strong>Email:</strong>
              <div class="contact-values">
                <a :href="`mailto:${siteConfig.contact.email[0]}`">{{ siteConfig.contact.email[0] }}</a>
                <a :href="`mailto:${siteConfig.contact.email[1]}`">{{ siteConfig.contact.email[1] }}</a>
              </div>
            </div>
            <div class="contact-item">
              <strong>Phone:</strong>
              <a :href="`tel:${siteConfig.contact.phone}`">{{ siteConfig.contact.phone }}</a>
            </div>
            <div class="contact-item">
              <strong>WeChat:</strong>
              <span>{{ siteConfig.contact.wechat }}</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { siteConfig } from '../config/site.js'

const skills = ref(siteConfig.about.skills)
const awards = ref(siteConfig.about.awards)

onMounted(() => {
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
.about {
  min-height: calc(100vh - 200px);
  padding: 2rem 0;
}

.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 2rem;
}

.page-title {
  font-size: 3rem;
  margin-bottom: 2rem;
  text-align: center;
  color: #2c3e50;
}

.content-section {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.text-content {
  margin-bottom: 2rem;
}

.intro-text {
  font-size: 1.2rem;
  line-height: 1.8;
  margin-bottom: 2rem;
  color: #555;
}

h2 {
  color: #2c3e50;
  margin-top: 2rem;
  margin-bottom: 1rem;
  font-size: 1.8rem;
}

p {
  line-height: 1.8;
  color: #666;
  margin-bottom: 1rem;
}


.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1rem;
}

.tag {
  background: #f0f0f0;
  color: #2c3e50;
  padding: 0.5rem 1rem;
  border-radius: 16px;
  font-size: 0.9rem;
  font-weight: 500;
  transition: transform 0.2s;
}

.tag:hover {
  transform: translateY(-2px);
  box-shadow: 0 3px 10px rgba(102, 126, 234, 0.3);
}

@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }

  .content-section {
    padding: 1.5rem;
  }

  .intro-text {
    font-size: 1rem;
  }

  h2 {
    font-size: 1.5rem;
  }
}

/* Basic Info merged blocks */
.basic-info {
  margin-top: 1.5rem;
  display: grid;
  gap: 1rem;
}

.skills-section,
.education-section,
.awards-section,
.skills-tags-section,
.links-section,
.contact-section {
  background: #fff;
  padding: 1.25rem;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.skills-section h2,
.education-section h2,
.awards-section h2,
.skills-tags-section h2,
.links-section h2,
.contact-section h2 {
  margin-bottom: 1rem;
  font-size: 1.4rem;
}

.skill-item { margin-bottom: 0.75rem; }
.skill-header { display: flex; justify-content: space-between; margin-bottom: 0.4rem; }
.skill-name { font-weight: 600; color: #2c3e50; }
.skill-level { color: #42b883; font-weight: 600; }
.skill-bar { height: 8px; background: #e0e0e0; border-radius: 4px; overflow: hidden; }
.skill-progress { height: 100%; background: #42b883; border-radius: 4px; transition: width .8s ease-in-out; }

.education-card { background: #f8f9fa; padding: 1rem; border-radius: 8px; border-left: 4px solid #42b883; }
.education-card h3 { color: #2c3e50; margin-bottom: 0.25rem; }
.period { color: #666; font-style: italic; margin-bottom: 0.25rem; }
.gpa { margin-bottom: 0.5rem; color: #555; }
.courses { margin-top: 0.75rem; }
.courses h4 { color: #2c3e50; margin-bottom: 0.5rem; font-size: 1rem; }
.courses ul { list-style: none; padding: 0; display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 0.4rem; }
.courses li { padding: 0.4rem; background: white; border-radius: 5px; color: #555; }

.awards-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 0.75rem; }
.award-card { background: #fff; border: 1px solid #e0e0e0; padding: 1rem; border-radius: 8px; transition: all .2s; border-left: 3px solid #42b883; }
.award-card:hover { transform: translateY(-2px); box-shadow: 0 6px 16px rgba(0,0,0,0.08); border-left-color: #35a372; }
.award-category { font-size: .7rem; text-transform: uppercase; letter-spacing: .8px; color: #42b883; font-weight: 600; margin-bottom: .4rem; }
.award-card h3 { color: #2c3e50; margin-bottom: .4rem; font-size: 1.05rem; font-weight: 600; }
.award-card p { color: #666; margin-bottom: .5rem; line-height: 1.55; }
.award-year { display: inline-block; color: #999; font-size: .8rem; font-weight: 500; }

/* Links section styles */
.links-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
}

.link-card {
  background: #f8f9fa;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 1.5rem;
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
  font-size: 1.2rem;
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
  right: 1.5rem;
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

/* Contact section styles */
.contact-info {
  margin-top: 1rem;
}

.contact-item {
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e0e0e0;
}

.contact-item:last-child {
  border-bottom: none;
  margin-bottom: 0;
}

.contact-item strong {
  display: block;
  color: #2c3e50;
  margin-bottom: 0.5rem;
  font-size: 1rem;
}

.contact-values {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.contact-item a {
  color: #42b883;
  text-decoration: none;
  transition: color 0.3s;
}

.contact-item a:hover {
  color: #35a372;
  text-decoration: underline;
}

.contact-item span {
  color: #666;
}

@media (max-width: 768px) {
  .basic-info { gap: .75rem; }
  .skills-section, .education-section, .awards-section, .skills-tags-section, .links-section, .contact-section { padding: 1rem; }
  .links-grid {
    grid-template-columns: 1fr;
  }
}
</style>

