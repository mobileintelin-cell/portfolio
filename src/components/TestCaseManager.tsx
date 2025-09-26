import { useState } from 'react';
import { 
  Plus, 
  Upload, 
  Edit, 
  Trash2, 
  ExternalLink,
  ChevronDown,
  ChevronRight,
  FileImage,
  Download,
  Smartphone
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { DeviceManager, type Device } from './DeviceManager';
import type { Project, TestCase } from '../App';

interface TestCaseManagerProps {
  projects: Project[];
  selectedProject: Project | null;
  onSelectProject: (project: Project) => void;
  onUpdateProject: (project: Project) => void;
}

export function TestCaseManager({ projects, selectedProject, onSelectProject, onUpdateProject }: TestCaseManagerProps) {
  const [selectedTestCases, setSelectedTestCases] = useState<string[]>([]);
  const [expandedRows, setExpandedRows] = useState<string[]>([]);
  const [editingTestCase, setEditingTestCase] = useState<TestCase | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [newTestCase, setNewTestCase] = useState<Omit<TestCase, 'id'>>({
    jiraTask: '',
    name: '',
    prerequisites: '',
    steps: '',
    inputData: '',
    expectedResult: '',
    actualResult: '',
    status: 'pending',
    evidence: []
  });

  const handleSelectAll = (checked: boolean) => {
    if (checked && selectedProject) {
      setSelectedTestCases(selectedProject.testcases.map(tc => tc.id));
    } else {
      setSelectedTestCases([]);
    }
  };

  const handleSelectTestCase = (testCaseId: string, checked: boolean) => {
    if (checked) {
      setSelectedTestCases(prev => [...prev, testCaseId]);
    } else {
      setSelectedTestCases(prev => prev.filter(id => id !== testCaseId));
    }
  };

  const toggleRowExpansion = (testCaseId: string) => {
    setExpandedRows(prev => 
      prev.includes(testCaseId) 
        ? prev.filter(id => id !== testCaseId)
        : [...prev, testCaseId]
    );
  };

  const handleCreateTestCase = () => {
    if (!selectedProject) return;
    
    const testCase: TestCase = {
      ...newTestCase,
      id: Date.now().toString(),
    };
    
    const updatedProject = {
      ...selectedProject,
      testcases: [...selectedProject.testcases, testCase]
    };
    
    onUpdateProject(updatedProject);
    setNewTestCase({
      jiraTask: '',
      name: '',
      prerequisites: '',
      steps: '',
      inputData: '',
      expectedResult: '',
      actualResult: '',
      status: 'pending',
      evidence: []
    });
    setIsCreateDialogOpen(false);
  };

  const handleUpdateTestCase = (updatedTestCase: TestCase) => {
    if (!selectedProject) return;
    
    const updatedProject = {
      ...selectedProject,
      testcases: selectedProject.testcases.map(tc => 
        tc.id === updatedTestCase.id ? updatedTestCase : tc
      )
    };
    
    onUpdateProject(updatedProject);
    setEditingTestCase(null);
  };

  const handleDeleteTestCases = () => {
    if (!selectedProject) return;
    
    const updatedProject = {
      ...selectedProject,
      testcases: selectedProject.testcases.filter(tc => !selectedTestCases.includes(tc.id))
    };
    
    onUpdateProject(updatedProject);
    setSelectedTestCases([]);
  };

  const getStatusBadge = (status: TestCase['status']) => {
    const variants = {
      pass: 'default',
      fail: 'destructive',
      pending: 'outline'
    } as const;
    
    return (
      <Badge variant={variants[status]} className="capitalize">
        {status}
      </Badge>
    );
  };

  if (!selectedProject) {
    return (
      <div className="space-y-6">
        <div>
          <h1>Test Case Management</h1>
          <p className="text-muted-foreground">
            Select a project to manage test cases
          </p>
        </div>
        
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="text-center mb-4">
              <h3>No project selected</h3>
              <p className="text-muted-foreground">
                Choose a project from the dropdown to start managing test cases
              </p>
            </div>
            
            <Select onValueChange={(value) => {
              const project = projects.find(p => p.id === value);
              if (project) onSelectProject(project);
            }}>
              <SelectTrigger className="w-64">
                <SelectValue placeholder="Select a project" />
              </SelectTrigger>
              <SelectContent>
                {projects.map((project) => (
                  <SelectItem key={project.id} value={project.id}>
                    {project.name} ({project.type})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show device info if mobile project and device selected
  const deviceInfo = selectedProject.type === 'mobile' && selectedDevice && (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <Smartphone className="w-4 h-4" />
      <span>Selected device: {selectedDevice.name} ({selectedDevice.platform})</span>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Test Cases - {selectedProject.name}</h1>
          <div className="space-y-1">
            <p className="text-muted-foreground">
              Manage and execute test cases for your project
            </p>
            {deviceInfo}
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Upload className="w-4 h-4" />
            Import CSV
          </Button>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Add Test Case
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Test Case</DialogTitle>
                <DialogDescription>
                  Add a new test case to your project
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="jiraTask">Jira Task</Label>
                    <Input
                      id="jiraTask"
                      value={newTestCase.jiraTask}
                      onChange={(e) => setNewTestCase(prev => ({ ...prev, jiraTask: e.target.value }))}
                      placeholder="PROJ-123"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="name">Test Case Name</Label>
                    <Input
                      id="name"
                      value={newTestCase.name}
                      onChange={(e) => setNewTestCase(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="User login flow"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="prerequisites">Prerequisites</Label>
                  <Textarea
                    id="prerequisites"
                    value={newTestCase.prerequisites}
                    onChange={(e) => setNewTestCase(prev => ({ ...prev, prerequisites: e.target.value }))}
                    placeholder="User has valid account credentials"
                    rows={2}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="steps">Steps to Reproduce</Label>
                  <Textarea
                    id="steps"
                    value={newTestCase.steps}
                    onChange={(e) => setNewTestCase(prev => ({ ...prev, steps: e.target.value }))}
                    placeholder="1. Open application&#10;2. Navigate to login&#10;3. Enter credentials"
                    rows={4}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="inputData">Input Data</Label>
                  <Textarea
                    id="inputData"
                    value={newTestCase.inputData}
                    onChange={(e) => setNewTestCase(prev => ({ ...prev, inputData: e.target.value }))}
                    placeholder="Username: test@example.com, Password: testpass123"
                    rows={2}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="expectedResult">Expected Result</Label>
                  <Textarea
                    id="expectedResult"
                    value={newTestCase.expectedResult}
                    onChange={(e) => setNewTestCase(prev => ({ ...prev, expectedResult: e.target.value }))}
                    placeholder="User successfully logs in and reaches dashboard"
                    rows={3}
                    required
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateTestCase}>
                  Create Test Case
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {selectedTestCases.length > 0 && (
        <Card>
          <CardContent className="flex items-center justify-between p-4">
            <span className="text-sm">
              {selectedTestCases.length} test case(s) selected
            </span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Export Selected
              </Button>
              <Button variant="destructive" size="sm" onClick={handleDeleteTestCases}>
                Delete Selected
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {selectedProject.type === 'mobile' ? (
        <Tabs defaultValue="devices" className="space-y-6">
          <TabsList>
            <TabsTrigger value="devices">Device Management</TabsTrigger>
            <TabsTrigger value="testcases">Test Cases ({selectedProject.testcases.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="devices">
            <DeviceManager 
              onDeviceSelect={setSelectedDevice}
              selectedDevice={selectedDevice}
            />
          </TabsContent>
          
          <TabsContent value="testcases">
            <Card>
        <CardHeader>
          <CardTitle>Test Cases ({selectedProject.testcases.length})</CardTitle>
          <CardDescription>
            Manage test cases for {selectedProject.name}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedTestCases.length === selectedProject.testcases.length && selectedProject.testcases.length > 0}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead className="w-12"></TableHead>
                <TableHead>Test Case</TableHead>
                <TableHead>Jira Task</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Evidence</TableHead>
                <TableHead className="w-24">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {selectedProject.testcases.map((testCase) => (
                <>
                  <TableRow key={testCase.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedTestCases.includes(testCase.id)}
                        onCheckedChange={(checked) => handleSelectTestCase(testCase.id, checked as boolean)}
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleRowExpansion(testCase.id)}
                        className="w-8 h-8 p-0"
                      >
                        {expandedRows.includes(testCase.id) ? (
                          <ChevronDown className="w-4 h-4" />
                        ) : (
                          <ChevronRight className="w-4 h-4" />
                        )}
                      </Button>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{testCase.name}</div>
                        <div className="text-sm text-muted-foreground truncate max-w-xs">
                          {testCase.prerequisites}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {testCase.jiraTask ? (
                        <Button variant="link" size="sm" className="p-0 h-auto">
                          <ExternalLink className="w-3 h-3 mr-1" />
                          {testCase.jiraTask}
                        </Button>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(testCase.status)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <FileImage className="w-4 h-4" />
                        <span className="text-sm">{testCase.evidence.length}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setEditingTestCase(testCase)}
                          className="w-8 h-8 p-0"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-8 h-8 p-0 text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  
                  {expandedRows.includes(testCase.id) && (
                    <TableRow>
                      <TableCell colSpan={7} className="bg-muted/50">
                        <div className="p-4 space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-medium mb-2">Steps to Reproduce</h4>
                              <p className="text-sm whitespace-pre-wrap">{testCase.steps}</p>
                            </div>
                            <div>
                              <h4 className="font-medium mb-2">Input Data</h4>
                              <p className="text-sm">{testCase.inputData || 'No input data specified'}</p>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-medium mb-2">Expected Result</h4>
                              <p className="text-sm">{testCase.expectedResult}</p>
                            </div>
                            <div>
                              <h4 className="font-medium mb-2">Actual Result</h4>
                              <p className="text-sm">{testCase.actualResult || 'Not yet executed'}</p>
                            </div>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </>
              ))}
              
              {selectedProject.testcases.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    <div className="text-muted-foreground">
                      No test cases found. Create your first test case to get started.
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
          </TabsContent>
        </Tabs>
      ) : (
        <Card>
        <CardHeader>
          <CardTitle>Test Cases ({selectedProject.testcases.length})</CardTitle>
          <CardDescription>
            Manage test cases for {selectedProject.name}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedTestCases.length === selectedProject.testcases.length && selectedProject.testcases.length > 0}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead className="w-12"></TableHead>
                <TableHead>Test Case</TableHead>
                <TableHead>Jira Task</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Evidence</TableHead>
                <TableHead className="w-24">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {selectedProject.testcases.map((testCase) => (
                <>
                  <TableRow key={testCase.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedTestCases.includes(testCase.id)}
                        onCheckedChange={(checked) => handleSelectTestCase(testCase.id, checked as boolean)}
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleRowExpansion(testCase.id)}
                        className="w-8 h-8 p-0"
                      >
                        {expandedRows.includes(testCase.id) ? (
                          <ChevronDown className="w-4 h-4" />
                        ) : (
                          <ChevronRight className="w-4 h-4" />
                        )}
                      </Button>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{testCase.name}</div>
                        <div className="text-sm text-muted-foreground truncate max-w-xs">
                          {testCase.prerequisites}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {testCase.jiraTask ? (
                        <Button variant="link" size="sm" className="p-0 h-auto">
                          <ExternalLink className="w-3 h-3 mr-1" />
                          {testCase.jiraTask}
                        </Button>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(testCase.status)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <FileImage className="w-4 h-4" />
                        <span className="text-sm">{testCase.evidence.length}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setEditingTestCase(testCase)}
                          className="w-8 h-8 p-0"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-8 h-8 p-0 text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  
                  {expandedRows.includes(testCase.id) && (
                    <TableRow>
                      <TableCell colSpan={7} className="bg-muted/50">
                        <div className="p-4 space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-medium mb-2">Steps to Reproduce</h4>
                              <p className="text-sm whitespace-pre-wrap">{testCase.steps}</p>
                            </div>
                            <div>
                              <h4 className="font-medium mb-2">Input Data</h4>
                              <p className="text-sm">{testCase.inputData || 'No input data specified'}</p>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-medium mb-2">Expected Result</h4>
                              <p className="text-sm">{testCase.expectedResult}</p>
                            </div>
                            <div>
                              <h4 className="font-medium mb-2">Actual Result</h4>
                              <p className="text-sm">{testCase.actualResult || 'Not yet executed'}</p>
                            </div>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </>
              ))}
              
              {selectedProject.testcases.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    <div className="text-muted-foreground">
                      No test cases found. Create your first test case to get started.
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      )}
    </div>
  );
}