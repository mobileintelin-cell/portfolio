import { useState } from 'react';
import { 
  User, 
  MapPin, 
  FileText, 
  Briefcase, 
  Shield, 
  Upload, 
  CheckCircle, 
  AlertCircle,
  Camera,
  Eye,
  Download
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Separator } from './ui/separator';
import { Alert, AlertDescription } from './ui/alert';

type KYCStatus = 'not-started' | 'in-progress' | 'pending-review' | 'approved' | 'rejected';

type DocumentType = 'passport' | 'drivers-license' | 'national-id' | 'utility-bill' | 'bank-statement';

type KYCDocument = {
  id: string;
  type: DocumentType;
  fileName: string;
  uploadDate: Date;
  status: 'pending' | 'verified' | 'rejected';
  file?: File;
};

type KYCData = {
  // Personal Information
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  nationality: string;
  gender: string;
  
  // Contact Information
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  
  // Employment Information
  employmentStatus: string;
  occupation: string;
  employer: string;
  annualIncome: string;
  sourceOfFunds: string;
  
  // Risk Assessment
  politicallyExposed: string;
  riskTolerance: string;
  investmentExperience: string;
  
  // Documents
  documents: KYCDocument[];
  
  // Status
  status: KYCStatus;
  submissionDate?: Date;
  lastUpdated: Date;
};

export function KYC() {
  const [activeTab, setActiveTab] = useState('personal');
  const [kycData, setKycData] = useState<KYCData>({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    nationality: '',
    gender: '',
    email: 'john@company.com',
    phone: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    employmentStatus: '',
    occupation: '',
    employer: '',
    annualIncome: '',
    sourceOfFunds: '',
    politicallyExposed: '',
    riskTolerance: '',
    investmentExperience: '',
    documents: [],
    status: 'in-progress',
    lastUpdated: new Date()
  });

  const [dragActive, setDragActive] = useState<string | null>(null);

  const requiredDocuments: { type: DocumentType; label: string; description: string }[] = [
    {
      type: 'passport',
      label: 'Passport',
      description: 'Government-issued passport (photo page)'
    },
    {
      type: 'drivers-license',
      label: 'Driver\'s License',
      description: 'Valid driver\'s license (front and back)'
    },
    {
      type: 'national-id',
      label: 'National ID',
      description: 'Government-issued national identification'
    },
    {
      type: 'utility-bill',
      label: 'Utility Bill',
      description: 'Recent utility bill (within 3 months)'
    },
    {
      type: 'bank-statement',
      label: 'Bank Statement',
      description: 'Recent bank statement (within 3 months)'
    }
  ];

  const countries = [
    'United States', 'Canada', 'United Kingdom', 'Germany', 'France', 'Australia', 
    'Japan', 'Singapore', 'Netherlands', 'Switzerland', 'Other'
  ];

  const getCompletionPercentage = () => {
    const fields = [
      kycData.firstName, kycData.lastName, kycData.dateOfBirth, kycData.nationality,
      kycData.phone, kycData.address, kycData.city, kycData.country,
      kycData.employmentStatus, kycData.occupation, kycData.politicallyExposed
    ];
    
    const completedFields = fields.filter(field => field.trim() !== '').length;
    const documentsUploaded = kycData.documents.length;
    const requiredDocumentsCount = 2; // Minimum required
    
    const fieldCompletion = (completedFields / fields.length) * 70;
    const documentCompletion = Math.min(documentsUploaded / requiredDocumentsCount, 1) * 30;
    
    return Math.round(fieldCompletion + documentCompletion);
  };

  const getStatusBadge = (status: KYCStatus) => {
    const variants = {
      'not-started': { variant: 'outline' as const, label: 'Not Started' },
      'in-progress': { variant: 'secondary' as const, label: 'In Progress' },
      'pending-review': { variant: 'outline' as const, label: 'Pending Review' },
      'approved': { variant: 'default' as const, label: 'Approved' },
      'rejected': { variant: 'destructive' as const, label: 'Rejected' }
    };
    
    const config = variants[status];
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const handleInputChange = (field: keyof KYCData, value: string) => {
    setKycData(prev => ({
      ...prev,
      [field]: value,
      lastUpdated: new Date()
    }));
  };

  const handleDrop = (e: React.DragEvent, documentType: DocumentType) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(null);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0], documentType);
    }
  };

  const handleDrag = (e: React.DragEvent, documentType: DocumentType) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(documentType);
    } else if (e.type === 'dragleave') {
      setDragActive(null);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>, documentType: DocumentType) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0], documentType);
    }
  };

  const handleFileUpload = (file: File, documentType: DocumentType) => {
    const newDocument: KYCDocument = {
      id: Date.now().toString(),
      type: documentType,
      fileName: file.name,
      uploadDate: new Date(),
      status: 'pending',
      file
    };
    
    setKycData(prev => ({
      ...prev,
      documents: [...prev.documents.filter(doc => doc.type !== documentType), newDocument],
      lastUpdated: new Date()
    }));
  };

  const removeDocument = (documentId: string) => {
    setKycData(prev => ({
      ...prev,
      documents: prev.documents.filter(doc => doc.id !== documentId),
      lastUpdated: new Date()
    }));
  };

  const handleSubmit = () => {
    setKycData(prev => ({
      ...prev,
      status: 'pending-review',
      submissionDate: new Date(),
      lastUpdated: new Date()
    }));
  };

  const getDocumentIcon = (type: DocumentType) => {
    switch (type) {
      case 'passport':
      case 'drivers-license':
      case 'national-id':
        return <User className="w-5 h-5" />;
      case 'utility-bill':
      case 'bank-statement':
        return <FileText className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>KYC Verification</h1>
          <p className="text-muted-foreground">
            Complete your identity verification to access all platform features
          </p>
        </div>
        <div className="flex items-center gap-4">
          {getStatusBadge(kycData.status)}
          <div className="text-sm text-muted-foreground">
            {getCompletionPercentage()}% Complete
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Verification Progress</span>
              <span>{getCompletionPercentage()}%</span>
            </div>
            <Progress value={getCompletionPercentage()} />
          </div>
        </CardContent>
      </Card>

      {/* Status Alert */}
      {kycData.status === 'pending-review' && (
        <Alert>
          <AlertCircle className="w-4 h-4" />
          <AlertDescription>
            Your KYC application is under review. We'll notify you once the verification is complete. 
            This process typically takes 1-3 business days.
          </AlertDescription>
        </Alert>
      )}

      {kycData.status === 'approved' && (
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="w-4 h-4 text-green-600" />
          <AlertDescription className="text-green-800">
            Congratulations! Your identity has been successfully verified. You now have full access to all platform features.
          </AlertDescription>
        </Alert>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="personal" className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span className="hidden sm:inline">Personal</span>
          </TabsTrigger>
          <TabsTrigger value="contact" className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span className="hidden sm:inline">Contact</span>
          </TabsTrigger>
          <TabsTrigger value="employment" className="flex items-center gap-2">
            <Briefcase className="w-4 h-4" />
            <span className="hidden sm:inline">Employment</span>
          </TabsTrigger>
          <TabsTrigger value="documents" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            <span className="hidden sm:inline">Documents</span>
          </TabsTrigger>
          <TabsTrigger value="review" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            <span className="hidden sm:inline">Review</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Please provide your personal details as they appear on your government-issued ID
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    value={kycData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    placeholder="Enter your first name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={kycData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    placeholder="Enter your last name"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={kycData.dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nationality">Nationality *</Label>
                  <Select
                    value={kycData.nationality}
                    onValueChange={(value) => handleInputChange('nationality', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select nationality" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map(country => (
                        <SelectItem key={country} value={country}>{country}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-3">
                <Label>Gender</Label>
                <RadioGroup
                  value={kycData.gender}
                  onValueChange={(value) => handleInputChange('gender', value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female">Female</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="other" />
                    <Label htmlFor="other">Other</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="prefer-not-to-say" id="prefer-not-to-say" />
                    <Label htmlFor="prefer-not-to-say">Prefer not to say</Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>
                Provide your current contact details and residential address
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={kycData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={kycData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="+1 (555) 123-4567"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address">Street Address *</Label>
                <Input
                  id="address"
                  value={kycData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="Enter your street address"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    value={kycData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    placeholder="Enter city"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State/Province</Label>
                  <Input
                    id="state"
                    value={kycData.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    placeholder="Enter state"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="postalCode">Postal Code</Label>
                  <Input
                    id="postalCode"
                    value={kycData.postalCode}
                    onChange={(e) => handleInputChange('postalCode', e.target.value)}
                    placeholder="Enter postal code"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="country">Country *</Label>
                <Select
                  value={kycData.country}
                  onValueChange={(value) => handleInputChange('country', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map(country => (
                      <SelectItem key={country} value={country}>{country}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="employment" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Employment & Financial Information</CardTitle>
              <CardDescription>
                Help us understand your employment status and source of funds
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="employmentStatus">Employment Status *</Label>
                  <Select
                    value={kycData.employmentStatus}
                    onValueChange={(value) => handleInputChange('employmentStatus', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select employment status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="employed">Employed</SelectItem>
                      <SelectItem value="self-employed">Self-Employed</SelectItem>
                      <SelectItem value="unemployed">Unemployed</SelectItem>
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="retired">Retired</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="occupation">Occupation *</Label>
                  <Input
                    id="occupation"
                    value={kycData.occupation}
                    onChange={(e) => handleInputChange('occupation', e.target.value)}
                    placeholder="e.g., Software Developer"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="employer">Employer/Company</Label>
                <Input
                  id="employer"
                  value={kycData.employer}
                  onChange={(e) => handleInputChange('employer', e.target.value)}
                  placeholder="Enter company name"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="annualIncome">Annual Income Range</Label>
                  <Select
                    value={kycData.annualIncome}
                    onValueChange={(value) => handleInputChange('annualIncome', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select income range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="under-25k">Under $25,000</SelectItem>
                      <SelectItem value="25k-50k">$25,000 - $50,000</SelectItem>
                      <SelectItem value="50k-100k">$50,000 - $100,000</SelectItem>
                      <SelectItem value="100k-250k">$100,000 - $250,000</SelectItem>
                      <SelectItem value="250k-500k">$250,000 - $500,000</SelectItem>
                      <SelectItem value="over-500k">Over $500,000</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="sourceOfFunds">Source of Funds</Label>
                  <Select
                    value={kycData.sourceOfFunds}
                    onValueChange={(value) => handleInputChange('sourceOfFunds', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select source" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="salary">Salary/Wages</SelectItem>
                      <SelectItem value="business">Business Income</SelectItem>
                      <SelectItem value="investments">Investment Returns</SelectItem>
                      <SelectItem value="inheritance">Inheritance</SelectItem>
                      <SelectItem value="savings">Personal Savings</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h4>Risk Assessment</h4>
                
                <div className="space-y-3">
                  <Label>Are you a politically exposed person (PEP)?</Label>
                  <RadioGroup
                    value={kycData.politicallyExposed}
                    onValueChange={(value) => handleInputChange('politicallyExposed', value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="pep-yes" />
                      <Label htmlFor="pep-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="pep-no" />
                      <Label htmlFor="pep-no">No</Label>
                    </div>
                  </RadioGroup>
                  <p className="text-sm text-muted-foreground">
                    A PEP is someone who holds a prominent public position or has close connections to such a person.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="riskTolerance">Risk Tolerance</Label>
                  <Select
                    value={kycData.riskTolerance}
                    onValueChange={(value) => handleInputChange('riskTolerance', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select risk tolerance" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="conservative">Conservative</SelectItem>
                      <SelectItem value="moderate">Moderate</SelectItem>
                      <SelectItem value="aggressive">Aggressive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="investmentExperience">Investment Experience</Label>
                  <Select
                    value={kycData.investmentExperience}
                    onValueChange={(value) => handleInputChange('investmentExperience', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner (0-1 years)</SelectItem>
                      <SelectItem value="intermediate">Intermediate (2-5 years)</SelectItem>
                      <SelectItem value="experienced">Experienced (5+ years)</SelectItem>
                      <SelectItem value="expert">Expert (10+ years)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Document Upload</CardTitle>
              <CardDescription>
                Please upload clear, high-quality images of your identification documents
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert>
                <FileText className="w-4 h-4" />
                <AlertDescription>
                  <strong>Document Requirements:</strong>
                  <ul className="mt-2 list-disc list-inside space-y-1 text-sm">
                    <li>Documents must be in color and clearly readable</li>
                    <li>All four corners of the document must be visible</li>
                    <li>File formats: JPG, PNG, PDF (max 10MB per file)</li>
                    <li>Documents must be valid and not expired</li>
                  </ul>
                </AlertDescription>
              </Alert>
              
              <div className="space-y-4">
                <h4>Identity Documents (Choose one)</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {requiredDocuments.slice(0, 3).map((docType) => {
                    const existingDoc = kycData.documents.find(doc => doc.type === docType.type);
                    
                    return (
                      <div key={docType.type} className="space-y-2">
                        <div
                          className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer ${
                            dragActive === docType.type
                              ? 'border-primary bg-primary/5'
                              : existingDoc
                              ? 'border-green-500 bg-green-50'
                              : 'border-muted-foreground/25 hover:border-muted-foreground/50'
                          }`}
                          onDragEnter={(e) => handleDrag(e, docType.type)}
                          onDragLeave={(e) => handleDrag(e, docType.type)}
                          onDragOver={(e) => handleDrag(e, docType.type)}
                          onDrop={(e) => handleDrop(e, docType.type)}
                        >
                          <input
                            type="file"
                            accept="image/*,.pdf"
                            onChange={(e) => handleFileInput(e, docType.type)}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          />
                          
                          {existingDoc ? (
                            <div className="space-y-2">
                              <CheckCircle className="w-8 h-8 mx-auto text-green-500" />
                              <p className="font-medium text-green-700">{existingDoc.fileName}</p>
                              <p className="text-sm text-green-600">Uploaded successfully</p>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeDocument(existingDoc.id);
                                }}
                              >
                                Replace
                              </Button>
                            </div>
                          ) : (
                            <div className="space-y-2">
                              {getDocumentIcon(docType.type)}
                              <p className="font-medium">{docType.label}</p>
                              <p className="text-sm text-muted-foreground">{docType.description}</p>
                              <div className="flex items-center justify-center gap-2 text-sm">
                                <Upload className="w-4 h-4" />
                                <span>Click or drag to upload</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h4>Proof of Address (Choose one)</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {requiredDocuments.slice(3, 5).map((docType) => {
                    const existingDoc = kycData.documents.find(doc => doc.type === docType.type);
                    
                    return (
                      <div key={docType.type} className="space-y-2">
                        <div
                          className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer ${
                            dragActive === docType.type
                              ? 'border-primary bg-primary/5'
                              : existingDoc
                              ? 'border-green-500 bg-green-50'
                              : 'border-muted-foreground/25 hover:border-muted-foreground/50'
                          }`}
                          onDragEnter={(e) => handleDrag(e, docType.type)}
                          onDragLeave={(e) => handleDrag(e, docType.type)}
                          onDragOver={(e) => handleDrag(e, docType.type)}
                          onDrop={(e) => handleDrop(e, docType.type)}
                        >
                          <input
                            type="file"
                            accept="image/*,.pdf"
                            onChange={(e) => handleFileInput(e, docType.type)}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          />
                          
                          {existingDoc ? (
                            <div className="space-y-2">
                              <CheckCircle className="w-8 h-8 mx-auto text-green-500" />
                              <p className="font-medium text-green-700">{existingDoc.fileName}</p>
                              <p className="text-sm text-green-600">Uploaded successfully</p>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeDocument(existingDoc.id);
                                }}
                              >
                                Replace
                              </Button>
                            </div>
                          ) : (
                            <div className="space-y-2">
                              {getDocumentIcon(docType.type)}
                              <p className="font-medium">{docType.label}</p>
                              <p className="text-sm text-muted-foreground">{docType.description}</p>
                              <div className="flex items-center justify-center gap-2 text-sm">
                                <Upload className="w-4 h-4" />
                                <span>Click or drag to upload</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              {kycData.documents.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Uploaded Documents</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {kycData.documents.map((doc) => (
                        <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            {getDocumentIcon(doc.type)}
                            <div>
                              <p className="font-medium">{doc.fileName}</p>
                              <p className="text-sm text-muted-foreground">
                                Uploaded {doc.uploadDate.toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={
                              doc.status === 'verified' ? 'default' :
                              doc.status === 'rejected' ? 'destructive' : 'outline'
                            }>
                              {doc.status}
                            </Badge>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeDocument(doc.id)}
                            >
                              Remove
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="review" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Review & Submit</CardTitle>
              <CardDescription>
                Please review your information before submitting for verification
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4>Personal Information</h4>
                    <div className="text-sm space-y-1 mt-2">
                      <p><span className="font-medium">Name:</span> {kycData.firstName} {kycData.lastName}</p>
                      <p><span className="font-medium">Date of Birth:</span> {kycData.dateOfBirth}</p>
                      <p><span className="font-medium">Nationality:</span> {kycData.nationality}</p>
                      <p><span className="font-medium">Gender:</span> {kycData.gender}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4>Contact Information</h4>
                    <div className="text-sm space-y-1 mt-2">
                      <p><span className="font-medium">Email:</span> {kycData.email}</p>
                      <p><span className="font-medium">Phone:</span> {kycData.phone}</p>
                      <p><span className="font-medium">Address:</span> {kycData.address}</p>
                      <p><span className="font-medium">City:</span> {kycData.city}, {kycData.state}</p>
                      <p><span className="font-medium">Country:</span> {kycData.country}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4>Employment Information</h4>
                    <div className="text-sm space-y-1 mt-2">
                      <p><span className="font-medium">Status:</span> {kycData.employmentStatus}</p>
                      <p><span className="font-medium">Occupation:</span> {kycData.occupation}</p>
                      <p><span className="font-medium">Employer:</span> {kycData.employer}</p>
                      <p><span className="font-medium">Income:</span> {kycData.annualIncome}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4>Documents Uploaded</h4>
                    <div className="text-sm space-y-1 mt-2">
                      {kycData.documents.map((doc) => (
                        <p key={doc.id}>
                          <span className="font-medium">{doc.type}:</span> {doc.fileName}
                        </p>
                      ))}
                      {kycData.documents.length === 0 && (
                        <p className="text-muted-foreground">No documents uploaded</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <Alert>
                  <Shield className="w-4 h-4" />
                  <AlertDescription>
                    <strong>Declaration:</strong> I confirm that all the information provided is true and accurate to the best of my knowledge. 
                    I understand that providing false information may result in the rejection of my application and potential legal consequences.
                  </AlertDescription>
                </Alert>
                
                <div className="flex gap-4">
                  <Button 
                    onClick={handleSubmit}
                    disabled={getCompletionPercentage() < 80 || kycData.status === 'pending-review'}
                    className="flex-1"
                  >
                    {kycData.status === 'pending-review' ? 'Submitted for Review' : 'Submit for Verification'}
                  </Button>
                  <Button variant="outline" onClick={() => setActiveTab('personal')}>
                    Edit Information
                  </Button>
                </div>
                
                {getCompletionPercentage() < 80 && (
                  <p className="text-sm text-muted-foreground">
                    Please complete at least 80% of the form to submit for verification.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}