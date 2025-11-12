<script setup>
import Navbar from './components/Navbar.vue'
</script>

<template>
  <div id="app">
    <Navbar />
    <main class="main-content">
      <router-view />
    </main>
    <footer class="footer">
      <p>&copy; 2025 Sijia Ma. Built with Vue.js & Vite.</p>
    </footer>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
}

.main-content > :deep(.home) {
  margin: -2rem 0;
  padding: 2rem 0;
  flex: 1;
  height: calc(100vh - 120px);
  min-height: calc(100vh - 120px);
}

.footer {
  background-color: #2c3e50;
  color: #ecf0f1;
  text-align: center;
  padding: 1.5rem;
  margin-top: auto;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #f5f5f5;
}
</style>
