import { ArrowLeft, TestTube, Shield, Eye, Lock, Database, Globe, Cookie, Users2, AlertTriangle } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

interface PrivacyPolicyProps {
  onBack: () => void;
}

export function PrivacyPolicy({ onBack }: PrivacyPolicyProps) {
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
            <h2 className="text-2xl">Privacy Policy</h2>
            <p className="text-muted-foreground">
              Last updated: {lastUpdated}
            </p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-primary" />
              <CardTitle>Your Privacy Matters</CardTitle>
            </div>
            <CardDescription>
              We are committed to protecting your privacy and being transparent about how we handle data
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div className="space-y-2">
                  <h4 className="font-medium text-green-800 dark:text-green-200">
                    Privacy First Approach
                  </h4>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    TestFlow is designed with privacy by design principles. We collect only what's necessary 
                    to provide our testing services and protect your data with industry-standard security measures.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 1: Information We Collect */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Database className="w-5 h-5 text-primary" />
              <CardTitle>1. Information We Collect</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="outline">Account Information</Badge>
              </div>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Registration Data:</strong> Name, email address, password (encrypted)</li>
                <li><strong>Profile Information:</strong> Job title, company name (optional)</li>
                <li><strong>Contact Details:</strong> Email for notifications and support</li>
                <li><strong>Billing Information:</strong> Payment method, billing address (processed by secure third-party)</li>
              </ul>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="outline">Testing Data</Badge>
              </div>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Project Information:</strong> Project names, descriptions, test configurations</li>
                <li><strong>Test Cases:</strong> Test scenarios, steps, expected results, actual results</li>
                <li><strong>Test Files:</strong> APK/IPA files, screenshots, test evidence</li>
                <li><strong>Test Results:</strong> Pass/fail status, execution logs, performance metrics</li>
                <li><strong>Integration Data:</strong> Jira task IDs, third-party tool connections</li>
              </ul>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="outline">Usage Information</Badge>
              </div>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Platform Usage:</strong> Features used, time spent, frequency of access</li>
                <li><strong>Technical Data:</strong> IP address, browser type, device information</li>
                <li><strong>Performance Data:</strong> Page load times, error logs, system performance</li>
                <li><strong>Support Data:</strong> Support tickets, feedback, communications</li>
              </ul>
            </div>

            <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                <div className="space-y-2">
                  <h4 className="font-medium text-red-800 dark:text-red-200">
                    What We Don't Collect
                  </h4>
                  <p className="text-sm text-red-700 dark:text-red-300">
                    <strong>Important:</strong> TestFlow is not designed for and should not be used to collect, 
                    store, or process Personally Identifiable Information (PII) of end users, personal health 
                    information, financial data, or other sensitive personal information. Do not upload such data to our platform.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 2: How We Use Your Information */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Eye className="w-5 h-5 text-primary" />
              <CardTitle>2. How We Use Your Information</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Service Provision</h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>Provide and maintain the TestFlow platform</li>
                <li>Process and execute your test cases</li>
                <li>Generate reports and analytics</li>
                <li>Enable collaboration features</li>
                <li>Integrate with third-party tools (Jira, etc.)</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-2">Account Management</h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>Create and manage your user account</li>
                <li>Authenticate your identity</li>
                <li>Process payments and billing</li>
                <li>Send service notifications and updates</li>
                <li>Provide customer support</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-2">Service Improvement</h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>Analyze usage patterns to improve features</li>
                <li>Monitor system performance and reliability</li>
                <li>Develop new features and functionality</li>
                <li>Conduct security monitoring and threat detection</li>
                <li>Aggregate anonymous usage statistics</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-2">Legal and Compliance</h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>Comply with legal obligations</li>
                <li>Enforce our Terms of Service</li>
                <li>Protect against fraud and abuse</li>
                <li>Respond to legal requests and court orders</li>
                <li>Protect our rights and property</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Section 3: Information Sharing */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Users2 className="w-5 h-5 text-primary" />
              <CardTitle>3. Information Sharing and Disclosure</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <p className="text-sm text-blue-700 dark:text-blue-300">
                <strong>No Sale of Data:</strong> We do not sell, rent, or trade your personal information 
                to third parties for their marketing purposes.
              </p>
            </div>

            <div>
              <h4 className="font-medium mb-2">When We Share Information</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Service Providers:</strong> Trusted third parties who help us operate our platform (hosting, analytics, payment processing)</li>
                <li><strong>Business Transfers:</strong> In case of merger, acquisition, or sale of assets</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect rights and safety</li>
                <li><strong>With Your Consent:</strong> When you explicitly authorize us to share specific information</li>
                <li><strong>Team Members:</strong> Within your organization as part of collaboration features</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-2">Third-Party Integrations</h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>Jira integration (when you connect your Jira account)</li>
                <li>Cloud storage providers (for file storage)</li>
                <li>Email service providers (for notifications)</li>
                <li>Analytics services (anonymized usage data only)</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Section 4: Data Security */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Lock className="w-5 h-5 text-primary" />
              <CardTitle>4. Data Security</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Security Measures</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Encryption:</strong> Data encrypted in transit (TLS 1.3) and at rest (AES-256)</li>
                <li><strong>Access Controls:</strong> Role-based access with multi-factor authentication</li>
                <li><strong>Infrastructure Security:</strong> SOC 2 certified cloud providers</li>
                <li><strong>Regular Audits:</strong> Security assessments and penetration testing</li>
                <li><strong>Incident Response:</strong> 24/7 monitoring and rapid response procedures</li>
                <li><strong>Employee Training:</strong> Regular security awareness and privacy training</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-2">Data Backup and Recovery</h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>Automated daily backups with geographic redundancy</li>
                <li>Point-in-time recovery capabilities</li>
                <li>Disaster recovery procedures tested regularly</li>
                <li>99.9% uptime service level agreement</li>
              </ul>
            </div>

            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
              <p className="text-sm text-amber-700 dark:text-amber-300">
                <strong>Security Responsibility:</strong> While we implement robust security measures, 
                you are responsible for maintaining the security of your account credentials and 
                ensuring the appropriateness of data you upload to the platform.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Section 5: Data Retention */}
        <Card>
          <CardHeader>
            <CardTitle>5. Data Retention</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Retention Periods</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Account Data:</strong> Retained while your account is active</li>
                <li><strong>Testing Data:</strong> Retained for the duration of your subscription</li>
                <li><strong>Usage Data:</strong> Aggregated data retained for 2 years for analytics</li>
                <li><strong>Support Data:</strong> Retained for 3 years for quality improvement</li>
                <li><strong>Billing Data:</strong> Retained for 7 years for tax and legal compliance</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-2">Data Deletion</h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>You can delete specific projects and test data at any time</li>
                <li>Account deletion removes all personal data within 30 days</li>
                <li>Backup systems purged within 90 days of account deletion</li>
                <li>Some data may be retained longer for legal or security reasons</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Section 6: Your Rights */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Eye className="w-5 h-5 text-primary" />
              <CardTitle>6. Your Privacy Rights</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Data Access and Control</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Access:</strong> Request copies of your personal data</li>
                <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal data</li>
                <li><strong>Portability:</strong> Export your data in machine-readable format</li>
                <li><strong>Restriction:</strong> Limit how we process your data</li>
                <li><strong>Objection:</strong> Object to certain types of data processing</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-2">How to Exercise Your Rights</h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>Self-service options available in your account settings</li>
                <li>Contact our privacy team at privacy@testflow.com</li>
                <li>We respond to requests within 30 days</li>
                <li>Identity verification required for security</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-2">Regional Privacy Laws</h4>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>GDPR:</strong> European users have additional rights under GDPR</li>
                <li><strong>CCPA:</strong> California residents have specific privacy rights</li>
                <li><strong>Other Laws:</strong> We comply with applicable privacy laws globally</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Section 7: Cookies and Tracking */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Cookie className="w-5 h-5 text-primary" />
              <CardTitle>7. Cookies and Tracking Technologies</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Types of Cookies We Use</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Essential Cookies:</strong> Required for platform functionality and security</li>
                <li><strong>Performance Cookies:</strong> Help us understand how you use our platform</li>
                <li><strong>Functional Cookies:</strong> Remember your preferences and settings</li>
                <li><strong>Analytics Cookies:</strong> Provide usage statistics (anonymized)</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-2">Cookie Management</h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>Cookie preferences can be managed in your browser settings</li>
                <li>Essential cookies cannot be disabled as they're required for platform operation</li>
                <li>Disabling non-essential cookies may affect platform functionality</li>
                <li>We provide cookie consent options where required by law</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Section 8: International Data Transfers */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-primary" />
              <CardTitle>8. International Data Transfers</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              TestFlow operates globally and may transfer your data to countries outside your residence:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Primary Hosting:</strong> Data centers in the United States and Europe</li>
              <li><strong>Backup Locations:</strong> Geographically distributed for redundancy</li>
              <li><strong>Legal Safeguards:</strong> Standard contractual clauses and adequacy decisions</li>
              <li><strong>Security Standards:</strong> Same security measures apply regardless of location</li>
            </ul>
          </CardContent>
        </Card>

        {/* Section 9: Children's Privacy */}
        <Card>
          <CardHeader>
            <CardTitle>9. Children's Privacy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              TestFlow is not intended for use by children under 18 years of age:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>We do not knowingly collect personal information from children under 18</li>
              <li>If we become aware of such collection, we will delete the information promptly</li>
              <li>Parents or guardians should contact us if they believe their child has provided personal information</li>
              <li>Account creation requires confirmation that the user is at least 18 years old</li>
            </ul>
          </CardContent>
        </Card>

        {/* Section 10: Changes to Privacy Policy */}
        <Card>
          <CardHeader>
            <CardTitle>10. Changes to This Privacy Policy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              We may update this Privacy Policy from time to time:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Material changes will be communicated via email or platform notification</li>
              <li>Changes take effect 30 days after notification unless otherwise stated</li>
              <li>Continued use of the service constitutes acceptance of changes</li>
              <li>Previous versions are archived and available upon request</li>
            </ul>
          </CardContent>
        </Card>

        {/* Section 11: Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>11. Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              For privacy-related questions or to exercise your rights, contact us:
            </p>
            <div className="bg-muted/50 rounded-lg p-4 space-y-2">
              <div><strong>Privacy Officer:</strong> privacy@testflow.com</div>
              <div><strong>General Support:</strong> support@testflow.com</div>
              <div><strong>Data Protection Officer:</strong> dpo@testflow.com</div>
              <div><strong>Mailing Address:</strong> TestFlow Inc., 123 Tech Street, San Francisco, CA 94105</div>
              <div><strong>Phone:</strong> +1 (555) 123-4567</div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <p className="text-sm text-blue-700 dark:text-blue-300">
                <strong>EU Representative:</strong> For users in the European Union, our EU representative 
                can be reached at eu-privacy@testflow.com for GDPR-related matters.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground py-8">
          <p>
            © 2024 TestFlow Inc. All rights reserved. This Privacy Policy is effective as of {lastUpdated}.
          </p>
        </div>
      </div>
    </div>
  );
}