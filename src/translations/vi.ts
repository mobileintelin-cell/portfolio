import { TranslationKeys } from './en';
import hrmImage from '../assets/hrm.png';
import zaloHubImage from '../assets/zalohub.png';
import eximbankImage from '../assets/eximbank.png';
import ihpImage from '../assets/ihp.png';
import meijiImage from '../assets/meiji.png';

export const vi: TranslationKeys = {
  // Navigation
  nav: {
    team: "Đội Ngũ",
    mobile: "Mobile",
    web: "Web",
    qa: "QA",
    work: "Dự Án",
    signIn: "Đăng Nhập",
    getStarted: "Bắt Đầu",
    language: "Ngôn Ngữ"
  },

  // Landing Page
  landing: {
    services: {
      mobile: {
        title: "Phát Triển Ứng Dụng Mobile",
        description:
          "Chúng tôi xây dựng ứng dụng mobile native và đa nền tảng, mang đến hiệu suất vượt trội và trải nghiệm người dùng xuất sắc trên cả iOS và Android.",
        features: [
          {
            title: "Native iOS & Android",
            description:
              "Phát triển chuyên biệt cho từng nền tảng, tối ưu hiệu suất và trải nghiệm người dùng",
          },
          {
            title: "Giải Pháp Đa Nền Tảng",
            description:
              "Ứng dụng React Native và Flutter với codebase dùng chung",
          },
          {
            title: "Tối Ưu Hiệu Suất",
            description:
              "Quản lý bộ nhớ, tiết kiệm pin, và animation mượt mà",
          },
          {
            title: "Thành Công Gần Đây",
            description:
              "Triển khai ứng dụng e-commerce phức tạp với 99.9% phiên crash-free và đánh giá 4.8+ trên app store.",
          },
        ],
      },
      web: {
        title: "Phát Triển Web",
        description: "Ứng dụng web có khả năng mở rộng, xây dựng bằng framework hiện đại, thiết kế responsive và hiệu suất tối ưu.",
        title2: 'Backend & Hạ Tầng',
        description2:
          'Kiến trúc máy chủ có khả năng mở rộng, thiết kế API, tối ưu hóa cơ sở dữ liệu và triển khai trên nền tảng cloud cho ứng dụng hiệu suất cao.',
        role: {
        frontend: {
          id: 'frontend',
          title: 'Phát Triển Frontend',
          description:
            'Ứng dụng React và Angular hiện đại với thiết kế responsive, tuân thủ accessibility, và tối ưu hiệu suất.',
          image:
            'https://images.unsplash.com/photo-1615985250029-f6c6be15745b?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          technologies: ['React', 'Angular', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Vue.js'],
        },
        backend: {
          id: 'backend',
          title: 'Phát Triển Backend',
          description:
            'Ứng dụng server-side mạnh mẽ với Node.js và Python, hỗ trợ API mở rộng và xác thực bảo mật.',
          image:
            'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZXJ2ZXIlMjBiYWNrZW5kJTIwZGF0YWJhc2V8ZW58MXx8fHwxNzU4NzczNDM0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
          technologies: ['Node.js', 'Python', 'PostgreSQL', 'Express.js', 'Django', 'FastAPI'],
        },
        cloud: {
          id: 'cloud',
          title: 'Hạ Tầng Cloud',
          description:
            'Giải pháp cloud cấp doanh nghiệp với triển khai container hóa và giám sát toàn diện.',
          image:
            'https://images.unsplash.com/photo-1451187580459-43490279c0fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbG91ZCUyMGluZnJhc3RydWN0dXJlJTIwYXdzJTIwYXp1cmV8ZW58MXx8fHwxNzU4NzczNDM3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
          technologies: ['AWS', 'Azure', 'Docker', 'Kubernetes', 'Terraform', 'CloudFormation'],
        },
      }      
    },
    qa:{
      id: 'qa',
      title: 'Kiểm Soát Chất Lượng & QA',
      description:
        'Chiến lược kiểm thử toàn diện đảm bảo mọi ứng dụng đều đạt tiêu chuẩn cao nhất về độ tin cậy, bảo mật và trải nghiệm người dùng trước khi ra mắt.',
      image:
        'https://images.unsplash.com/photo-1581091870622-3a2959fede6b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHx8fHx8fHx8fDE3NTg3ODk3MjF8&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      metrics: [
        {
          value: '100%',
          title: 'Tỷ Lệ Phát Hiện Lỗi',
          description: 'Phát hiện toàn bộ lỗi nghiêm trọng trước khi đưa vào sản xuất',
        },
        {
          value: '95%',
          title: 'Phạm Vi Kiểm Thử',
          description: 'Bao gồm kiểm thử tự động và thủ công',
        },
        {
          value: '50%',
          title: 'Ra Mắt Nhanh Hơn',
          description: 'Rút ngắn thời gian ra thị trường nhờ tự động hóa',
        },
        {
          value: '24/7',
          title: 'Giám Sát',
          description: 'Theo dõi hiệu suất liên tục',
        },
      ],
      features: [
        {
          title: 'Kiểm Thử Chức Năng',
          description: 'Xác thực toàn diện các tính năng và luồng người dùng của ứng dụng',
        },
        {
          title: 'Kiểm Thử Tự Động',
          description: 'Tích hợp liên tục với bộ kiểm thử tự động và kiểm thử hồi quy',
        },
        {
          title: 'Bảo Mật & Hiệu Năng',
          description: 'Đánh giá lỗ hổng bảo mật và kiểm thử tối ưu hiệu suất',
        },
      ],
    }
    },  
    team: {
        title: 'Gặp Gỡ Đội Ngũ',
        description:                      
          'Đội ngũ chuyên gia đa dạng của chúng tôi kết hợp kinh nghiệm từ phát triển di động, kỹ thuật web và kiểm thử chất lượng để mang lại kết quả vượt trội.',
        members: [
          {
            id: 'tam',
            name: 'Cao Thành Tâm',
            role: 'Lead Software Engineer',
            bio: 'Lãnh đạo kỹ thuật với nhiều kinh nghiệm trong kiến trúc phần mềm và quản lý đội ngũ.',
            funFact: 'Dẫn dắt đội ngũ chính xác và luôn mentor cho các lập trình viên hằng ngày',
            skills: ['Lãnh đạo', 'Kiến trúc', 'Mentoring'],
            image: 'https://images.unsplash.com/photo-1603415526960-f7e0328e67aa?crop=entropy&cs=tinysrgb&fit=crop&w=400&h=400&q=80'
          },
          {
            id: 'tinh',
            name: 'Nguyễn Văn Tinh',
            role: 'Software Engineer (iOS Main)',
            bio: 'Chuyên gia iOS tập trung vào việc tạo trải nghiệm di động xuất sắc với Swift và các framework hiện đại.',
            funFact: 'Viết code Swift trong khi nghe nhạc lo-fi',
            skills: ['iOS', 'Swift', 'Di động'],
            image: 'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?crop=entropy&cs=tinysrgb&fit=crop&w=400&h=400&q=80'
          },
          {
            id: 'le',
            name: 'Nguyễn Thị Tuấn Lê',
            role: 'QA Engineering',
            bio: 'Chuyên gia kiểm thử đảm bảo ứng dụng được test kỹ lưỡng và mang lại trải nghiệm hoàn hảo.',
            funFact: 'Tìm edge case nhanh hơn hầu hết mọi người tìm thấy chìa khóa của họ',
            skills: ['QA', 'Kiểm thử', 'Tự động hóa'],
            image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?crop=entropy&cs=tinysrgb&fit=crop&w=400&h=400&q=80'
          },
          {
            id: 'dung',
            name: 'Nguyễn Trần Anh Dũng',
            role: 'Software Engineer (Backend Main)',
            bio: 'Chuyên gia backend xây dựng kiến trúc server mở rộng và hệ thống API mạnh mẽ.',
            funFact: 'Tối ưu hóa truy vấn cơ sở dữ liệu ngay cả trong giấc mơ',
            skills: ['Backend', 'API', 'Cơ sở dữ liệu'],
            image: 'https://images.unsplash.com/photo-1624395213192-9481c5a6c8bb?crop=entropy&cs=tinysrgb&fit=crop&w=400&h=400&q=80'
          },
          {
            id: 'duy',
            name: 'Trần Hạ Khánh Duy',
            role: 'Software Engineer (Web Main)',
            bio: 'Chuyên gia frontend tạo ra ứng dụng web responsive với framework hiện đại và UX trực quan.',
            funFact: 'Tạo giao diện pixel-perfect với khả năng CSS như phù thủy',
            skills: ['Frontend', 'React', 'Web'],
            image: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?crop=entropy&cs=tinysrgb&fit=crop&w=400&h=400&q=80'
          },
          {
            id: 'thi',
            name: 'Nguyễn Đình Thi',
            role: 'Software Engineer (Mobile Main)',
            bio: 'Chuyên gia phát triển di động chuyên về giải pháp cross-platform và tối ưu hiệu năng native.',
            funFact: 'Xây dựng ứng dụng hoạt động mượt mà trên mọi thiết bị',
            skills: ['Di động', 'Cross-platform', 'Hiệu năng'],
            image: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?crop=entropy&cs=tinysrgb&fit=crop&w=400&h=400&q=80'
          }
        ]
      }, 
    overview: {
      mobile: {
        title: "Phát Triển Mobile",
        description: "Ứng dụng iOS và Android native với trải nghiệm người dùng vượt trội và hiệu suất tối ưu.",
      },
      web: {
        title: "Phát Triển Web",
        description: "Ứng dụng web có khả năng mở rộng, xây dựng bằng framework hiện đại, thiết kế responsive và hiệu suất tối ưu.",
      },
      qa: {
        title: "Kiểm Soát Chất Lượng",
        description: "Chiến lược kiểm thử toàn diện đảm bảo độ tin cậy, bảo mật và trải nghiệm người dùng hoàn hảo."
      }
    },    
    whyChooseUs: {
      title: "Vì Sao Chọn Chúng Tôi",
      subtitle: "Phương pháp tích hợp của chúng tôi đảm bảo sự phối hợp nhịp nhàng giữa các đội Mobile, Web và QA, mang lại kết quả vượt trội nhanh hơn so với quy trình truyền thống."
    },
    steps: {
      concept: {
        title: "Ý Tưởng & Lập Kế Hoạch",
        description: "Lập kế hoạch chiến lược và kiến trúc kỹ thuật"
      },
      development: {
        title: "Phát Triển",
        description: "Phát triển song song Mobile và Web"
      },
      qa: {
        title: "Đảm Bảo Chất Lượng",
        description: "Kiểm thử toàn diện và tối ưu hóa"
      },
      launch: {
        title: "Triển Khai & Hỗ Trợ",
        description: "Triển khai sản phẩm và bảo trì liên tục"
      }
    },
    features: {
      endToEnd: "Bao phủ toàn diện: Từ ý tưởng → Phát triển → Kiểm thử → Triển khai",
      fastIteration: "Vòng lặp phát triển nhanh với cam kết chất lượng",
      clientCentric: "Định hướng khách hàng với giao tiếp minh bạch",
      crossFunctional: "Năng lực đa chức năng trong một đội ngũ duy nhất",
      provenTrack: "Thành tích đã được chứng minh với hơn 95% khách hàng hài lòng",
      scalable: "Giải pháp linh hoạt, dễ mở rộng cho tương lai"
    },
    hero: {
      title: "MMO 2025 Development Team",
      subtitle: "Mobile • Web • Đảm Bảo Chất Lượng",
      description: "Đội ngũ chuyên gia đa chức năng cung cấp các ứng dụng di động sáng tạo, giải pháp web responsive và dịch vụ đảm bảo chất lượng toàn diện.",
      getStarted: "Bắt Đầu Ngay",
      scheduleCall: "Đặt Lịch Tư Vấn",
      contact: "Liên hệ: hello@mmo2025.com • +1 (555) 123-4567"
    },

    overview: {
      title: "Giải Pháp Số Toàn Diện",
      subtitle: "Từ ý tưởng đến triển khai, chúng tôi cung cấp trải nghiệm số toàn diện thúc đẩy tăng trưởng kinh doanh và sự tương tác của người dùng.",
      mobile: {
        title: "Phát Triển Mobile",
        description: "Ứng dụng iOS & Android native với khả năng tương thích đa nền tảng và hiệu suất tối ưu."
      },
      web: {
        title: "Phát Triển Web",
        description: "Ứng dụng web hiện đại, responsive được xây dựng với công nghệ tiên tiến và thực hành tốt nhất."
      },
      qa: {
        title: "Đảm Bảo Chất Lượng",
        description: "Chiến lược kiểm thử toàn diện đảm bảo độ tin cậy, bảo mật và trải nghiệm người dùng xuất sắc."
      }
    },

    mobile: {
      title: "Xuất Sắc Mobile",
      subtitle: "Xây dựng ứng dụng di động thế hệ mới",
      description: "Chuyên môn phát triển mobile của chúng tôi bao gồm phát triển iOS và Android native, giải pháp đa nền tảng và ứng dụng web tiến bộ. Chúng tôi tập trung tạo ra trải nghiệm người dùng trực quan với hiệu suất mạnh mẽ và tích hợp liền mạch.",
      features: [
        "Phát triển Native iOS & Android",
        "Giải pháp đa nền tảng React Native",
        "Phát triển Progressive Web App (PWA)",
        "Tối ưu hóa & Triển khai App Store",
        "Thiết kế Mobile UI/UX",
        "Tối ưu hóa hiệu suất"
      ]
    },

    web: {
      title: "Phát Triển Web",
      subtitle: "Ứng dụng web hiện đại có thể mở rộng",
      description: "Chúng tôi tạo ra các ứng dụng web responsive, hiệu suất cao sử dụng công nghệ và framework mới nhất. Trọng tâm của chúng tôi là cung cấp các giải pháp có thể mở rộng mang lại trải nghiệm người dùng xuất sắc trên mọi thiết bị.",
      technologies: ["React", "Angular", "Vue.js", "Node.js", "TypeScript", "Next.js", "Tailwind CSS", "GraphQL"]
    },

    qa: {
      title: "Đảm Bảo Chất Lượng",
      subtitle: "Đảm bảo sự xuất sắc thông qua kiểm thử toàn diện",
      description: "Đội ngũ QA của chúng tôi thực hiện các phương pháp kiểm thử nghiêm ngặt để đảm bảo ứng dụng của bạn đáp ứng các tiêu chuẩn cao nhất về chất lượng, hiệu suất và độ tin cậy.",
      metrics: {
        bugDetection: "Tỷ lệ phát hiện lỗi",
        automatedTests: "Độ bao phủ kiểm thử tự động",
        releaseQuality: "Điểm chất lượng phát hành",
        testEfficiency: "Hiệu quả kiểm thử"
      }
    },
    stats:{
      uptime: {
        id: 'uptime',
        value: '99.9% Thời gian hoạt động',
        description: 'Giải pháp đáng tin cậy bạn có thể dựa vào'
      },
      users: {
        id: 'users',
        value: '5M+ Người dùng',
        description: 'Phục vụ hàng triệu người trên khắp Việt Nam'
      },
      projects: {
        id: 'projects',
        value: '10+ Dự án',
        description: 'Triển khai thành công'
      }  
    },
    stories:{
      title: "Đánh giá từ khách hàng",
      items: [
        {
          quote: "Cách tiếp cận đa chức năng của đội ngũ đã giúp chúng tôi rút ngắn hàng tháng thời gian phát triển. Quy trình QA đã phát hiện các lỗi nghiêm trọng trước khi đến tay người dùng.",
          author: "Giám đốc điều hành khách hàng",
          company: "Startup công nghệ",
          highlight: "Nhanh hơn gấp 3 lần"
        },
        {
          quote: "Chất lượng vượt trội trên cả nền tảng mobile và web. Sự chú ý đến từng chi tiết và giao tiếp chủ động đã khiến đây là dự án suôn sẻ nhất của chúng tôi.",
          author: "Quản lý sản phẩm",
          company: "Fortune 500",
          highlight: "Đạt 99.9% uptime"
        },
        {
          quote: "Từ ý tưởng đến triển khai, mọi thành viên trong nhóm đều đóng góp chuyên môn một cách liền mạch. Sản phẩm cuối cùng vượt xa mong đợi của chúng tôi.",
          author: "CTO",
          company: "Scale-up",
          highlight: "Đánh giá người dùng 4.8★"
        }
    ]
    },
    cta: {
      title: "Hãy Cùng Nhau Phát Triển",
      description:
        "Bạn đã sẵn sàng biến tầm nhìn số thành hiện thực? Đội ngũ đa chức năng của chúng tôi luôn sẵn sàng mang đến kết quả xuất sắc.",
      primaryAction: "Bắt đầu ngay hôm nay",
      secondaryAction: "Đặt lịch gọi",
      contact: "Liên hệ: hello@mmo2025.com • +1 (555) 123-4567",
    },
    trustedPartners: {
      sectionTitle: 'Đối tác tin cậy',
      headline: 'Được các doanh nghiệp hàng đầu tin dùng',
      description: 'Chúng tôi cung cấp các giải pháp số xuất sắc cho những tổ chức uy tín nhất tại Việt Nam.'
    },
    footer: {
      tagline: "Sự xuất sắc trong từng điểm ảnh, từng tương tác và từng dòng mã.",
      contact: "Liên hệ: hello@mmo2025.com • +1 (555) 123-4567",
      description:
        "Đội ngũ phát triển Việt Nam chuyên về mobile, web và kiểm thử chất lượng. Xây dựng giải pháp số sáng tạo với sự xuất sắc về kỹ thuật.",
      links: {
        services: "Dịch vụ",
        mobile: "Phát triển Mobile",
        web: "Phát triển Web",
        qa: "Đảm bảo chất lượng",
        consulting: "Tư vấn",
        legal: "Pháp lý",
        privacy: "Chính sách bảo mật",
        terms: "Điều khoản dịch vụ",
        security: "Bảo mật",
      },
      social: {
        twitter: "Twitter",
        linkedin: "LinkedIn",
        github: "GitHub",
      },
    },
    portfolio: {
      title: 'Danh Mục & Nghiên Cứu Dự Án',
      subtitle:'Khám phá những dự án gần đây của chúng tôi, thể hiện sự hợp tác đa chức năng và khả năng triển khai end-to-end xuất sắc.',
      projects: {
        'hrm': {
      id: 'hrm',
      title: 'Phần mềm Quản lý nhân sự HRM',
      description: 'Hệ thống quản lý nhân sự toàn diện với tính năng chấm công, tính lương, quản lý hồ sơ nhân viên và báo cáo chi tiết. Tối ưu hóa quy trình HR và nâng cao hiệu suất làm việc.',
      image: hrmImage,
      tags: ['Web', 'Mobile', 'QA'],
      features: [
        'Quản lý hồ sơ nhân viên toàn diện',
        'Hệ thống chấm công thông minh',
        'Tính lương tự động và báo cáo chi tiết'
      ],
      metric: '99.5% Uptime'
    },
    'zalohub': {
      id: 'zalohub',
      title: 'Dự án Zalo Hub',
      description: 'Nền tảng tích hợp đa kênh cho Zalo OA, hỗ trợ quản lý khách hàng, chatbot AI và tự động hóa marketing. Giải pháp toàn diện cho doanh nghiệp trên hệ sinh thái Zalo.',
      image: zaloHubImage,
      tags: ['Web', 'AI', 'Integration'],
      features: [
        'Tích hợp Zalo OA và chatbot AI',
        'Quản lý khách hàng đa kênh',
        'Tự động hóa marketing campaigns'
      ],
      metric: '1M+ Messages'
    },
    'softotp': {
      id: 'softotp',
      title: 'Giải pháp Soft OTP - Eximbank',
      description: 'Hệ thống xác thực OTP mềm cho Ngân hàng Xuất nhập khẩu Việt Nam, đảm bảo bảo mật cao và trải nghiệm người dùng mượt mà. Tuân thủ đầy đủ các tiêu chuẩn bảo mật ngân hàng.',
      image: eximbankImage,
      tags: ['Mobile', 'Security', 'Banking'],
      features: [
        'Xác thực OTP mềm bảo mật cao',
        'Tích hợp seamless với core banking',
        'Tuân thủ tiêu chuẩn PCI DSS'
      ],
      metric: '100% Secure'
    },
    'bloodbank': {
      id: 'bloodbank',
      title: 'Quản lý hiến máu - Hội Chữ thập đỏ',
      description: 'Hệ thống quản lý hiến máu nhân đạo tích hợp cho Hội Chữ thập đỏ, Bệnh viện Truyền máu Huyết học và Trung tâm Hiến máu. Tối ưu hóa quy trình từ đăng ký đến quản lý kho máu.',
      image: ihpImage,
      tags: ['Web', 'Healthcare', 'QA','Mobile'],
      features: [
        'Quản lý thông tin người hiến máu',
        'Theo dõi kho máu real-time',
        'Lịch hẹn và thông báo tự động'
      ],
      metric: '50K+ Donors'
    },
    'meeasy': {
      id: 'meeasy',
      title: 'Phần mềm Mẹ Easy',
      description: 'Ứng dụng hỗ trợ mẹ bầu và nuôi con theo chuẩn Nhật Bản, cung cấp kiến thức chuyên môn, theo dõi sức khỏe và kết nối cộng đồng mẹ. Đồng hành cùng hành trình làm mẹ.',
      image: meijiImage,
      tags: ['Mobile', 'Healthcare', 'Community'],
      features: [
        'Theo dõi thai kỳ theo chuẩn Nhật',
        'Kiến thức nuôi con chuyên môn',
        'Cộng đồng mẹ và tư vấn online'
      ],
      metric: '100K+ Moms'
    }
      },
      viewCaseStudy: "Xem Nghiên Cứu dự án"
    },

    values: {
      title: "Quy Trình Phát Triển",
      subtitle: "Phương pháp có cấu trúc đảm bảo giao hàng chất lượng và sự hài lòng của khách hàng",
      steps: [
        {
          title: "Khám Phá & Lập Kế Hoạch",
          description: "Phân tích yêu cầu và lập kế hoạch kiến trúc kỹ thuật"
        },
        {
          title: "Thiết Kế & Tạo Mẫu",
          description: "Thiết kế trải nghiệm người dùng và phát triển mẫu tương tác"
        },
        {
          title: "Phát Triển & Tích Hợp",
          description: "Phát triển Agile với thực hành tích hợp liên tục"
        },
        {
          title: "Kiểm Thử & Đảm Bảo Chất Lượng",
          description: "Kiểm thử toàn diện và tối ưu hóa hiệu suất"
        },
        {
          title: "Triển Khai & Hỗ Trợ",
          description: "Triển khai sản xuất và hỗ trợ bảo trì liên tục"
        }
      ]
    },

    testimonials: {
      title: "Lời Chứng Thực Khách Hàng",
      subtitle: "Khách hàng nói gì về việc làm việc với đội ngũ của chúng tôi",
      items: [
        {
          quote: "Đội ngũ Việt Nam đã cung cấp chất lượng xuất sắc và duy trì giao tiếp tuyệt vời trong suốt dự án. Chuyên môn kỹ thuật và sự chú ý đến chi tiết của họ vượt quá mong đợi của chúng tôi.",
          author: "Sarah Chen",
          title: "CTO, TechVision Inc.",
          rating: 5
        },
        {
          quote: "Khả năng phát triển mobile xuất sắc. Ứng dụng họ xây dựng cho chúng tôi đã nhận được phản hồi tuyệt vời từ người dùng và hoạt động hoàn hảo trên mọi thiết bị.",
          author: "Michael Rodriguez",
          title: "Product Manager, InnovateCorp",
          rating: 5
        },
        {
          quote: "Quy trình QA của họ cực kỳ kỹ lưỡng. Chúng tôi đã thấy giảm đáng kể các vấn đề sau khi ra mắt kể từ khi làm việc với đội ngũ này.",
          author: "Emily Johnson",
          title: "Head of Engineering, DataFlow Systems",
          rating: 5
        }
      ]
    },
  },

  // App Dashboard
  dashboard: {
    title: "Bảng Điều Khiển",
    projects: "Dự Án",
    createProject: "Tạo Dự Án Mới",
    editProject: "Chỉnh Sửa Dự Án",
    selectProject: "Chọn Dự Án",
    noProjects: "Không tìm thấy dự án",
    recentActivity: "Hoạt Động Gần Đây"
  },

  // Project Management
  project: {
    name: "Tên Dự Án",
    description: "Mô Tả",
    type: "Loại",
    mobile: "Mobile",
    web: "Web",
    credentials: "Thông Tin Đăng Nhập",
    username: "Tên Đăng Nhập",
    password: "Mật Khẩu",
    smsOtp: "SMS OTP",
    loginGuide: "Hướng Dẫn Đăng Nhập",
    files: "Tệp",
    testCases: "Test Cases",
    save: "Lưu",
    cancel: "Hủy",
    edit: "Chỉnh Sửa",
    delete: "Xóa",
    status: "Trạng Thái"
  },

  // Test Cases
  testCase: {
    jiraTask: "JIRA Task", // Keep as English
    name: "Tên Test Case",
    prerequisites: "Điều Kiện Tiên Quyết",
    steps: "Các Bước Kiểm Thử",
    inputData: "Dữ Liệu Đầu Vào",
    expectedResult: "Kết Quả Mong Đợi",
    actualResult: "Kết Quả Thực Tế",
    status: "Trạng Thái",
    evidence: "Bằng Chứng",
    pass: "Đạt",
    fail: "Không Đạt",
    pending: "Chờ Xử Lý",
    addTestCase: "Thêm Test Case",
    editTestCase: "Chỉnh Sửa Test Case"
  },

  // Settings
  settings: {
    title: "Cài Đặt",
    profile: "Hồ Sơ",
    notifications: "Thông Báo",
    security: "Bảo Mật",
    integrations: "Tích Hợp",
    about: "Giới Thiệu"
  },

  // Common
  common: {
    loading: "Đang tải...",
    error: "Lỗi",
    success: "Thành công",
    warning: "Cảnh báo",
    info: "Thông tin",
    confirm: "Xác nhận",
    cancel: "Hủy",
    save: "Lưu",
    edit: "Chỉnh sửa",
    delete: "Xóa",
    add: "Thêm",
    remove: "Gỡ bỏ",
    search: "Tìm kiếm",
    filter: "Lọc",
    sort: "Sắp xếp",
    export: "Xuất",
    import: "Nhập",
    upload: "Tải lên",
    download: "Tải xuống",
    back: "Quay lại",
    next: "Tiếp theo",
    previous: "Trước",
    submit: "Gửi",
    reset: "Đặt lại",
    clear: "Xóa",
    learnMore: "Tìm hiểu thêm"
  }
};