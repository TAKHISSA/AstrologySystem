import React, { useState } from 'react';
import { X } from 'lucide-react';

interface PhotoInfo {
  id: number;
  url: string;
  title: string;
  description: string;
}

const photos: PhotoInfo[] = [
  {
    id: 1,
    url: "https://i.imgur.com/pmxpbhA.jpeg",
    title: "Genel Bilgilendirme"
  },
  {
    id: 2,
    url: "https://i.imgur.com/KA0PyEd.jpeg",
    title: "Ücret Bilgisi"
  },
  {
    id: 3,
    url: "https://i.imgur.com/wCzFL8u.jpeg",
    title: "Doğum Haritası"
  },
  {
    id: 4,
    url: "https://i.imgur.com/h8oX5Tw.jpeg",
    title: "Diğer Analizler"
  }
];

export function InfoSection() {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoInfo | null>(null);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {photos.map((photo) => (
          <div
            key={photo.id}
            onClick={() => setSelectedPhoto(photo)}
            className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
          >
            <img
              src={photo.url}
              alt={photo.title}
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
              <h3 className="text-white text-xl font-semibold">{photo.title}</h3>
            </div>
          </div>
        ))}
      </div>

      {selectedPhoto && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div 
            className="relative w-full h-full flex flex-col items-center justify-center"
            onClick={() => setSelectedPhoto(null)}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedPhoto(null);
              }}
              className="absolute right-4 top-4 text-white hover:text-gray-300 z-10"
            >
              <X className="w-8 h-8" />
            </button>
            <div 
              className="w-full h-full flex flex-col items-center justify-center p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedPhoto.url}
                alt={selectedPhoto.title}
                className="max-w-full max-h-[80vh] object-contain"
              />
              <div className="mt-4 text-center">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {selectedPhoto.title}
                </h3>
                <p className="text-gray-200 text-lg max-w-2xl">
                  {selectedPhoto.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}