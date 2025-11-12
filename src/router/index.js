import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Projects from '../views/Projects.vue'
import ProjectDetail from '../views/ProjectDetail.vue'
import Blog from '../views/Blog.vue'
import BlogPost from '../views/BlogPost.vue'
import Links from '../views/Links.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/projects',
    name: 'Projects',
    component: Projects
  },
  {
    path: '/projects/:id',
    name: 'ProjectDetail',
    component: ProjectDetail,
    props: true
  },
  {
    path: '/blog',
    name: 'Blog',
    component: Blog
  },
  {
    path: '/blog/:id',
    name: 'BlogPost',
    component: BlogPost,
    props: true
  },
  {
    path: '/links',
    name: 'Links',
    component: Links
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

