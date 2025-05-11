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
    url: "https://bolt.new/~/sb1-6hly6u5p",
    title: "Astroloji Nedir?",
    description: "Astroloji, gök cisimlerinin konumlarının insan yaşamı üzerindeki etkilerini inceleyen kadim bir bilimdir. Doğum haritanız, yaşam yolculuğunuzda size rehberlik edebilir."
  },
  {
    id: 2,
    url: "https://images.pexels.com/photos/1252890/pexels-photo-1252890.jpeg",
    title: "Burçlar ve Elementler",
    description: "Her burç, dört elementten birine aittir: Ateş, Toprak, Hava ve Su. Bu elementler, kişilik özelliklerimizi ve yaşam enerjimizi şekillendirir."
  },
  {
    id: 3,
    url: "https://images.pexels.com/photos/5473955/pexels-photo-5473955.jpeg",
    title: "Gezegenlerin Etkileri",
    description: "Gezegenler, astrolojide farklı yaşam alanlarını temsil eder. Her gezegenin kendine özgü enerjisi ve etkisi vardır."
  },
  {
    id: 4,
    url: "https://images.pexels.com/photos/6510876/pexels-photo-6510876.jpeg",
    title: "Doğum Haritası",
    description: "Doğum haritanız, doğduğunuz an gökyüzünün size özel bir fotoğrafıdır. Bu harita, potansiyellerinizi ve yaşam yolculuğunuzu anlamanıza yardımcı olur."
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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full p-6 relative">
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={selectedPhoto.url}
              alt={selectedPhoto.title}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {selectedPhoto.title}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 text-lg">
              {selectedPhoto.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}