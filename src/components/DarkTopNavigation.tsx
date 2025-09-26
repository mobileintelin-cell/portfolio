import { ChevronDown, TestTube, Bell, Settings } from 'lucide-react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { LanguageDropdown } from './LanguageDropdown';
import type { Project, User } from '../App';

interface DarkTopNavigationProps {
  user: User;
  selectedProject: Project | null;
  projects: Project[];
  onSelectProject: (project: Project) => void;
  onLogout?: () => void;
}

export function DarkTopNavigation({ user, selectedProject, projects, onSelectProject, onLogout }: DarkTopNavigationProps) {
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
    <header 
      className="h-20 border-b backdrop-blur-xl flex items-center justify-between px-6"
      style={{ 
        backgroundColor: 'rgba(17, 17, 17, 0.8)',
        borderColor: 'var(--landing-border-subtle)'
      }}
    >
      <div className="flex items-center gap-8">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'var(--landing-accent-soft)' }}>
            <TestTube className="w-5 h-5" style={{ color: 'var(--landing-accent-primary)' }} />
          </div>
          <span className="text-xl font-bold tracking-tight" style={{ color: 'var(--landing-text-primary)' }}>
            MMO2025
          </span>
        </div>
        
        {/* Project Selector */}
        <div className="hidden md:block">
          <Select
            value={selectedProject?.id || ''}
            onValueChange={(value) => {
              const project = projects.find(p => p.id === value);
              if (project) onSelectProject(project);
            }}
          >
            <SelectTrigger 
              className="w-80 h-11 border-0 text-base font-medium"
              style={{ 
                backgroundColor: 'var(--landing-bg-base)',
                color: 'var(--landing-text-primary)'
              }}
            >
              <SelectValue placeholder="Select a project" />
            </SelectTrigger>
            <SelectContent 
              className="border-0"
              style={{ 
                backgroundColor: 'var(--landing-bg-elevated)',
                borderColor: 'var(--landing-border-subtle)'
              }}
            >
              {projects.map((project) => (
                <SelectItem 
                  key={project.id} 
                  value={project.id}
                  className="text-base py-3"
                  style={{ color: 'var(--landing-text-primary)' }}
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-2.5 h-2.5 rounded-full" 
                      style={{ backgroundColor: getStatusColor(project.lastRunStatus) }}
                    />
                    <span className="font-medium">{project.name}</span>
                    <span 
                      className="capitalize text-sm px-2 py-1 rounded-md"
                      style={{ 
                        color: 'var(--landing-accent-primary)',
                        backgroundColor: 'var(--landing-accent-soft)'
                      }}
                    >
                      {project.type}
                    </span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Language Selector */}
        <LanguageDropdown variant="app" />

        {/* Notifications */}
        <Button 
          variant="ghost" 
          size="sm" 
          className="w-10 h-10 p-0 rounded-xl"
          style={{ color: 'var(--landing-text-secondary)' }}
        >
          <Bell className="w-5 h-5" />
        </Button>

        {/* Settings */}
        <Button 
          variant="ghost" 
          size="sm" 
          className="w-10 h-10 p-0 rounded-xl"
          style={{ color: 'var(--landing-text-secondary)' }}
        >
          <Settings className="w-5 h-5" />
        </Button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              className="flex items-center gap-3 h-auto p-3 rounded-xl hover:bg-white/5"
            >
              <Avatar className="w-9 h-9">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback 
                  className="font-semibold"
                  style={{ 
                    backgroundColor: 'var(--landing-accent-soft)',
                    color: 'var(--landing-accent-primary)'
                  }}
                >
                  {user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="hidden sm:block text-left">
                <div className="font-semibold text-sm" style={{ color: 'var(--landing-text-primary)' }}>
                  {user.name}
                </div>
                <div className="text-xs" style={{ color: 'var(--landing-text-secondary)' }}>
                  {user.email}
                </div>
              </div>
              <ChevronDown className="w-4 h-4" style={{ color: 'var(--landing-text-secondary)' }} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            align="end" 
            className="w-64 border-0"
            style={{ 
              backgroundColor: 'var(--landing-bg-elevated)',
              borderColor: 'var(--landing-border-subtle)'
            }}
          >
            <div className="p-3 border-b" style={{ borderColor: 'var(--landing-border-subtle)' }}>
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback 
                    className="font-semibold"
                    style={{ 
                      backgroundColor: 'var(--landing-accent-soft)',
                      color: 'var(--landing-accent-primary)'
                    }}
                  >
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold" style={{ color: 'var(--landing-text-primary)' }}>
                    {user.name}
                  </div>
                  <div className="text-sm" style={{ color: 'var(--landing-text-secondary)' }}>
                    {user.email}
                  </div>
                </div>
              </div>
            </div>
            <div className="py-2">
              <DropdownMenuItem 
                className="px-3 py-2 cursor-pointer"
                style={{ color: 'var(--landing-text-primary)' }}
              >
                Profile Settings
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="px-3 py-2 cursor-pointer"
                style={{ color: 'var(--landing-text-primary)' }}
              >
                API Keys
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="px-3 py-2 cursor-pointer"
                style={{ color: 'var(--landing-text-primary)' }}
              >
                Billing & Usage
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="px-3 py-2 cursor-pointer"
                style={{ color: 'var(--landing-text-primary)' }}
              >
                Team Management
              </DropdownMenuItem>
            </div>
            <DropdownMenuSeparator style={{ backgroundColor: 'var(--landing-border-subtle)' }} />
            <div className="py-2">
              <DropdownMenuItem 
                onClick={onLogout}
                className="px-3 py-2 cursor-pointer text-red-400"
              >
                Sign Out
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}