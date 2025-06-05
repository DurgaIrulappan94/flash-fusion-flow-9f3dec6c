
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Presentation, Brain, Rss } from 'lucide-react';
import { PPTTemplateModal } from '@/components/PPTTemplateModal';

const Index = () => {
  const [isPPTModalOpen, setIsPPTModalOpen] = useState(false);

  const handlePPTClick = () => {
    setIsPPTModalOpen(true);
  };

  const handleMindmapClick = () => {
    console.log('Mindmap generator clicked');
    // TODO: Implement mindmap functionality
  };

  const handleRSSClick = () => {
    console.log('RSS news feed clicked');
    // TODO: Implement RSS functionality
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-6">
            Flash Fusion Flow
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your all-in-one creative toolkit for presentations, mind mapping, and staying informed
          </p>
        </div>

        {/* Main Action Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* PPT Generator Card */}
          <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-8 text-center">
              <div className="mb-6 relative">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Presentation className="w-10 h-10 text-white" />
                </div>
                <div className="absolute inset-0 w-20 h-20 mx-auto bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-300"></div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">PPT Generator</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Create stunning presentations with professional templates in minutes
              </p>
              <Button 
                onClick={handlePPTClick}
                className="w-full bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                Generate PPT
              </Button>
            </CardContent>
          </Card>

          {/* Mindmap Generator Card */}
          <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-8 text-center">
              <div className="mb-6 relative">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Brain className="w-10 h-10 text-white" />
                </div>
                <div className="absolute inset-0 w-20 h-20 mx-auto bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-300"></div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Mindmap Generator</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Visualize your ideas and create interactive mind maps effortlessly
              </p>
              <Button 
                onClick={handleMindmapClick}
                className="w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                Create Mindmap
              </Button>
            </CardContent>
          </Card>

          {/* RSS News Feed Card */}
          <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-8 text-center">
              <div className="mb-6 relative">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Rss className="w-10 h-10 text-white" />
                </div>
                <div className="absolute inset-0 w-20 h-20 mx-auto bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-300"></div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">RSS News Feed</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Stay updated with the latest news from your favorite sources
              </p>
              <Button 
                onClick={handleRSSClick}
                className="w-full bg-gradient-to-r from-purple-400 to-pink-500 hover:from-purple-500 hover:to-pink-600 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                View News Feed
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Why Choose Flash Fusion Flow?</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Lightning Fast</h3>
              <p className="text-gray-600 text-sm">Create content in seconds, not hours</p>
            </div>
            <div className="p-6">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Beautiful Design</h3>
              <p className="text-gray-600 text-sm">Professional templates and layouts</p>
            </div>
            <div className="p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Easy to Use</h3>
              <p className="text-gray-600 text-sm">Intuitive interface for everyone</p>
            </div>
          </div>
        </div>
      </div>

      {/* PPT Template Modal */}
      <PPTTemplateModal 
        isOpen={isPPTModalOpen} 
        onClose={() => setIsPPTModalOpen(false)} 
      />
    </div>
  );
};

export default Index;
