
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Trash2, Plus, Edit2, Save, X, Image as ImageIcon } from 'lucide-react';

interface SlideData {
  id: number;
  title: string;
  subtitle?: string;
  content: string[];
  slideType: 'title' | 'content' | 'closing';
  layout: string;
  images: string[];
}

interface SlidePreviewProps {
  slides: SlideData[];
  onSlidesChange: (slides: SlideData[]) => void;
  onImageUpload: (slideId: number, imageFile: File) => void;
}

export const SlidePreview = ({ slides, onSlidesChange, onImageUpload }: SlidePreviewProps) => {
  const [editingSlide, setEditingSlide] = useState<number | null>(null);
  const [editData, setEditData] = useState<SlideData | null>(null);

  const handleEditStart = (slide: SlideData) => {
    setEditingSlide(slide.id);
    setEditData({ ...slide });
  };

  const handleEditSave = () => {
    if (editData) {
      const updatedSlides = slides.map(slide => 
        slide.id === editData.id ? editData : slide
      );
      onSlidesChange(updatedSlides);
      setEditingSlide(null);
      setEditData(null);
    }
  };

  const handleEditCancel = () => {
    setEditingSlide(null);
    setEditData(null);
  };

  const handleDeleteSlide = (slideId: number) => {
    const updatedSlides = slides.filter(slide => slide.id !== slideId);
    onSlidesChange(updatedSlides);
  };

  const handleAddContentPoint = () => {
    if (editData) {
      setEditData({
        ...editData,
        content: [...editData.content, 'New point']
      });
    }
  };

  const handleContentChange = (index: number, value: string) => {
    if (editData) {
      const newContent = [...editData.content];
      newContent[index] = value;
      setEditData({
        ...editData,
        content: newContent
      });
    }
  };

  const handleRemoveContentPoint = (index: number) => {
    if (editData) {
      const newContent = editData.content.filter((_, i) => i !== index);
      setEditData({
        ...editData,
        content: newContent
      });
    }
  };

  const handleImageUpload = (slideId: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageUpload(slideId, file);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">Slide Preview ({slides.length} slides)</h3>
      
      <div className="grid gap-4">
        {slides.map((slide, index) => (
          <Card key={slide.id} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-muted-foreground">
                    Slide {index + 1}
                  </span>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    {slide.slideType}
                  </span>
                </div>
                <div className="flex gap-2">
                  {editingSlide === slide.id ? (
                    <>
                      <Button size="sm" onClick={handleEditSave}>
                        <Save className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={handleEditCancel}>
                        <X className="w-4 h-4" />
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button size="sm" variant="outline" onClick={() => handleEditStart(slide)}>
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDeleteSlide(slide.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </>
                  )}
                </div>
              </div>

              {editingSlide === slide.id && editData ? (
                <div className="space-y-4">
                  <Input
                    value={editData.title}
                    onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                    placeholder="Slide title"
                  />
                  
                  {editData.subtitle !== undefined && (
                    <Input
                      value={editData.subtitle}
                      onChange={(e) => setEditData({ ...editData, subtitle: e.target.value })}
                      placeholder="Subtitle"
                    />
                  )}
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Content Points:</label>
                    {editData.content.map((point, idx) => (
                      <div key={idx} className="flex gap-2">
                        <Input
                          value={point}
                          onChange={(e) => handleContentChange(idx, e.target.value)}
                          className="flex-1"
                        />
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleRemoveContentPoint(idx)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                    <Button size="sm" variant="outline" onClick={handleAddContentPoint}>
                      <Plus className="w-4 h-4 mr-1" />
                      Add Point
                    </Button>
                  </div>
                  
                  <div className="flex gap-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(slide.id, e)}
                        className="hidden"
                      />
                      <Button size="sm" variant="outline" asChild>
                        <span>
                          <ImageIcon className="w-4 h-4 mr-1" />
                          Add Image
                        </span>
                      </Button>
                    </label>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div 
                    className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border"
                    style={{
                      backgroundImage: 'url(/lovable-uploads/0e4a1609-fc1c-4b31-a93b-5415dbbd9666.png)',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      minHeight: '200px',
                      position: 'relative'
                    }}
                  >
                    <div className="bg-white/90 p-3 rounded">
                      <h4 className="font-bold text-lg text-gray-800 mb-2">{slide.title}</h4>
                      {slide.subtitle && (
                        <p className="text-gray-600 mb-3">{slide.subtitle}</p>
                      )}
                      <ul className="space-y-1">
                        {slide.content.map((point, idx) => (
                          <li key={idx} className="text-sm text-gray-700">• {point}</li>
                        ))}
                      </ul>
                    </div>
                    
                    {slide.images.length > 0 && (
                      <div className="absolute top-2 right-2 flex gap-2">
                        {slide.images.map((img, idx) => (
                          <img
                            key={idx}
                            src={img}
                            alt={`Slide ${slide.id} image ${idx + 1}`}
                            className="w-16 h-16 object-cover rounded border-2 border-white"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
