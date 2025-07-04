
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { X, Sparkles, Download } from 'lucide-react';
import { useState } from 'react';
import { SlidePreview } from './SlidePreview';
import { addImageToSlide } from '../utils/imageUpload';
import { generatePresentationContent } from '../utils/crewAI';

interface PPTTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SlideData {
  id: number;
  title: string;
  subtitle?: string;
  content: string[];
  slideType: 'title' | 'content' | 'closing';
  layout: string;
  images: string[];
  agent_source?: string;
}

const templates = [
  {
    id: 0,
    name: 'Professional Corporate Template',
    description: 'Use our AI-powered professional template with CrewAI content generation',
    image: '/lovable-uploads/0e4a1609-fc1c-4b31-a93b-5415dbbd9666.png',
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
  const [templatePath, setTemplatePath] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedSlides, setGeneratedSlides] = useState<SlideData[]>([]);
  const [showDownload, setShowDownload] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const handleTemplateSelect = (template: typeof templates[0]) => {
    if (template.isDefault) {
      setSelectedTemplate(template);
    } else {
      console.log('Selected template:', template.name);
      onClose();
    }
  };

  const generateSlidesWithCrewAI = async (topic: string, requirements: string, templatePath: string) => {
    console.log('🚀 Initializing CrewAI Multi-Agent System for:', { topic, requirements, templatePath });
    
    try {
      // Use the TypeScript CrewAI function
      const crewAISlides = await generatePresentationContent(topic, requirements);
      
      console.log('✅ CrewAI Multi-Agent Content Generation Complete!');
      console.log(`📊 Generated ${crewAISlides.length} slides with agent collaboration`);
      
      return crewAISlides;
      
    } catch (error) {
      console.error('Error in CrewAI content generation:', error);
      // Fallback to basic content if CrewAI fails
      return [];
    }
  };

  const generatePPT = async (slides: any[]) => {
    try {
      const PptxGenJS = (await import('pptxgenjs')).default;
      const pptx = new PptxGenJS();
      
      pptx.author = 'Flash Fusion Flow - Professional Services';
      pptx.company = 'Generated by CrewAI';
      pptx.subject = presentationTopic;
      pptx.title = presentationTopic;

      slides.forEach((slide, index) => {
        const slideObj = pptx.addSlide();
        
        // Add your corporate template as background image
        slideObj.addImage({
          path: '/lovable-uploads/0e4a1609-fc1c-4b31-a93b-5415dbbd9666.png',
          x: 0,
          y: 0,
          w: '100%',
          h: '100%',
          sizing: { type: 'cover', w: '100%', h: '100%' }
        });
        
        // Add user uploaded images if any
        slide.images.forEach((imageDataUrl: string, imgIndex: number) => {
          slideObj.addImage({
            data: imageDataUrl,
            x: 6 + (imgIndex * 1.5),
            y: 1,
            w: 1.4,
            h: 1.4
          });
        });
        
        if (slide.slideType === 'title') {
          // Title slide - centered positioning with balanced spacing
          slideObj.addText(slide.title, {
            x: 1,
            y: 2.5,
            w: 8,
            h: 1.2,
            fontSize: 28,
            bold: true,
            color: '2C3E50',
            align: 'center',
            fontFace: 'Arial'
          });
          
          if (slide.subtitle) {
            slideObj.addText(slide.subtitle, {
              x: 1,
              y: 3.8,
              w: 8,
              h: 0.8,
              fontSize: 18,
              color: '34495E',
              align: 'center',
              fontFace: 'Arial'
            });
          }
          
          // Add powered by text in footer area
          slideObj.addText('Powered by CrewAI & Flash Fusion Flow', {
            x: 1,
            y: 6.5,
            w: 8,
            h: 0.4,
            fontSize: 12,
            color: '7F8C8D',
            align: 'center',
            italic: true,
            fontFace: 'Arial'
          });
        } else if (slide.slideType === 'closing') {
          // Closing slide - centered with balanced spacing
          slideObj.addText(slide.title, {
            x: 1,
            y: 2.8,
            w: 8,
            h: 1.2,
            fontSize: 26,
            bold: true,
            color: '2C3E50',
            align: 'center',
            fontFace: 'Arial'
          });
          
          if (slide.subtitle) {
            slideObj.addText(slide.subtitle, {
              x: 1,
              y: 4.2,
              w: 8,
              h: 0.8,
              fontSize: 16,
              color: '34495E',
              align: 'center',
              fontFace: 'Arial'
            });
          }
        } else {
          // Content slides - improved positioning with proper spacing
          slideObj.addText(slide.title, {
            x: 0.8,
            y: 0.8,
            w: 8.4,
            h: 0.7,
            fontSize: 22,
            bold: true,
            color: '2C3E50',
            fontFace: 'Arial'
          });
          
          // Add content bullets with improved spacing and positioning
          const startY = 1.8;
          const lineHeight = 0.45;
          const maxContentLines = Math.min(slide.content.length, 10); // Limit to prevent overflow
          
          slide.content.slice(0, maxContentLines).forEach((point: string, pointIndex: number) => {
            slideObj.addText(`• ${point}`, {
              x: 1,
              y: startY + (pointIndex * lineHeight),
              w: 7.5,
              h: 0.4,
              fontSize: 13,
              color: '34495E',
              bullet: false,
              fontFace: 'Arial',
              lineSpacing: 18
            });
          });
          
          // Add slide number in bottom right
          slideObj.addText(`${index + 1}`, {
            x: 8.8,
            y: 6.8,
            w: 0.4,
            h: 0.3,
            fontSize: 10,
            color: '95A5A6',
            align: 'center',
            fontFace: 'Arial'
          });
        }
      });

      return pptx;
    } catch (error) {
      console.error('Error generating PPT:', error);
      throw error;
    }
  };

  const handleGenerateWithAI = async () => {
    if (!presentationTopic.trim()) {
      alert('Please enter a presentation topic');
      return;
    }

    setIsGenerating(true);
    try {
      console.log('🚀 Starting CrewAI Multi-Agent Content Generation...');
      const slides = await generateSlidesWithCrewAI(
        presentationTopic, 
        additionalRequirements, 
        templatePath
      );
      
      if (slides.length === 0) {
        throw new Error('No content generated by CrewAI agents');
      }
      
      setGeneratedSlides(slides);
      setShowPreview(true);
      
      console.log('✅ CrewAI presentation generation successful:', slides);
    } catch (error) {
      console.error('Error in CrewAI generation:', error);
      alert('Error generating presentation with CrewAI. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleImageUpload = async (slideId: number, imageFile: File) => {
    try {
      const updatedSlides = await addImageToSlide(slideId, imageFile, generatedSlides);
      setGeneratedSlides(updatedSlides);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image. Please try again.');
    }
  };

  const handleSlidesChange = (updatedSlides: any[]) => {
    setGeneratedSlides(updatedSlides);
  };

  const handleDownloadPPT = async () => {
    try {
      const pptx = await generatePPT(generatedSlides);
      const fileName = `${presentationTopic.replace(/\s+/g, '_')}_Professional_Presentation.pptx`;
      await pptx.writeFile({ fileName });
      
      alert('Professional presentation downloaded successfully!');
    } catch (error) {
      console.error('Error downloading PPT:', error);
      alert('Error downloading presentation. Please try again.');
    }
  };

  const handleBackToTemplates = () => {
    setSelectedTemplate(null);
    setPresentationTopic('');
    setAdditionalRequirements('');
    setTemplatePath('');
    setGeneratedSlides([]);
    setShowDownload(false);
    setShowPreview(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden p-0">
        <DialogHeader className="p-6 pb-4 border-b bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-2xl font-bold text-gray-800">
                {selectedTemplate ? 'CrewAI Multi-Agent Presentation Generator' : 'Choose Your PPT Template'}
              </DialogTitle>
              <p className="text-gray-600 mt-1">
                {selectedTemplate 
                  ? 'Enter your topic and let CrewAI agents collaborate to create comprehensive content'
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
            <div className="max-w-4xl mx-auto space-y-6">
              {!showPreview ? (
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4">
                      <Sparkles className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">CrewAI Multi-Agent Content Creation</h3>
                    <p className="text-gray-600">Research Specialist, Content Analyst, Content Organizer, and PPT Designer agents will collaborate to create your presentation</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-2">
                        Presentation Topic *
                      </label>
                      <Input
                        id="topic"
                        placeholder="e.g., Digital Transformation Strategy, Market Expansion Plan, Product Launch Strategy"
                        value={presentationTopic}
                        onChange={(e) => setPresentationTopic(e.target.value)}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label htmlFor="template-path" className="block text-sm font-medium text-gray-700 mb-2">
                        Custom Template Path (Optional)
                      </label>
                      <Input
                        id="template-path"
                        placeholder="e.g., /path/to/your/custom-template.pptx (Leave empty to use default corporate template)"
                        value={templatePath}
                        onChange={(e) => setTemplatePath(e.target.value)}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label htmlFor="requirements" className="block text-sm font-medium text-gray-700 mb-2">
                        Additional Requirements (Optional)
                      </label>
                      <Textarea
                        id="requirements"
                        placeholder="e.g., Include financial projections, focus on competitive analysis, add risk assessment, target executive audience, include implementation timeline..."
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
                      <Sparkles className="w-4 h-4 mr-2" />
                      {isGenerating ? 'CrewAI Agents Working...' : 'Generate with CrewAI'}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <SlidePreview
                    slides={generatedSlides}
                    onSlidesChange={handleSlidesChange}
                    onImageUpload={handleImageUpload}
                  />
                  
                  <div className="flex gap-3 pt-4 border-t">
                    <Button
                      variant="outline"
                      onClick={() => setShowPreview(false)}
                      className="flex-1"
                    >
                      Back to Edit
                    </Button>
                    <Button
                      onClick={handleDownloadPPT}
                      className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Professional PPT
                    </Button>
                  </div>
                </div>
              )}
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
                ? 'Your professional presentation will be generated using CrewAI agents with comprehensive business content and will be available for download.'
                : 'More templates coming soon! Each template includes multiple slide layouts and color schemes.'
              }
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
