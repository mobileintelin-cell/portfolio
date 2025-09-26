import { ArrowLeft, TestTube, Scale, Shield, Users, FileText, AlertTriangle } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';

interface TermsOfServiceProps {
  onBack: () => void;
}

export function TermsOfService({ onBack }: TermsOfServiceProps) {
  const lastUpdated = "January 15, 2024";

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            onClick={onBack}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Login
          </Button>
        </div>

        <div className="text-center space-y-4 mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <TestTube className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-3xl font-semibold">TestFlow</h1>
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl">Terms of Service</h2>
            <p className="text-muted-foreground">
              Last updated: {lastUpdated}
            </p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Scale className="w-5 h-5 text-primary" />
              <CardTitle>Legal Agreement</CardTitle>
            </div>
            <CardDescription>
              Please read these Terms of Service carefully before using TestFlow
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                <div className="space-y-2">
                  <h4 className="font-medium text-amber-800 dark:text-amber-200">
                    Important Notice
                  </h4>
                  <p className="text-sm text-amber-700 dark:text-amber-300">
                    By accessing and using TestFlow, you agree to be bound by these Terms of Service. 
                    If you do not agree to these terms, please do not use our service.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 1: Acceptance of Terms */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-primary" />
              <CardTitle>1. Acceptance of Terms</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              These Terms of Service ("Terms") govern your use of TestFlow ("Service"), 
              a comprehensive testing platform for QA teams provided by TestFlow Inc. ("Company", "we", "us").
            </p>
            <p>
              By creating an account, accessing, or using our Service, you agree to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Be bound by these Terms and our Privacy Policy</li>
              <li>Comply with all applicable laws and regulations</li>
              <li>Use the Service responsibly and ethically</li>
              <li>Accept any updates or modifications to these Terms</li>
            </ul>
          </CardContent>
        </Card>

        {/* Section 2: Service Description */}
        <Card>
          <CardHeader>
            <CardTitle>2. Service Description</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              TestFlow provides a platform for quality assurance teams to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Manage testing projects for mobile and web applications</li>
              <li>Create, organize, and execute test cases</li>
              <li>Track testing progress and generate reports</li>
              <li>Collaborate with team members on testing workflows</li>
              <li>Integrate with third-party tools like Jira</li>
              <li>Upload and manage test files (APK/IPA files)</li>
            </ul>
            <p>
              We reserve the right to modify, suspend, or discontinue any part of the Service 
              at any time with or without notice.
            </p>
          </CardContent>
        </Card>

        {/* Section 3: User Accounts */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-primary" />
              <CardTitle>3. User Accounts and Responsibilities</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Account Creation</h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>You must provide accurate and complete information</li>
                <li>You are responsible for maintaining account security</li>
                <li>You must be at least 18 years old to create an account</li>
                <li>One person or entity per account</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Account Security</h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>Keep your password secure and confidential</li>
                <li>Notify us immediately of any unauthorized access</li>
                <li>You are liable for all activities under your account</li>
                <li>Do not share account credentials with others</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-2">Prohibited Activities</h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>Using the Service for illegal or unauthorized purposes</li>
                <li>Attempting to gain unauthorized access to our systems</li>
                <li>Uploading malicious files or content</li>
                <li>Interfering with other users' access to the Service</li>
                <li>Reverse engineering or attempting to extract source code</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Section 4: Data and Privacy */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-primary" />
              <CardTitle>4. Data and Privacy</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Your Data</h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>You retain ownership of your testing data and files</li>
                <li>We may access your data to provide support or improve services</li>
                <li>You are responsible for backing up your important data</li>
                <li>We are not liable for data loss due to user error</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-2">Data Security</h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>We implement industry-standard security measures</li>
                <li>Data is encrypted in transit and at rest</li>
                <li>Regular security audits and monitoring</li>
                <li>Immediate notification of any data breaches</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-2">Sensitive Information</h4>
              <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <p className="text-sm text-red-700 dark:text-red-300">
                  <strong>Important:</strong> TestFlow is not designed for collecting, storing, or processing 
                  Personally Identifiable Information (PII) or other sensitive personal data. 
                  Do not upload or enter such information into the platform.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 5: Intellectual Property */}
        <Card>
          <CardHeader>
            <CardTitle>5. Intellectual Property</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Our Rights</h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>TestFlow and all related trademarks are our property</li>
                <li>The platform design, features, and functionality are protected</li>
                <li>You may not copy, modify, or create derivative works</li>
                <li>All rights not expressly granted are reserved</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-2">Your Rights</h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>You retain ownership of your original content and data</li>
                <li>You grant us a license to use your data to provide the Service</li>
                <li>You warrant that your content doesn't infringe others' rights</li>
                <li>You may export your data at any time</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Section 6: Payments and Refunds */}
        <Card>
          <CardHeader>
            <CardTitle>6. Payments and Billing</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Subscription Plans</h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>Various subscription tiers with different features</li>
                <li>Billing cycles may be monthly or annual</li>
                <li>Prices are subject to change with 30 days notice</li>
                <li>Payment is due in advance for each billing period</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-2">Refund Policy</h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>Refunds are available within 30 days of purchase</li>
                <li>Refunds are prorated based on unused service time</li>
                <li>Refund requests must be submitted through support</li>
                <li>Refunds are processed within 5-10 business days</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Section 7: Limitation of Liability */}
        <Card>
          <CardHeader>
            <CardTitle>7. Limitation of Liability</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <p className="text-sm text-blue-700 dark:text-blue-300">
                <strong>Service Disclaimer:</strong> The Service is provided "as is" without warranties of any kind. 
                We do not guarantee uninterrupted service or error-free operation.
              </p>
            </div>

            <div>
              <h4 className="font-medium mb-2">Limitations</h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>We are not liable for indirect, incidental, or consequential damages</li>
                <li>Our total liability is limited to the amount paid in the last 12 months</li>
                <li>We are not responsible for third-party service interruptions</li>
                <li>Users are responsible for their own testing methodologies and results</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Section 8: Termination */}
        <Card>
          <CardHeader>
            <CardTitle>8. Termination</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">By You</h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>You may cancel your account at any time</li>
                <li>Cancellation takes effect at the end of the current billing period</li>
                <li>You can export your data before cancellation</li>
                <li>Refunds may be available per our refund policy</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-2">By Us</h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>We may suspend or terminate accounts for Terms violations</li>
                <li>30 days notice for termination without cause</li>
                <li>Immediate termination for security or legal reasons</li>
                <li>Data export period of 30 days after termination</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Section 9: Changes to Terms */}
        <Card>
          <CardHeader>
            <CardTitle>9. Changes to Terms</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              We may update these Terms from time to time. When we make changes:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>We will notify you via email or platform notification</li>
              <li>Changes take effect 30 days after notification</li>
              <li>Continued use constitutes acceptance of new Terms</li>
              <li>You may terminate your account if you disagree with changes</li>
            </ul>
          </CardContent>
        </Card>

        {/* Section 10: Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>10. Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              For questions about these Terms of Service, please contact us:
            </p>
            <div className="bg-muted/50 rounded-lg p-4 space-y-2">
              <div><strong>Email:</strong> legal@testflow.com</div>
              <div><strong>Support:</strong> support@testflow.com</div>
              <div><strong>Address:</strong> TestFlow Inc., 123 Tech Street, San Francisco, CA 94105</div>
              <div><strong>Phone:</strong> +1 (555) 123-4567</div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground py-8">
          <p>
            © 2024 TestFlow Inc. All rights reserved. These Terms of Service are effective as of {lastUpdated}.
          </p>
        </div>
      </div>
    </div>
  );
}