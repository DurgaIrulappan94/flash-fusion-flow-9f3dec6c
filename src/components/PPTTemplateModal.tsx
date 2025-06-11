
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { X, Sparkles } from 'lucide-react';
import { useState } from 'react';

interface PPTTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const templates = [
  {
    id: 0,
    name: 'Default Template',
    description: 'Use our AI-powered default template with custom content generation',
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop',
    color: 'from-indigo-500 to-purple-600',
    isDefault: true
  },
  {
    id: 1,
    name: 'Business Professional',
    description: 'Clean and modern design for business presentations',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop',
    color: 'from-blue-500 to-indigo-600'
  },
  {
    id: 2,
    name: 'Creative Portfolio',
    description: 'Vibrant and artistic template for creative projects',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop',
    color: 'from-purple-500 to-pink-600'
  },
  {
    id: 3,
    name: 'Tech Startup',
    description: 'Modern tech-focused design with sleek animations',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop',
    color: 'from-green-500 to-teal-600'
  },
  {
    id: 4,
    name: 'Academic Research',
    description: 'Professional template for research presentations',
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop',
    color: 'from-orange-500 to-red-600'
  },
  {
    id: 5,
    name: 'Marketing Pitch',
    description: 'Eye-catching design for marketing presentations',
    image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=300&fit=crop',
    color: 'from-pink-500 to-rose-600'
  },
  {
    id: 6,
    name: 'Minimalist',
    description: 'Clean and simple design with focus on content',
    image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=300&fit=crop',
    color: 'from-gray-500 to-slate-600'
  }
];

export const PPTTemplateModal = ({ isOpen, onClose }: PPTTemplateModalProps) => {
  const [selectedTemplate, setSelectedTemplate] = useState<typeof templates[0] | null>(null);
  const [presentationTopic, setPresentationTopic] = useState('');
  const [additionalRequirements, setAdditionalRequirements] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleTemplateSelect = (template: typeof templates[0]) => {
    if (template.isDefault) {
      setSelectedTemplate(template);
    } else {
      console.log('Selected template:', template.name);
      // TODO: Implement regular template selection logic
      onClose();
    }
  };

  const handleGenerateWithAI = async () => {
    if (!presentationTopic.trim()) {
      alert('Please enter a presentation topic');
      return;
    }

    setIsGenerating(true);
    console.log('Generating PPT with CrewAI:', {
      template: selectedTemplate?.name,
      topic: presentationTopic,
      requirements: additionalRequirements
    });

    // TODO: Integrate with your MCP server for CrewAI generation
    // This is where you'll call your Python MCP server
    try {
      // Example API call structure:
      // const response = await fetch('/api/mcp/generate-ppt', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     topic: presentationTopic,
      //     requirements: additionalRequirements,
      //     template: 'default'
      //   })
      // });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      alert('PPT generated successfully! (This is a placeholder - integrate with your MCP server)');
      onClose();
    } catch (error) {
      console.error('Error generating PPT:', error);
      alert('Error generating PPT. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleBackToTemplates = () => {
    setSelectedTemplate(null);
    setPresentationTopic('');
    setAdditionalRequirements('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden p-0">
        <DialogHeader className="p-6 pb-4 border-b bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-2xl font-bold text-gray-800">
                {selectedTemplate ? 'Generate AI Presentation' : 'Choose Your PPT Template'}
              </DialogTitle>
              <p className="text-gray-600 mt-1">
                {selectedTemplate 
                  ? 'Enter your topic and let AI create your presentation'
                  : 'Select a professional template to get started with your presentation'
                }
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8 rounded-full"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {selectedTemplate ? (
            // AI Generation Form
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">AI-Powered Presentation Generator</h3>
                <p className="text-gray-600">Tell us about your presentation and we'll create it for you</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-2">
                    Presentation Topic *
                  </label>
                  <Input
                    id="topic"
                    placeholder="e.g., Digital Marketing Strategy for 2024"
                    value={presentationTopic}
                    onChange={(e) => setPresentationTopic(e.target.value)}
                    className="w-full"
                  />
                </div>

                <div>
                  <label htmlFor="requirements" className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Requirements (Optional)
                  </label>
                  <Textarea
                    id="requirements"
                    placeholder="e.g., Include charts, focus on mobile marketing, 10 slides maximum..."
                    value={additionalRequirements}
                    onChange={(e) => setAdditionalRequirements(e.target.value)}
                    className="w-full h-24 resize-none"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={handleBackToTemplates}
                  className="flex-1"
                  disabled={isGenerating}
                >
                  Back to Templates
                </Button>
                <Button
                  onClick={handleGenerateWithAI}
                  className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white"
                  disabled={isGenerating || !presentationTopic.trim()}
                >
                  {isGenerating ? 'Generating...' : 'Generate with AI'}
                </Button>
              </div>
            </div>
          ) : (
            // Template Selection Grid
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.map((template) => (
                <Card 
                  key={template.id} 
                  className={`group cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 shadow-md overflow-hidden ${
                    template.isDefault ? 'ring-2 ring-indigo-500 ring-opacity-50' : ''
                  }`}
                  onClick={() => handleTemplateSelect(template)}
                >
                  <div className="relative">
                    <img 
                      src={template.image} 
                      alt={template.name}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${template.color} opacity-20 group-hover:opacity-30 transition-opacity duration-300`}></div>
                    {template.isDefault && (
                      <div className="absolute top-3 left-3">
                        <div className="bg-indigo-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          AI Powered
                        </div>
                      </div>
                    )}
                    <div className="absolute top-3 right-3">
                      <div className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-sm font-bold text-gray-700">→</span>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold text-lg text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                      {template.name}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {template.description}
                    </p>
                    <Button 
                      className={`w-full mt-4 bg-gradient-to-r ${template.color} hover:shadow-lg text-white font-semibold transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTemplateSelect(template);
                      }}
                    >
                      {template.isDefault ? 'Generate with AI' : 'Use This Template'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          
          <div className="mt-8 text-center">
            <p className="text-gray-500 text-sm">
              {selectedTemplate 
                ? 'Your presentation will be generated using CrewAI agents for professional results.'
                : 'More templates coming soon! Each template includes multiple slide layouts and color schemes.'
              }
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
