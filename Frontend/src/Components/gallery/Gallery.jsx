import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, Play, Video } from "lucide-react";

const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const Gallery = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const categoryFilter = searchParams.get('category');
  
  const [initialImages, setInitialImages] = useState([]);
  const [additionalMedia, setAdditionalMedia] = useState([]);
  const [zoomedMedia, setZoomedMedia] = useState(null);
  const [featuredVideo, setFeaturedVideo] = useState(null);
  const [filteredMedia, setFilteredMedia] = useState([]);

  useEffect(() => {
    const importMedia = async () => {
      const mediaModules = import.meta.glob(
        "/src/assets/images/galleryImages/*/*.{jpg,jpeg,png,webp,mp4,mov,avi}"
      );

      const mediaItems = await Promise.all(
        Object.keys(mediaModules).map(async (path) => {
          const mod = await mediaModules[path]();
          const pathParts = path.split('/');
          const category = pathParts[pathParts.length - 2];
          const type = path.match(/\.(mp4|mov|avi)$/i) ? "video" : "image";
          
          return {
            src: mod.default,
            type,
            category,
            thumbnail: type === 'video' ? await getVideoThumbnail(path) : null
          };
        })
      );

      let filtered = mediaItems;
      if (categoryFilter) {
        filtered = mediaItems.filter(item => 
          item.category.toLowerCase() === categoryFilter.toLowerCase()
        );
      }

      const images = filtered.filter((item) => item.type === "image");
      const videos = filtered.filter((item) => item.type === "video");
      const remainingImages = images.slice(5);

      setFeaturedVideo(videos[0] || null);
      const shuffledMedia = shuffleArray([...remainingImages, ...videos.slice(1)]);
      
      setInitialImages(images.slice(0, 5));
      setAdditionalMedia(shuffledMedia);
      setFilteredMedia(filtered);
    };

    const getVideoThumbnail = async (videoPath) => {
      try {
        const thumbnailPath = videoPath.replace(/\.[^.]+$/, '_thumb.jpg');
        const mod = await import(thumbnailPath);
        return mod.default;
      } catch {
        return null;
      }
    };

    importMedia();
  }, [categoryFilter]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Escape') {
        setZoomedMedia(null);
      }
    };

    if (zoomedMedia) {
      window.addEventListener('keydown', handleKeyPress);
    }
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [zoomedMedia]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 pt-20">
      <div className="text-center mb-8">
        {categoryFilter && (
          <button 
            onClick={() => navigate(-1)}
            className="mb-4 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
          >
            ← Back to Services
          </button>
        )}
        <h1 className="text-4xl font-bold">
          {categoryFilter 
            ? `${categoryFilter.charAt(0).toUpperCase() + categoryFilter.slice(1)} Gallery`
            : "A Luxe Ensemble of Elegance"}
        </h1>
        <p className="text-lg text-gray-600">
          {categoryFilter ? "Curated collection for your special moment" : "Simple serenity with a touch of splendor."}
        </p>
      </div>

      {filteredMedia.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-xl text-gray-500">No media found for this category</p>
        </div>
      ) : (
        <>
          {/* Main Showcase */}
          {initialImages.length > 0 && (
            <div className="relative mb-8 group hover:shadow-[0_0_30px_rgba(255,0,0,0.8)] transition-shadow duration-300 rounded-lg">
              <img
                src={initialImages[0].src}
                alt="Main Showcase"
                className="w-full h-auto rounded-lg shadow-lg transform transition-transform duration-300 group-hover:scale-102"
              />
              <button
                className="absolute bottom-4 right-4 bg-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform"
                onClick={() => setZoomedMedia(initialImages[0])}
              >
                <ZoomIn size={24} />
              </button>
            </div>
          )}

          {/* Three Column Grid */}
          {initialImages.length >= 3 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="md:col-span-1 flex flex-col justify-center text-center md:text-left">
                <h2 className="text-3xl font-bold uppercase">Representing</h2>
                <p className="text-lg text-gray-600">Style, Elegance, & Class</p>
                <p className="mt-2 text-gray-700">
                  When traditional craftsmanship meets modern floral artistry.
                </p>
              </div>
              {[1, 2].map((index) => (
                <div key={index} className="relative group hover:shadow-[0_0_30px_rgba(236,72,153,1)] transition-shadow duration-300 rounded-lg">
                  <img
                    src={initialImages[index].src}
                    alt={`Gallery Image ${index + 1}`}
                    className="w-full h-64 object-cover rounded-lg shadow-lg transform transition-transform duration-300 group-hover:scale-106"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-lg" />
                  <button
                    className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform"
                    onClick={() => setZoomedMedia(initialImages[index])}
                  >
                    <ZoomIn size={20} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Carved Mandap Section */}
          {initialImages.length >= 4 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="relative md:col-span-2 group hover:shadow-[0_0_30px_rgba(236,72,153,1)] transition-shadow duration-300 rounded-lg">
                <img
                  src={initialImages[3].src}
                  alt="Carved Mandap"
                  className="w-full h-auto rounded-lg shadow-lg transform transition-transform duration-300 group-hover:scale-102"
                />
                <button
                  className="absolute bottom-4 right-4 bg-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform"
                  onClick={() => setZoomedMedia(initialImages[3])}
                >
                  <ZoomIn size={24} />
                </button>
              </div>
              <div className="flex flex-col justify-center text-center md:text-left">
                <h2 className="text-3xl font-bold uppercase">Hand Carved to Perfection</h2>
                <p className="text-lg text-gray-600">The Art of Craftsmanship</p>
                <p className="mt-2 text-gray-700">
                  Exquisite wooden masterpiece hand-carved by India's finest artisans.
                </p>
              </div>
            </div>
          )}

          {/* Featured Video */}
          {featuredVideo && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="flex flex-col justify-center text-center md:text-left">
                <h2 className="text-3xl font-bold uppercase">Modern Elegance</h2>
                <p className="text-lg text-gray-600">Experience the Grandeur</p>
                <p className="mt-2 text-gray-700">
                  Witness the blend of traditional craftsmanship and modern design.
                </p>
              </div>
              <div className="relative md:col-span-2 group hover:shadow-[0_0_30px_rgba(236,72,153,1)] transition-shadow duration-300 rounded-lg">
                <video
                  src={featuredVideo.src}
                  className="w-full h-auto rounded-lg shadow-lg transform transition-transform duration-300 group-hover:scale-101"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-lg" />
                <button
                  className="absolute bottom-4 right-4 bg-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform"
                  onClick={() => setZoomedMedia(featuredVideo)}
                >
                  <Video size={24} />
                </button>
              </div>
            </div>
          )}

          {/* Team Photo */}
          {initialImages.length >= 5 && (
            <div className="relative mb-8 group hover:shadow-[0_0_30px_rgba(236,72,153,1)] transition-shadow duration-300 rounded-lg">
              <img
                src={initialImages[4].src}
                alt="Team Photo"
                className="w-full h-auto rounded-lg shadow-lg transform transition-transform duration-300 group-hover:scale-102"
              />
              <button
                className="absolute bottom-4 right-4 bg-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform"
                onClick={() => setZoomedMedia(initialImages[4])}
              >
                <ZoomIn size={24} />
              </button>
            </div>
          )}

          {/* Additional Media Grid */}
          {additionalMedia.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              {additionalMedia.map((media, idx) => (
                <div key={idx} className="relative group hover:shadow-[0_0_30px_rgba(236,72,153,1)] transition-shadow duration-300 rounded-lg">
                  {media.type === "image" ? (
                    <>
                      <img
                        src={media.src}
                        alt={`Gallery Item ${idx + 6}`}
                        className="w-full h-48 object-cover rounded-lg shadow-lg transform transition-transform duration-300 group-hover:scale-106"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-lg" />
                    </>
                  ) : (
                    <div className="w-full h-48 relative transform transition-transform duration-300 group-hover:scale-106">
                      <video
                        src={media.src}
                        className="w-full h-48 object-cover rounded-lg shadow-lg"
                        poster={media.thumbnail}
                        autoPlay
                        muted
                        loop
                        playsInline
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent rounded-lg flex items-center justify-center">
                        <Play className="text-white w-12 h-12 opacity-70 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  )}
                  <button
                    className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform"
                    onClick={() => setZoomedMedia(media)}
                  >
                    {media.type === 'video' ? <Video size={20} /> : <ZoomIn size={20} />}
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Social Media Section */}
          <div className="flex justify-center text-center mt-10">
            <div>
              <p className="text-lg">Follow us on</p>
              <h2 className="text-3xl font-bold text-pink-600">Instagram</h2>
            </div>
          </div>
        </>
      )}

      {/* Zoom Modal */}
      <AnimatePresence>
        {zoomedMedia && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-white/20 backdrop-blur-lg z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="relative max-w-6xl w-full px-4">
              <div className="bg-black rounded-xl overflow-hidden shadow-2xl relative">
                <button
                  onClick={() => setZoomedMedia(null)}
                  className="absolute top-4 right-4 z-50 text-white hover:text-gray-300 transition-colors p-2 bg-black/50 rounded-full"
                >
                  <X size={32} />
                </button>
                {zoomedMedia.type === "image" ? (
                  <motion.img
                    src={zoomedMedia.src}
                    alt="Zoomed"
                    className="w-full h-auto max-h-[90vh] object-contain"
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.95 }}
                  />
                ) : (
                  <motion.video
                    src={zoomedMedia.src}
                    className="w-full h-auto max-h-[90vh]"
                    controls
                    autoPlay
                    muted
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.95 }}
                  />
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;