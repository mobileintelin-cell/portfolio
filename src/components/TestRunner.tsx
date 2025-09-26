import { useState, useEffect } from 'react';
import { Play, Square, CheckCircle, XCircle, Clock, Terminal } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import type { Project, TestCase } from '../App';

interface TestRunnerProps {
  project: Project | null;
  onUpdateProject: (project: Project) => void;
}

export function TestRunner({ project, onUpdateProject }: TestRunnerProps) {
  const [selectedTests, setSelectedTests] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [currentTest, setCurrentTest] = useState<string | null>(null);
  const [completedTests, setCompletedTests] = useState<string[]>([]);
  const [logs, setLogs] = useState<Array<{ timestamp: Date; message: string; type: 'info' | 'success' | 'error' }>>([]);
  const [runStats, setRunStats] = useState({ total: 0, passed: 0, failed: 0, pending: 0 });

  useEffect(() => {
    if (project) {
      setSelectedTests(project.testcases.map(tc => tc.id));
      updateRunStats(project.testcases);
    }
  }, [project]);

  const updateRunStats = (testcases: TestCase[]) => {
    const stats = testcases.reduce((acc, tc) => {
      acc.total++;
      acc[tc.status === 'pass' ? 'passed' : tc.status === 'fail' ? 'failed' : 'pending']++;
      return acc;
    }, { total: 0, passed: 0, failed: 0, pending: 0 });
    setRunStats(stats);
  };

  const addLog = (message: string, type: 'info' | 'success' | 'error' = 'info') => {
    setLogs(prev => [...prev, { timestamp: new Date(), message, type }]);
  };

  const simulateTestExecution = async (testCase: TestCase): Promise<'pass' | 'fail'> => {
    // Simulate test execution with random delays and outcomes
    const delay = Math.random() * 3000 + 1000; // 1-4 seconds
    await new Promise(resolve => setTimeout(resolve, delay));
    
    // 80% pass rate for simulation
    return Math.random() > 0.2 ? 'pass' : 'fail';
  };

  const handleRunTests = async () => {
    if (!project || selectedTests.length === 0) return;

    setIsRunning(true);
    setCompletedTests([]);
    setCurrentTest(null);
    setLogs([]);

    const testsToRun = project.testcases.filter(tc => selectedTests.includes(tc.id));
    addLog(`Starting test run for ${testsToRun.length} test cases`, 'info');

    const updatedTestCases = [...project.testcases];

    for (const testCase of testsToRun) {
      setCurrentTest(testCase.id);
      addLog(`Executing: ${testCase.name}`, 'info');

      try {
        const result = await simulateTestExecution(testCase);
        
        // Update test case with results
        const testIndex = updatedTestCases.findIndex(tc => tc.id === testCase.id);
        if (testIndex !== -1) {
          updatedTestCases[testIndex] = {
            ...updatedTestCases[testIndex],
            status: result,
            actualResult: result === 'pass' 
              ? 'Test executed successfully as expected'
              : 'Test failed - unexpected behavior detected'
          };
        }

        addLog(`${testCase.name}: ${result.toUpperCase()}`, result === 'pass' ? 'success' : 'error');
        setCompletedTests(prev => [...prev, testCase.id]);
      } catch (error) {
        addLog(`${testCase.name}: ERROR - ${error}`, 'error');
        setCompletedTests(prev => [...prev, testCase.id]);
      }
    }

    // Update project with new test results
    const updatedProject = {
      ...project,
      testcases: updatedTestCases,
      lastRunStatus: updatedTestCases.some(tc => selectedTests.includes(tc.id) && tc.status === 'fail') ? 'failed' as const : 'passed' as const,
      lastRunDate: new Date()
    };

    onUpdateProject(updatedProject);
    updateRunStats(updatedTestCases);
    
    setIsRunning(false);
    setCurrentTest(null);
    addLog('Test run completed', 'info');
  };

  const handleStopTests = () => {
    setIsRunning(false);
    setCurrentTest(null);
    addLog('Test run stopped by user', 'info');
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked && project) {
      setSelectedTests(project.testcases.map(tc => tc.id));
    } else {
      setSelectedTests([]);
    }
  };

  const handleSelectTest = (testId: string, checked: boolean) => {
    if (checked) {
      setSelectedTests(prev => [...prev, testId]);
    } else {
      setSelectedTests(prev => prev.filter(id => id !== testId));
    }
  };

  const getProgressPercentage = () => {
    if (!project || selectedTests.length === 0) return 0;
    return (completedTests.length / selectedTests.length) * 100;
  };

  const getLogIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'error':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-blue-500" />;
    }
  };

  if (!project) {
    return (
      <div className="space-y-6">
        <div>
          <h1>Test Runner</h1>
          <p className="text-muted-foreground">
            Select a project to run tests
          </p>
        </div>
        
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="text-center">
              <h3>No project selected</h3>
              <p className="text-muted-foreground">
                Choose a project from the navigation to start running tests
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Test Runner - {project.name}</h1>
          <p className="text-muted-foreground">
            Execute test cases and monitor results in real-time
          </p>
        </div>
        
        <div className="flex gap-2">
          {isRunning ? (
            <Button onClick={handleStopTests} variant="destructive" className="gap-2">
              <Square className="w-4 h-4" />
              Stop Tests
            </Button>
          ) : (
            <>
              <Button 
                onClick={handleRunTests} 
                disabled={selectedTests.length === 0}
                className="gap-2"
              >
                <Play className="w-4 h-4" />
                Run Selected ({selectedTests.length})
              </Button>
              <Button 
                onClick={() => {
                  setSelectedTests(project.testcases.map(tc => tc.id));
                  setTimeout(handleRunTests, 100);
                }}
                variant="outline"
                disabled={project.testcases.length === 0}
                className="gap-2"
              >
                <Play className="w-4 h-4" />
                Run All
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Test Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Test Cases</CardTitle>
              <CardDescription>
                Select test cases to execute
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="select-all"
                    checked={selectedTests.length === project.testcases.length && project.testcases.length > 0}
                    onCheckedChange={handleSelectAll}
                    disabled={isRunning}
                  />
                  <label htmlFor="select-all" className="font-medium">
                    Select All ({project.testcases.length} test cases)
                  </label>
                </div>
                
                <Separator />
                
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {project.testcases.map((testCase) => (
                    <div
                      key={testCase.id}
                      className={`flex items-start space-x-3 p-3 rounded-lg border ${
                        currentTest === testCase.id ? 'bg-blue-50 border-blue-200' :
                        completedTests.includes(testCase.id) ? 'bg-green-50 border-green-200' :
                        'bg-background'
                      }`}
                    >
                      <Checkbox
                        id={testCase.id}
                        checked={selectedTests.includes(testCase.id)}
                        onCheckedChange={(checked) => handleSelectTest(testCase.id, checked as boolean)}
                        disabled={isRunning}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <label htmlFor={testCase.id} className="font-medium cursor-pointer">
                            {testCase.name}
                          </label>
                          {currentTest === testCase.id && (
                            <Badge variant="secondary" className="animate-pulse">
                              Running
                            </Badge>
                          )}
                          {completedTests.includes(testCase.id) && (
                            <Badge variant={testCase.status === 'pass' ? 'default' : 'destructive'}>
                              {testCase.status}
                            </Badge>
                          )}
                        </div>
                        {testCase.jiraTask && (
                          <div className="text-sm text-muted-foreground">
                            {testCase.jiraTask}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  {project.testcases.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      No test cases available. Add test cases to start testing.
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Progress */}
          {isRunning && (
            <Card>
              <CardHeader>
                <CardTitle>Execution Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{completedTests.length}/{selectedTests.length} completed</span>
                  </div>
                  <Progress value={getProgressPercentage()} />
                  {currentTest && (
                    <div className="text-sm text-muted-foreground">
                      Currently running: {project.testcases.find(tc => tc.id === currentTest)?.name}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          {/* Run Statistics */}
          <Card>
            <CardHeader>
              <CardTitle>Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{runStats.passed}</div>
                  <div className="text-sm text-green-600">Passed</div>
                </div>
                <div className="text-center p-3 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">{runStats.failed}</div>
                  <div className="text-sm text-red-600">Failed</div>
                </div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-600">{runStats.pending}</div>
                <div className="text-sm text-gray-600">Pending</div>
              </div>
            </CardContent>
          </Card>

          {/* Console Logs */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Terminal className="w-4 h-4" />
                Console
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-64">
                <div className="space-y-2">
                  {logs.map((log, index) => (
                    <div key={index} className="flex items-start gap-2 text-sm">
                      {getLogIcon(log.type)}
                      <div className="flex-1">
                        <span className="text-muted-foreground text-xs">
                          {log.timestamp.toLocaleTimeString()}
                        </span>
                        <div className={
                          log.type === 'error' ? 'text-red-600' :
                          log.type === 'success' ? 'text-green-600' :
                          'text-foreground'
                        }>
                          {log.message}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {logs.length === 0 && (
                    <div className="text-center text-muted-foreground text-sm py-8">
                      Console output will appear here when tests are running
                    </div>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}