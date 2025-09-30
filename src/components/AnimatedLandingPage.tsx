import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../contexts/LanguageContext';
import { useToast } from '../contexts/ToastContext';
import { motion, AnimatePresence } from 'motion/react';
import logoImage from '../assets/logo.png';
import hrmImage from '../assets/hrm.png';
import zaloHubImage from '../assets/zalohub.png';
import eximbankImage from '../assets/eximbank.png';
import ihpImage from '../assets/ihp.png';
import meijiImage from '../assets/meiji.png';
import { 
  ArrowRight, 
  ChevronDown,
  Smartphone, 
  Monitor, 
  Shield,
  Users,
  Globe,
  Zap,
  CheckCircle,
  Star,
  Play,
  ExternalLink,
  Menu,
  X,
  Quote
} from 'lucide-react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { LanguageDropdown } from './LanguageDropdown';
import { ThemeToggle } from './ThemeToggle';

// GSAP will be imported dynamically to avoid SSR issues
let gsap: any = null;
let ScrollTrigger: any = null;

// Types for interactive cards
type SkillCategory = {
  id: string;
  title: string;
  description: string;
  image?: string;
  isClickable?: boolean;
};

type SkillSection = {
  id: string;
  title: string;
  items: string[];
};

export function AnimatedLandingPage() {
  const t = useTranslation();
  const { addToast } = useToast();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [gsapLoaded, setGsapLoaded] = useState(false);

  // Toast function for incomplete features
  const showToast = (message: string = "This function has not been completed yet") => {
    addToast({
      title: message,
      description: "We're working on implementing this feature. Stay tuned!",
      duration: 3000,
    });
  };

  // Safety check for translations - if not available, show loading
  if (!t || !t.nav || !t.landing || !t.landing.overview || !t.landing.hero) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--landing-bg-base)' }}>
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin mx-auto mb-4" style={{ borderColor: 'var(--landing-accent-primary)' }}></div>
          <p style={{ color: 'var(--landing-text-secondary)' }}>Loading translations...</p>
        </div>
      </div>
    );
  }
  
  // Interactive cards state - all skills available
  const allSkills: Record<string, SkillCategory> = {
    ...t.landing.services.web.role
  };

  const [currentSkillIds, setCurrentSkillIds] = useState({
    left: 'frontend',
    right: ['backend', 'cloud']
  });

  const leftCard = allSkills[currentSkillIds.left];
  const rightSections = currentSkillIds.right.map(id => ({
    id,
    ...allSkills[id]
  }));

  const handleSkillClick = (clickedId: string) => {
    // Get the skill that was clicked
    const clickedSkill = allSkills[clickedId];
    if (!clickedSkill) return;

    // Current left skill will move to the position of the clicked skill in right sections
    const currentLeftId = currentSkillIds.left;
    
    // Update the skill positions
    setCurrentSkillIds(prev => ({
      left: clickedId,
      right: prev.right.map(id => id === clickedId ? currentLeftId : id)
    }));
  };

  // Portfolio interactive cards state - Real Intelin projects
  const allProjects = {
    ...t.landing.portfolio.projects
  };

  const [currentPortfolioIds, setCurrentPortfolioIds] = useState({
    featured: 'hrm',
    grid: ['zalohub', 'softotp', 'bloodbank', 'meeasy']
  });

  // Auto-scroll functionality for portfolio cards with hover pause
  const [isAutoScrollPaused, setIsAutoScrollPaused] = useState(false);

  const featuredProject = allProjects[currentPortfolioIds.featured];
  const gridProjects = currentPortfolioIds.grid.map(id => allProjects[id]);

  const handleProjectClick = (clickedId: string) => {
    const currentFeaturedId = currentPortfolioIds.featured;
    
    setCurrentPortfolioIds(prev => ({
      featured: clickedId,
      grid: prev.grid.map(id => id === clickedId ? currentFeaturedId : id)
    }));
    const el = document.querySelector('#main-project');
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };


  
  // Refs for animations
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const heroHeadingRef = useRef<HTMLHeadingElement>(null);
  const heroSublineRef = useRef<HTMLParagraphElement>(null);
  const heroCtasRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const heroParticlesRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  
  const overviewRef = useRef<HTMLElement>(null);
  const overviewCardsRef = useRef<HTMLDivElement>(null);
  
  const mobileRef = useRef<HTMLElement>(null);
  const mobileImageRef = useRef<HTMLDivElement>(null);
  
  const webRef = useRef<HTMLElement>(null);
  const webChipsRef = useRef<HTMLDivElement>(null);
  const webMockupsRef = useRef<HTMLDivElement>(null);
  
  const qaRef = useRef<HTMLElement>(null);
  const qaKpisRef = useRef<HTMLDivElement>(null);
  
  const teamRef = useRef<HTMLElement>(null);
  const teamCardsRef = useRef<HTMLDivElement>(null);
  
  const portfolioRef = useRef<HTMLElement>(null);
  const portfolioMarqueeRef = useRef<HTMLDivElement>(null);
  const portfolioCardsRef = useRef<HTMLDivElement>(null);
  
  const valueRef = useRef<HTMLElement>(null);
  const valueBulletsRef = useRef<HTMLDivElement>(null);
  const processLineRef = useRef<HTMLDivElement>(null);
  
  const testimonialsRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);
  const footerRef = useRef<HTMLElement>(null);

  // Load GSAP dynamically
  useEffect(() => {
    const loadGSAP = async () => {
      try {
        const gsapModule = await import('gsap');
        const scrollTriggerModule = await import('gsap/ScrollTrigger');
        
        gsap = gsapModule.gsap || gsapModule.default;
        ScrollTrigger = scrollTriggerModule.ScrollTrigger || scrollTriggerModule.default;
        
        gsap.registerPlugin(ScrollTrigger);
        setGsapLoaded(true);
      } catch (error) {
        console.warn('GSAP failed to load:', error);
      }
    };

    loadGSAP();
  }, []);

  // Initialize animations when GSAP is loaded
  useEffect(() => {
    if (!gsapLoaded || !gsap || !ScrollTrigger) return;

    const ctx = gsap.context(() => {
      // Smooth scrolling setup
      gsap.set(document.documentElement, { scrollBehavior: 'auto' });

      // Hero section animations
      if (heroRef.current) {
        // Initial state - hide elements
        gsap.set([heroHeadingRef.current, heroSublineRef.current, heroCtasRef.current], {
          opacity: 0,
          y: 24
        });
        gsap.set(heroImageRef.current, { opacity: 0, scale: 0.95 });

        // Hero entrance timeline
        const heroTl = gsap.timeline({ delay: 0.3 });
        
        heroTl
          .to(heroHeadingRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            onComplete: () => {
              // Letter spacing animation after main animation
              gsap.to(heroHeadingRef.current, {
                letterSpacing: '-0.02em',
                duration: 0.6,
                ease: "power2.out"
              });
            }
          })
          .to([heroSublineRef.current, heroCtasRef.current], {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.08
          }, "-=0.4")
          .to(heroImageRef.current, {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "power3.out"
          }, "-=0.6");

        // Particles animation
        if (heroParticlesRef.current) {
          const particles = heroParticlesRef.current.querySelectorAll('.particle');
          particles.forEach((particle, index) => {
            gsap.to(particle, {
              y: "random(-10, 10)",
              x: "random(-5, 5)",
              scale: "random(0.8, 1.2)",
              duration: "random(2, 4)",
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
              delay: index * 0.2
            });
          });
        }

        // Scroll hint animation
        if (scrollHintRef.current) {
          gsap.to(scrollHintRef.current, {
            y: 10,
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
          });
        }
      }

      // Team overview cards stagger animation
      if (overviewCardsRef.current) {
        const cards = overviewCardsRef.current.querySelectorAll('.overview-card');
        
        gsap.set(cards, { opacity: 0, x: -20 });
        
        ScrollTrigger.create({
          trigger: overviewRef.current,
          start: "top 70%",
          onEnter: () => {
            gsap.to(cards, {
              opacity: 1,
              x: 0,
              duration: 0.6,
              ease: "power3.out",
              stagger: 0.12
            });
          }
        });
      }

      // Mobile section animations
      if (mobileRef.current) {
        ScrollTrigger.create({
          trigger: mobileRef.current,
          start: "top 80%",
          end: "bottom 20%",
          onEnter: () => {
            // Parallax effect for mobile image
            if (mobileImageRef.current) {
              gsap.fromTo(mobileImageRef.current, 
                { yPercent: 10 },
                { 
                  yPercent: -10,
                  duration: 1,
                  ease: "none",
                  scrollTrigger: {
                    trigger: mobileRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1
                  }
                }
              );
            }
          }
        });
      }

      // Web section tech chips animation
      if (webChipsRef.current) {
        const chips = webChipsRef.current.querySelectorAll('.tech-chip');
        
        gsap.set(chips, { opacity: 0, y: 20 });
        
        ScrollTrigger.create({
          trigger: webRef.current,
          start: "top 70%",
          onEnter: () => {
            gsap.to(chips, {
              opacity: 1,
              y: 0,
              duration: 0.4,
              ease: "back.out(1.7)",
              stagger: 0.06
            });
          }
        });
      }

      // Web mockups with rotation animation
      if (webMockupsRef.current) {
        const mockups = webMockupsRef.current.querySelectorAll('.web-mockup');
        
        gsap.set(mockups, { opacity: 0, rotation: -1 });
        
        ScrollTrigger.create({
          trigger: webRef.current,
          start: "top 60%",
          onEnter: () => {
            gsap.to(mockups, {
              opacity: 1,
              rotation: 0,
              duration: 0.6,
              ease: "power2.out",
              stagger: 0.1
            });
          }
        });
      }

      // QA KPIs counter animation
      if (qaKpisRef.current) {
        const kpis = qaKpisRef.current.querySelectorAll('.kpi-value');
        
        ScrollTrigger.create({
          trigger: qaRef.current,
          start: "top 60%",
          onEnter: () => {
            kpis.forEach((kpi) => {
              const endValue = kpi.textContent?.replace(/[^\d.]/g, '') || '0';
              const suffix = kpi.textContent?.replace(/[\d.]/g, '') || '';
              
              gsap.fromTo(kpi, 
                { innerHTML: "0" + suffix },
                {
                  innerHTML: endValue + suffix,
                  duration: 2,
                  ease: "power2.out",
                  snap: { innerHTML: 1 }
                }
              );
            });
          }
        });
      }

      // Team cards with tilt animation
      if (teamCardsRef.current) {
        const cards = teamCardsRef.current.querySelectorAll('.team-card');
        
        gsap.set(cards, { opacity: 0, y: 30 });
        
        ScrollTrigger.create({
          trigger: teamRef.current,
          start: "top 70%",
          onEnter: () => {
            gsap.to(cards, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power3.out",
              stagger: 0.08
            });
          }
        });

        // Hover tilt effects
        cards.forEach((card) => {
          card.addEventListener('mouseenter', () => {
            gsap.to(card, {
              rotationX: 5,
              rotationY: 5,
              z: 50,
              duration: 0.3,
              ease: "power2.out",
              transformOrigin: "center"
            });
          });

          card.addEventListener('mouseleave', () => {
            gsap.to(card, {
              rotationX: 0,
              rotationY: 0,
              z: 0,
              duration: 0.3,
              ease: "power2.out"
            });
          });
        });
      }

      // Portfolio marquee animation
      if (portfolioMarqueeRef.current) {
        const marqueeContent = portfolioMarqueeRef.current.querySelector('.marquee-content');
        if (marqueeContent) {
          gsap.to(marqueeContent, {
            x: "-50%",
            duration: 20,
            repeat: -1,
            ease: "none"
          });
        }
      }

      // Portfolio cards with clipPath reveal
      if (portfolioCardsRef.current) {
        const cards = portfolioCardsRef.current.querySelectorAll('.portfolio-card');
        
        gsap.set(cards, { clipPath: "inset(100% 0 0 0)" });
        
        ScrollTrigger.create({
          trigger: portfolioRef.current,
          start: "top 70%",
          onEnter: () => {
            gsap.to(cards, {
              clipPath: "inset(0% 0 0 0)",
              duration: 0.8,
              ease: "power3.out",
              stagger: 0.1
            });
          }
        });
      }

      // Value proposition process line animation
      if (processLineRef.current) {
        const lines = processLineRef.current.querySelectorAll('.process-line');
        
        gsap.set(lines, { scaleY: 0, transformOrigin: "top" });
        
        ScrollTrigger.create({
          trigger: valueRef.current,
          start: "top 60%",
          onEnter: () => {
            gsap.to(lines, {
              scaleY: 1,
              duration: 0.8,
              ease: "power2.out",
              stagger: 0.2
            });
          }
        });
      }

      // Value bullets stagger animation
      if (valueBulletsRef.current) {
        const bullets = valueBulletsRef.current.querySelectorAll('.value-bullet');
        
        gsap.set(bullets, { opacity: 0, y: 20 });
        
        ScrollTrigger.create({
          trigger: valueRef.current,
          start: "top 60%",
          onEnter: () => {
            gsap.to(bullets, {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: "power3.out",
              stagger: 0.08
            });
          }
        });
      }

      // CTA section slide in from bottom
      if (ctaRef.current) {
        gsap.set(ctaRef.current, { y: 100, opacity: 0 });
        
        ScrollTrigger.create({
          trigger: ctaRef.current,
          start: "top 85%",
          onEnter: () => {
            gsap.to(ctaRef.current, {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power3.out"
            });
          }
        });
      }

      // Footer icons subtle float animation
      if (footerRef.current) {
        const icons = footerRef.current.querySelectorAll('.footer-icon');
        
        icons.forEach((icon, index) => {
          gsap.to(icon, {
            y: 2,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: index * 0.2
          });
        });
      }

      // Button hover animations
      const buttons = document.querySelectorAll('.animated-button');
      buttons.forEach((button) => {
        button.addEventListener('mouseenter', () => {
          gsap.to(button, {
            scale: 1.03,
            duration: 0.2,
            ease: "power2.out"
          });
        });

        button.addEventListener('mouseleave', () => {
          gsap.to(button, {
            scale: 1,
            duration: 0.2,
            ease: "power2.out"
          });
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, [gsapLoaded]);

  // Respect reduced motion preferences
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (mediaQuery.matches && gsap) {
      gsap.globalTimeline.timeScale(0.1);
    }

    const handleChange = () => {
      if (gsap) {
        gsap.globalTimeline.timeScale(mediaQuery.matches ? 0.1 : 1);
      }
    };

    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, [gsapLoaded]);

  return (
    <div ref={containerRef} className="min-h-screen overflow-x-hidden" style={{ backgroundColor: 'var(--landing-bg-base)' }}>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b" style={{ 
        backgroundColor: 'rgba(10, 10, 10, 0.8)', 
        borderColor: 'var(--landing-border-subtle)' 
      }}>
        <div className="max-w-7xl mx-auto px-4 lg:px-20">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <img 
                src={logoImage} 
                alt="MMO Intelin Logo" 
                className="w-20 h-20 object-contain"
              />
             
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              <a href="#team" className="font-medium transition-colors hover:text-white" style={{ color: 'var(--landing-text-secondary)' }}>
                {t.nav.team}
              </a>
              <a href="#mobile" className="font-medium transition-colors hover:text-white" style={{ color: 'var(--landing-text-secondary)' }}>
                {t.nav.mobile}
              </a>
              <a href="#web" className="font-medium transition-colors hover:text-white" style={{ color: 'var(--landing-text-secondary)' }}>
                {t.nav.web}
              </a>
              <a href="#qa" className="font-medium transition-colors hover:text-white" style={{ color: 'var(--landing-text-secondary)' }}>
                {t.nav.qa}
              </a>
              <a href="#portfolio" className="font-medium transition-colors hover:text-white" style={{ color: 'var(--landing-text-secondary)' }}>
                {t.nav.work}
              </a>
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-6">
              <ThemeToggle variant="nav" />
              <LanguageDropdown variant="nav" />
            {import.meta.env.DEV && 
            <div> 
                <Button 
                  variant="ghost" 
                  className="font-medium border-0 bg-transparent hover:bg-white/5"
                  style={{ color: 'var(--landing-text-secondary)' }}
                  onClick={() => showToast("Get Started feature is not available yet")}
                >
                  {t.nav.signIn}
                </Button>
                <Button 
                  className="animated-button gap-2 px-8 py-3 font-semibold rounded-xl border-0" 
                  style={{ 
                    backgroundColor: 'var(--landing-accent-primary)', 
                    color: '#000000' 
                  }}
                  onClick={() => showToast("Get Started feature is not available yet")}
                >
                  {t.nav.getStarted}
                  <ArrowRight className="w-4 h-4" />
                </Button>
             </div>}
            </div>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden border-0 bg-transparent"
              style={{ color: 'var(--landing-text-primary)' }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden py-8 border-t" style={{ borderColor: 'var(--landing-border-subtle)' }}>
              <div className="flex flex-col gap-6">
                <a href="#team" className="text-lg font-medium" style={{ color: 'var(--landing-text-secondary)' }}>
                  {t.nav.team}
                </a>
                <a href="#mobile" className="text-lg font-medium" style={{ color: 'var(--landing-text-secondary)' }}>
                  {t.nav.mobile}
                </a>
                <a href="#web" className="text-lg font-medium" style={{ color: 'var(--landing-text-secondary)' }}>
                  {t.nav.web}
                </a>
                <a href="#qa" className="text-lg font-medium" style={{ color: 'var(--landing-text-secondary)' }}>
                  {t.nav.qa}
                </a>
                <a href="#portfolio" className="text-lg font-medium" style={{ color: 'var(--landing-text-secondary)' }}>
                  {t.nav.work}
                </a>
                
                <div className="flex flex-col gap-4 pt-6 border-t" style={{ borderColor: 'var(--landing-border-subtle)' }}>
                  <div className="flex items-center gap-4">
                    <ThemeToggle variant="nav" />
                    <LanguageDropdown variant="nav" />
                  </div>
                  <Link to="/login">
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start text-lg font-medium border-0 bg-transparent"
                      style={{ color: 'var(--landing-text-secondary)' }}
                    >
                      {t.nav.signIn}
                    </Button>
                  </Link>
                    <Button className="animated-button w-full gap-2 py-3 text-lg font-semibold rounded-xl border-0" style={{ 
                      backgroundColor: 'var(--landing-accent-primary)', 
                      color: '#000000' 
                    }}
                    onClick={() => showToast("Get Started feature is not available yet")}>
                      {t.nav.getStarted}
                      <ArrowRight className="w-5 h-5" />
                    </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* 1) Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Background with particles effect */}
        <div className="absolute inset-0">
          <div className="absolute inset-0" style={{ backgroundColor: 'var(--landing-bg-base)' }}>
            <div ref={heroParticlesRef} className="absolute inset-0 opacity-30">
              <div className="particle absolute top-1/4 left-1/4 w-1 h-1 rounded-full" style={{ backgroundColor: 'var(--landing-particle-color)' }}></div>
              <div className="particle absolute top-1/3 right-1/3 w-1 h-1 rounded-full" style={{ backgroundColor: 'var(--landing-particle-color)' }}></div>
              <div className="particle absolute bottom-1/4 left-1/3 w-1 h-1 rounded-full" style={{ backgroundColor: 'var(--landing-particle-color)' }}></div>
              <div className="particle absolute bottom-1/3 right-1/4 w-1 h-1 rounded-full" style={{ backgroundColor: 'var(--landing-particle-color)' }}></div>
              <div className="particle absolute top-2/3 left-1/2 w-1 h-1 rounded-full" style={{ backgroundColor: 'var(--landing-particle-color)' }}></div>
              <div className="particle absolute bottom-1/2 right-1/2 w-1 h-1 rounded-full" style={{ backgroundColor: 'var(--landing-particle-color)' }}></div>
            </div>
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-20 w-full">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            {/* Left: Content (60%) */}
            <div className="lg:col-span-7 space-y-12">
              <div className="space-y-8">
                <h1 ref={heroHeadingRef} className="text-6xl lg:text-8xl font-bold leading-none tracking-tight" style={{ color: 'var(--landing-text-primary)' }}>
                  {t.landing.hero.title}
                </h1>
                
                <p className="text-3xl font-semibold mb-4" style={{ color: 'var(--landing-accent-primary)' }}>
                  {t.landing.hero.subtitle}
                </p>
                
                <p ref={heroSublineRef} className="text-2xl leading-relaxed max-w-2xl" style={{ color: 'var(--landing-text-secondary)' }}>
                  {t.landing.hero.description}
                </p>
              </div>

              <div ref={heroCtasRef} className="flex flex-col sm:flex-row gap-6">
                  <Button 
                    size="lg" 
                    className="animated-button gap-3 px-10 py-4 text-lg font-semibold rounded-xl border-0" 
                    style={{ backgroundColor: 'var(--landing-accent-primary)', color: '#000000' }}
                    onClick={() => showToast("Get Started feature is not available yet")}
                  >
                    {t.landing.hero.getStarted}
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="animated-button gap-3 px-10 py-4 text-lg font-semibold rounded-xl border-2" 
                  style={{ 
                    borderColor: 'var(--landing-border-subtle)', 
                    color: 'var(--landing-text-primary)',
                    backgroundColor: 'transparent'
                  }}
                  onClick={() => document.getElementById('team')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <Users className="w-5 h-5" />
                  {t.nav.team}
                </Button>
              </div>
            </div>

            {/* Right: Visual (40%) */}
            <div className="lg:col-span-5 relative">
              <div ref={heroImageRef} className="relative z-10">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1728739529355-31dcaefd82b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMHRlY2hub2xvZ3klMjBkYXRhJTIwdmlzdWFsaXphdGlvbnxlbnwxfHx8fDE3NTg3Mjg4Mzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Abstract technology visualization"
                  className="rounded-3xl w-full h-auto shadow-2xl"
                />
              </div>
              <div className="absolute inset-0 rounded-3xl opacity-60" style={{ backgroundColor: 'var(--landing-accent-primary)' }}></div>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
       
      </section>
    <section className='pt-20'>
      <div ref={scrollHintRef} className="absolute  left-1/2 transform -translate-x-1/2">
              <ChevronDown className="w-8 h-8" style={{ color: 'var(--landing-text-secondary)' }} />
            </div>
    </section>
      {/* 2) Team Overview */}
      <section ref={overviewRef} id="team" className="py-32" style={{ backgroundColor: 'var(--landing-bg-base)' }}>
        <div className="max-w-7xl mx-auto px-4 lg:px-20">
          <div className="text-center space-y-12 mb-24">
            <h2 className="text-5xl lg:text-6xl font-bold tracking-tight" style={{ color: 'var(--landing-text-primary)' }}>
              {t.landing.overview.title}
            </h2>
            <p className="text-xl max-w-4xl mx-auto leading-relaxed" style={{ color: 'var(--landing-text-secondary)' }}>
              {t.landing.overview.subtitle}
            </p>
          </div>

          <div ref={overviewCardsRef} className="grid md:grid-cols-3 gap-12">
            {/* Mobile Development Card */}
            <div className="overview-card group cursor-pointer">
              <div className="p-12 rounded-3xl border transition-all duration-500 hover:border-opacity-50" style={{ 
                backgroundColor: 'var(--landing-bg-elevated)', 
                borderColor: 'var(--landing-border-subtle)' 
              }}>
                <div className="space-y-8">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ backgroundColor: 'var(--landing-accent-soft)' }}>
                    <Smartphone className="w-8 h-8" style={{ color: 'var(--landing-accent-primary)' }} />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold" style={{ color: 'var(--landing-text-primary)' }}>
                      {t.landing.overview.mobile.title}
                    </h3>
                    <p className="text-lg leading-relaxed" style={{ color: 'var(--landing-text-secondary)' }}>
                      {t.landing.overview.mobile.description}
                    </p>
                  </div>
                  <a href="#mobile" className="inline-flex items-center gap-2 font-semibold transition-colors hover:text-white" style={{ color: 'var(--landing-accent-primary)' }}>
                    {t.common.learnMore}
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Web Development Card */}
            <div className="overview-card group cursor-pointer">
              <div className="p-12 rounded-3xl border transition-all duration-500 hover:border-opacity-50" style={{ 
                backgroundColor: 'var(--landing-bg-elevated)', 
                borderColor: 'var(--landing-border-subtle)' 
              }}>
                <div className="space-y-8">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ backgroundColor: 'var(--landing-accent-soft)' }}>
                    <Monitor className="w-8 h-8" style={{ color: 'var(--landing-accent-primary)' }} />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold" style={{ color: 'var(--landing-text-primary)' }}>
                      {t.landing.overview.web.title}
                    </h3>
                    <p className="text-lg leading-relaxed" style={{ color: 'var(--landing-text-secondary)' }}>
                      {t.landing.overview.web.description}
                    </p>
                  </div>
                  <a href="#web" className="inline-flex items-center gap-2 font-semibold transition-colors hover:text-white" style={{ color: 'var(--landing-accent-primary)' }}>
                    {t.common.learnMore}
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Quality Control Card */}
            <div className="overview-card group cursor-pointer">
              <div className="p-12 rounded-3xl border transition-all duration-500 hover:border-opacity-50" style={{ 
                backgroundColor: 'var(--landing-bg-elevated)', 
                borderColor: 'var(--landing-border-subtle)' 
              }}>
                <div className="space-y-8">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ backgroundColor: 'var(--landing-accent-soft)' }}>
                    <Shield className="w-8 h-8" style={{ color: 'var(--landing-accent-primary)' }} />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold" style={{ color: 'var(--landing-text-primary)' }}>
                      {t.landing.overview.qa.title}
                    </h3>
                    <p className="text-lg leading-relaxed" style={{ color: 'var(--landing-text-secondary)' }}>
                      {t.landing.overview.qa.description}
                    </p>
                  </div>
                  <a href="#qa" className="inline-flex items-center gap-2 font-semibold transition-colors hover:text-white" style={{ color: 'var(--landing-accent-primary)' }}>
                    {t.common.learnMore}
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3A) Mobile Development */}
      <section ref={mobileRef} id="mobile" className="py-32 border-t" style={{ 
        backgroundColor: 'var(--landing-bg-elevated)', 
        borderColor: 'var(--landing-border-subtle)' 
      }}>
        <div className="max-w-7xl mx-auto px-4 lg:px-20">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-12">
              <div className="space-y-8">
                <h2 className="text-5xl font-bold tracking-tight" style={{ color: 'var(--landing-text-primary)' }}>
                  {t.landing.services.mobile.title}
                </h2>
                <p className="text-xl leading-relaxed" style={{ color: 'var(--landing-text-secondary)' }}>
                  {t.landing.services.mobile.description}
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 mt-1 flex-shrink-0" style={{ color: 'var(--landing-accent-primary)' }} />
                  <div>
                    <h4 className="text-lg font-semibold mb-2" style={{ color: 'var(--landing-text-primary)' }}>
                      {t.landing.services.mobile.features[0].title}
                    </h4>
                    <p style={{ color: 'var(--landing-text-secondary)' }}>
                      {t.landing.services.mobile.features[0].description}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 mt-1 flex-shrink-0" style={{ color: 'var(--landing-accent-primary)' }} />
                  <div>
                    <h4 className="text-lg font-semibold mb-2" style={{ color: 'var(--landing-text-primary)' }}>
                      {t.landing.services.mobile.features[1].title}
                    </h4>
                    <p style={{ color: 'var(--landing-text-secondary)' }}>
                      {t.landing.services.mobile.features[1].description}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 mt-1 flex-shrink-0" style={{ color: 'var(--landing-accent-primary)' }} />
                  <div>
                    <h4 className="text-lg font-semibold mb-2" style={{ color: 'var(--landing-text-primary)' }}>
                      {t.landing.services.mobile.features[2].title}
                    </h4>
                    <p style={{ color: 'var(--landing-text-secondary)' }}>
                      {t.landing.services.mobile.features[2].description}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <div className="p-8 rounded-2xl border" style={{ 
                  backgroundColor: 'var(--landing-bg-base)', 
                  borderColor: 'var(--landing-border-subtle)' 
                }}>
                  <h4 className="text-lg font-semibold mb-4" style={{ color: 'var(--landing-text-primary)' }}>
                    {t.landing.services.mobile.features[3].title}
                  </h4>
                  <p className="mb-4" style={{ color: 'var(--landing-text-secondary)' }}>
                    {t.landing.services.mobile.features[3].description}
                  </p>
                  <div className="text-sm" style={{ color: 'var(--landing-accent-primary)' }}>
                    Client: [South Telecom]
                  </div>
                </div>
              </div>
            </div>

            <div ref={mobileImageRef} className="relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1603969280040-3bbb77278211?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Mobile app development"
                className="rounded-3xl w-full h-auto shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3B) Web Development */}
      <section ref={webRef} id="web" className="py-32" style={{ backgroundColor: 'var(--landing-bg-base)' }}>
        <div className="max-w-7xl mx-auto px-4 lg:px-20">
          <div className="space-y-16">
            <div className="text-center space-y-8">
              <h2 className="text-5xl font-bold tracking-tight" style={{ color: 'var(--landing-text-primary)' }}>
                {t.landing.web.title}
              </h2>
              <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: 'var(--landing-text-secondary)' }}>
                {t.landing.services.web.description}
              </p>
            </div>

            {/* Tech Stack */}
            <div ref={webChipsRef} className="flex flex-wrap justify-center gap-4">
              {['React', 'Angular', 'Node.js', 'TypeScript', 'Next.js', 'GraphQL', 'AWS', 'Docker'].map((tech, index) => (
                <div key={index} className="tech-chip px-6 py-3 rounded-full border" style={{ 
                  backgroundColor: 'var(--landing-bg-elevated)', 
                  borderColor: 'var(--landing-border-subtle)',
                  color: 'var(--landing-text-secondary)'
                }}>
                  {tech}
                </div>
              ))}
            </div>

            <div ref={webMockupsRef} className="grid lg:grid-cols-2 gap-6 items-stretch">
              {/* Left Interactive Card */}
              <motion.div
                layout
                className="relative overflow-hidden rounded-3xl border h-full"
                style={{ 
                  backgroundColor: 'var(--landing-bg-elevated)', 
                  borderColor: 'var(--landing-border-subtle)',
                  minHeight: '500px'
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={leftCard.id}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 30 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="p-8 h-full flex flex-col"
                  >
                    <div className="space-y-6 flex-1">
                      <motion.h4 
                        className="text-xl font-semibold"
                        style={{ color: 'var(--landing-text-primary)' }}
                      >
                        {leftCard.title}
                      </motion.h4>
                      
                      <motion.p 
                        className="leading-relaxed"
                        style={{ color: 'var(--landing-text-secondary)' }}
                      >
                        {leftCard.description}
                      </motion.p>

                      {leftCard.technologies && (
                        <motion.div
                          className="space-y-3"
                        >
                          <h5 className="font-semibold text-sm" style={{ color: 'var(--landing-text-primary)' }}>
                            Technologies
                          </h5>
                          <div className="flex flex-wrap gap-2">
                            {leftCard.technologies.map((tech, index) => (
                              <motion.span
                                key={tech}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.1 + (index * 0.05) }}
                                className="px-3 py-1 rounded-full text-sm font-medium"
                                style={{ 
                                  backgroundColor: 'var(--landing-accent-soft)', 
                                  color: 'var(--landing-accent-primary)' 
                                }}
                              >
                                {tech}
                              </motion.span>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </div>

                    {leftCard.image && (
                      <motion.div
                        className="mt-6 rounded-2xl overflow-hidden"
                      >
                        <ImageWithFallback
                          src={leftCard.image}
                          alt={leftCard.title}
                          className="w-full h-48 object-cover"
                        />
                      </motion.div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </motion.div>

              {/* Right Interactive Card */}
              <motion.div
                layout
                className="rounded-3xl border h-full"
                style={{ 
                  backgroundColor: 'var(--landing-bg-elevated)', 
                  borderColor: 'var(--landing-border-subtle)',
                  minHeight: '500px'
                }}
              >
                <div className="p-8 h-full flex flex-col">
                  <motion.h4 
                    className="text-xl font-semibold mb-6"
                    style={{ color: 'var(--landing-text-primary)' }}
                  >
                    {t.landing.services.web.title2}
                  </motion.h4>
                  
                  <motion.p 
                    className="leading-relaxed mb-8"
                    style={{ color: 'var(--landing-text-secondary)' }}
                  >
                    {t.landing.services.web.description2}
                  </motion.p>

                  <div className="space-y-6 flex-1">
                    <AnimatePresence mode="popLayout">
                      {rightSections.map((section, sectionIndex) => (
                        <motion.div
                          key={`${section.id}-${section.title}`}
                          layout
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ 
                            duration: 0.3, 
                            delay: sectionIndex * 0.05,
                            layout: { duration: 0.3 }
                          }}
                          className="space-y-4 p-6 rounded-xl border cursor-pointer hover:scale-105 transition-all duration-300 flex-1"
                          style={{ 
                            backgroundColor: 'rgba(255, 255, 255, 0.02)', 
                            borderColor: 'var(--landing-border-subtle)' 
                          }}
                          onClick={() => handleSkillClick(section.id)}
                          whileHover={{ 
                            backgroundColor: 'rgba(0, 217, 255, 0.05)',
                            borderColor: 'var(--landing-accent-primary)',
                            transition: { duration: 0.2 }
                          }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <motion.h5 
                            className="font-semibold"
                            style={{ color: 'var(--landing-text-primary)' }}
                          >
                            {section.title}
                          </motion.h5>
                          
                          <motion.p 
                            className="text-sm leading-relaxed"
                            style={{ color: 'var(--landing-text-secondary)' }}
                          >
                            {section.description}
                          </motion.p>
                          
                          <motion.div 
                            className="flex flex-wrap gap-2"
                            layout
                          >
                            {section.technologies?.map((tech, techIndex) => (
                              <motion.span
                                key={`${tech}-${section.id}`}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ 
                                  duration: 0.2, 
                                  delay: (sectionIndex * 0.05) + (techIndex * 0.02),
                                  layout: { duration: 0.2 }
                                }}
                                className="px-2 py-1 rounded-md text-xs font-medium"
                                style={{ 
                                  backgroundColor: 'var(--landing-accent-soft)', 
                                  color: 'var(--landing-accent-primary)' 
                                }}
                              >
                                {tech}
                              </motion.span>
                            ))}
                          </motion.div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 3C) Quality Control / QA */}
      <section ref={qaRef} id="qa" className="py-32 border-t" style={{ 
        backgroundColor: 'var(--landing-bg-elevated)', 
        borderColor: 'var(--landing-border-subtle)' 
      }}>
        <div className="max-w-7xl mx-auto px-4 lg:px-20">
          <div className="space-y-16">
            <div className="text-center space-y-8">
              <h2 className="text-5xl font-bold tracking-tight" style={{ color: 'var(--landing-text-primary)' }}>
                {t.landing.services.qa.title}
              </h2>
              <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: 'var(--landing-text-secondary)' }}>
                {t.landing.services.qa.description}
              </p>
            </div>

            {/* KPI Cards */}
            <div ref={qaKpisRef} className="grid md:grid-cols-4 gap-8">
              <div className="text-center space-y-4">
                <div className="kpi-value text-4xl font-bold" style={{ color: 'var(--landing-accent-primary)' }}>
                  {t.landing.services.qa.metrics[0].value}
                </div>
                <div className="text-lg font-medium" style={{ color: 'var(--landing-text-primary)' }}>
                  {t.landing.services.qa.metrics[0].title}
                </div>
                <div className="text-sm" style={{ color: 'var(--landing-text-secondary)' }}>
                  {t.landing.services.qa.metrics[0].description}
                </div>
              </div>
              <div className="text-center space-y-4">
                <div className="kpi-value text-4xl font-bold" style={{ color: 'var(--landing-accent-primary)' }}>
                  {t.landing.services.qa.metrics[1].value}
                </div>
                <div className="text-lg font-medium" style={{ color: 'var(--landing-text-primary)' }}>
                  {t.landing.services.qa.metrics[1].title}
                </div>
                <div className="text-sm" style={{ color: 'var(--landing-text-secondary)' }}>
                  {t.landing.services.qa.metrics[1].description}
                </div>
              </div>
              <div className="text-center space-y-4">
                <div className="kpi-value text-4xl font-bold" style={{ color: 'var(--landing-accent-primary)' }}>
                  {t.landing.services.qa.metrics[2].value}
                </div>
                <div className="text-lg font-medium" style={{ color: 'var(--landing-text-primary)' }}>
                  {t.landing.services.qa.metrics[2].title}
                </div>
                <div className="text-sm" style={{ color: 'var(--landing-text-secondary)' }}>
                  {t.landing.services.qa.metrics[2].description}
                </div>
              </div>
              <div className="text-center space-y-4">
                <div className="kpi-value text-4xl font-bold" style={{ color: 'var(--landing-accent-primary)' }}>
                  {t.landing.services.qa.metrics[3].value}
                </div>
                <div className="text-lg font-medium" style={{ color: 'var(--landing-text-primary)' }}>
                  {t.landing.services.qa.metrics[3].title}
                </div>
                <div className="text-sm" style={{ color: 'var(--landing-text-secondary)' }}>
                  {t.landing.services.qa.metrics[3].description}
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Shield className="w-6 h-6 mt-1 flex-shrink-0" style={{ color: 'var(--landing-accent-primary)' }} />
                    <div>
                      <h4 className="text-lg font-semibold mb-2" style={{ color: 'var(--landing-text-primary)' }}>
                        {t.landing.services.qa.features[0].title}
                      </h4>
                      <p style={{ color: 'var(--landing-text-secondary)' }}>
                        {t.landing.services.qa.features[0].description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Zap className="w-6 h-6 mt-1 flex-shrink-0" style={{ color: 'var(--landing-accent-primary)' }} />
                    <div>
                      <h4 className="text-lg font-semibold mb-2" style={{ color: 'var(--landing-text-primary)' }}>
                        {t.landing.services.qa.features[1].title}
                      </h4>
                      <p style={{ color: 'var(--landing-text-secondary)' }}>
                        {t.landing.services.qa.features[1].description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Globe className="w-6 h-6 mt-1 flex-shrink-0" style={{ color: 'var(--landing-accent-primary)' }} />
                    <div>
                      <h4 className="text-lg font-semibold mb-2" style={{ color: 'var(--landing-text-primary)' }}>
                        {t.landing.services.qa.features[2].title}
                      </h4>
                      <p style={{ color: 'var(--landing-text-secondary)' }}>
                        {t.landing.services.qa.features[2].description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1621361753831-e972c09ceec9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0d2FyZSUyMHRlc3RpbmclMjBxdWFsaXR5JTIwYXNzdXJhbmNlfGVufDF8fHx8MTc1ODc3MzM4N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Software testing and quality assurance"
                  className="rounded-3xl w-full h-auto shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4) Meet the Team */}
      <section ref={teamRef} id="team" className="py-32" style={{ backgroundColor: 'var(--landing-bg-base)' }}>
        <div className="max-w-7xl mx-auto px-4 lg:px-20">
          <div className="text-center space-y-8 mb-20">
            <h2 className="text-5xl font-bold tracking-tight" style={{ color: 'var(--landing-text-primary)' }}>
            {t.landing.team.title}
            </h2>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: 'var(--landing-text-secondary)' }}>
               {t.landing.team.description}
            </p>
          </div>

          <div ref={teamCardsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {[
              {
                name: t.landing.team.members[0].name,
                role: t.landing.team.members[0].role,
                bio: t.landing.team.members[0].bio,
                fun: t.landing.team.members[0].funFact,
                tags: t.landing.team.members[0].skills
              },
              {
                name: t.landing.team.members[1].name,
                role: t.landing.team.members[1].role,
                bio: t.landing.team.members[1].bio,
                fun: t.landing.team.members[1].funFact,
                tags: t.landing.team.members[1].skills
              },
              {
                name: t.landing.team.members[2].name,
                role: t.landing.team.members[2].role,
                bio: t.landing.team.members[2].bio,
                fun: t.landing.team.members[2].funFact,
                tags: t.landing.team.members[2].skills
              },
              {
                name: t.landing.team.members[3].name,
                role: t.landing.team.members[3].role,
                bio: t.landing.team.members[3].bio,
                fun: t.landing.team.members[3].funFact,
                tags: t.landing.team.members[3].skills
              },
              {
                name: t.landing.team.members[4].name,
                role: t.landing.team.members[4].role,
                bio: t.landing.team.members[4].bio,
                fun: t.landing.team.members[4].funFact,
                tags: t.landing.team.members[4].skills
              },
              {
                name: t.landing.team.members[5].name,
                role: t.landing.team.members[5].role,
                bio: t.landing.team.members[5].bio,
                fun: t.landing.team.members[5].funFact,
                tags: t.landing.team.members[5].skills
              }
            ].map((member, index) => (
              <div key={index} className="team-card group cursor-pointer h-full">
                <div className="p-8 rounded-3xl border transition-all duration-500 hover:border-opacity-50 h-full flex flex-col" style={{ 
                  backgroundColor: 'var(--landing-bg-elevated)', 
                  borderColor: 'var(--landing-border-subtle)' 
                }}>
                  <div className="space-y-6 flex-1 flex flex-col">
                    {/* Avatar placeholder */}
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ backgroundColor: 'var(--landing-accent-soft)' }}>
                      <Users className="w-8 h-8" style={{ color: 'var(--landing-accent-primary)' }} />
                    </div>
                    
                    <div className="space-y-3 flex-1">
                      <div>
                        <h4 className="text-xl font-bold" style={{ color: 'var(--landing-text-primary)' }}>
                          {member.name}
                        </h4>
                        <p className="font-medium" style={{ color: 'var(--landing-accent-primary)' }}>
                          {member.role}
                        </p>
                      </div>
                      
                      <p style={{ color: 'var(--landing-text-secondary)' }}>
                        {member.bio}
                      </p>
                      
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p className="text-sm italic" style={{ color: 'var(--landing-text-secondary)' }}>
                          Fun fact: {member.fun}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {member.tags.map((tag, tagIndex) => (
                        <span 
                          key={tagIndex} 
                          className="px-3 py-1 text-sm rounded-full" 
                          style={{ 
                            backgroundColor: 'var(--landing-accent-soft)', 
                            color: 'var(--landing-accent-primary)' 
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5) Portfolio / Case Studies */}
      <section ref={portfolioRef} id="portfolio" className="py-32 border-t" style={{ 
        backgroundColor: 'var(--landing-bg-elevated)', 
        borderColor: 'var(--landing-border-subtle)' 
      }}>
        <div id="main-project" className="max-w-7xl mx-auto px-4 lg:px-20">
          <div className="text-center space-y-8 mb-20">
            <h2 className="text-5xl font-bold tracking-tight" style={{ color: 'var(--landing-text-primary)' }}>
              {t.landing.portfolio.title}
            </h2>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: 'var(--landing-text-secondary)' }}>
              {t.landing.portfolio.subtitle}
            </p>
          </div>

          {/* Featured Project */}
          <div  className="mb-16">
            <AnimatePresence mode="wait">
              <motion.div
                key={featuredProject.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="grid lg:grid-cols-2 gap-12 items-center p-12 rounded-3xl border" 
                style={{ 
                  backgroundColor: 'var(--landing-bg-base)', 
                  borderColor: 'var(--landing-border-subtle)' 
                }}
              >
                <motion.div 
                  className="space-y-8"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <motion.div 
                    className="flex gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                  >
                    {featuredProject.tags.map((tag, index) => (
                      <motion.span
                        key={tag}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + (index * 0.1) }}
                        className="px-3 py-1 text-sm rounded-full" 
                        style={{ 
                          backgroundColor: 'var(--landing-accent-soft)', 
                          color: 'var(--landing-accent-primary)' 
                        }}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </motion.div>
                  
                  <motion.div 
                    className="space-y-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <motion.h3 
                      className="text-3xl font-bold" 
                      style={{ color: 'var(--landing-text-primary)' }}
                    >
                      {featuredProject.title}
                    </motion.h3>
                    <motion.p 
                      className="text-lg leading-relaxed" 
                      style={{ color: 'var(--landing-text-secondary)' }}
                    >
                      {featuredProject.description}
                    </motion.p>
                  </motion.div>

                  <motion.div 
                    className="space-y-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    {featuredProject.features.map((feature, index) => (
                      <motion.div 
                        key={feature}
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + (index * 0.1) }}
                      >
                        <CheckCircle className="w-5 h-5" style={{ color: 'var(--landing-accent-primary)' }} />
                        <span style={{ color: 'var(--landing-text-secondary)' }}>
                          {feature}
                        </span>
                      </motion.div>
                    ))}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    <Button 
                      className="animated-button gap-2" 
                      style={{ 
                        backgroundColor: 'var(--landing-accent-primary)', 
                        color: '#000000' 
                      }}
                      onClick={() => showToast("Case study details are not available yet")}
                    >
                      {t.landing.portfolio.viewCaseStudy}
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </motion.div>
                </motion.div>

                <motion.div 
                  className="relative"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <img 
                src={featuredProject.image} 
                alt={featuredProject.title} 
                className="rounded-2xl w-full h-auto"
                />
                 
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Interactive Projects Grid - Auto-scrolling horizontal layout */}
          <div className="relative overflow-hidden">
            <div 
              ref={portfolioCardsRef} 
              className="flex gap-6 portfolio-no-scrollbar pb-4"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                animation: 'portfolio-auto-scroll 30s linear infinite',
                animationPlayState: isAutoScrollPaused ? 'paused' : 'running',
                width: '200%',
              }}
            >
            <AnimatePresence >
              {[...gridProjects, ...gridProjects].map((project, index) => (
                <motion.div 
                  key={`${project.id}-${index}`}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ 
                    duration: 0.4, 
                    delay: (index % gridProjects.length) * 0.1,
                    layout: { duration: 0.3 }
                  }}
                  className="portfolio-card group cursor-pointer flex-shrink-0 w-80 h-96"
                  onClick={() => handleProjectClick(project.id)}
                  onMouseEnter={() => setIsAutoScrollPaused(true)}
                  onMouseLeave={() => setIsAutoScrollPaused(false)}
                  style={{
                    transform: 'translateZ(0)',
                    willChange: 'transform, border-color, background-color',

                  }}
                >
                  <motion.div 
                    className="p-8 rounded-3xl border h-full flex flex-col" 
                    style={{ 
                      backgroundColor: 'var(--landing-bg-base)', 
                      borderColor: 'var(--landing-border-subtle)',
                      borderWidth: '1px',
                      borderStyle: 'solid',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      transform: 'translateZ(0)',
                      willChange: 'transform, border-color, background-color, box-shadow'
                    }}
                    initial={{
                      backgroundColor: 'var(--landing-bg-base)',
                      borderColor: 'var(--landing-border-subtle)',
                      scale: 1,
                      y: 0
                    }}
                    whileHover={{ 
                      backgroundColor: 'rgba(0, 217, 255, 0.02)',
                      borderColor: 'var(--landing-accent-primary)',
                      scale: 1.02,
                      y: -4,
                      boxShadow: '0 8px 25px rgba(0, 217, 255, 0.15)'
                    }}
                    whileTap={{ 
                      scale: 0.98,
                      y: -2
                    }}
                    transition={{
                      duration: 0.3,
                      ease: [0.4, 0, 0.2, 1]
                    }}
                  >
                    <div className="space-y-6 flex-1 flex flex-col">
                      <motion.div 
                        className="flex gap-2"
                        layout
                      >
                        {project.tags.map((tag, tagIndex) => (
                          <motion.span 
                            key={`${tag}-${project.id}`}
                            layout
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 + (tagIndex * 0.05) }}
                            className="px-3 py-1 text-sm rounded-full" 
                            style={{ 
                              backgroundColor: 'var(--landing-accent-soft)', 
                              color: 'var(--landing-accent-primary)' 
                            }}
                          >
                            {tag}
                          </motion.span>
                        ))}
                      </motion.div>
                      
                      <motion.div 
                        className="space-y-3 flex-1"
                        layout
                      >
                        <motion.h4 
                          className="text-xl font-bold" 
                          style={{ color: 'var(--landing-text-primary)' }}
                          layout
                        >
                          {project.title}
                        </motion.h4>
                        <motion.p 
                          style={{ color: 'var(--landing-text-secondary)' }}
                          layout
                        >
                          {project.description}
                        </motion.p>
                      </motion.div>
                      
                      <motion.div 
                        className="flex items-center justify-between mt-auto"
                        layout
                      >
                        <motion.div 
                          className="font-semibold" 
                          style={{ color: 'var(--landing-accent-primary)' }}
                        >
                          {project.metric}
                        </motion.div>
                        <motion.div
                          whileHover={{ x: 4 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ArrowRight className="w-5 h-5" style={{ color: 'var(--landing-text-secondary)' }} />
                        </motion.div>
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
            </div>
          </div>

          {/* Trusted Companies Section - Hidden per user request */}
          {/* <div className="mt-24 pt-20 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent blur-3xl"></div>
            
            <div className="relative z-10">
              <div className="text-center mb-16 space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6" style={{ 
                  backgroundColor: 'var(--landing-accent-soft)', 
                  borderColor: 'var(--landing-border-subtle)',
                  color: 'var(--landing-accent-primary)'
                }}>
                  <Star className="w-4 h-4" />
                  <span className="text-sm font-medium">{t.landing.trustedPartners.sectionTitle}</span>
                </div>
                <h3 className="text-4xl h-16 font-bold bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent">
                  {t.landing.trustedPartners.headline}
                </h3>
                <p className="text-lg max-w-3xl mx-auto" style={{ color: 'var(--landing-text-secondary)' }}>
                  {t.landing.trustedPartners.description}
                </p>
              </div>
              
              <div ref={portfolioMarqueeRef} className="overflow-hidden rounded-2xl border p-8" style={{ 
                backgroundColor: 'var(--landing-bg-elevated)', 
                borderColor: 'var(--landing-border-subtle)' 
              }}>
                <div className="marquee-content flex justify-center items-center gap-16" style={{ width: '200%' }}>
                  {[...Array(2)].map((_, setIndex) => (
                    <div key={setIndex} className="flex gap-16">
                      {[
                        { name: 'Eximbank', desc: 'Export-Import Bank of Vietnam' },
                        { name: 'Nam Á Bank', desc: 'Leading Commercial Bank' },
                        { name: 'Hội Chữ thập đỏ', desc: 'Vietnam Red Cross Society' },
                        { name: 'Tik Tik', desc: 'Social Media Platform' },
                        { name: 'Zalo Hub', desc: 'Business Communication' }
                      ].map((client, index) => (
                        <div key={index} className="text-center group cursor-pointer transform transition-all duration-300 hover:scale-105 whitespace-nowrap">
                          <div className="w-20 h-20 mx-auto mb-4 rounded-2xl flex items-center justify-center border transition-all duration-300 group-hover:border-cyan-400/50 group-hover:shadow-lg group-hover:shadow-cyan-400/25" style={{ 
                            backgroundColor: 'var(--landing-bg-base)', 
                            borderColor: 'var(--landing-border-subtle)' 
                          }}>
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl" style={{ 
                              backgroundColor: 'var(--landing-accent-soft)',
                              color: 'var(--landing-accent-primary)'
                            }}>
                              {client.name.substring(0, 1)}
                            </div>
                          </div>
                          <h4 className="font-semibold text-lg mb-1 transition-colors group-hover:text-cyan-400" style={{ color: 'var(--landing-text-primary)' }}>
                            {client.name}
                          </h4>
                          <p className="text-sm opacity-70" style={{ color: 'var(--landing-text-secondary)' }}>
                            {client.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <div className="text-center group">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110" style={{ backgroundColor: 'var(--landing-accent-soft)' }}>
                    <Shield className="w-8 h-8" style={{ color: 'var(--landing-accent-primary)' }} />
                  </div>
                  <h4 className="font-semibold mb-2" style={{ color: 'var(--landing-text-primary)' }}>{t.landing.stats.uptime.value}</h4>
                  <p className="text-sm" style={{ color: 'var(--landing-text-secondary)' }}>{t.landing.stats.uptime.description}</p>
                </div>
                
                <div className="text-center group">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110" style={{ backgroundColor: 'var(--landing-accent-soft)' }}>
                    <Users className="w-8 h-8" style={{ color: 'var(--landing-accent-primary)' }} />
                  </div>
                  <h4 className="font-semibold mb-2" style={{ color: 'var(--landing-text-primary)' }}>{t.landing.stats.users.value}</h4>
                  <p className="text-sm" style={{ color: 'var(--landing-text-secondary)' }}>{t.landing.stats.users.description}</p>
                </div>
                
                <div className="text-center group">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110" style={{ backgroundColor: 'var(--landing-accent-soft)' }}>
                    <CheckCircle className="w-8 h-8" style={{ color: 'var(--landing-accent-primary)' }} />
                  </div>
                  <h4 className="font-semibold mb-2" style={{ color: 'var(--landing-text-primary)' }}>{t.landing.stats.projects.value}</h4>
                  <p className="text-sm" style={{ color: 'var(--landing-text-secondary)' }}>{t.landing.stats.projects.description}</p>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </section>

      {/* 6) Why Choose Us */}
      <section ref={valueRef} className="py-32" style={{ backgroundColor: 'var(--landing-bg-base)' }}>
        <div className="max-w-7xl mx-auto px-4 lg:px-20">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-12">
              <div className="space-y-8">
                <h2 className="text-5xl font-bold tracking-tight" style={{ color: 'var(--landing-text-primary)' }}>
                  {t.landing.whyChooseUs.title}
                </h2>
                <p className="text-xl leading-relaxed" style={{ color: 'var(--landing-text-secondary)' }}>
                  {t.landing.whyChooseUs.subtitle}
                </p>
              </div>

              <div ref={valueBulletsRef} className="space-y-6">
                {[
                  t.landing.features.endToEnd,
                  t.landing.features.fastIteration,
                  t.landing.features.clientCentric,
                  t.landing.features.crossFunctional,
                  t.landing.features.provenTrack,
                  t.landing.features.scalable,
                ].map((benefit, index) => (
                  <div key={index} className="value-bullet flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 mt-1 flex-shrink-0" style={{ color: 'var(--landing-accent-primary)' }} />
                    <span className="text-lg" style={{ color: 'var(--landing-text-secondary)' }}>
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div ref={processLineRef} className="relative">
              {/* Simple process flow diagram */}
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'var(--landing-accent-soft)' }}>
                    <span className="font-bold" style={{ color: 'var(--landing-accent-primary)' }}>1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold" style={{ color: 'var(--landing-text-primary)' }}>{t.landing.steps.concept.title}</h4>
                    <p className="text-sm" style={{ color: 'var(--landing-text-secondary)' }}>{t.landing.steps.concept.description}</p>
                  </div>
                </div>
                
                <div className="process-line ml-6 w-0.5 h-8" style={{ backgroundColor: 'var(--landing-accent-primary)' }}></div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'var(--landing-accent-soft)' }}>
                    <span className="font-bold" style={{ color: 'var(--landing-accent-primary)' }}>2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold" style={{ color: 'var(--landing-text-primary)' }}>{t.landing.steps.development.title}</h4>
                    <p className="text-sm" style={{ color: 'var(--landing-text-secondary)' }}>{t.landing.steps.development.description}</p>
                  </div>
                </div>
                
                <div className="process-line ml-6 w-0.5 h-8" style={{ backgroundColor: 'var(--landing-accent-primary)' }}></div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'var(--landing-accent-soft)' }}>
                    <span className="font-bold" style={{ color: 'var(--landing-accent-primary)' }}>3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold" style={{ color: 'var(--landing-text-primary)' }}>{t.landing.steps.qa.title}</h4>
                    <p className="text-sm" style={{ color: 'var(--landing-text-secondary)' }}>{t.landing.steps.qa.description}</p>
                  </div>
                </div>
                
                <div className="process-line ml-6 w-0.5 h-8" style={{ backgroundColor: 'var(--landing-accent-primary)' }}></div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'var(--landing-accent-soft)' }}>
                    <span className="font-bold" style={{ color: 'var(--landing-accent-primary)' }}>4</span>
                  </div>
                  <div>
                    <h4 className="font-semibold" style={{ color: 'var(--landing-text-primary)' }}>{t.landing.steps.launch.title}</h4>
                    <p className="text-sm" style={{ color: 'var(--landing-text-secondary)' }}>{t.landing.steps.launch.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7) Testimonials */}
      <section ref={testimonialsRef} className="py-32 border-t" style={{ 
        backgroundColor: 'var(--landing-bg-elevated)', 
        borderColor: 'var(--landing-border-subtle)' 
      }}>
        <div className="max-w-7xl mx-auto px-4 lg:px-20">
          <div className="text-center space-y-8 mb-20">
            <h2 className="text-5xl font-bold tracking-tight" style={{ color: 'var(--landing-text-primary)' }}>
              {t.landing.stories.title}
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                quote: t.landing.stories.items[0].quote,
                author: t.landing.stories.items[0].author,
                company: t.landing.stories.items[0].company,
                result: t.landing.stories.items[0].highlight
              },
              {
                quote: t.landing.stories.items[1].quote,
                author: t.landing.stories.items[1].author,
                company: t.landing.stories.items[1].company,
                result: t.landing.stories.items[1].highlight
              },
              {
                quote: t.landing.stories.items[2].quote,
                author: t.landing.stories.items[2].author,
                company: t.landing.stories.items[2].company,
                result: t.landing.stories.items[2].highlight
              }
            ].map((testimonial, index) => (
              <div key={index} className="p-8 rounded-3xl border" style={{ 
                backgroundColor: 'var(--landing-bg-base)', 
                borderColor: 'var(--landing-border-subtle)' 
              }}>
                <div className="flex flex-col h-full justify-between  gap-6">
                <Quote className="w-8 h-8" style={{ color: 'var(--landing-accent-primary)' }} />
                  
                  <p className="text-lg leading-relaxed" style={{ color: 'var(--landing-text-secondary)' }}>
                    "{testimonial.quote}"
                  </p>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="font-semibold" style={{ color: 'var(--landing-text-primary)' }}>
                        {testimonial.author}
                      </div>
                      <div className="text-sm" style={{ color: 'var(--landing-text-secondary)' }}>
                        {testimonial.company}
                      </div>
                    </div>
                    
                    <div className="inline-block px-3 py-1 rounded-full text-sm font-medium" style={{ 
                      backgroundColor: 'var(--landing-accent-soft)', 
                      color: 'var(--landing-accent-primary)' 
                    }}>
                      {testimonial.result}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8) Conversion CTA */}
      <section ref={ctaRef} className="py-32" style={{ backgroundColor: 'var(--landing-accent-primary)' }}>
        <div className="max-w-4xl mx-auto px-4 lg:px-20 text-center">
          <div className="space-y-12">
            <div className="space-y-6">
              <h2 className="text-5xl lg:text-6xl font-bold tracking-tight text-black">
                {t.landing.cta.title}
              </h2>
              <p className="text-xl text-black/80 max-w-2xl mx-auto leading-relaxed">
                {t.landing.cta.description}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button 
                  size="lg" 
                  className="animated-button gap-3 px-10 py-4 text-lg font-semibold rounded-xl border-2 bg-black text-white border-black hover:bg-black/90"
                  onClick={() => showToast("Contact form is not available yet")}
                >
                  {t.landing.cta.primaryAction}
                  <ArrowRight className="w-5 h-5" />
                </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="animated-button gap-3 px-10 py-4 text-lg font-semibold rounded-xl border-2 border-black/20 text-black bg-transparent hover:bg-black/5"
                onClick={() => showToast("Portfolio details are not available yet")}
              >
                {t.landing.cta.secondaryAction}
                <Users className="w-5 h-5" />
              </Button>
            </div>

            <p className="text-black/60">
              {t.landing.cta.contact}
            </p>
          </div>
        </div>
      </section>

      {/* 9) Footer */}
      <footer ref={footerRef} className="py-16 border-t" style={{ 
        backgroundColor: 'var(--landing-bg-base)', 
        borderColor: 'var(--landing-border-subtle)' 
      }}>
        <div className="max-w-7xl mx-auto px-4 lg:px-20">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <img 
                  src={logoImage}
                  alt="MMO Intelin Logo" 
                  className="w-20 h-20 object-contain"
                />
                
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--landing-text-secondary)' }}>
                {t.landing.footer.description}
              </p>
              
            </div>

            <div className="space-y-6">
              <h4 className="font-semibold" style={{ color: 'var(--landing-text-primary)' }}>
                {t.landing.footer.links.services}
              </h4>
              <div className="space-y-3 text-sm">
                <a href="#mobile" className="block transition-colors hover:text-white" style={{ color: 'var(--landing-text-secondary)' }}>
                  {t.landing.footer.links.mobile}
                </a>
                <a href="#web" className="block transition-colors hover:text-white" style={{ color: 'var(--landing-text-secondary)' }}>
                  {t.landing.footer.links.web}
                </a>
                <a href="#qa" className="block transition-colors hover:text-white" style={{ color: 'var(--landing-text-secondary)' }}>
                  {t.landing.footer.links.qa}
                </a>
                <a 
                  href="#" 
                  className="block transition-colors hover:text-white" 
                  style={{ color: 'var(--landing-text-secondary)' }}
                  onClick={(e) => {
                    e.preventDefault();
                    showToast("Consulting service is not available yet");
                  }}
                >
                  {t.landing.footer.links.consulting}
                </a>
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="font-semibold" style={{ color: 'var(--landing-text-primary)' }}>
                {t.landing.footer.links.legal}
              </h4>
              <div className="space-y-3 text-sm">
                <Link to="/privacy" className="block transition-colors hover:text-white" style={{ color: 'var(--landing-text-secondary)' }}>
                  {t.landing.footer.links.privacy}
                </Link>
                <Link to="/terms" className="block transition-colors hover:text-white" style={{ color: 'var(--landing-text-secondary)' }}>
                  {t.landing.footer.links.terms}
                </Link>
                {/* <a href="#" className="block transition-colors hover:text-white" style={{ color: 'var(--landing-text-secondary)' }}>
                  {t.landing.footer.links.security}
                </a> */}
              </div>
            </div>
          </div>

          <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4" style={{ borderColor: 'var(--landing-border-subtle)' }}>
            <p className="text-sm" style={{ color: 'var(--landing-text-secondary)' }}>
              © 2025 MMO2025. All rights reserved.
            </p>
            <p className="text-sm italic" style={{ color: 'var(--landing-text-secondary)' }}>
              {t.landing.footer.tagline}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}