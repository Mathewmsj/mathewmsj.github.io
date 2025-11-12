<template>
  <nav class="navbar">
    <div class="nav-container">
      <router-link to="/" class="nav-logo">
        <span>Sijia Ma</span>
      </router-link>
      <ul class="nav-menu">
        <li class="nav-item">
          <router-link to="/" class="nav-link">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/about" class="nav-link">About</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/projects" class="nav-link">Projects</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/blog" class="nav-link">Blog</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/links" class="nav-link">Links</router-link>
        </li>
      </ul>
      <div class="nav-toggle" @click="toggleMenu">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'

const menuOpen = ref(false)

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
  const navMenu = document.querySelector('.nav-menu')
  if (navMenu) {
    navMenu.classList.toggle('active')
  }
}
</script>

<style scoped>
.navbar {
  background-color: #2c3e50;
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: #42b883;
  text-decoration: none;
  transition: color 0.3s;
}

.nav-logo:hover {
  color: #35a372;
}

.nav-menu {
  display: flex;
  list-style: none;
  gap: 2rem;
  margin: 0;
  padding: 0;
}

.nav-item {
  margin: 0;
}

.nav-link {
  color: #ecf0f1;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;
  position: relative;
}

.nav-link:hover {
  color: #42b883;
}

.nav-link.router-link-active {
  color: #42b883;
}

.nav-link.router-link-active::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #42b883;
}

.nav-toggle {
  display: none;
  flex-direction: column;
  cursor: pointer;
  gap: 4px;
}

.nav-toggle span {
  width: 25px;
  height: 3px;
  background-color: #ecf0f1;
  transition: all 0.3s;
}

@media (max-width: 768px) {
  .nav-toggle {
    display: flex;
  }

  .nav-menu {
    position: fixed;
    left: -100%;
    top: 70px;
    flex-direction: column;
    background-color: #2c3e50;
    width: 100%;
    text-align: center;
    transition: 0.3s;
    box-shadow: 0 10px 27px rgba(0, 0, 0, 0.05);
    padding: 2rem 0;
    gap: 0;
  }

  .nav-menu.active {
    left: 0;
  }

  .nav-item {
    margin: 1rem 0;
  }
}
</style>

