import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, Play, Video } from "lucide-react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const filterItems = (items, category) => {
  if (category === "all") return items;
  if (category === "others") {
    const mainCats = [
      "birthday",
      "reception",
      "wedding",
      "rental",
      "sangeet",
      "haldi",
    ];
    return items.filter(
      (item) => !mainCats.includes(item.category.toLowerCase())
    );
  }
  return items.filter(
    (item) => item.category.toLowerCase() === category.toLowerCase()
  );
};

const Gallery = () => {
  const [searchParams] = useSearchParams();
  const [allItems, setAllItems] = useState([]);
  const [initialImages, setInitialImages] = useState([]);
  const [additionalMedia, setAdditionalMedia] = useState([]);
  const [featuredVideo, setFeaturedVideo] = useState(null);
  const [zoomedMedia, setZoomedMedia] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Fetch gallery items from backend once on mount
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await axios.get("http://localhost:5000/admin/gallery");
        const items = response.data.galleryItems.map((item) => {
          const type = item.imageUrl.match(/\.(mp4|mov|avi)$/i)
            ? "video"
            : "image";
          return {
            src: item.imageUrl,
            type,
            category: item.category,
          };
        });
        setAllItems(items);
      } catch (error) {
        console.error("Error fetching gallery from backend:", error);
      }
    };

    fetchGallery();
  }, []);

  useEffect(() => {
    const categoryFromURL = searchParams.get("category");
    if (categoryFromURL) {
      setSelectedCategory(categoryFromURL.toLowerCase().replace("%20", " "));
    }
  }, [searchParams]);

  // Recalculate groups when allItems or selectedCategory changes
  useEffect(() => {
    const filteredItems = filterItems(allItems, selectedCategory);
    const images = filteredItems.filter((item) => item.type === "image");
    const videos = filteredItems.filter((item) => item.type === "video");

    const featured = videos.length > 0 ? videos[0] : null;
    const initialImgs = images.slice(0, 5);
    const additional = shuffleArray([...images.slice(5), ...videos.slice(1)]);

    setInitialImages(initialImgs);
    setAdditionalMedia(additional);
    setFeaturedVideo(featured);
  }, [allItems, selectedCategory]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Escape") {
        setZoomedMedia(null);
      }
    };
    if (zoomedMedia) window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [zoomedMedia]);

  // Categories for sorting/filtering
  const categories = [
    "all",
    "birthday",
    "reception",
    "wedding",
    "rental",
    "sangeet",
    "haldi",
    "seating",
    "others",
  ];

  // Check if there are any images (or a featured video)
  const hasImages =
    initialImages.length > 0 ||
    additionalMedia.filter((item) => item.type === "image").length > 0 ||
    featuredVideo;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 pt-20">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold">A Luxe Ensemble of Elegance</h1>
        <p className="text-lg text-gray-600">
          Simple serenity with a touch of splendor.
        </p>
      </div>

      {/* Sort/Filter Buttons (always visible) */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full border ${
              selectedCategory === cat
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-600"
            }`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* If there are no images, show a fallback message */}
      {!hasImages && (
        <div className="text-center py-20 text-gray-600">
          There are no images.
        </div>
      )}

      {/* Render gallery layout if images exist */}
      {hasImages && (
        <>
          {initialImages.length < 3 ? (
            <div className="flex flex-col items-center gap-8">
              {initialImages.map((img, idx) => (
                <div key={idx} className="relative">
                  <img
                    src={img.src}
                    alt={`Gallery Image ${idx + 1}`}
                    className="max-w-xs rounded-lg shadow-lg"
                  />
                  <button
                    className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform"
                    onClick={() => setZoomedMedia(img)}
                  >
                    <ZoomIn size={20} />
                  </button>
                </div>
              ))}
              {additionalMedia.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
                  {additionalMedia.map((media, idx) => (
                    <div key={idx} className="relative group">
                      {media.type === "image" ? (
                        <img
                          src={media.src}
                          alt={`Gallery ${idx}`}
                          className="w-full h-48 object-cover rounded-lg shadow-lg"
                        />
                      ) : (
                        <video
                          src={media.src}
                          className="w-full h-48 object-cover rounded-lg shadow-lg"
                          autoPlay
                          muted
                          loop
                          playsInline
                        />
                      )}
                      <button
                        className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform"
                        onClick={() => setZoomedMedia(media)}
                      >
                        {media.type === "video" ? (
                          <Video size={20} />
                        ) : (
                          <ZoomIn size={20} />
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <>
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

              {initialImages.length >= 3 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="md:col-span-1 flex flex-col justify-center text-center md:text-left">
                    <h2 className="text-3xl font-bold uppercase">
                      Representing
                    </h2>
                    <p className="text-lg text-gray-600">
                      Style, Elegance, & Class
                    </p>
                    <p className="mt-2 text-gray-700">
                      When a traditional mandap in full regalia meets modern
                      floral artistry. A union that's decadent but still
                      delightfully delicate.
                    </p>
                  </div>
                  {[1, 2].map((index) => (
                    <div
                      key={index}
                      className="relative group hover:shadow-[0_0_30px_rgba(236,72,153,1)] transition-shadow duration-300 rounded-lg"
                    >
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
                    <h2 className="text-3xl font-bold uppercase">
                      Hand Carved to Perfection
                    </h2>
                    <p className="text-lg text-gray-600">
                      The Art of Craftsmanship
                    </p>
                    <p className="mt-2 text-gray-700">
                      This exquisite wooden masterpiece was hand-carved by
                      India's finest artisans. Intricate details are bestowed
                      upon each pillar. Delicate archways and double-pillared
                      platforms give rise to a regal ambiance.
                    </p>
                  </div>
                </div>
              )}

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
            </>
          )}

          {additionalMedia.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              {additionalMedia.map((media, idx) => (
                <div
                  key={idx}
                  className="relative group hover:shadow-[0_0_30px_rgba(236,72,153,1)] transition-shadow duration-300 rounded-lg"
                >
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
                    {media.type === "video" ? (
                      <Video size={20} />
                    ) : (
                      <ZoomIn size={20} />
                    )}
                  </button>
                </div>
              ))}
            </div>
          )}
        </>
      )}

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
