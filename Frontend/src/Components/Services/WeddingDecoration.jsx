import React from 'react';
import { useState } from 'react';

const WeddingDecoration = () => {
  const images = [
    'path/to/image1.jpg',
    'path/to/image2.jpg',
    'path/to/image3.jpg',
  ];

  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  React.useEffect(() => {
    const interval = setInterval(nextImage, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="service-container">
      <h2 className="text-2xl font-bold">Wedding Decoration</h2>
      <div className="image-slider">
        <img src={images[currentImage]} alt="Wedding Decoration" className="w-full h-auto" />
      </div>
      <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">View Full Gallery</button>
    </div>
  );
};

export default WeddingDecoration;
