import { useState } from 'react';
import { TestTube, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { Alert, AlertDescription } from './ui/alert';
import { Link } from 'react-router-dom';

interface DarkLoginProps {
  onLogin: (user: { name: string; email: string; avatar: string }) => void;
}

export function DarkLogin({ onLogin }: DarkLoginProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    rememberMe: false
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Basic validation
    if (!formData.email || !formData.password) {
      setError('Please fill in all required fields');
      setIsLoading(false);
      return;
    }

    if (isSignUp) {
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        setIsLoading(false);
        return;
      }
      if (!formData.firstName || !formData.lastName) {
        setError('Please provide your full name');
        setIsLoading(false);
        return;
      }
    }

    // Simulate API call
    setTimeout(() => {
      // Mock successful login/signup
      const user = {
        name: isSignUp ? `${formData.firstName} ${formData.lastName}` : 'John Developer',
        email: formData.email,
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
      };
      
      onLogin(user);
      setIsLoading(false);
    }, 1500);
  };

  const handleInputChange = (field: keyof typeof formData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) setError('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: 'var(--landing-bg-base)' }}>
      {/* Background with particles effect */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-1 h-1 rounded-full animate-pulse" style={{ backgroundColor: 'var(--landing-particle-color)' }}></div>
          <div className="absolute top-1/3 right-1/3 w-1 h-1 rounded-full animate-pulse delay-1000" style={{ backgroundColor: 'var(--landing-particle-color)' }}></div>
          <div className="absolute bottom-1/4 left-1/3 w-1 h-1 rounded-full animate-pulse delay-2000" style={{ backgroundColor: 'var(--landing-particle-color)' }}></div>
          <div className="absolute bottom-1/3 right-1/4 w-1 h-1 rounded-full animate-pulse delay-3000" style={{ backgroundColor: 'var(--landing-particle-color)' }}></div>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-md space-y-8">
        {/* Back to Landing */}
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2 transition-colors hover:text-white" style={{ color: 'var(--landing-text-secondary)' }}>
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
        </div>

        {/* Logo and Header */}
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'var(--landing-accent-soft)' }}>
              <TestTube className="w-6 h-6" style={{ color: 'var(--landing-accent-primary)' }} />
            </div>
            <span className="text-3xl font-bold tracking-tight" style={{ color: 'var(--landing-text-primary)' }}>
              MMO2025
            </span>
          </div>
          <div className="space-y-3">
            <h1 className="text-3xl font-bold tracking-tight" style={{ color: 'var(--landing-text-primary)' }}>
              {isSignUp ? 'Join MMO2025' : 'Welcome Back'}
            </h1>
            <p className="text-lg leading-relaxed" style={{ color: 'var(--landing-text-secondary)' }}>
              {isSignUp 
                ? 'Join our Vietnamese development team' 
                : 'Continue your development journey'
              }
            </p>
          </div>
        </div>

        <Card className="border-0 backdrop-blur-xl" style={{ 
          backgroundColor: 'rgba(17, 17, 17, 0.8)', 
          borderColor: 'var(--landing-border-subtle)' 
        }}>
          <CardHeader className="space-y-3 pb-6">
            <CardTitle className="text-2xl font-bold" style={{ color: 'var(--landing-text-primary)' }}>
              {isSignUp ? 'Create Account' : 'Sign In'}
            </CardTitle>
            <CardDescription className="text-base" style={{ color: 'var(--landing-text-secondary)' }}>
              {isSignUp 
                ? 'Enter your information to get started' 
                : 'Access your testing dashboard'
              }
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {error && (
              <Alert variant="destructive" className="border-red-500/20 bg-red-500/10">
                <AlertDescription style={{ color: '#ef4444' }}>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {isSignUp && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <Label htmlFor="firstName" className="text-sm font-medium" style={{ color: 'var(--landing-text-primary)' }}>
                      First name
                    </Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      placeholder="John"
                      required={isSignUp}
                      className="h-12 border-0 text-white placeholder:text-gray-500"
                      style={{ backgroundColor: 'var(--landing-bg-base)' }}
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="lastName" className="text-sm font-medium" style={{ color: 'var(--landing-text-primary)' }}>
                      Last name
                    </Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      placeholder="Doe"
                      required={isSignUp}
                      className="h-12 border-0 text-white placeholder:text-gray-500"
                      style={{ backgroundColor: 'var(--landing-bg-base)' }}
                    />
                  </div>
                </div>
              )}

              <div className="space-y-3">
                <Label htmlFor="email" className="text-sm font-medium" style={{ color: 'var(--landing-text-primary)' }}>
                  Email address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="john@example.com"
                  required
                  className="h-12 border-0 text-white placeholder:text-gray-500"
                  style={{ backgroundColor: 'var(--landing-bg-base)' }}
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="password" className="text-sm font-medium" style={{ color: 'var(--landing-text-primary)' }}>
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    placeholder="Enter your password"
                    required
                    className="h-12 border-0 text-white placeholder:text-gray-500 pr-12"
                    style={{ backgroundColor: 'var(--landing-bg-base)' }}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-4 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ color: 'var(--landing-text-secondary)' }}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              {isSignUp && (
                <div className="space-y-3">
                  <Label htmlFor="confirmPassword" className="text-sm font-medium" style={{ color: 'var(--landing-text-primary)' }}>
                    Confirm password
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    placeholder="Confirm your password"
                    required={isSignUp}
                    className="h-12 border-0 text-white placeholder:text-gray-500"
                    style={{ backgroundColor: 'var(--landing-bg-base)' }}
                  />
                </div>
              )}

              {!isSignUp && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="rememberMe"
                      checked={formData.rememberMe}
                      onCheckedChange={(checked) => handleInputChange('rememberMe', checked as boolean)}
                      className="border-gray-600"
                    />
                    <Label htmlFor="rememberMe" className="text-sm font-medium" style={{ color: 'var(--landing-text-secondary)' }}>
                      Remember me
                    </Label>
                  </div>
                  <Link
                    to="/forgot-password"
                    className="text-sm font-medium transition-colors hover:text-white"
                    style={{ color: 'var(--landing-accent-primary)' }}
                  >
                    Forgot password?
                  </Link>
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full h-12 text-base font-semibold rounded-xl border-0" 
                disabled={isLoading}
                style={{ backgroundColor: 'var(--landing-accent-primary)', color: '#000000' }}
              >
                {isLoading ? (
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    {isSignUp ? 'Creating account...' : 'Signing in...'}
                  </div>
                ) : (
                  isSignUp ? 'Create Account' : 'Sign In'
                )}
              </Button>
            </form>

            <div className="text-center">
              <span className="text-sm" style={{ color: 'var(--landing-text-secondary)' }}>
                {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
              </span>
              <Button
                type="button"
                variant="link"
                className="px-0 h-auto text-sm font-medium"
                style={{ color: 'var(--landing-accent-primary)' }}
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setError('');
                  setFormData({
                    email: '',
                    password: '',
                    confirmPassword: '',
                    firstName: '',
                    lastName: '',
                    rememberMe: false
                  });
                }}
              >
                {isSignUp ? 'Sign in instead' : 'Create account'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Demo Credentials */}
        <Card className="border-0 backdrop-blur-xl" style={{ 
          backgroundColor: 'rgba(26, 26, 26, 0.6)', 
          borderColor: 'var(--landing-border-subtle)' 
        }}>
          <CardHeader className="pb-4">
            <CardTitle className="text-sm font-semibold" style={{ color: 'var(--landing-text-primary)' }}>
              Demo Access
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-sm space-y-2">
              <div style={{ color: 'var(--landing-text-secondary)' }}>
                <span className="font-medium" style={{ color: 'var(--landing-text-primary)' }}>Email:</span> demo@mmo2025.com
              </div>
              <div style={{ color: 'var(--landing-text-secondary)' }}>
                <span className="font-medium" style={{ color: 'var(--landing-text-primary)' }}>Password:</span> demo123
              </div>
            </div>
            <p className="text-xs" style={{ color: 'var(--landing-text-secondary)' }}>
              Use these credentials to explore the platform features.
            </p>
          </CardContent>
        </Card>

        <div className="text-center text-sm" style={{ color: 'var(--landing-text-secondary)' }}>
          By continuing, you agree to our{' '}
          <Link 
            to="/terms"
            className="font-medium transition-colors hover:text-white"
            style={{ color: 'var(--landing-accent-primary)' }}
          >
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link 
            to="/privacy"
            className="font-medium transition-colors hover:text-white"
            style={{ color: 'var(--landing-accent-primary)' }}
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  );
}