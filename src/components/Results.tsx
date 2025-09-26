import { useState } from 'react';
import { Download, Calendar, User, TrendingUp, TrendingDown } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import type { Project } from '../App';

interface ResultsProps {
  projects: Project[];
}

export function Results({ projects }: ResultsProps) {
  const [selectedProject, setSelectedProject] = useState<string>('all');
  const [timeRange, setTimeRange] = useState<string>('30d');

  // Generate mock test run history
  const generateTestRuns = () => {
    const runs = [];
    const now = new Date();
    
    for (let i = 0; i < 15; i++) {
      const runDate = new Date(now.getTime() - (i * 24 * 60 * 60 * 1000));
      const project = projects[Math.floor(Math.random() * projects.length)];
      const totalTests = Math.floor(Math.random() * 20) + 5;
      const passedTests = Math.floor(Math.random() * totalTests);
      const failedTests = totalTests - passedTests;
      
      runs.push({
        id: `run-${i}`,
        date: runDate,
        projectName: project?.name || 'Sample Project',
        projectId: project?.id || 'sample',
        executedBy: 'John Developer',
        totalTests,
        passedTests,
        failedTests,
        duration: Math.floor(Math.random() * 300) + 60, // 1-5 minutes
        status: failedTests === 0 ? 'passed' : 'failed'
      });
    }
    
    return runs.reverse();
  };

  const testRuns = generateTestRuns();

  const filteredRuns = selectedProject === 'all' 
    ? testRuns 
    : testRuns.filter(run => run.projectId === selectedProject);

  // Calculate overall statistics
  const totalRuns = filteredRuns.length;
  const passedRuns = filteredRuns.filter(run => run.status === 'passed').length;
  const failedRuns = totalRuns - passedRuns;
  const successRate = totalRuns > 0 ? Math.round((passedRuns / totalRuns) * 100) : 0;

  // Prepare chart data
  const pieData = [
    { name: 'Passed', value: passedRuns, color: '#22c55e' },
    { name: 'Failed', value: failedRuns, color: '#ef4444' }
  ];

  const barData = filteredRuns.slice(-7).map(run => ({
    date: run.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    passed: run.passedTests,
    failed: run.failedTests,
    total: run.totalTests
  }));

  const trendData = filteredRuns.slice(-10).map(run => ({
    date: run.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    successRate: Math.round((run.passedTests / run.totalTests) * 100)
  }));

  const handleExport = (format: 'csv' | 'pdf') => {
    // Mock export functionality
    console.log(`Exporting results as ${format.toUpperCase()}`);
    
    if (format === 'csv') {
      const csvContent = [
        'Run ID,Date,Project,Executed By,Total Tests,Passed,Failed,Duration (min),Status',
        ...filteredRuns.map(run => 
          `${run.id},"${run.date.toISOString()}","${run.projectName}","${run.executedBy}",${run.totalTests},${run.passedTests},${run.failedTests},${Math.round(run.duration / 60)},"${run.status}"`
        )
      ].join('\n');
      
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `test-results-${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Test Results & Reports</h1>
          <p className="text-muted-foreground">
            Analyze test execution history and performance metrics
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => handleExport('csv')} className="gap-2">
            <Download className="w-4 h-4" />
            Export CSV
          </Button>
          <Button variant="outline" onClick={() => handleExport('pdf')} className="gap-2">
            <Download className="w-4 h-4" />
            Export PDF
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="flex gap-4 p-4">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Project:</label>
            <Select value={selectedProject} onValueChange={setSelectedProject}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Projects</SelectItem>
                {projects.map(project => (
                  <SelectItem key={project.id} value={project.id}>
                    {project.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Time Range:</label>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Runs</CardTitle>
            <Calendar className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRuns}</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <TrendingUp className="w-4 h-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{successRate}%</div>
            <p className="text-xs text-muted-foreground">
              +5% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Passed Tests</CardTitle>
            <TrendingUp className="w-4 h-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{filteredRuns.reduce((acc, run) => acc + run.passedTests, 0)}</div>
            <p className="text-xs text-muted-foreground">
              Total across all runs
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failed Tests</CardTitle>
            <TrendingDown className="w-4 h-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{filteredRuns.reduce((acc, run) => acc + run.failedTests, 0)}</div>
            <p className="text-xs text-muted-foreground">
              Total across all runs
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Pass/Fail Distribution</CardTitle>
            <CardDescription>Overall test results breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 mt-4">
              {pieData.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm">{item.name}: {item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Success Rate Trend</CardTitle>
            <CardDescription>Test success rate over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[0, 100]} />
                <Tooltip formatter={(value) => [`${value}%`, 'Success Rate']} />
                <Line 
                  type="monotone" 
                  dataKey="successRate" 
                  stroke="#22c55e" 
                  strokeWidth={2}
                  dot={{ fill: '#22c55e' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Test Results by Day</CardTitle>
          <CardDescription>Daily test execution results (last 7 days)</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="passed" stackId="a" fill="#22c55e" name="Passed" />
              <Bar dataKey="failed" stackId="a" fill="#ef4444" name="Failed" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Test Run History */}
      <Card>
        <CardHeader>
          <CardTitle>Test Run History</CardTitle>
          <CardDescription>Recent test executions and their results</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Run ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Executed By</TableHead>
                <TableHead>Total Tests</TableHead>
                <TableHead>Passed</TableHead>
                <TableHead>Failed</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRuns.slice(0, 10).map((run) => (
                <TableRow key={run.id}>
                  <TableCell className="font-mono text-sm">{run.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      {run.date.toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>{run.projectName}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-muted-foreground" />
                      {run.executedBy}
                    </div>
                  </TableCell>
                  <TableCell>{run.totalTests}</TableCell>
                  <TableCell className="text-green-600 font-medium">{run.passedTests}</TableCell>
                  <TableCell className="text-red-600 font-medium">{run.failedTests}</TableCell>
                  <TableCell>{Math.round(run.duration / 60)}m {run.duration % 60}s</TableCell>
                  <TableCell>
                    <Badge variant={run.status === 'passed' ? 'default' : 'destructive'}>
                      {run.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {filteredRuns.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No test runs found for the selected criteria.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}