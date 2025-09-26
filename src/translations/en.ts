export const en = {
  // Navigation
  nav: {
    team: "Team",
    mobile: "Mobile",
    web: "Web",
    qa: "QA",
    work: "Work",
    signIn: "Sign In",
    getStarted: "Get Started",
    language: "Language"
  },

  // Landing Page
  landing: {
    services: {
      mobile: {
        title: "Mobile Development",
        description:
          "We build native and cross-platform mobile applications that deliver exceptional performance and user experiences across iOS and Android platforms.",
        features: [
          {
            title: "Native iOS & Android",
            description:
              "Platform-specific development for optimal performance and user experience",
          },
          {
            title: "Cross-Platform Solutions",
            description:
              "React Native and Flutter applications with shared codebases",
          },
          {
            title: "Performance Optimization",
            description:
              "Memory management, battery efficiency, and smooth animations",
          },
          {
            title: "Recent Success",
            description:
              "Delivered a complex e-commerce mobile app with 99.9% crash-free sessions and 4.8+ app store rating.",
          },
        ],
      },
      web: {
        title: "Web Development",
        description: "Scalable web applications with modern frameworks, responsive design, and optimized performance.",
        title2: 'Backend & Infrastructure',
        description2:
          'Scalable server architectures, API design, database optimization, and cloud deployment for high-performance applications.',
        role: {
          frontend: {
            id: 'frontend',
            title: 'Frontend Excellence',
            description:
              'Modern React and Angular applications with responsive design, accessibility compliance, and optimized performance.',
            image:
              'https://images.unsplash.com/photo-1758611974287-8ca7147860a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudCUyMG1vZGVybiUyMGludGVyZmFjZXxlbnwxfHx8fDE3NTg3NzMzODR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
            technologies: ['React', 'Angular', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Vue.js'],
          },
          backend: {
            id: 'backend',
            title: 'Backend Development',
            description:
              'Robust server-side applications with Node.js and Python, featuring scalable APIs and secure authentication.',
            image:
              'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZXJ2ZXIlMjBiYWNrZW5kJTIwZGF0YWJhc2V8ZW58MXx8fHwxNzU4NzczNDM0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
            technologies: ['Node.js', 'Python', 'PostgreSQL', 'Express.js', 'Django', 'FastAPI'],
          },
          cloud: {
            id: 'cloud',
            title: 'Cloud Infrastructure',
            description:
              'Enterprise-grade cloud solutions with containerized deployments and comprehensive monitoring.',
            image:
              'https://images.unsplash.com/photo-1451187580459-43490279c0fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbG91ZCUyMGluZnJhc3RydWN0dXJlJTIwYXdzJTIwYXp1cmV8ZW58MXx8fHwxNzU4NzczNDM3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
            technologies: ['AWS', 'Azure', 'Docker', 'Kubernetes', 'Terraform', 'CloudFormation'],
          },
        }
      },
      qa:{
        id: 'qa',
        title: 'Quality Control & QA',
        description:
          'Comprehensive testing strategies ensuring every application meets the highest standards of reliability, security, and user experience before launch.',
        image:
          'https://images.unsplash.com/photo-1581091870622-3a2959fede6b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHx8fHx8fHx8fDE3NTg3ODk3MjF8&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        metrics: [
          {
            value: '100%',
            title: 'Bug Detection Rate',
            description: 'Critical issues caught before production',
          },
          {
            value: '95%',
            title: 'Test Coverage',
            description: 'Automated and manual testing coverage',
          },
          {
            value: '50%',
            title: 'Faster Releases',
            description: 'Reduced time-to-market through automation',
          },
          {
            value: '24/7',
            title: 'Monitoring',
            description: 'Continuous performance monitoring',
          },
        ],
        features: [
          {
            title: 'Functional Testing',
            description: 'Comprehensive validation of application features and user workflows',
          },
          {
            title: 'Automation Testing',
            description: 'Continuous integration with automated test suites and regression testing',
          },
          {
            title: 'Security & Performance',
            description: 'Vulnerability assessments and performance optimization testing',
          },
        ],
      }
    },  
    team: {
      title: 'Meet the Team',
      description:
        'Our diverse team of specialists brings together expertise from mobile development, web engineering, and quality assurance to deliver exceptional results.',
      members: [
          {
            id: 'tam',
            name: 'Cao Thành Tâm',
            role: 'Lead Software Engineer',
            bio: 'Technical leader with extensive experience in software architecture and team management.',
            funFact: 'Leads the team with precision and mentors developers daily',
            skills: ['Leadership', 'Architecture', 'Mentoring'],
            image: 'https://images.unsplash.com/photo-1603415526960-f7e0328e67aa?crop=entropy&cs=tinysrgb&fit=crop&w=400&h=400&q=80'
          },
          {
            id: 'tinh',
            name: 'Nguyễn Văn Tinh',
            role: 'Software Engineer (iOS Main)',
            bio: 'iOS specialist focused on creating exceptional mobile experiences with Swift and modern frameworks.',
            funFact: 'Writes Swift code while listening to lo-fi music',
            skills: ['iOS', 'Swift', 'Mobile'],
            image: 'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?crop=entropy&cs=tinysrgb&fit=crop&w=400&h=400&q=80'
          },
          {
            id: 'le',
            name: 'Nguyễn Thị Tuấn Lê',
            role: 'QA Engineering',
            bio: 'Quality assurance specialist ensuring robust testing and flawless user experiences.',
            funFact: 'Finds edge cases faster than most people find their keys',
            skills: ['QA', 'Testing', 'Automation'],
            image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?crop=entropy&cs=tinysrgb&fit=crop&w=400&h=400&q=80'
          },
          {
            id: 'dung',
            name: 'Nguyễn Trần Anh Dũng',
            role: 'Software Engineer (Backend Main)',
            bio: 'Backend specialist building scalable server architectures and robust API systems.',
            funFact: 'Optimizes database queries in his sleep',
            skills: ['Backend', 'API', 'Database'],
            image: 'https://images.unsplash.com/photo-1624395213192-9481c5a6c8bb?crop=entropy&cs=tinysrgb&fit=crop&w=400&h=400&q=80'
          },
          {
            id: 'duy',
            name: 'Trần Hạ Khánh Duy',
            role: 'Software Engineer (Web Main)',
            bio: 'Frontend specialist creating responsive web applications with modern frameworks and intuitive UX.',
            funFact: 'Creates pixel-perfect interfaces with CSS wizardry',
            skills: ['Frontend', 'React', 'Web'],
            image: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?crop=entropy&cs=tinysrgb&fit=crop&w=400&h=400&q=80'
          },
          {
            id: 'thi',
            name: 'Nguyễn Đình Thi',
            role: 'Software Engineer (Mobile Main)',
            bio: 'Mobile development expert specializing in cross-platform solutions and native performance optimization.',
            funFact: 'Builds apps that work seamlessly across all devices',
            skills: ['Mobile', 'Cross-platform', 'Performance'],
            image: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?crop=entropy&cs=tinysrgb&fit=crop&w=400&h=400&q=80'
          }
        ]},
   
    whyChooseUs: {
      title: "Why Choose Us",
      subtitle: "Our integrated approach ensures seamless collaboration between mobile, web, and QA teams, delivering exceptional results faster than traditional workflows."
    },
    steps: {
      concept: {
        title: "Concept & Planning",
        description: "Strategic planning and technical architecture"
      },
      development: {
        title: "Development",
        description: "Parallel mobile and web development"
      },
      qa: {
        title: "Quality Assurance",
        description: "Comprehensive testing and optimization"
      },
      launch: {
        title: "Launch & Support",
        description: "Deployment and ongoing maintenance"
      }
    },
    features: {
      endToEnd: "End-to-end coverage: Concept → Development → Testing → Launch",
      fastIteration: "Fast iteration with quality-driven delivery",
      clientCentric: "Client-centric approach with transparent communication",
      crossFunctional: "Cross-functional expertise in a single team",
      provenTrack: "Proven track record with 95%+ client satisfaction",
      scalable: "Scalable solutions built for future growth",
    },
    hero: {
      title: "Vietnamese Development Team",
      subtitle: "Mobile • Web • Quality Assurance",
      description: "Expert cross-functional team delivering innovative mobile applications, responsive web solutions, and comprehensive quality assurance services.",
      getStarted: "Get Started Today",
      scheduleCall: "Schedule a Call",
      contact: "Get in touch: hello@mmo2025.com • +1 (555) 123-4567"
    },

    overview: {
      title: "End-to-End Digital Solutions",
      subtitle: "From concept to deployment, we deliver comprehensive digital experiences that drive business growth and user engagement.",
      mobile: {
        title: "Mobile Development",
        description: "Native iOS & Android applications with cross-platform compatibility and optimal performance."
      },
      web: {
        title: "Web Development",
        description: "Modern, responsive web applications built with cutting-edge technologies and best practices."
      },
      qa: {
        title: "Quality Assurance",
        description: "Comprehensive testing strategies ensuring reliability, security, and exceptional user experience."
      }
    },

    mobile: {
      title: "Mobile Excellence",
      subtitle: "Building next-generation mobile applications",
      description: "Our mobile development expertise spans native iOS and Android development, cross-platform solutions, and progressive web apps. We focus on creating intuitive user experiences with robust performance and seamless integration.",
      features: [
        "Native iOS & Android Development",
        "Cross-Platform React Native Solutions",
        "Progressive Web App (PWA) Development",
        "App Store Optimization & Deployment",
        "Mobile UI/UX Design",
        "Performance Optimization"
      ]
    },

    web: {
      title: "Web Development",
      subtitle: "Modern web applications that scale",
      description: "We create responsive, high-performance web applications using the latest technologies and frameworks. Our focus is on delivering scalable solutions that provide exceptional user experiences across all devices.",
      technologies: ["React", "Angular", "Vue.js", "Node.js", "TypeScript", "Next.js", "Tailwind CSS", "GraphQL"]
    },

    qa: {
      title: "Quality Assurance",
      subtitle: "Ensuring excellence through comprehensive testing",
      description: "Our QA team implements rigorous testing methodologies to ensure your applications meet the highest standards of quality, performance, and reliability.",
      metrics: {
        bugDetection: "Bug Detection Rate",
        automatedTests: "Automated Test Coverage",
        releaseQuality: "Release Quality Score",
        testEfficiency: "Test Efficiency"
      }
    },
    stats:{
      uptime: {
        id: 'uptime',
        value: '99.9% Uptime',
        description: 'Reliable solutions you can count on'
      },
      users: {
        id: 'users',
        value: '50M+ Users',
        description: 'Serving millions across Vietnam'
      },
      projects: {
        id: 'projects',
        value: '100+ Projects',
        description: 'Successfully delivered'
      }
    },
    stories:{
      title: "Client Success Stories",
      items: [
        {
          quote: "The team's cross-functional approach saved us months of development time. Their QA process caught critical issues before they reached our users.",
          author: "Client Executive",
          company: "Tech Startup",
          highlight: "3x faster delivery"
        },
        {
          quote: "Exceptional quality across mobile and web platforms. The attention to detail and proactive communication made this our smoothest project yet.",
          author: "Product Manager",
          company: "Fortune 500",
          highlight: "99.9% uptime achieved"
        },
        {
          quote: "From concept to launch, every team member contributed their expertise seamlessly. The final product exceeded our expectations in every way.",
          author: "CTO",
          company: "Scale-up",
          highlight: "4.8★ user rating"
        }
      ]
    },
    cta: {
      title: "Let's Build Together",
      description:
        "Ready to transform your digital vision into reality? Our cross-functional team is standing by to deliver exceptional results.",
      primaryAction: "Get Started Today",
      secondaryAction: "Schedule a Call",
      contact: "Get in touch: hello@mmo2025.com • +1 (555) 123-4567",
    },
    trustedPartners: {
      sectionTitle: 'Trusted Partners',
      headline: 'Trusted by Leading Companies',
      description: 'Delivering exceptional digital solutions to Vietnam\'s most trusted organizations.'
    },
    footer: {
      tagline: "Excellence in every pixel, interaction, and line of code.",
      contact: "Get in touch: hello@mmo2025.com • +1 (555) 123-4567",
      description:
        "Vietnamese development team specializing in mobile, web, and quality assurance. Building innovative digital solutions with technical excellence.",
      links: {
        services: "Services",
        mobile: "Mobile Development",
        web: "Web Development",
        qa: "Quality Assurance",
        consulting: "Consulting",
        legal: "Legal",
        privacy: "Privacy Policy",
        terms: "Terms of Service",
        security: "Security",
      },
      social: {
        twitter: "Twitter",
        linkedin: "LinkedIn",
        github: "GitHub",
      },
    },
    portfolio: {
      title: "Portfolio & Case Studies",
      subtitle: "Discover our recent projects showcasing cross-functional collaboration and end-to-end delivery excellence.",
      projects: {
       
          hrm: {
            id: 'hrm',
            title: 'HRM - Human Resource Management Software',
            description: 'Comprehensive HR management system with attendance tracking, payroll automation, employee records, and detailed reporting. Optimizes HR processes and improves efficiency.',
            image: 'src/assets/hrm.png',
            tags: ['Web', 'Mobile', 'QA'],
            features: [
              'Comprehensive employee record management',
              'Smart attendance tracking system',
              'Automated payroll and detailed reporting'
            ],
            metric: '99.5% Uptime'
          },
          zalohub: {
            id: 'zalohub',
            title: 'Zalo Hub Project',
            description: 'Multi-channel integration platform for Zalo OA, supporting customer management, AI chatbot, and marketing automation. A complete solution for businesses in the Zalo ecosystem.',
            image: 'src/assets/zaloHub.png',
            tags: ['Web', 'AI', 'Integration'],
            features: [
              'Integration with Zalo OA and AI chatbot',
              'Multi-channel customer management',
              'Automated marketing campaigns'
            ],
            metric: '10M+ Messages'
          },
          softotp: {
            id: 'softotp',
            title: 'Soft OTP Solution - Eximbank',
            description: 'Soft OTP authentication system for Vietnam Eximbank, ensuring high security and smooth user experience. Fully compliant with banking security standards.',
            image: 'src/assets/eximbank.png',
            tags: ['Mobile', 'Security', 'Banking'],
            features: [
              'High-security soft OTP authentication',
              'Seamless integration with core banking',
              'PCI DSS compliant'
            ],
            metric: '100% Secure'
          },
          bloodbank: {
            id: 'bloodbank',
            title: 'Blood Donation Management - Red Cross',
            description: 'Integrated blood donation management system for the Red Cross, Hematology Hospital, and Blood Donation Centers. Optimizes the entire process from registration to blood inventory management.',
            image: 'src/assets/ihp.png',
            tags: ['Web', 'Healthcare', 'QA', 'Mobile'],
            features: [
              'Comprehensive donor information management',
              'Real-time blood inventory tracking',
              'Automated scheduling and notifications'
            ],
            metric: '50K+ Donors'
          },
          namabank: {
            id: 'namabank',
            title: 'Digital Banking - Nam A Bank',
            description: 'Comprehensive digital banking solution for Nam A Bank, including mobile banking, internet banking, and modern financial services. Elevates customer experience.',
            image: 'src/assets/namabank.png',
            tags: ['Mobile', 'Web', 'FinTech'],
            features: [
              'Mobile banking with biometric authentication',
              'AI-powered internet banking',
              'E-wallet and QR payments'
            ],
            metric: '500K+ Users'
          },
          tiktik: {
            id: 'tiktik',
            title: 'Customer Management - Tik Tik',
            description: 'Intelligent CRM system for Tik Tik loyalty program, integrating loyalty features, points management, and personalized marketing. Increased retention by 40%.',
            image: 'src/assets/tiktik.png',
            tags: ['Web', 'Mobile', 'CRM'],
            features: [
              'Integrated loyalty program',
              'Smart points management',
              'Personalized marketing campaigns'
            ],
            metric: '40% Retention'
          },
          meeasy: {
            id: 'meeasy',
            title: 'Me Easy App',
            description: 'App supporting mothers during pregnancy and parenting based on Japanese standards, offering professional knowledge, health tracking, and a community of mothers.',
            image: 'src/assets/meiji.png',
            tags: ['Mobile', 'Healthcare', 'Community'],
            features: [
              'Pregnancy tracking with Japanese standards',
              'Professional parenting knowledge',
              'Mother community and online consultation'
            ],
            metric: '100K+ Moms'
          }
      },
      viewCaseStudy: "View Case Study"
    },

    values: {
      title: "Our Development Process",
      subtitle: "Structured approach ensuring quality delivery and client satisfaction",
      steps: [
        {
          title: "Discovery & Planning",
          description: "Requirements analysis and technical architecture planning"
        },
        {
          title: "Design & Prototyping",
          description: "User experience design and interactive prototype development"
        },
        {
          title: "Development & Integration",
          description: "Agile development with continuous integration practices"
        },
        {
          title: "Testing & Quality Assurance",
          description: "Comprehensive testing and performance optimization"
        },
        {
          title: "Deployment & Support",
          description: "Production deployment and ongoing maintenance support"
        }
      ]
    },

    testimonials: {
      title: "Client Testimonials",
      subtitle: "What our clients say about working with our team",
      items: [
        {
          quote: "The Vietnamese team delivered exceptional quality and maintained excellent communication throughout the project. Their technical expertise and attention to detail exceeded our expectations.",
          author: "Sarah Chen",
          title: "CTO, TechVision Inc.",
          rating: 5
        },
        {
          quote: "Outstanding mobile development capabilities. The app they built for us has received excellent user feedback and performs flawlessly across all devices.",
          author: "Michael Rodriguez",
          title: "Product Manager, InnovateCorp",
          rating: 5
        },
        {
          quote: "Their QA process is incredibly thorough. We've seen a significant reduction in post-launch issues since working with this team.",
          author: "Emily Johnson",
          title: "Head of Engineering, DataFlow Systems",
          rating: 5
        }
      ]
    },
  },

  // App Dashboard
  dashboard: {
    title: "Dashboard",
    projects: "Projects",
    createProject: "Create New Project",
    editProject: "Edit Project",
    selectProject: "Select Project",
    noProjects: "No projects found",
    recentActivity: "Recent Activity"
  },

  // Project Management
  project: {
    name: "Project Name",
    description: "Description",
    type: "Type",
    mobile: "Mobile",
    web: "Web",
    credentials: "Credentials",
    username: "Username",
    password: "Password",
    smsOtp: "SMS OTP",
    loginGuide: "Login Guide",
    files: "Files",
    testCases: "Test Cases",
    save: "Save",
    cancel: "Cancel",
    edit: "Edit",
    delete: "Delete",
    status: "Status"
  },

  // Test Cases
  testCase: {
    jiraTask: "JIRA Task", // Keep as English
    name: "Test Case Name",
    prerequisites: "Prerequisites",
    steps: "Test Steps",
    inputData: "Input Data",
    expectedResult: "Expected Result",
    actualResult: "Actual Result",
    status: "Status",
    evidence: "Evidence",
    pass: "Pass",
    fail: "Fail",
    pending: "Pending",
    addTestCase: "Add Test Case",
    editTestCase: "Edit Test Case"
  },

  // Settings
  settings: {
    title: "Settings",
    profile: "Profile",
    notifications: "Notifications",
    security: "Security",
    integrations: "Integrations",
    about: "About"
  },

  // Common
  common: {
    loading: "Loading...",
    error: "Error",
    success: "Success",
    warning: "Warning",
    info: "Information",
    confirm: "Confirm",
    cancel: "Cancel",
    save: "Save",
    edit: "Edit",
    delete: "Delete",
    add: "Add",
    remove: "Remove",
    search: "Search",
    filter: "Filter",
    sort: "Sort",
    export: "Export",
    import: "Import",
    upload: "Upload",
    download: "Download",
    back: "Back",
    next: "Next",
    previous: "Previous",
    submit: "Submit",
    reset: "Reset",
    clear: "Clear",
    learnMore: "Learn More"
  }
};

export type TranslationKeys = typeof en;