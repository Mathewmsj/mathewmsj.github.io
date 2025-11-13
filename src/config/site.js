// 网站配置文件
export const siteConfig = {
  // 个人信息
  personal: {
    name: 'Sijia Ma',
    title: "Hi, I'm",
    subtitle: 'A high school innovator passionate about',
    subtitleHighlight: 'AI, robotics, and hands-on engineering',
    description: 'I love solving real-world problems with creativity and technology.',
    avatar: 'images/Personal Photo.jpeg'
  },

  // 首页按钮
  homeButtons: [
    { text: 'View My Projects', to: '/projects', class: 'btn-primary' },
    { text: 'About Me', to: '/about', class: 'btn-outline' }
  ],

  // About 页面内容
  about: {
    personalAspirations: 'I believe in the power of technology to create positive change. Through my projects in AI, robotics, and hardware engineering, I aim to bridge the gap between innovative ideas and practical solutions that make a real difference in people\'s lives.',
    education: {
      school: 'Hangzhou Yungu School',
      period: '2023 – 2026',
      gpa: '3.99',
      courses: [
        'CL/AP Python',
        'Computer Science',
        'Physics C',
        'Statistics',
        'Calculus',
        'Business Studies'
      ]
    },
    skills: [
      { name: 'Python', level: 90 },
      { name: 'JavaScript', level: 80 },
      { name: 'Vue.js', level: 75 },
      { name: 'Arduino/C++', level: 85 },
      { name: 'Java', level: 70 },
      { name: 'HTML/CSS', level: 80 }
    ],
    awards: [
      { id: 1, category: 'Mathematics', title: 'AMC 12', description: 'Top 5% Global', year: '2024' },
      { id: 2, category: 'Mathematics', title: 'UKMT Senior Math Challenge', description: 'Global Gold & Best in Year', year: '2024' },
      { id: 3, category: 'Science', title: 'Science & Tech Innovation', description: 'Lanzhou City 1st, Gansu Province 3rd', year: '2024' },
      { id: 4, category: 'Engineering', title: 'Destination Imagination', description: 'Engineering Award (China)', year: '2024' },
      { id: 5, category: 'Scholarship', title: 'Creativity Scholarship', description: '¥10,000, Yungu School', year: '2023' }
    ],
    skillsAndInterests: [
      'Vue.js',
      'Python',
      'C++',
      'Arduino',
      'Robotics',
      'AI',
      'Physics',
      'Leadership',
      'JavaScript',
      'Hardware Engineering',
      'PCB Design',
      '3D Design'
    ]
  },

  // 导航栏
  navbar: {
    logo: 'Sijia Ma',
    menuItems: [
      { text: 'Home', to: '/' },
      { text: 'About', to: '/about' },
      { text: 'Projects', to: '/projects' },
      { text: 'Blog', to: '/blog' }
    ]
  },

  // Links 页面（已合并到 About）
  links: [
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
  ],

  // 联系方式
  contact: {
    email: ['Starry.masijia@yungu.org', '1514228966@qq.com'],
    phone: '+8618193137195',
    wechat: '+8618193137195'
  },

  // 网站元信息
  meta: {
    title: 'Sijia Ma - Personal Portfolio',
    description: 'Personal portfolio website showcasing projects, skills, and achievements.'
  }
}

