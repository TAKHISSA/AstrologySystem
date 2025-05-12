import React, { useState } from 'react';
import { X } from 'lucide-react';

interface PhotoInfo {
  id: number;
  url: string;
  title: string;
  description?: string;
}

const photos: PhotoInfo[] = [
  {
    id: 1,
    url: "https://i.imgur.com/hQNeM5l.jpeg",
    title: "Genel Bilgilendirme",
  },
  {
    id: 2,
    url: "https://i.imgur.com/KA0PyEd.jpeg",
    title: "Ücret Bilgisi",
  },
  {
    id: 3,
    url: "https://i.imgur.com/wCzFL8u.jpeg",
    title: "Doğum Haritası",
  },
  {
    id: 4,
    url: "https://i.imgur.com/h8oX5Tw.jpeg",
    title: "Diğer Analizler",
  }
];

export function InfoSection() {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoInfo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePhotoClick = (photo: PhotoInfo) => {
    setSelectedPhoto(photo);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedPhoto(null), 300); // Wait for animation to finish
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  };

  return (
    <div className="space-y-8 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {photos.map((photo) => (
          <div
            key={photo.id}
            onClick={() => handlePhotoClick(photo)}
            className="relative group cursor-pointer overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:scale-[1.03] hover:shadow-xl"
          >
            <img
              src={photo.url}
              alt={photo.title}
              className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-6">
              <h3 className="text-white text-xl font-semibold drop-shadow-md">
                {photo.title}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {selectedPhoto && (
        <div 
          className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${isModalOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          onClick={closeModal}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
          
          <div 
            className={`relative bg-white dark:bg-gray-800 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto transition-all duration-300 transform ${isModalOpen ? 'scale-100' : 'scale-95'}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute right-4 top-4 p-2 rounded-full bg-white/80 dark:bg-gray-700/80 shadow-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors z-10"
              aria-label="Close modal"
            >
              <X className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </button>
            
            <div className="p-6">
              <img
                src={selectedPhoto.url}
                alt={selectedPhoto.title}
                className="w-full h-auto max-h-[50vh] object-contain rounded-lg mb-6"
              />
              
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {selectedPhoto.title}
                </h3>
                
                {selectedPhoto.description && (
                  <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                    {selectedPhoto.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}