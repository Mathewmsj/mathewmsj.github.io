import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { siteConfig } from './config/site.js'

// 设置页面标题
document.title = siteConfig.meta.title

createApp(App).use(router).mount('#app')
