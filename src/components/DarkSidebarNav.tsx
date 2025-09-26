import { 
  LayoutDashboard, 
  Smartphone, 
  Monitor, 
  PlayCircle, 
  BarChart3, 
  Settings,
  ChevronRight,
  Activity
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { cn } from './ui/utils';
import type { Project } from '../App';

interface DarkSidebarNavProps {
  selectedProject: Project | null;
}

export function DarkSidebarNav({ selectedProject }: DarkSidebarNavProps) {
  const location = useLocation();
  
  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      path: '/dashboard',
    },
    {
      id: 'mobile-testing',
      label: 'Mobile Testing',
      icon: Smartphone,
      path: '/mobile-testing',
    },
    {
      id: 'web-testing',
      label: 'Web Testing',
      icon: Monitor,
      path: '/web-testing',
    },
    {
      id: 'test-runner',
      label: 'Run Tests',
      icon: PlayCircle,
      path: '/test-runner',
      disabled: !selectedProject,
    },
    {
      id: 'results',
      label: 'Test Results',
      icon: BarChart3,
      path: '/results',
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      path: '/settings',
    },
  ];

  const getStatusColor = (status: Project['lastRunStatus']) => {
    switch (status) {
      case 'passed':
        return 'var(--landing-accent-primary)';
      case 'failed':
        return '#ef4444';
      case 'running':
        return '#3b82f6';
      default:
        return '#6b7280';
    }
  };

  return (
    <aside 
      className="w-72 border-r flex flex-col"
      style={{ 
        backgroundColor: 'var(--landing-bg-elevated)',
        borderColor: 'var(--landing-border-subtle)'
      }}
    >
      <nav className="flex-1 p-6 space-y-2">
        <div className="mb-8">
          <h2 className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: 'var(--landing-text-secondary)' }}>
            Navigation
          </h2>
        </div>
        
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          if (item.disabled) {
            return (
              <Button
                key={item.id}
                variant="ghost"
                className="w-full justify-start gap-4 h-12 opacity-40 cursor-not-allowed text-base font-medium rounded-xl"
                disabled
                style={{ color: 'var(--landing-text-secondary)' }}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </Button>
            );
          }
          
          return (
            <Link key={item.id} to={item.path}>
              <Button
                variant="ghost"
                className={cn(
                  'w-full justify-start gap-4 h-12 text-base font-medium rounded-xl transition-all duration-200',
                  isActive 
                    ? 'text-black font-semibold' 
                    : 'hover:bg-white/5'
                )}
                style={isActive ? { 
                  backgroundColor: 'var(--landing-accent-primary)',
                  color: '#000000'
                } : { 
                  color: 'var(--landing-text-secondary)' 
                }}
              >
                <Icon className="w-5 h-5" />
                {item.label}
                {item.id === 'test-runner' && selectedProject && (
                  <ChevronRight className="w-4 h-4 ml-auto" />
                )}
              </Button>
            </Link>
          );
        })}
      </nav>
      
      {selectedProject && (
        <div className="p-6 border-t" style={{ borderColor: 'var(--landing-border-subtle)' }}>
          <div className="mb-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--landing-text-secondary)' }}>
              Active Project
            </h3>
          </div>
          <div 
            className="p-4 rounded-xl border"
            style={{ 
              backgroundColor: 'var(--landing-bg-base)',
              borderColor: 'var(--landing-border-subtle)'
            }}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div 
                  className="w-2.5 h-2.5 rounded-full" 
                  style={{ backgroundColor: getStatusColor(selectedProject.lastRunStatus) }}
                />
                <Activity className="w-4 h-4" style={{ color: 'var(--landing-accent-primary)' }} />
              </div>
              <span 
                className="text-xs uppercase font-semibold px-2 py-1 rounded-md"
                style={{ 
                  color: 'var(--landing-accent-primary)',
                  backgroundColor: 'var(--landing-accent-soft)'
                }}
              >
                {selectedProject.type}
              </span>
            </div>
            
            <div className="space-y-2">
              <div className="font-semibold text-sm" style={{ color: 'var(--landing-text-primary)' }}>
                {selectedProject.name}
              </div>
              <div className="text-xs capitalize" style={{ color: 'var(--landing-text-secondary)' }}>
                Status: <span style={{ color: getStatusColor(selectedProject.lastRunStatus) }}>
                  {selectedProject.lastRunStatus}
                </span>
              </div>
              <div className="text-xs" style={{ color: 'var(--landing-text-secondary)' }}>
                {selectedProject.testcases.length} test cases
              </div>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}