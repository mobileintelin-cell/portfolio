import { useState } from 'react';
import { Link } from 'react-router-dom';
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

export function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: 'var(--landing-bg-base)' }}>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b" style={{ 
        backgroundColor: 'rgba(10, 10, 10, 0.8)', 
        borderColor: 'var(--landing-border-subtle)' 
      }}>
        <div className="max-w-7xl mx-auto px-4 lg:px-20">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'var(--landing-accent-soft)' }}>
                <div className="w-6 h-6 rounded" style={{ backgroundColor: 'var(--landing-accent-primary)' }}></div>
              </div>
              <span className="text-2xl font-bold tracking-tight" style={{ color: 'var(--landing-text-primary)' }}>
                TestFlow
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-12">
              <a href="#team" className="font-medium transition-colors hover:text-white" style={{ color: 'var(--landing-text-secondary)' }}>
                Team
              </a>
              <a href="#mobile" className="font-medium transition-colors hover:text-white" style={{ color: 'var(--landing-text-secondary)' }}>
                Mobile
              </a>
              <a href="#web" className="font-medium transition-colors hover:text-white" style={{ color: 'var(--landing-text-secondary)' }}>
                Web
              </a>
              <a href="#qa" className="font-medium transition-colors hover:text-white" style={{ color: 'var(--landing-text-secondary)' }}>
                QA
              </a>
              <a href="#portfolio" className="font-medium transition-colors hover:text-white" style={{ color: 'var(--landing-text-secondary)' }}>
                Work
              </a>
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-6">
              <Link to="/login">
                <Button 
                  variant="ghost" 
                  className="font-medium border-0 bg-transparent hover:bg-white/5"
                  style={{ color: 'var(--landing-text-secondary)' }}
                >
                  Sign In
                </Button>
              </Link>
              <Link to="/login">
                <Button className="gap-2 px-8 py-3 font-semibold rounded-xl border-0" style={{ 
                  backgroundColor: 'var(--landing-accent-primary)', 
                  color: '#000000' 
                }}>
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
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
                  Team
                </a>
                <a href="#mobile" className="text-lg font-medium" style={{ color: 'var(--landing-text-secondary)' }}>
                  Mobile
                </a>
                <a href="#web" className="text-lg font-medium" style={{ color: 'var(--landing-text-secondary)' }}>
                  Web
                </a>
                <a href="#qa" className="text-lg font-medium" style={{ color: 'var(--landing-text-secondary)' }}>
                  QA
                </a>
                <a href="#portfolio" className="text-lg font-medium" style={{ color: 'var(--landing-text-secondary)' }}>
                  Work
                </a>
                <div className="flex flex-col gap-4 pt-6 border-t" style={{ borderColor: 'var(--landing-border-subtle)' }}>
                  <Link to="/login">
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start text-lg font-medium border-0 bg-transparent"
                      style={{ color: 'var(--landing-text-secondary)' }}
                    >
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button className="w-full gap-2 py-3 text-lg font-semibold rounded-xl border-0" style={{ 
                      backgroundColor: 'var(--landing-accent-primary)', 
                      color: '#000000' 
                    }}>
                      Get Started
                      <ArrowRight className="w-5 h-5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* GSAP Notes: anim/hero/heading - H1 fade-up + letter-spacing tighten (y: 24 → 0, opacity: 0 → 1, duration: 0.8, ease: power3.out) */}
      {/* GSAP Notes: anim/hero/subline - Subheadline/CTAs stagger (stagger: 0.08) */}
      {/* GSAP Notes: anim/hero/particles - Background particles slow float (yoyo: true, repeat: -1, small y and scale) */}
      {/* GSAP Notes: anim/hero/scroll-hint - Scroll hint chevron gentle y oscillation */}

      {/* 1) Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Background with particles effect */}
        <div className="absolute inset-0">
          <div className="absolute inset-0" style={{ backgroundColor: 'var(--landing-bg-base)' }}>
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-1/4 left-1/4 w-1 h-1 rounded-full animate-pulse" style={{ backgroundColor: 'var(--landing-particle-color)' }}></div>
              <div className="absolute top-1/3 right-1/3 w-1 h-1 rounded-full animate-pulse delay-1000" style={{ backgroundColor: 'var(--landing-particle-color)' }}></div>
              <div className="absolute bottom-1/4 left-1/3 w-1 h-1 rounded-full animate-pulse delay-2000" style={{ backgroundColor: 'var(--landing-particle-color)' }}></div>
              <div className="absolute bottom-1/3 right-1/4 w-1 h-1 rounded-full animate-pulse delay-3000" style={{ backgroundColor: 'var(--landing-particle-color)' }}></div>
            </div>
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-20 w-full">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            {/* Left: Content (60%) */}
            <div className="lg:col-span-7 space-y-12">
              <div className="space-y-8">
                <h1 className="text-6xl lg:text-8xl font-bold leading-none tracking-tight" style={{ color: 'var(--landing-text-primary)' }}>
                  Building Seamless{' '}
                  <span className="block" style={{ color: 'var(--landing-accent-primary)' }}>
                    Digital Experiences
                  </span>{' '}
                  Across Mobile, Web, and Beyond
                </h1>
                
                <p className="text-2xl leading-relaxed max-w-2xl" style={{ color: 'var(--landing-text-secondary)' }}>
                  Cross-functional expertise and reliability from concept to flawless launch.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-6">
                <Button 
                  size="lg" 
                  className="gap-3 px-10 py-4 text-lg font-semibold rounded-xl border-0" 
                  style={{ backgroundColor: 'var(--landing-accent-primary)', color: '#000000' }}
                >
                  See Our Work
                  <ExternalLink className="w-5 h-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="gap-3 px-10 py-4 text-lg font-semibold rounded-xl border-2" 
                  style={{ 
                    borderColor: 'var(--landing-border-subtle)', 
                    color: 'var(--landing-text-primary)',
                    backgroundColor: 'transparent'
                  }}
                >
                  <Users className="w-5 h-5" />
                  Meet Our Team
                </Button>
              </div>
            </div>

            {/* Right: Visual (40%) */}
            <div className="lg:col-span-5 relative">
              <div className="relative z-10">
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
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <ChevronDown className="w-8 h-8 animate-bounce" style={{ color: 'var(--landing-text-secondary)' }} />
        </div>
      </section>

      {/* GSAP Notes: anim/overview/card/01-03 - Cards stagger in (x: -20/0/20 variations), opacity: 0 → 1, stagger: 0.12 */}

      {/* 2) Team Overview */}
      <section id="team" className="py-32" style={{ backgroundColor: 'var(--landing-bg-base)' }}>
        <div className="max-w-7xl mx-auto px-4 lg:px-20">
          <div className="text-center space-y-12 mb-24">
            <h2 className="text-5xl lg:text-6xl font-bold tracking-tight" style={{ color: 'var(--landing-text-primary)' }}>
              Cross-Functional Excellence
            </h2>
            <p className="text-xl max-w-4xl mx-auto leading-relaxed" style={{ color: 'var(--landing-text-secondary)' }}>
              Our unified team combines mobile development, web engineering, and quality assurance expertise 
              to deliver end-to-end digital solutions. From concept to launch, we ensure every pixel, 
              interaction, and performance metric meets the highest standards.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {/* Mobile Development Card */}
            <div className="group cursor-pointer">
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
                      Mobile Development
                    </h3>
                    <p className="text-lg leading-relaxed" style={{ color: 'var(--landing-text-secondary)' }}>
                      Native iOS and Android applications with exceptional user experiences and performance optimization.
                    </p>
                  </div>
                  <a href="#mobile" className="inline-flex items-center gap-2 font-semibold transition-colors hover:text-white" style={{ color: 'var(--landing-accent-primary)' }}>
                    Learn more
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Web Development Card */}
            <div className="group cursor-pointer">
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
                      Web Development
                    </h3>
                    <p className="text-lg leading-relaxed" style={{ color: 'var(--landing-text-secondary)' }}>
                      Scalable web applications with modern frameworks, responsive design, and optimized performance.
                    </p>
                  </div>
                  <a href="#web" className="inline-flex items-center gap-2 font-semibold transition-colors hover:text-white" style={{ color: 'var(--landing-accent-primary)' }}>
                    Learn more
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Quality Control Card */}
            <div className="group cursor-pointer">
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
                      Quality Control
                    </h3>
                    <p className="text-lg leading-relaxed" style={{ color: 'var(--landing-text-secondary)' }}>
                      Comprehensive testing strategies ensuring reliability, security, and flawless user experiences.
                    </p>
                  </div>
                  <a href="#qa" className="inline-flex items-center gap-2 font-semibold transition-colors hover:text-white" style={{ color: 'var(--landing-accent-primary)' }}>
                    Learn more
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GSAP Notes: anim/mobile/header - Scroll pin for section header */}
      {/* GSAP Notes: anim/mobile/mockup/01-02 - Device mockups parallax (yPercent slow) */}
      {/* GSAP Notes: anim/mobile/case-study - Case study tile hover: scale 1.02 + shadow elevate */}

      {/* 3A) Mobile Development */}
      <section id="mobile" className="py-32 border-t" style={{ 
        backgroundColor: 'var(--landing-bg-elevated)', 
        borderColor: 'var(--landing-border-subtle)' 
      }}>
        <div className="max-w-7xl mx-auto px-4 lg:px-20">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-12">
              <div className="space-y-8">
                <h2 className="text-5xl font-bold tracking-tight" style={{ color: 'var(--landing-text-primary)' }}>
                  Mobile Development
                </h2>
                <p className="text-xl leading-relaxed" style={{ color: 'var(--landing-text-secondary)' }}>
                  We build native and cross-platform mobile applications that deliver exceptional performance 
                  and user experiences across iOS and Android platforms.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 mt-1 flex-shrink-0" style={{ color: 'var(--landing-accent-primary)' }} />
                  <div>
                    <h4 className="text-lg font-semibold mb-2" style={{ color: 'var(--landing-text-primary)' }}>
                      Native iOS & Android
                    </h4>
                    <p style={{ color: 'var(--landing-text-secondary)' }}>
                      Platform-specific development for optimal performance and user experience
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 mt-1 flex-shrink-0" style={{ color: 'var(--landing-accent-primary)' }} />
                  <div>
                    <h4 className="text-lg font-semibold mb-2" style={{ color: 'var(--landing-text-primary)' }}>
                      Cross-Platform Solutions
                    </h4>
                    <p style={{ color: 'var(--landing-text-secondary)' }}>
                      React Native and Flutter applications with shared codebases
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 mt-1 flex-shrink-0" style={{ color: 'var(--landing-accent-primary)' }} />
                  <div>
                    <h4 className="text-lg font-semibold mb-2" style={{ color: 'var(--landing-text-primary)' }}>
                      Performance Optimization
                    </h4>
                    <p style={{ color: 'var(--landing-text-secondary)' }}>
                      Memory management, battery efficiency, and smooth animations
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
                    Recent Success
                  </h4>
                  <p className="mb-4" style={{ color: 'var(--landing-text-secondary)' }}>
                    Delivered a complex e-commerce mobile app with 99.9% crash-free sessions and 4.8+ app store rating.
                  </p>
                  <div className="text-sm" style={{ color: 'var(--landing-accent-primary)' }}>
                    Client: [E-commerce Startup]
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1624298696100-a6aae4884881?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXZlbG9wbWVudCUyMGNvZGV8ZW58MXx8fHwxNzU4NzczMzgxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Mobile app development"
                className="rounded-3xl w-full h-auto shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* GSAP Notes: anim/web/chips - Chips enter with quick stagger */}
      {/* GSAP Notes: anim/web/mockup/01-02 - Mockups fade-in with slight rotate (rotation: -1 → 0, duration: 0.6) */}

      {/* 3B) Web Development */}
      <section id="web" className="py-32" style={{ backgroundColor: 'var(--landing-bg-base)' }}>
        <div className="max-w-7xl mx-auto px-4 lg:px-20">
          <div className="space-y-16">
            <div className="text-center space-y-8">
              <h2 className="text-5xl font-bold tracking-tight" style={{ color: 'var(--landing-text-primary)' }}>
                Web Development
              </h2>
              <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: 'var(--landing-text-secondary)' }}>
                Full-stack web applications built with modern frameworks, emphasizing scalability, 
                performance, and responsive design across all devices.
              </p>
            </div>

            {/* Tech Stack */}
            <div className="flex flex-wrap justify-center gap-4">
              {['React', 'Angular', 'Node.js', 'TypeScript', 'Next.js', 'GraphQL', 'AWS', 'Docker'].map((tech, index) => (
                <div key={index} className="px-6 py-3 rounded-full border" style={{ 
                  backgroundColor: 'var(--landing-bg-elevated)', 
                  borderColor: 'var(--landing-border-subtle)',
                  color: 'var(--landing-text-secondary)'
                }}>
                  {tech}
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div className="p-8 rounded-2xl border" style={{ 
                  backgroundColor: 'var(--landing-bg-elevated)', 
                  borderColor: 'var(--landing-border-subtle)' 
                }}>
                  <h4 className="text-xl font-semibold mb-4" style={{ color: 'var(--landing-text-primary)' }}>
                    Frontend Excellence
                  </h4>
                  <p className="mb-4" style={{ color: 'var(--landing-text-secondary)' }}>
                    Modern React and Angular applications with responsive design, 
                    accessibility compliance, and optimized performance.
                  </p>
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1758611974287-8ca7147860a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudCUyMG1vZGVybiUyMGludGVyZmFjZXxlbnwxfHx8fDE3NTg3NzMzODR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Web development interface"
                    className="rounded-xl w-full h-48 object-cover"
                  />
                </div>
              </div>

              <div className="space-y-8">
                <div className="p-8 rounded-2xl border" style={{ 
                  backgroundColor: 'var(--landing-bg-elevated)', 
                  borderColor: 'var(--landing-border-subtle)' 
                }}>
                  <h4 className="text-xl font-semibold mb-4" style={{ color: 'var(--landing-text-primary)' }}>
                    Backend & Infrastructure
                  </h4>
                  <p className="mb-4" style={{ color: 'var(--landing-text-secondary)' }}>
                    Scalable server architectures, API design, database optimization, 
                    and cloud deployment for high-performance applications.
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="font-semibold mb-2" style={{ color: 'var(--landing-text-primary)' }}>
                        Backend
                      </div>
                      <div style={{ color: 'var(--landing-text-secondary)' }}>
                        Node.js, Python, PostgreSQL
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold mb-2" style={{ color: 'var(--landing-text-primary)' }}>
                        Cloud
                      </div>
                      <div style={{ color: 'var(--landing-text-secondary)' }}>
                        AWS, Azure, Docker
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GSAP Notes: anim/qa/kpi/01-04 - KPIs count-up effect on enter (handoff note: use GSAP + custom counter) */}
      {/* GSAP Notes: anim/qa/security-badge - Security badge/icon gentle pulse (very subtle) */}

      {/* 3C) Quality Control / QA */}
      <section id="qa" className="py-32 border-t" style={{ 
        backgroundColor: 'var(--landing-bg-elevated)', 
        borderColor: 'var(--landing-border-subtle)' 
      }}>
        <div className="max-w-7xl mx-auto px-4 lg:px-20">
          <div className="space-y-16">
            <div className="text-center space-y-8">
              <h2 className="text-5xl font-bold tracking-tight" style={{ color: 'var(--landing-text-primary)' }}>
                Quality Control & QA
              </h2>
              <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: 'var(--landing-text-secondary)' }}>
                Comprehensive testing strategies ensuring every application meets the highest standards 
                of reliability, security, and user experience before launch.
              </p>
            </div>

            {/* KPI Cards */}
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center space-y-4">
                <div className="text-4xl font-bold" style={{ color: 'var(--landing-accent-primary)' }}>
                  99.8%
                </div>
                <div className="text-lg font-medium" style={{ color: 'var(--landing-text-primary)' }}>
                  Bug Detection Rate
                </div>
                <div className="text-sm" style={{ color: 'var(--landing-text-secondary)' }}>
                  Critical issues caught before production
                </div>
              </div>
              <div className="text-center space-y-4">
                <div className="text-4xl font-bold" style={{ color: 'var(--landing-accent-primary)' }}>
                  95%
                </div>
                <div className="text-lg font-medium" style={{ color: 'var(--landing-text-primary)' }}>
                  Test Coverage
                </div>
                <div className="text-sm" style={{ color: 'var(--landing-text-secondary)' }}>
                  Automated and manual testing coverage
                </div>
              </div>
              <div className="text-center space-y-4">
                <div className="text-4xl font-bold" style={{ color: 'var(--landing-accent-primary)' }}>
                  50%
                </div>
                <div className="text-lg font-medium" style={{ color: 'var(--landing-text-primary)' }}>
                  Faster Releases
                </div>
                <div className="text-sm" style={{ color: 'var(--landing-text-secondary)' }}>
                  Reduced time-to-market through automation
                </div>
              </div>
              <div className="text-center space-y-4">
                <div className="text-4xl font-bold" style={{ color: 'var(--landing-accent-primary)' }}>
                  24/7
                </div>
                <div className="text-lg font-medium" style={{ color: 'var(--landing-text-primary)' }}>
                  Monitoring
                </div>
                <div className="text-sm" style={{ color: 'var(--landing-text-secondary)' }}>
                  Continuous performance monitoring
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
                        Functional Testing
                      </h4>
                      <p style={{ color: 'var(--landing-text-secondary)' }}>
                        Comprehensive validation of application features and user workflows
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Zap className="w-6 h-6 mt-1 flex-shrink-0" style={{ color: 'var(--landing-accent-primary)' }} />
                    <div>
                      <h4 className="text-lg font-semibold mb-2" style={{ color: 'var(--landing-text-primary)' }}>
                        Automation Testing
                      </h4>
                      <p style={{ color: 'var(--landing-text-secondary)' }}>
                        Continuous integration with automated test suites and regression testing
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Globe className="w-6 h-6 mt-1 flex-shrink-0" style={{ color: 'var(--landing-accent-primary)' }} />
                    <div>
                      <h4 className="text-lg font-semibold mb-2" style={{ color: 'var(--landing-text-primary)' }}>
                        Security & Performance
                      </h4>
                      <p style={{ color: 'var(--landing-text-secondary)' }}>
                        Vulnerability assessments and performance optimization testing
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

      {/* GSAP Notes: anim/team/card/01-06 - Cards stagger on enter; hover tilt (rotationX/rotationY tiny, transformOrigin: center) */}

      {/* 4) Meet the Team */}
      <section className="py-32" style={{ backgroundColor: 'var(--landing-bg-base)' }}>
        <div className="max-w-7xl mx-auto px-4 lg:px-20">
          <div className="text-center space-y-8 mb-20">
            <h2 className="text-5xl font-bold tracking-tight" style={{ color: 'var(--landing-text-primary)' }}>
              Meet the Team
            </h2>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: 'var(--landing-text-secondary)' }}>
              Our diverse team of specialists brings together expertise from mobile development, 
              web engineering, and quality assurance to deliver exceptional results.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Chen',
                role: 'Mobile Development Lead',
                bio: 'iOS and Android specialist with 8+ years building consumer apps.',
                fun: 'Builds apps while traveling to 30+ countries',
                tags: ['Mobile', 'iOS', 'Android']
              },
              {
                name: 'Marcus Rodriguez',
                role: 'Full-Stack Engineer',
                bio: 'Expert in React, Node.js, and cloud architecture solutions.',
                fun: 'Codes with mechanical keyboards and vinyl records',
                tags: ['Web', 'Backend', 'Cloud']
              },
              {
                name: 'Emily Watson',
                role: 'QA Engineering Manager',
                bio: 'Automation testing expert ensuring flawless user experiences.',
                fun: 'Finds bugs faster than she solves crossword puzzles',
                tags: ['QA', 'Automation', 'Testing']
              },
              {
                name: 'David Kim',
                role: 'DevOps Specialist',
                bio: 'Infrastructure and deployment pipeline optimization specialist.',
                fun: 'Deploys faster than he makes coffee',
                tags: ['DevOps', 'Cloud', 'CI/CD']
              },
              {
                name: 'Lisa Thompson',
                role: 'UI/UX Designer',
                bio: 'Creates intuitive designs that users love and developers can build.',
                fun: 'Sketches wireframes on napkins at coffee shops',
                tags: ['Design', 'UX', 'Mobile']
              },
              {
                name: 'Alex Foster',
                role: 'Security Engineer',
                bio: 'Ensures applications are secure, compliant, and protected.',
                fun: 'Hacks systems by day, solves escape rooms by night',
                tags: ['Security', 'QA', 'Compliance']
              }
            ].map((member, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="p-8 rounded-3xl border transition-all duration-500 hover:border-opacity-50 hover:-translate-y-2" style={{ 
                  backgroundColor: 'var(--landing-bg-elevated)', 
                  borderColor: 'var(--landing-border-subtle)' 
                }}>
                  <div className="space-y-6">
                    {/* Avatar placeholder */}
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ backgroundColor: 'var(--landing-accent-soft)' }}>
                      <Users className="w-8 h-8" style={{ color: 'var(--landing-accent-primary)' }} />
                    </div>
                    
                    <div className="space-y-3">
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
                    
                    <div className="flex flex-wrap gap-2">
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

      {/* GSAP Notes: anim/portfolio/marquee - Horizontal marquee of client logos (infinite loop, slow) */}
      {/* GSAP Notes: anim/portfolio/card/01-03 - Cards animate in with clipPath reveal on scroll */}

      {/* 5) Portfolio / Case Studies */}
      <section id="portfolio" className="py-32 border-t" style={{ 
        backgroundColor: 'var(--landing-bg-elevated)', 
        borderColor: 'var(--landing-border-subtle)' 
      }}>
        <div className="max-w-7xl mx-auto px-4 lg:px-20">
          <div className="text-center space-y-8 mb-20">
            <h2 className="text-5xl font-bold tracking-tight" style={{ color: 'var(--landing-text-primary)' }}>
              Portfolio & Case Studies
            </h2>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: 'var(--landing-text-secondary)' }}>
              Discover our recent projects showcasing cross-functional collaboration 
              and end-to-end delivery excellence.
            </p>
          </div>

          {/* Featured Project */}
          <div className="mb-16">
            <div className="grid lg:grid-cols-2 gap-12 items-center p-12 rounded-3xl border" style={{ 
              backgroundColor: 'var(--landing-bg-base)', 
              borderColor: 'var(--landing-border-subtle)' 
            }}>
              <div className="space-y-8">
                <div className="flex gap-2">
                  <span className="px-3 py-1 text-sm rounded-full" style={{ 
                    backgroundColor: 'var(--landing-accent-soft)', 
                    color: 'var(--landing-accent-primary)' 
                  }}>
                    Mobile
                  </span>
                  <span className="px-3 py-1 text-sm rounded-full" style={{ 
                    backgroundColor: 'var(--landing-accent-soft)', 
                    color: 'var(--landing-accent-primary)' 
                  }}>
                    Web
                  </span>
                  <span className="px-3 py-1 text-sm rounded-full" style={{ 
                    backgroundColor: 'var(--landing-accent-soft)', 
                    color: 'var(--landing-accent-primary)' 
                  }}>
                    QA
                  </span>
                </div>
                <div className="space-y-4">
                  <h3 className="text-3xl font-bold" style={{ color: 'var(--landing-text-primary)' }}>
                    [FinTech Platform]
                  </h3>
                  <p className="text-lg leading-relaxed" style={{ color: 'var(--landing-text-secondary)' }}>
                    Complete digital transformation including native mobile apps, 
                    web dashboard, and comprehensive testing suite. Delivered 40% 
                    faster user onboarding and 99.9% uptime.
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5" style={{ color: 'var(--landing-accent-primary)' }} />
                    <span style={{ color: 'var(--landing-text-secondary)' }}>
                      Cross-platform mobile app with biometric auth
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5" style={{ color: 'var(--landing-accent-primary)' }} />
                    <span style={{ color: 'var(--landing-text-secondary)' }}>
                      Real-time web dashboard with advanced analytics
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5" style={{ color: 'var(--landing-accent-primary)' }} />
                    <span style={{ color: 'var(--landing-text-secondary)' }}>
                      Automated testing with 95% coverage
                    </span>
                  </div>
                </div>
                <Button className="gap-2" style={{ 
                  backgroundColor: 'var(--landing-accent-primary)', 
                  color: '#000000' 
                }}>
                  View Case Study
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
              <div className="relative">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1646579886741-12b59840c63f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBzb2Z0d2FyZSUyMGRldmVsb3BtZW50JTIwdGVhbXxlbnwxfHx8fDE3NTg3NzMzNzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Software development team collaboration"
                  className="rounded-2xl w-full h-auto"
                />
              </div>
            </div>
          </div>

          {/* Additional Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: '[E-commerce Mobile App]',
                description: 'Native shopping experience with AR try-on features and seamless checkout.',
                tags: ['Mobile', 'QA'],
                metric: '4.8★ App Store'
              },
              {
                title: '[Healthcare Dashboard]',
                description: 'HIPAA-compliant web platform for patient management and telemedicine.',
                tags: ['Web', 'Security'],
                metric: '99.99% Uptime'
              },
              {
                title: '[Gaming Platform]',
                description: 'Real-time multiplayer platform with cross-device synchronization.',
                tags: ['Mobile', 'Web', 'QA'],
                metric: '2M+ Users'
              }
            ].map((project, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="p-8 rounded-3xl border transition-all duration-500 hover:border-opacity-50 hover:-translate-y-1" style={{ 
                  backgroundColor: 'var(--landing-bg-base)', 
                  borderColor: 'var(--landing-border-subtle)' 
                }}>
                  <div className="space-y-6">
                    <div className="flex gap-2">
                      {project.tags.map((tag, tagIndex) => (
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
                    
                    <div className="space-y-3">
                      <h4 className="text-xl font-bold" style={{ color: 'var(--landing-text-primary)' }}>
                        {project.title}
                      </h4>
                      <p style={{ color: 'var(--landing-text-secondary)' }}>
                        {project.description}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="font-semibold" style={{ color: 'var(--landing-accent-primary)' }}>
                        {project.metric}
                      </div>
                      <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" style={{ color: 'var(--landing-text-secondary)' }} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Client Logos Marquee */}
          <div className="mt-20 pt-16 border-t" style={{ borderColor: 'var(--landing-border-subtle)' }}>
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold" style={{ color: 'var(--landing-text-primary)' }}>
                Trusted by Leading Companies
              </h3>
            </div>
            <div className="flex justify-center items-center gap-12 opacity-50">
              {['[Client A]', '[Client B]', '[Client C]', '[Client D]', '[Client E]'].map((client, index) => (
                <div key={index} className="text-lg font-medium" style={{ color: 'var(--landing-text-secondary)' }}>
                  {client}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* GSAP Notes: anim/value/process-line - Process flow line animates on enter (stroke draw effect) */}
      {/* GSAP Notes: anim/value/bullets - Bullets stagger upward fade */}

      {/* 6) Why Choose Us */}
      <section className="py-32" style={{ backgroundColor: 'var(--landing-bg-base)' }}>
        <div className="max-w-7xl mx-auto px-4 lg:px-20">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-12">
              <div className="space-y-8">
                <h2 className="text-5xl font-bold tracking-tight" style={{ color: 'var(--landing-text-primary)' }}>
                  Why Choose Us
                </h2>
                <p className="text-xl leading-relaxed" style={{ color: 'var(--landing-text-secondary)' }}>
                  Our integrated approach ensures seamless collaboration between mobile, 
                  web, and QA teams, delivering exceptional results faster than traditional workflows.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  'End-to-end coverage: Concept → Development → Testing → Launch',
                  'Fast iteration with quality-driven delivery',
                  'Client-centric approach with transparent communication',
                  'Cross-functional expertise in a single team',
                  'Proven track record with 95%+ client satisfaction',
                  'Scalable solutions built for future growth'
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <CheckCircle className="w-6 h-6 mt-1 flex-shrink-0" style={{ color: 'var(--landing-accent-primary)' }} />
                    <span className="text-lg" style={{ color: 'var(--landing-text-secondary)' }}>
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              {/* Simple process flow diagram */}
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'var(--landing-accent-soft)' }}>
                    <span className="font-bold" style={{ color: 'var(--landing-accent-primary)' }}>1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold" style={{ color: 'var(--landing-text-primary)' }}>Concept & Planning</h4>
                    <p className="text-sm" style={{ color: 'var(--landing-text-secondary)' }}>Strategic planning and technical architecture</p>
                  </div>
                </div>
                
                <div className="ml-6 w-0.5 h-8" style={{ backgroundColor: 'var(--landing-accent-primary)' }}></div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'var(--landing-accent-soft)' }}>
                    <span className="font-bold" style={{ color: 'var(--landing-accent-primary)' }}>2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold" style={{ color: 'var(--landing-text-primary)' }}>Development</h4>
                    <p className="text-sm" style={{ color: 'var(--landing-text-secondary)' }}>Parallel mobile and web development</p>
                  </div>
                </div>
                
                <div className="ml-6 w-0.5 h-8" style={{ backgroundColor: 'var(--landing-accent-primary)' }}></div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'var(--landing-accent-soft)' }}>
                    <span className="font-bold" style={{ color: 'var(--landing-accent-primary)' }}>3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold" style={{ color: 'var(--landing-text-primary)' }}>Quality Assurance</h4>
                    <p className="text-sm" style={{ color: 'var(--landing-text-secondary)' }}>Comprehensive testing and optimization</p>
                  </div>
                </div>
                
                <div className="ml-6 w-0.5 h-8" style={{ backgroundColor: 'var(--landing-accent-primary)' }}></div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'var(--landing-accent-soft)' }}>
                    <span className="font-bold" style={{ color: 'var(--landing-accent-primary)' }}>4</span>
                  </div>
                  <div>
                    <h4 className="font-semibold" style={{ color: 'var(--landing-text-primary)' }}>Launch & Support</h4>
                    <p className="text-sm" style={{ color: 'var(--landing-text-secondary)' }}>Deployment and ongoing maintenance</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GSAP Notes: anim/testimonials/crossfade - Auto-play testimonial crossfade */}

      {/* 7) Testimonials */}
      <section className="py-32 border-t" style={{ 
        backgroundColor: 'var(--landing-bg-elevated)', 
        borderColor: 'var(--landing-border-subtle)' 
      }}>
        <div className="max-w-7xl mx-auto px-4 lg:px-20">
          <div className="text-center space-y-8 mb-20">
            <h2 className="text-5xl font-bold tracking-tight" style={{ color: 'var(--landing-text-primary)' }}>
              Client Success Stories
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                quote: "The team's cross-functional approach saved us months of development time. Their QA process caught critical issues before they reached our users.",
                author: "[Client Executive]",
                company: "[Tech Startup]",
                result: "3x faster delivery"
              },
              {
                quote: "Exceptional quality across mobile and web platforms. The attention to detail and proactive communication made this our smoothest project yet.",
                author: "[Product Manager]",
                company: "[Fortune 500]",
                result: "99.9% uptime achieved"
              },
              {
                quote: "From concept to launch, every team member contributed their expertise seamlessly. The final product exceeded our expectations in every way.",
                author: "[CTO]",
                company: "[Scale-up]",
                result: "4.8★ user rating"
              }
            ].map((testimonial, index) => (
              <div key={index} className="p-8 rounded-3xl border" style={{ 
                backgroundColor: 'var(--landing-bg-base)', 
                borderColor: 'var(--landing-border-subtle)' 
              }}>
                <div className="space-y-6">
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

      {/* GSAP Notes: anim/cta/slide-in - CTA band slides in from bottom when 70% viewport reached */}
      {/* GSAP Notes: anim/cta/button-hover - Button hover: ripple or scale 1.03 */}

      {/* 8) Conversion CTA */}
      <section className="py-32" style={{ backgroundColor: 'var(--landing-accent-primary)' }}>
        <div className="max-w-4xl mx-auto px-4 lg:px-20 text-center">
          <div className="space-y-12">
            <div className="space-y-6">
              <h2 className="text-5xl lg:text-6xl font-bold tracking-tight text-black">
                Let's Build Together
              </h2>
              <p className="text-xl text-black/80 max-w-2xl mx-auto leading-relaxed">
                Ready to transform your digital vision into reality? Our cross-functional team 
                is standing by to deliver exceptional results.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/login">
                <Button 
                  size="lg" 
                  className="gap-3 px-10 py-4 text-lg font-semibold rounded-xl border-2 bg-black text-white border-black hover:bg-black/90"
                >
                  Get Started Today
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Button 
                size="lg" 
                variant="outline" 
                className="gap-3 px-10 py-4 text-lg font-semibold rounded-xl border-2 border-black/20 text-black bg-transparent hover:bg-black/5"
              >
                Schedule a Call
                <Users className="w-5 h-5" />
              </Button>
            </div>

            <p className="text-black/60">
              Get in touch: hello@testflow.com • +1 (555) 123-4567
            </p>
          </div>
        </div>
      </section>

      {/* GSAP Notes: anim/footer/icons - Footer icons float 1-2px yoyo loop (super subtle) */}

      {/* 9) Footer */}
      <footer className="py-16 border-t" style={{ 
        backgroundColor: 'var(--landing-bg-base)', 
        borderColor: 'var(--landing-border-subtle)' 
      }}>
        <div className="max-w-7xl mx-auto px-4 lg:px-20">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--landing-accent-soft)' }}>
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: 'var(--landing-accent-primary)' }}></div>
                </div>
                <span className="text-xl font-bold" style={{ color: 'var(--landing-text-primary)' }}>
                  TestFlow
                </span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--landing-text-secondary)' }}>
                Cross-functional excellence in mobile, web, and quality assurance. 
                Building seamless digital experiences from concept to launch.
              </p>
              <div className="flex gap-4">
                {['Twitter', 'LinkedIn', 'GitHub'].map((social, index) => (
                  <a 
                    key={index} 
                    href="#" 
                    className="text-sm transition-colors hover:text-white" 
                    style={{ color: 'var(--landing-text-secondary)' }}
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="font-semibold" style={{ color: 'var(--landing-text-primary)' }}>
                Services
              </h4>
              <div className="space-y-3 text-sm">
                <a href="#mobile" className="block transition-colors hover:text-white" style={{ color: 'var(--landing-text-secondary)' }}>
                  Mobile Development
                </a>
                <a href="#web" className="block transition-colors hover:text-white" style={{ color: 'var(--landing-text-secondary)' }}>
                  Web Development
                </a>
                <a href="#qa" className="block transition-colors hover:text-white" style={{ color: 'var(--landing-text-secondary)' }}>
                  Quality Assurance
                </a>
                <a href="#" className="block transition-colors hover:text-white" style={{ color: 'var(--landing-text-secondary)' }}>
                  Consulting
                </a>
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="font-semibold" style={{ color: 'var(--landing-text-primary)' }}>
                Legal
              </h4>
              <div className="space-y-3 text-sm">
                <Link to="/privacy" className="block transition-colors hover:text-white" style={{ color: 'var(--landing-text-secondary)' }}>
                  Privacy Policy
                </Link>
                <Link to="/terms" className="block transition-colors hover:text-white" style={{ color: 'var(--landing-text-secondary)' }}>
                  Terms of Service
                </Link>
                <a href="#" className="block transition-colors hover:text-white" style={{ color: 'var(--landing-text-secondary)' }}>
                  Security
                </a>
              </div>
            </div>
          </div>

          <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4" style={{ borderColor: 'var(--landing-border-subtle)' }}>
            <p className="text-sm" style={{ color: 'var(--landing-text-secondary)' }}>
              © 2024 TestFlow. All rights reserved.
            </p>
            <p className="text-sm italic" style={{ color: 'var(--landing-text-secondary)' }}>
              Excellence in every pixel, interaction, and line of code.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}