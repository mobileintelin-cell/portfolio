import { useState } from 'react';
import { 
  Smartphone, 
  Plus, 
  RefreshCw, 
  Wifi, 
  WifiOff, 
  Battery, 
  Monitor,
  Trash2,
  Settings,
  Zap,
  AlertCircle
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { toast } from 'sonner@2.0.3';

export type Device = {
  id: string;
  name: string;
  platform: 'android' | 'ios';
  model: string;
  version: string;
  status: 'connected' | 'disconnected' | 'busy' | 'error';
  battery: number;
  resolution: string;
  lastSeen: Date;
  deviceId: string;
};

interface DeviceManagerProps {
  onDeviceSelect?: (device: Device) => void;
  selectedDevice?: Device | null;
}

export function DeviceManager({ onDeviceSelect, selectedDevice }: DeviceManagerProps) {
  const [devices, setDevices] = useState<Device[]>([
    {
      id: '1',
      name: 'Samsung Galaxy S21',
      platform: 'android',
      model: 'SM-G991B',
      version: 'Android 13',
      status: 'connected',
      battery: 85,
      resolution: '2400x1080',
      lastSeen: new Date(),
      deviceId: 'emulator-5554'
    },
    {
      id: '2',
      name: 'iPhone 14 Pro',
      platform: 'ios',
      model: 'iPhone14,3',
      version: 'iOS 16.4',
      status: 'disconnected',
      battery: 67,
      resolution: '2556x1179',
      lastSeen: new Date(Date.now() - 300000), // 5 minutes ago
      deviceId: 'ios-simulator'
    }
  ]);

  const [isAddAndroidOpen, setIsAddAndroidOpen] = useState(false);
  const [isAddIosOpen, setIsAddIosOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const [newAndroidDevice, setNewAndroidDevice] = useState({
    name: '',
    model: '',
    version: '',
    deviceId: '',
    resolution: '2400x1080'
  });

  const [newIosDevice, setNewIosDevice] = useState({
    name: '',
    model: '',
    version: '',
    deviceId: '',
    resolution: '2556x1179'
  });

  const handleAddAndroidDevice = () => {
    if (!newAndroidDevice.name || !newAndroidDevice.deviceId) {
      toast.error('Please fill in all required fields');
      return;
    }

    const device: Device = {
      id: Date.now().toString(),
      name: newAndroidDevice.name,
      platform: 'android',
      model: newAndroidDevice.model || 'Unknown',
      version: newAndroidDevice.version || 'Android',
      status: 'connected',
      battery: Math.floor(Math.random() * 50) + 50, // Random battery 50-100%
      resolution: newAndroidDevice.resolution,
      lastSeen: new Date(),
      deviceId: newAndroidDevice.deviceId
    };

    setDevices(prev => [...prev, device]);
    setNewAndroidDevice({
      name: '',
      model: '',
      version: '',
      deviceId: '',
      resolution: '2400x1080'
    });
    setIsAddAndroidOpen(false);
    toast.success(`Android device "${device.name}" added successfully`);
  };

  const handleAddIosDevice = () => {
    if (!newIosDevice.name || !newIosDevice.deviceId) {
      toast.error('Please fill in all required fields');
      return;
    }

    const device: Device = {
      id: Date.now().toString(),
      name: newIosDevice.name,
      platform: 'ios',
      model: newIosDevice.model || 'Unknown',
      version: newIosDevice.version || 'iOS',
      status: 'connected',
      battery: Math.floor(Math.random() * 50) + 50, // Random battery 50-100%
      resolution: newIosDevice.resolution,
      lastSeen: new Date(),
      deviceId: newIosDevice.deviceId
    };

    setDevices(prev => [...prev, device]);
    setNewIosDevice({
      name: '',
      model: '',
      version: '',
      deviceId: '',
      resolution: '2556x1179'
    });
    setIsAddIosOpen(false);
    toast.success(`iOS device "${device.name}" added successfully`);
  };

  const handleRefreshStatus = async () => {
    setIsRefreshing(true);
    
    // Simulate API call to refresh device status
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setDevices(prev => prev.map(device => ({
      ...device,
      status: Math.random() > 0.3 ? 'connected' : 'disconnected',
      battery: Math.floor(Math.random() * 100),
      lastSeen: new Date()
    })));
    
    setIsRefreshing(false);
    toast.success('Device status refreshed');
  };

  const handleRemoveDevice = (deviceId: string) => {
    const device = devices.find(d => d.id === deviceId);
    setDevices(prev => prev.filter(d => d.id !== deviceId));
    toast.success(`Device "${device?.name}" removed`);
  };

  const getStatusIcon = (status: Device['status']) => {
    switch (status) {
      case 'connected':
        return <Wifi className="w-4 h-4 text-green-500" />;
      case 'disconnected':
        return <WifiOff className="w-4 h-4 text-red-500" />;
      case 'busy':
        return <Zap className="w-4 h-4 text-yellow-500" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <WifiOff className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: Device['status']) => {
    const variants = {
      connected: 'default',
      disconnected: 'secondary',
      busy: 'outline',
      error: 'destructive'
    } as const;
    
    return (
      <Badge variant={variants[status]} className="capitalize">
        {status}
      </Badge>
    );
  };

  const getPlatformIcon = (platform: 'android' | 'ios') => {
    return platform === 'android' ? (
      <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
        <Smartphone className="w-5 h-5 text-green-600" />
      </div>
    ) : (
      <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
        <Smartphone className="w-5 h-5 text-gray-600" />
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2>Device Management</h2>
          <p className="text-muted-foreground">
            Manage connected Android and iOS devices for testing
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={handleRefreshStatus}
            disabled={isRefreshing}
            className="gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh Status
          </Button>
          <Dialog open={isAddAndroidOpen} onOpenChange={setIsAddAndroidOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Plus className="w-4 h-4" />
                Add Android Device
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Android Device</DialogTitle>
                <DialogDescription>
                  Connect a new Android device or emulator for testing
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="android-name">Device Name *</Label>
                  <Input
                    id="android-name"
                    value={newAndroidDevice.name}
                    onChange={(e) => setNewAndroidDevice(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Samsung Galaxy S21"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="android-device-id">Device ID *</Label>
                  <Input
                    id="android-device-id"
                    value={newAndroidDevice.deviceId}
                    onChange={(e) => setNewAndroidDevice(prev => ({ ...prev, deviceId: e.target.value }))}
                    placeholder="emulator-5554 or device serial"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="android-model">Model</Label>
                    <Input
                      id="android-model"
                      value={newAndroidDevice.model}
                      onChange={(e) => setNewAndroidDevice(prev => ({ ...prev, model: e.target.value }))}
                      placeholder="SM-G991B"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="android-version">Android Version</Label>
                    <Select 
                      value={newAndroidDevice.version} 
                      onValueChange={(value) => setNewAndroidDevice(prev => ({ ...prev, version: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select version" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Android 14">Android 14</SelectItem>
                        <SelectItem value="Android 13">Android 13</SelectItem>
                        <SelectItem value="Android 12">Android 12</SelectItem>
                        <SelectItem value="Android 11">Android 11</SelectItem>
                        <SelectItem value="Android 10">Android 10</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="android-resolution">Resolution</Label>
                  <Select 
                    value={newAndroidDevice.resolution} 
                    onValueChange={(value) => setNewAndroidDevice(prev => ({ ...prev, resolution: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2400x1080">2400x1080 (FHD+)</SelectItem>
                      <SelectItem value="1920x1080">1920x1080 (FHD)</SelectItem>
                      <SelectItem value="1440x720">1440x720 (HD+)</SelectItem>
                      <SelectItem value="1280x720">1280x720 (HD)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddAndroidOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddAndroidDevice}>
                  Add Device
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Dialog open={isAddIosOpen} onOpenChange={setIsAddIosOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Add iOS Device
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add iOS Device</DialogTitle>
                <DialogDescription>
                  Connect a new iOS device or simulator for testing
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="ios-name">Device Name *</Label>
                  <Input
                    id="ios-name"
                    value={newIosDevice.name}
                    onChange={(e) => setNewIosDevice(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="iPhone 14 Pro"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ios-device-id">Device ID *</Label>
                  <Input
                    id="ios-device-id"
                    value={newIosDevice.deviceId}
                    onChange={(e) => setNewIosDevice(prev => ({ ...prev, deviceId: e.target.value }))}
                    placeholder="simulator ID or device UDID"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="ios-model">Model</Label>
                    <Input
                      id="ios-model"
                      value={newIosDevice.model}
                      onChange={(e) => setNewIosDevice(prev => ({ ...prev, model: e.target.value }))}
                      placeholder="iPhone14,3"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ios-version">iOS Version</Label>
                    <Select 
                      value={newIosDevice.version} 
                      onValueChange={(value) => setNewIosDevice(prev => ({ ...prev, version: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select version" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="iOS 17.2">iOS 17.2</SelectItem>
                        <SelectItem value="iOS 17.1">iOS 17.1</SelectItem>
                        <SelectItem value="iOS 17.0">iOS 17.0</SelectItem>
                        <SelectItem value="iOS 16.4">iOS 16.4</SelectItem>
                        <SelectItem value="iOS 16.3">iOS 16.3</SelectItem>
                        <SelectItem value="iOS 15.7">iOS 15.7</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ios-resolution">Resolution</Label>
                  <Select 
                    value={newIosDevice.resolution} 
                    onValueChange={(value) => setNewIosDevice(prev => ({ ...prev, resolution: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2556x1179">2556x1179 (iPhone 14 Pro)</SelectItem>
                      <SelectItem value="2532x1170">2532x1170 (iPhone 12/13/14)</SelectItem>
                      <SelectItem value="2688x1242">2688x1242 (iPhone 11 Pro Max)</SelectItem>
                      <SelectItem value="1792x828">1792x828 (iPhone 11)</SelectItem>
                      <SelectItem value="2208x1242">2208x1242 (iPhone 8 Plus)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddIosOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddIosDevice}>
                  Add Device
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {devices.map((device) => (
          <Card 
            key={device.id} 
            className={`cursor-pointer transition-all hover:shadow-md ${
              selectedDevice?.id === device.id ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => onDeviceSelect?.(device)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getPlatformIcon(device.platform)}
                  <div>
                    <CardTitle className="text-base">{device.name}</CardTitle>
                    <CardDescription>{device.model}</CardDescription>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveDevice(device.id);
                  }}
                  className="w-8 h-8 p-0 text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Status</span>
                <div className="flex items-center gap-2">
                  {getStatusIcon(device.status)}
                  {getStatusBadge(device.status)}
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Version</span>
                <span className="text-sm">{device.version}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Battery</span>
                <div className="flex items-center gap-2">
                  <Battery className="w-4 h-4" />
                  <span className="text-sm">{device.battery}%</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Resolution</span>
                <div className="flex items-center gap-2">
                  <Monitor className="w-4 h-4" />
                  <span className="text-sm">{device.resolution}</span>
                </div>
              </div>
              
              <div className="pt-2 border-t">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Device ID</span>
                  <span className="text-xs font-mono">{device.deviceId}</span>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-muted-foreground">Last seen</span>
                  <span className="text-xs">{device.lastSeen.toLocaleTimeString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {devices.length === 0 && (
          <Card className="col-span-full">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <div className="text-center mb-4">
                <Smartphone className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <h3>No devices connected</h3>
                <p className="text-muted-foreground">
                  Add Android or iOS devices to start mobile testing
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}