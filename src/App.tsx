import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { DarkLogin } from './components/DarkLogin';
import { DarkTopNavigation } from './components/DarkTopNavigation';
import { DarkSidebarNav } from './components/DarkSidebarNav';
import { DarkDashboard } from './components/DarkDashboard';
import { ProjectForm } from './components/ProjectForm';
import { TestCaseManager } from './components/TestCaseManager';
import { TestRunner } from './components/TestRunner';
import { Results } from './components/Results';
import { Settings } from './components/Settings';
import { TermsOfService } from './components/TermsOfService';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { ForgotPassword } from './components/ForgotPassword';
import { AnimatedLandingPage } from './components/AnimatedLandingPage';

export type Project = {
  id: string;
  name: string;
  description: string;
  type: 'web' | 'mobile';
  lastRunStatus: 'passed' | 'failed' | 'pending' | 'running';
  lastRunDate?: Date;
  credentials: {
    username: string;
    password: string;
    smsOtp: string;
    loginGuide: string;
  };
  files: File[];
  testcases: TestCase[];
};

export type TestCase = {
  id: string;
  jiraTask: string;
  name: string;
  prerequisites: string;
  steps: string;
  inputData: string;
  expectedResult: string;
  actualResult: string;
  status: 'pass' | 'fail' | 'pending';
  evidence: File[];
};

export type User = {
  name: string;
  email: string;
  avatar: string;
};

// Auth context
const AuthContext = React.createContext<{
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}>({
  user: null,
  login: () => {},
  logout: () => {}
});

// Protected Route Component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = localStorage.getItem('mmo2025_authenticated') === 'true';
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
}

// Public Route Component (redirects if authenticated) - only for login page
function LoginPublicRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = localStorage.getItem('mmo2025_authenticated') === 'true';
  
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
}

// App Context Provider
function AppContextProvider({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('mmo2025_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      name: 'E-commerce Mobile App',
      description: 'Testing suite for the main shopping application',
      type: 'mobile',
      lastRunStatus: 'passed',
      lastRunDate: new Date('2024-01-15'),
      credentials: {
        username: 'test@example.com',
        password: 'testpass123',
        smsOtp: '+1234567890',
        loginGuide: 'Enter credentials and wait for SMS OTP verification'
      },
      files: [],
      testcases: [
        {
          id: 'tc-1',
          jiraTask: 'SHOP-123',
          name: 'User Login Flow',
          prerequisites: 'User has valid credentials',
          steps: '1. Open app\n2. Enter username\n3. Enter password\n4. Tap login',
          inputData: 'username: test@example.com, password: testpass123',
          expectedResult: 'User successfully logs in and reaches dashboard',
          actualResult: 'Login successful, dashboard loaded',
          status: 'pass',
          evidence: []
        }
      ]
    },
    {
      id: '2',
      name: 'Admin Dashboard Web',
      description: 'Web-based admin panel testing',
      type: 'web',
      lastRunStatus: 'failed',
      lastRunDate: new Date('2024-01-14'),
      credentials: {
        username: 'admin@company.com',
        password: 'adminpass456',
        smsOtp: '',
        loginGuide: 'Login using admin credentials, no OTP required'
      },
      files: [],
      testcases: []
    }
  ]);

  // Load selected project from URL params
  useEffect(() => {
    const pathSegments = location.pathname.split('/');
    const projectIndex = pathSegments.findIndex(segment => segment === 'project');
    
    if (projectIndex !== -1 && pathSegments[projectIndex + 1]) {
      const projectId = pathSegments[projectIndex + 1];
      if (projectId !== 'new') {
        const project = projects.find(p => p.id === projectId);
        if (project && project.id !== selectedProject?.id) {
          setSelectedProject(project);
        }
      }
    }
  }, [location.pathname, projects, selectedProject?.id]);

  const handleLogin = (userData: User) => {
    setUser(userData);
    sessionStorage.setItem('proper_auth_flow', 'true');
    localStorage.setItem('mmo2025_authenticated', 'true');
    localStorage.setItem('mmo2025_user', JSON.stringify(userData));
    navigate('/dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setSelectedProject(null);
    localStorage.removeItem('mmo2025_authenticated');
    localStorage.removeItem('mmo2025_user');
    sessionStorage.removeItem('proper_auth_flow');
    navigate('/');
  };

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
  };

  const handleCreateProject = (project: Omit<Project, 'id'>) => {
    const newProject: Project = {
      ...project,
      id: Date.now().toString(),
    };
    setProjects([...projects, newProject]);
    navigate('/dashboard');
  };

  const handleUpdateProject = (project: Project) => {
    setProjects(projects.map(p => p.id === project.id ? project : p));
    if (selectedProject?.id === project.id) {
      setSelectedProject(project);
    }
  };

  const contextValue = {
    user,
    selectedProject,
    projects,
    onLogin: handleLogin,
    onLogout: handleLogout,
    onSelectProject: handleSelectProject,
    onCreateProject: handleCreateProject,
    onUpdateProject: handleUpdateProject
  };

  return (
    <div data-app-context={JSON.stringify(contextValue)}>
      {children}
    </div>
  );
}

// Hook to get app context
function useAppContext() {
  const element = document.querySelector('[data-app-context]');
  if (element) {
    return JSON.parse(element.getAttribute('data-app-context') || '{}');
  }
  return {};
}

// Layout component for authenticated pages
function AppLayout({ children }: { children: React.ReactNode }) {
  const context = useAppContext();
  
  if (!context.user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="h-screen flex flex-col" style={{ backgroundColor: 'var(--landing-bg-base)' }}>
      <DarkTopNavigation
        user={context.user}
        selectedProject={context.selectedProject}
        projects={context.projects}
        onSelectProject={context.onSelectProject}
        onLogout={context.onLogout}
      />
      
      <div className="flex flex-1 overflow-hidden">
        <DarkSidebarNav selectedProject={context.selectedProject} />
        
        <main className="flex-1 overflow-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

// Page Components
function LoginPage() {
  const navigate = useNavigate();
  
  const handleLogin = (userData: User) => {
    sessionStorage.setItem('proper_auth_flow', 'true');
    localStorage.setItem('mmo2025_authenticated', 'true');
    localStorage.setItem('mmo2025_user', JSON.stringify(userData));
    navigate('/dashboard');
    window.location.reload(); // Refresh to update context
  };
  
  return <DarkLogin onLogin={handleLogin} />;
}

function DashboardPage() {
  const navigate = useNavigate();
  const context = useAppContext();

  const handleCreateProject = () => {
    navigate('/project/new');
  };

  const handleEditProject = (project: Project) => {
    navigate(`/project/${project.id}/edit`);
  };

  return (
    <DarkDashboard
      projects={context.projects || []}
      onCreateProject={handleCreateProject}
      onEditProject={handleEditProject}
      onSelectProject={context.onSelectProject}
    />
  );
}

function ProjectFormPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const context = useAppContext();
  
  const isEdit = id !== 'new';
  const editingProject = isEdit ? context.projects?.find((p: Project) => p.id === id) : null;

  const handleSave = (project: Project | Omit<Project, 'id'>) => {
    if (isEdit) {
      context.onUpdateProject?.(project as Project);
    } else {
      const newProject: Project = {
        ...(project as Omit<Project, 'id'>),
        id: Date.now().toString(),
      };
      context.onCreateProject?.(newProject);
    }
    navigate('/dashboard');
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <ProjectForm
      project={editingProject}
      onSave={handleSave}
      onCancel={handleCancel}
    />
  );
}

function MobileTestingPage() {
  const context = useAppContext();
  
  return (
    <TestCaseManager
      projects={context.projects?.filter((p: Project) => p.type === 'mobile') || []}
      selectedProject={context.selectedProject}
      onSelectProject={context.onSelectProject}
      onUpdateProject={context.onUpdateProject}
    />
  );
}

function WebTestingPage() {
  const context = useAppContext();
  
  return (
    <TestCaseManager
      projects={context.projects?.filter((p: Project) => p.type === 'web') || []}
      selectedProject={context.selectedProject}
      onSelectProject={context.onSelectProject}
      onUpdateProject={context.onUpdateProject}
    />
  );
}

function TestRunnerPage() {
  const context = useAppContext();
  
  return (
    <TestRunner
      project={context.selectedProject}
      onUpdateProject={context.onUpdateProject}
    />
  );
}

function ResultsPage() {
  const context = useAppContext();
  
  return <Results projects={context.projects || []} />;
}

function SettingsPage() {
  const navigate = useNavigate();
  
  const handleNavigate = (page: string) => {
    navigate(`/${page}`);
  };
  
  return <Settings onNavigate={handleNavigate} />;
}

function TermsPage() {
  const navigate = useNavigate();
  
  const handleBack = () => {
    navigate(-1);
  };
  
  return <TermsOfService onBack={handleBack} />;
}

function PrivacyPage() {
  const navigate = useNavigate();
  
  const handleBack = () => {
    navigate(-1);
  };
  
  return <PrivacyPolicy onBack={handleBack} />;
}

function ForgotPasswordPage() {
  return <ForgotPassword />;
}

function LandingPageComponent() {
  // Clear any stale authentication when landing on homepage
  React.useEffect(() => {
    // Only clear if we're on the root path and not authenticated through proper flow
    if (window.location.pathname === '/' && !sessionStorage.getItem('proper_auth_flow')) {
      localStorage.removeItem('mmo2025_authenticated');
      localStorage.removeItem('mmo2025_user');
    }
  }, []);
  
  return <AnimatedLandingPage />;
}

export default function App() {
  // Debug current route
  React.useEffect(() => {
    console.log('Current URL:', window.location.href);
    console.log('Auth state:', localStorage.getItem('mmo2025_authenticated'));
  }, []);

  return (
    <BrowserRouter>
      <LanguageProvider>
        <AppContextProvider>
        <Routes>
          {/* Landing Page */}
          <Route path="/" element={<LandingPageComponent />} />
          
          {/* Public Routes */}
          <Route path="/login" element={
            <LoginPublicRoute>
              <LoginPage />
            </LoginPublicRoute>
          } />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          
          {/* Protected Routes */}
          <Route path="/app" element={
            <ProtectedRoute>
              <Navigate to="/dashboard" replace />
            </ProtectedRoute>
          } />
          
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <AppLayout>
                <DashboardPage />
              </AppLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/project/:id" element={
            <ProtectedRoute>
              <AppLayout>
                <ProjectFormPage />
              </AppLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/project/:id/edit" element={
            <ProtectedRoute>
              <AppLayout>
                <ProjectFormPage />
              </AppLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/mobile-testing" element={
            <ProtectedRoute>
              <AppLayout>
                <MobileTestingPage />
              </AppLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/web-testing" element={
            <ProtectedRoute>
              <AppLayout>
                <WebTestingPage />
              </AppLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/test-runner" element={
            <ProtectedRoute>
              <AppLayout>
                <TestRunnerPage />
              </AppLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/results" element={
            <ProtectedRoute>
              <AppLayout>
                <ResultsPage />
              </AppLayout>
            </ProtectedRoute>
          } />
          
          <Route path="/settings" element={
            <ProtectedRoute>
              <AppLayout>
                <SettingsPage />
              </AppLayout>
            </ProtectedRoute>
          } />
          
          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        </AppContextProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}