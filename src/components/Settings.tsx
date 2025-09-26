import { useState } from 'react';
import { Save, Key, Bell, Shield, Database, Smartphone, FileText, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Textarea } from './ui/textarea';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';

interface SettingsProps {
  onNavigate?: (page: string) => void;
}

export function Settings({ onNavigate }: SettingsProps = {}) {
  const [settings, setSettings] = useState({
    // API Settings
    jiraApiKey: '',
    jiraBaseUrl: 'https://company.atlassian.net',
    slackWebhook: '',
    
    // Test Environment Settings
    defaultTimeout: 30,
    retryAttempts: 3,
    screenshotOnFailure: true,
    videoRecording: false,
    
    // Notification Settings
    emailNotifications: true,
    slackNotifications: false,
    notifyOnSuccess: false,
    notifyOnFailure: true,
    
    // Security Settings
    encryptCredentials: true,
    sessionTimeout: 60,
    requireMfa: false,
    
    // Device Lab Settings
    androidDevices: [
      { id: 'pixel-7', name: 'Google Pixel 7', version: 'Android 13', status: 'available' },
      { id: 'samsung-s23', name: 'Samsung Galaxy S23', version: 'Android 13', status: 'in-use' }
    ],
    iosDevices: [
      { id: 'iphone-14', name: 'iPhone 14', version: 'iOS 16.5', status: 'available' },
      { id: 'iphone-13', name: 'iPhone 13', version: 'iOS 16.4', status: 'offline' }
    ]
  });

  const handleSave = () => {
    // Mock save functionality
    console.log('Saving settings:', settings);
  };

  const getDeviceStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'default';
      case 'in-use':
        return 'secondary';
      case 'offline':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Settings</h1>
          <p className="text-muted-foreground">
            Configure your testing environment and integrations
          </p>
        </div>
        <Button onClick={handleSave} className="gap-2">
          <Save className="w-4 h-4" />
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* API Integrations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="w-5 h-5" />
              API Integrations
            </CardTitle>
            <CardDescription>
              Configure external API connections
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="jiraUrl">Jira Base URL</Label>
              <Input
                id="jiraUrl"
                value={settings.jiraBaseUrl}
                onChange={(e) => setSettings(prev => ({ ...prev, jiraBaseUrl: e.target.value }))}
                placeholder="https://company.atlassian.net"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="jiraKey">Jira API Key</Label>
              <Input
                id="jiraKey"
                type="password"
                value={settings.jiraApiKey}
                onChange={(e) => setSettings(prev => ({ ...prev, jiraApiKey: e.target.value }))}
                placeholder="Enter your Jira API key"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="slackWebhook">Slack Webhook URL</Label>
              <Input
                id="slackWebhook"
                value={settings.slackWebhook}
                onChange={(e) => setSettings(prev => ({ ...prev, slackWebhook: e.target.value }))}
                placeholder="https://hooks.slack.com/services/..."
              />
            </div>
          </CardContent>
        </Card>

        {/* Test Environment */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5" />
              Test Environment
            </CardTitle>
            <CardDescription>
              Configure test execution settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="timeout">Default Timeout (seconds)</Label>
              <Input
                id="timeout"
                type="number"
                value={settings.defaultTimeout}
                onChange={(e) => setSettings(prev => ({ ...prev, defaultTimeout: parseInt(e.target.value) }))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="retries">Retry Attempts</Label>
              <Input
                id="retries"
                type="number"
                value={settings.retryAttempts}
                onChange={(e) => setSettings(prev => ({ ...prev, retryAttempts: parseInt(e.target.value) }))}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Screenshot on Failure</Label>
                <div className="text-sm text-muted-foreground">
                  Automatically capture screenshots when tests fail
                </div>
              </div>
              <Switch
                checked={settings.screenshotOnFailure}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, screenshotOnFailure: checked }))}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Video Recording</Label>
                <div className="text-sm text-muted-foreground">
                  Record video during test execution
                </div>
              </div>
              <Switch
                checked={settings.videoRecording}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, videoRecording: checked }))}
              />
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notifications
            </CardTitle>
            <CardDescription>
              Configure when and how to receive notifications
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email Notifications</Label>
                <div className="text-sm text-muted-foreground">
                  Receive notifications via email
                </div>
              </div>
              <Switch
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, emailNotifications: checked }))}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Slack Notifications</Label>
                <div className="text-sm text-muted-foreground">
                  Send notifications to Slack channel
                </div>
              </div>
              <Switch
                checked={settings.slackNotifications}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, slackNotifications: checked }))}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <Label>Notify on Success</Label>
              <Switch
                checked={settings.notifyOnSuccess}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, notifyOnSuccess: checked }))}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <Label>Notify on Failure</Label>
              <Switch
                checked={settings.notifyOnFailure}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, notifyOnFailure: checked }))}
              />
            </div>
          </CardContent>
        </Card>

        {/* Security */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Security
            </CardTitle>
            <CardDescription>
              Security and access control settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Encrypt Credentials</Label>
                <div className="text-sm text-muted-foreground">
                  Encrypt stored test credentials
                </div>
              </div>
              <Switch
                checked={settings.encryptCredentials}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, encryptCredentials: checked }))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
              <Input
                id="sessionTimeout"
                type="number"
                value={settings.sessionTimeout}
                onChange={(e) => setSettings(prev => ({ ...prev, sessionTimeout: parseInt(e.target.value) }))}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Require Multi-Factor Authentication</Label>
                <div className="text-sm text-muted-foreground">
                  Require MFA for sensitive operations
                </div>
              </div>
              <Switch
                checked={settings.requireMfa}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, requireMfa: checked }))}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Device Lab */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="w-5 h-5" />
            Device Lab
          </CardTitle>
          <CardDescription>
            Manage connected mobile devices for testing
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-medium mb-3">Android Devices</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {settings.androidDevices.map((device) => (
                <div key={device.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">{device.name}</div>
                    <div className="text-sm text-muted-foreground">{device.version}</div>
                  </div>
                  <Badge variant={getDeviceStatusColor(device.status)}>
                    {device.status}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h4 className="font-medium mb-3">iOS Devices</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {settings.iosDevices.map((device) => (
                <div key={device.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">{device.name}</div>
                    <div className="text-sm text-muted-foreground">{device.version}</div>
                  </div>
                  <Badge variant={getDeviceStatusColor(device.status)}>
                    {device.status}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Add Android Device
            </Button>
            <Button variant="outline" size="sm">
              Add iOS Device
            </Button>
            <Button variant="outline" size="sm">
              Refresh Status
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Legal and About */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Legal & Privacy
            </CardTitle>
            <CardDescription>
              Review our terms and privacy policies
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start gap-2"
                onClick={() => onNavigate?.('terms')}
              >
                <FileText className="w-4 h-4" />
                Terms of Service
                <ExternalLink className="w-3 h-3 ml-auto" />
              </Button>
              
              <Button
                variant="outline"
                className="w-full justify-start gap-2"
                onClick={() => onNavigate?.('privacy')}
              >
                <Shield className="w-4 h-4" />
                Privacy Policy
                <ExternalLink className="w-3 h-3 ml-auto" />
              </Button>
            </div>
            
            <Separator />
            
            <div className="text-sm text-muted-foreground space-y-2">
              <p>
                <strong>Last Updated:</strong> January 15, 2024
              </p>
              <p>
                By using TestFlow, you agree to our Terms of Service and acknowledge our Privacy Policy.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              About TestFlow
            </CardTitle>
            <CardDescription>
              Platform information and support
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Version</span>
                <Badge variant="outline">v2.1.0</Badge>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Build</span>
                <span className="text-sm font-mono">2024.01.15.1</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Environment</span>
                <Badge>Production</Badge>
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full">
                Contact Support
              </Button>
              <Button variant="outline" size="sm" className="w-full">
                Report an Issue
              </Button>
              <Button variant="outline" size="sm" className="w-full">
                Request Feature
              </Button>
            </div>
            
            <div className="text-xs text-muted-foreground text-center pt-2">
              © 2024 TestFlow Inc. All rights reserved.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}