import React, { useState, useEffect } from 'react';

const HaldiDecoration = () => {
  const [images, setImages] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch images dynamically from the haldiImages folder
  useEffect(() => {
    const fetchImages = async () => {
      try {
        // Use dynamic import with import.meta.glob (Vite) or require.context (Webpack)
        const imageContext = import.meta.glob('../../assets/haldiDecorationImages/*.{jpg,jpeg,png}', { eager: true });

        // Convert the imported images into an array of objects
        const imageData = Object.values(imageContext).map((image, index) => ({
          src: image.default,
          description: `Stunning Haldi decoration setup ${index + 1} with vibrant colors and floral arrangements, perfect for your special day.`,
        }));

        // Randomly select 5 images
        const shuffledImages = imageData.sort(() => 0.5 - Math.random()).slice(0, 5);
        setImages(shuffledImages);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching images:', error);
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(nextImage, 3000);
    return () => clearInterval(interval);
  }, [images]);

  if (loading) {
    return <div>Loading...</div>; // Show a loading state while images are being fetched
  }

  if (images.length === 0) {
    return <div>No images found.</div>; // Show a message if no images are fetched
  }

  return (
    <div className="service-container flex flex-col h-screen bg-cover bg-center" style={{ backgroundImage: `url(${images[currentImage].src})` }}>
      <div className="flex-1 flex justify-center items-center backdrop-blur-sm bg-white/10 p-8">
        <div className="glass-card flex w-3/4 h-3/4 bg-white/20 backdrop-blur-lg rounded-lg shadow-2xl overflow-hidden">
          {/* Image Section */}
          <div className="w-1/2 flex justify-center items-center p-4">
            <img
              src={images[currentImage].src}
              alt="Haldi Decoration"
              className="w-full h-full object-cover rounded-lg shadow-md"
            />
          </div>
          {/* Details Section */}
          <div className="w-1/2 flex flex-col justify-center items-start p-8 bg-white/10 backdrop-blur-sm">
            <h2 className="text-3xl font-bold text-white mb-4">Haldi Decoration</h2>
            <p className="text-lg text-white mb-6">{images[currentImage].description}</p>
            <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
              View Full Gallery
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HaldiDecoration;

// import React from 'react';
// import { useEffect, useState } from 'react';

// const HaldiDecoration = () => {
//   const [images, setImages] = useState([]);
//   const [currentImage, setCurrentImage] = useState(0);

//   // Fetch images from JSON
//   useEffect(() => {
//     fetch('/data/haldiDecorationImages.json')
//       .then(res => res.json())
//       .then(data => setImages(data))
//       .catch(err => console.error('Error loading images:', err));
//   }, []);

//   return (
//     <div className="p-8">
//       {images.length > 0 && (
//         <img 
//           src={images[currentImage].src}
//           alt="Haldi Decoration"
//           className="w-full h-96 object-cover rounded-lg"
//         />
//       )}
//     </div>
//   );
// };

// export default HaldiDecoration;