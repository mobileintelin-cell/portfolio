import { 
  LayoutDashboard, 
  Smartphone, 
  Monitor, 
  PlayCircle, 
  BarChart3, 
  Settings,
  ChevronRight
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { cn } from './ui/utils';
import type { Project } from '../App';

interface SidebarNavProps {
  selectedProject: Project | null;
}

export function SidebarNav({ selectedProject }: SidebarNavProps) {
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

  return (
    <aside className="w-64 border-r border-border bg-card flex flex-col">
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          if (item.disabled) {
            return (
              <Button
                key={item.id}
                variant="ghost"
                className="w-full justify-start gap-3 h-10 opacity-50 cursor-not-allowed"
                disabled
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Button>
            );
          }
          
          return (
            <Link key={item.id} to={item.path}>
              <Button
                variant={isActive ? 'secondary' : 'ghost'}
                className={cn(
                  'w-full justify-start gap-3 h-10',
                  isActive && 'bg-accent'
                )}
              >
                <Icon className="w-4 h-4" />
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
        <div className="p-4 border-t border-border">
          <div className="text-sm font-medium mb-2">Active Project</div>
          <div className="p-3 bg-muted rounded-md">
            <div className="font-medium text-sm">{selectedProject.name}</div>
            <div className="text-xs text-muted-foreground capitalize">
              {selectedProject.type} • {selectedProject.lastRunStatus}
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}