import { Plus, Calendar, MoreVertical, Edit, Trash2 } from 'lucide-react';
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

interface DashboardProps {
  projects: Project[];
  onCreateProject: () => void;
  onEditProject: (project: Project) => void;
  onSelectProject: (project: Project) => void;
}

export function Dashboard({ projects, onCreateProject, onEditProject, onSelectProject }: DashboardProps) {
  const getStatusColor = (status: Project['lastRunStatus']) => {
    switch (status) {
      case 'passed':
        return 'bg-green-500';
      case 'failed':
        return 'bg-red-500';
      case 'running':
        return 'bg-blue-500';
      default:
        return 'bg-gray-400';
    }
  };

  const getStatusBadge = (status: Project['lastRunStatus']) => {
    const variants = {
      passed: 'default',
      failed: 'destructive',
      running: 'secondary',
      pending: 'outline'
    } as const;
    
    return (
      <Badge variant={variants[status]} className="capitalize">
        {status}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Testing Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your testing projects and monitor test execution
          </p>
        </div>
        <Button onClick={onCreateProject} className="gap-2">
          <Plus className="w-4 h-4" />
          Create New Project
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className={`w-3 h-3 rounded-full mt-1 ${getStatusColor(project.lastRunStatus)}`} />
                  <div className="flex-1 min-w-0">
                    <CardTitle className="truncate">{project.name}</CardTitle>
                    <CardDescription className="line-clamp-2 mt-1">
                      {project.description}
                    </CardDescription>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onSelectProject(project)}>
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onEditProject(project)}>
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Project
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Project
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            
            <CardContent onClick={() => onSelectProject(project)}>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="capitalize">
                    {project.type}
                  </Badge>
                  {getStatusBadge(project.lastRunStatus)}
                </div>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  {project.lastRunDate ? (
                    <span>Last run: {project.lastRunDate.toLocaleDateString()}</span>
                  ) : (
                    <span>Never run</span>
                  )}
                </div>
                
                <div className="text-sm">
                  <span className="font-medium">{project.testcases.length}</span>
                  <span className="text-muted-foreground"> test cases</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {projects.length === 0 && (
          <Card className="col-span-full">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                <Plus className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3>No projects yet</h3>
              <p className="text-muted-foreground text-center mb-4">
                Get started by creating your first testing project
              </p>
              <Button onClick={onCreateProject}>Create Project</Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}