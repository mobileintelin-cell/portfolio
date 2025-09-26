import { TestTube, Shield, Clock, Mail } from 'lucide-react';

interface PasswordResetEmailProps {
  userEmail: string;
  resetCode: string;
  expirationTime: string;
  supportEmail?: string;
}

export function PasswordResetEmail({ 
  userEmail, 
  resetCode, 
  expirationTime,
  supportEmail = 'support@testflow.com' 
}: PasswordResetEmailProps) {
  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      maxWidth: '600px',
      margin: '0 auto',
      backgroundColor: '#F5EFE6',
      color: '#2d3748'
    }}>
      {/* Header */}
      <div style={{
        backgroundColor: '#6D94C5',
        padding: '24px',
        textAlign: 'center' as const
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          <TestTube style={{ width: '32px', height: '32px', color: 'white' }} />
          <h1 style={{ color: 'white', margin: '0', fontSize: '28px', fontWeight: '600' }}>
            TestFlow
          </h1>
        </div>
        <p style={{ color: '#CBDCEB', margin: '8px 0 0 0', fontSize: '16px' }}>
          Password Reset Request
        </p>
      </div>
      
      {/* Main Content */}
      <div style={{ backgroundColor: 'white', padding: '32px', margin: '0' }}>
        <div style={{ textAlign: 'center' as const, marginBottom: '24px' }}>
          <div style={{
            width: '64px',
            height: '64px',
            backgroundColor: '#CBDCEB',
            borderRadius: '50%',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '16px'
          }}>
            <Shield style={{ width: '32px', height: '32px', color: '#6D94C5' }} />
          </div>
          <h2 style={{ margin: '0 0 8px 0', fontSize: '24px', fontWeight: '600', color: '#2d3748' }}>
            Reset Your Password
          </h2>
          <p style={{ margin: '0', fontSize: '16px', color: '#718096' }}>
            We received a request to reset your password for your TestFlow account.
          </p>
        </div>

        <div style={{
          backgroundColor: '#F5EFE6',
          border: '2px dashed #6D94C5',
          borderRadius: '8px',
          padding: '24px',
          textAlign: 'center' as const,
          margin: '24px 0'
        }}>
          <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#718096' }}>
            Your verification code is:
          </p>
          <div style={{
            fontSize: '32px',
            fontWeight: '700',
            color: '#6D94C5',
            letterSpacing: '4px',
            fontFamily: 'monospace',
            margin: '8px 0'
          }}>
            {resetCode}
          </div>
          <p style={{ margin: '8px 0 0 0', fontSize: '12px', color: '#718096' }}>
            Enter this code in the TestFlow application to continue
          </p>
        </div>

        <div style={{
          backgroundColor: '#CBDCEB',
          borderRadius: '6px',
          padding: '16px',
          margin: '24px 0',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '12px'
        }}>
          <Clock style={{ 
            width: '20px', 
            height: '20px', 
            color: '#6D94C5', 
            marginTop: '2px',
            flexShrink: 0 
          }} />
          <div>
            <p style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: '600', color: '#2d3748' }}>
              Important Security Information
            </p>
            <p style={{ margin: '0', fontSize: '13px', color: '#4a5568', lineHeight: '1.4' }}>
              This verification code will expire at <strong>{expirationTime}</strong>. 
              If you didn't request this password reset, please ignore this email or contact our support team.
            </p>
          </div>
        </div>

        <div style={{ textAlign: 'center' as const, margin: '32px 0' }}>
          <a
            href="#"
            style={{
              display: 'inline-block',
              backgroundColor: '#6D94C5',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '6px',
              textDecoration: 'none',
              fontSize: '16px',
              fontWeight: '600'
            }}
          >
            Open TestFlow App
          </a>
        </div>

        <div style={{ borderTop: '1px solid #E8DFCA', paddingTop: '24px', margin: '32px 0 0 0' }}>
          <h3 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: '600', color: '#2d3748' }}>
            Security Tips:
          </h3>
          <ul style={{ margin: '0', padding: '0 0 0 20px', color: '#718096', fontSize: '14px' }}>
            <li style={{ marginBottom: '4px' }}>Never share your verification code with anyone</li>
            <li style={{ marginBottom: '4px' }}>TestFlow will never ask for your password via email</li>
            <li style={{ marginBottom: '4px' }}>Always access TestFlow through the official website or app</li>
          </ul>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        backgroundColor: '#E8DFCA',
        padding: '24px',
        textAlign: 'center' as const,
        borderTop: '1px solid #CBDCEB'
      }}>
        <div style={{ marginBottom: '16px' }}>
          <Mail style={{ 
            width: '20px', 
            height: '20px', 
            color: '#6D94C5',
            display: 'inline-block',
            marginRight: '8px',
            verticalAlign: 'middle'
          }} />
          <span style={{ fontSize: '14px', color: '#4a5568' }}>
            Need help? Contact us at{' '}
            <a href={`mailto:${supportEmail}`} style={{ color: '#6D94C5', textDecoration: 'none' }}>
              {supportEmail}
            </a>
          </span>
        </div>
        
        <div style={{ fontSize: '12px', color: '#718096', lineHeight: '1.4' }}>
          <p style={{ margin: '0 0 4px 0' }}>
            This email was sent to <strong>{userEmail}</strong>
          </p>
          <p style={{ margin: '0' }}>
            © 2024 TestFlow. All rights reserved.
          </p>
        </div>
        
        <div style={{ marginTop: '16px', fontSize: '11px', color: '#a0aec0' }}>
          <p style={{ margin: '0' }}>
            If you're having trouble with the button above, copy and paste the URL below into your web browser:
          </p>
          <p style={{ margin: '4px 0 0 0', wordBreak: 'break-all' as const }}>
            https://testflow.com/reset-password?code={resetCode}
          </p>
        </div>
      </div>
    </div>
  );
}

// Example usage component for preview/testing
export function PasswordResetEmailPreview() {
  const exampleProps = {
    userEmail: 'john.doe@example.com',
    resetCode: '123456',
    expirationTime: new Date(Date.now() + 5 * 60 * 1000).toLocaleString(), // 5 minutes from now
    supportEmail: 'support@testflow.com'
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f5f5f5' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Password Reset Email Preview</h2>
      <PasswordResetEmail {...exampleProps} />
    </div>
  );
}