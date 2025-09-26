import { useState } from 'react';
import { ArrowLeft, Mail, CheckCircle, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Alert, AlertDescription } from './ui/alert';
import { toast } from 'sonner@2.0.3';

interface ForgotPasswordProps {
  onBackToLogin?: () => void;
}

type ForgotPasswordStep = 'email' | 'code' | 'password' | 'success';

export function ForgotPassword({ onBackToLogin }: ForgotPasswordProps) {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<ForgotPasswordStep>('email');
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState(0);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    // Simulate API call to send reset code
    setTimeout(() => {
      setCurrentStep('code');
      setTimeLeft(300); // 5 minutes
      setIsLoading(false);
      toast.success('Verification code sent to your email');
      
      // Start countdown timer
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }, 1500);
  };

  const handleCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (verificationCode.length !== 6) {
      setError('Please enter a valid 6-digit verification code');
      setIsLoading(false);
      return;
    }

    // Simulate API call to verify code
    setTimeout(() => {
      // Mock code validation (in real app, this would be server-side)
      if (verificationCode === '123456') {
        setCurrentStep('password');
        setIsLoading(false);
        toast.success('Code verified successfully');
      } else {
        setError('Invalid verification code. Please try again.');
        setIsLoading(false);
      }
    }, 1000);
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Password validation
    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters long');
      setIsLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    // Simulate API call to reset password
    setTimeout(() => {
      setCurrentStep('success');
      setIsLoading(false);
      toast.success('Password reset successfully');
    }, 1500);
  };

  const handleResendCode = async () => {
    setIsLoading(true);
    
    // Simulate API call to resend code
    setTimeout(() => {
      setTimeLeft(300); // Reset timer to 5 minutes
      setIsLoading(false);
      toast.success('New verification code sent');
      
      // Restart countdown timer
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }, 1000);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const renderEmailStep = () => (
    <>
      <CardHeader className="space-y-1">
        <CardTitle>Reset Password</CardTitle>
        <CardDescription>
          Enter your email address and we'll send you a verification code to reset your password
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleEmailSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError('');
              }}
              placeholder="Enter your email address"
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-background border-t-transparent rounded-full animate-spin" />
                Sending code...
              </div>
            ) : (
              <>
                <Mail className="w-4 h-4 mr-2" />
                Send verification code
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </>
  );

  const renderCodeStep = () => (
    <>
      <CardHeader className="space-y-1">
        <CardTitle>Enter Verification Code</CardTitle>
        <CardDescription>
          We've sent a 6-digit verification code to {email}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleCodeSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="code">Verification code</Label>
            <Input
              id="code"
              type="text"
              value={verificationCode}
              onChange={(e) => {
                // Only allow numbers and limit to 6 digits
                const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                setVerificationCode(value);
                if (error) setError('');
              }}
              placeholder="Enter 6-digit code"
              maxLength={6}
              className="text-center text-lg tracking-wider"
              required
            />
            <div className="text-sm text-muted-foreground text-center">
              For demo purposes, use code: <strong>123456</strong>
            </div>
          </div>

          {timeLeft > 0 ? (
            <div className="text-center text-sm text-muted-foreground">
              Code expires in {formatTime(timeLeft)}
            </div>
          ) : (
            <div className="text-center">
              <Button
                type="button"
                variant="link"
                onClick={handleResendCode}
                disabled={isLoading}
                className="text-sm"
              >
                Didn't receive the code? Resend
              </Button>
            </div>
          )}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-background border-t-transparent rounded-full animate-spin" />
                Verifying...
              </div>
            ) : (
              'Verify code'
            )}
          </Button>
        </form>
      </CardContent>
    </>
  );

  const renderPasswordStep = () => (
    <>
      <CardHeader className="space-y-1">
        <CardTitle>Create New Password</CardTitle>
        <CardDescription>
          Enter a new password for your account
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="newPassword">New password</Label>
            <Input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
                if (error) setError('');
              }}
              placeholder="Enter new password"
              required
            />
            <div className="text-xs text-muted-foreground">
              Password must be at least 8 characters long
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (error) setError('');
              }}
              placeholder="Confirm new password"
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-background border-t-transparent rounded-full animate-spin" />
                Updating password...
              </div>
            ) : (
              'Reset password'
            )}
          </Button>
        </form>
      </CardContent>
    </>
  );

  const renderSuccessStep = () => (
    <>
      <CardHeader className="space-y-1 text-center">
        <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircle className="w-6 h-6 text-green-600" />
        </div>
        <CardTitle>Password Reset Successfully</CardTitle>
        <CardDescription>
          Your password has been updated. You can now sign in with your new password.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={() => onBackToLogin ? onBackToLogin() : navigate('/login')} className="w-full">
          Back to sign in
        </Button>
      </CardContent>
    </>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/20 p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Mail className="w-5 h-5 text-primary" />
            </div>
            <span className="text-xl font-semibold">Password Recovery</span>
          </div>
        </div>

        <Card>
          {currentStep === 'email' && renderEmailStep()}
          {currentStep === 'code' && renderCodeStep()}
          {currentStep === 'password' && renderPasswordStep()}
          {currentStep === 'success' && renderSuccessStep()}
        </Card>

        {currentStep !== 'success' && (
          <div className="text-center">
            <Button
              variant="ghost"
              onClick={() => onBackToLogin ? onBackToLogin() : navigate('/login')}
              className="gap-2 text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to sign in
            </Button>
          </div>
        )}

        {/* Progress indicator */}
        {currentStep !== 'success' && (
          <div className="flex justify-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${
              currentStep === 'email' ? 'bg-primary' : 
              ['code', 'password'].includes(currentStep) ? 'bg-primary' : 'bg-muted'
            }`} />
            <div className={`w-2 h-2 rounded-full ${
              currentStep === 'code' ? 'bg-primary' : 
              currentStep === 'password' ? 'bg-primary' : 'bg-muted'
            }`} />
            <div className={`w-2 h-2 rounded-full ${
              currentStep === 'password' ? 'bg-primary' : 'bg-muted'
            }`} />
          </div>
        )}

        <div className="text-center text-xs text-muted-foreground">
          Need help?{' '}
          <Button variant="link" className="px-0 text-xs h-auto">
            Contact Support
          </Button>
        </div>
      </div>
    </div>
  );
}