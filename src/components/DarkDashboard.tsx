import { Plus, Calendar, MoreVertical, Edit, Trash2, Smartphone, Monitor, Activity, TrendingUp } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import type { Project } from '../App';

interface DarkDashboardProps {
  projects: Project[];
  onCreateProject: () => void;
  onEditProject: (project: Project) => void;
  onSelectProject: (project: Project) => void;
}

export function DarkDashboard({ projects, onCreateProject, onEditProject, onSelectProject }: DarkDashboardProps) {
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

  const getStatusBadge = (status: Project['lastRunStatus']) => {
    const statusConfig = {
      passed: { color: 'var(--landing-accent-primary)', bg: 'rgba(0, 217, 255, 0.1)' },
      failed: { color: '#ef4444', bg: 'rgba(239, 68, 68, 0.1)' },
      running: { color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.1)' },
      pending: { color: '#6b7280', bg: 'rgba(107, 114, 128, 0.1)' }
    };
    
    const config = statusConfig[status];
    
    return (
      <Badge 
        variant="outline" 
        className="capitalize border-0 font-medium"
        style={{ 
          color: config.color,
          backgroundColor: config.bg
        }}
      >
        {status}
      </Badge>
    );
  };

  const stats = {
    totalProjects: projects.length,
    passedProjects: projects.filter(p => p.lastRunStatus === 'passed').length,
    failedProjects: projects.filter(p => p.lastRunStatus === 'failed').length,
    totalTestCases: projects.reduce((acc, p) => acc + p.testcases.length, 0)
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight" style={{ color: 'var(--landing-text-primary)' }}>
            Testing Dashboard
          </h1>
          <p className="text-lg" style={{ color: 'var(--landing-text-secondary)' }}>
            Manage your testing projects and monitor execution performance
          </p>
        </div>
        <Button 
          onClick={onCreateProject} 
          className="gap-3 px-6 py-3 text-base font-semibold rounded-xl border-0"
          style={{ backgroundColor: 'var(--landing-accent-primary)', color: '#000000' }}
        >
          <Plus className="w-5 h-5" />
          Create New Project
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0" style={{ 
          backgroundColor: 'var(--landing-bg-elevated)', 
          borderColor: 'var(--landing-border-subtle)' 
        }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium" style={{ color: 'var(--landing-text-secondary)' }}>
                  Total Projects
                </p>
                <p className="text-3xl font-bold" style={{ color: 'var(--landing-text-primary)' }}>
                  {stats.totalProjects}
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'var(--landing-accent-soft)' }}>
                <Activity className="w-6 h-6" style={{ color: 'var(--landing-accent-primary)' }} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0" style={{ 
          backgroundColor: 'var(--landing-bg-elevated)', 
          borderColor: 'var(--landing-border-subtle)' 
        }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium" style={{ color: 'var(--landing-text-secondary)' }}>
                  Passed Tests
                </p>
                <p className="text-3xl font-bold" style={{ color: 'var(--landing-accent-primary)' }}>
                  {stats.passedProjects}
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(0, 217, 255, 0.1)' }}>
                <TrendingUp className="w-6 h-6" style={{ color: 'var(--landing-accent-primary)' }} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0" style={{ 
          backgroundColor: 'var(--landing-bg-elevated)', 
          borderColor: 'var(--landing-border-subtle)' 
        }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium" style={{ color: 'var(--landing-text-secondary)' }}>
                  Failed Tests
                </p>
                <p className="text-3xl font-bold" style={{ color: '#ef4444' }}>
                  {stats.failedProjects}
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)' }}>
                <Activity className="w-6 h-6" style={{ color: '#ef4444' }} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0" style={{ 
          backgroundColor: 'var(--landing-bg-elevated)', 
          borderColor: 'var(--landing-border-subtle)' 
        }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium" style={{ color: 'var(--landing-text-secondary)' }}>
                  Test Cases
                </p>
                <p className="text-3xl font-bold" style={{ color: 'var(--landing-text-primary)' }}>
                  {stats.totalTestCases}
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'var(--landing-accent-soft)' }}>
                <Activity className="w-6 h-6" style={{ color: 'var(--landing-accent-primary)' }} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Projects Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold" style={{ color: 'var(--landing-text-primary)' }}>
            Recent Projects
          </h2>
          {projects.length > 0 && (
            <Button 
              variant="outline" 
              className="border-0" 
              style={{ 
                backgroundColor: 'transparent',
                borderColor: 'var(--landing-border-subtle)',
                color: 'var(--landing-text-secondary)'
              }}
            >
              View All
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card 
              key={project.id} 
              className="cursor-pointer border-0 transition-all duration-300 hover:scale-[1.02] group"
              style={{ 
                backgroundColor: 'var(--landing-bg-elevated)', 
                borderColor: 'var(--landing-border-subtle)' 
              }}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div 
                      className="w-3 h-3 rounded-full mt-2 flex-shrink-0" 
                      style={{ backgroundColor: getStatusColor(project.lastRunStatus) }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        {project.type === 'mobile' ? (
                          <Smartphone className="w-5 h-5" style={{ color: 'var(--landing-accent-primary)' }} />
                        ) : (
                          <Monitor className="w-5 h-5" style={{ color: 'var(--landing-accent-primary)' }} />
                        )}
                        <Badge 
                          variant="outline" 
                          className="capitalize text-xs font-medium border-0"
                          style={{ 
                            color: 'var(--landing-accent-primary)',
                            backgroundColor: 'var(--landing-accent-soft)'
                          }}
                        >
                          {project.type}
                        </Badge>
                      </div>
                      <CardTitle className="truncate text-xl font-bold mb-2" style={{ color: 'var(--landing-text-primary)' }}>
                        {project.name}
                      </CardTitle>
                      <CardDescription className="line-clamp-2 text-base leading-relaxed" style={{ color: 'var(--landing-text-secondary)' }}>
                        {project.description}
                      </CardDescription>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="w-8 h-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ color: 'var(--landing-text-secondary)' }}
                      >
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent 
                      align="end"
                      className="border-0"
                      style={{ 
                        backgroundColor: 'var(--landing-bg-elevated)',
                        borderColor: 'var(--landing-border-subtle)'
                      }}
                    >
                      <DropdownMenuItem 
                        onClick={() => onSelectProject(project)}
                        style={{ color: 'var(--landing-text-primary)' }}
                      >
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => onEditProject(project)}
                        style={{ color: 'var(--landing-text-primary)' }}
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Project
                      </DropdownMenuItem>
                      <DropdownMenuSeparator style={{ backgroundColor: 'var(--landing-border-subtle)' }} />
                      <DropdownMenuItem className="text-red-400">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete Project
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              
              <CardContent onClick={() => onSelectProject(project)} className="pt-0">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    {getStatusBadge(project.lastRunStatus)}
                    <div className="text-sm" style={{ color: 'var(--landing-text-secondary)' }}>
                      <span className="font-semibold" style={{ color: 'var(--landing-text-primary)' }}>
                        {project.testcases.length}
                      </span> test cases
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 text-sm" style={{ color: 'var(--landing-text-secondary)' }}>
                    <Calendar className="w-4 h-4" />
                    {project.lastRunDate ? (
                      <span>Last run: {project.lastRunDate.toLocaleDateString()}</span>
                    ) : (
                      <span>Never run</span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {projects.length === 0 && (
            <Card 
              className="col-span-full border-2 border-dashed cursor-pointer transition-all duration-300 hover:border-opacity-50"
              style={{ 
                backgroundColor: 'transparent',
                borderColor: 'var(--landing-border-subtle)'
              }}
              onClick={onCreateProject}
            >
              <CardContent className="flex flex-col items-center justify-center py-16">
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6" style={{ backgroundColor: 'var(--landing-accent-soft)' }}>
                  <Plus className="w-10 h-10" style={{ color: 'var(--landing-accent-primary)' }} />
                </div>
                <h3 className="text-2xl font-bold mb-3" style={{ color: 'var(--landing-text-primary)' }}>
                  No projects yet
                </h3>
                <p className="text-center mb-6 max-w-sm leading-relaxed" style={{ color: 'var(--landing-text-secondary)' }}>
                  Get started by creating your first testing project. Build comprehensive test suites for mobile and web applications.
                </p>
                <Button 
                  className="gap-2 px-6 py-3 font-semibold rounded-xl border-0"
                  style={{ backgroundColor: 'var(--landing-accent-primary)', color: '#000000' }}
                >
                  <Plus className="w-4 h-4" />
                  Create Your First Project
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}