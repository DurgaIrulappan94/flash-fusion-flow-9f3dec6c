
export const uploadImageToSlide = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      const result = event.target?.result;
      if (typeof result === 'string') {
        resolve(result);
      } else {
        reject(new Error('Failed to read image file'));
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Error reading image file'));
    };
    
    reader.readAsDataURL(file);
  });
};

export const addImageToSlide = async (slideId: number, imageFile: File, slides: any[]) => {
  try {
    const imageDataUrl = await uploadImageToSlide(imageFile);
    
    const updatedSlides = slides.map(slide => {
      if (slide.id === slideId) {
        return {
          ...slide,
          images: [...slide.images, imageDataUrl]
        };
      }
      return slide;
    });
    
    return updatedSlides;
  } catch (error) {
    console.error('Error adding image to slide:', error);
    throw error;
  }
};
