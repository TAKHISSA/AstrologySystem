import React, { useState } from 'react';
import { User } from 'lucide-react';
import { useAppointments } from '../hooks/useAppointments';
import { AppointmentModal } from './AppointmentModal';

interface AstrologerInfoProps {
  selectedDate: Date | null;
}

export function AstrologerInfo({ selectedDate }: AstrologerInfoProps) {
  const [showModal, setShowModal] = useState(false);
  const { createAppointment } = useAppointments();

  if (!selectedDate) return null;

  return (
    <div className="bg-white/90 dark:bg-gray-800/90 rounded-lg shadow-lg p-6 backdrop-blur-sm transition-colors duration-200">
      <div className="flex items-center mb-6">
        <User className="w-6 h-6 text-indigo-600 dark:text-indigo-400 mr-2" />
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Astrolog Bilgileri</h2>
      </div>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Ad Soyad</h3>
          <p className="text-gray-600 dark:text-gray-400">Menşure Altundağ</p>
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Uzmanlık</h3>
          <p className="text-gray-600 dark:text-gray-400">Astroloji, Tarot</p>
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Deneyim</h3>
          <p className="text-gray-600 dark:text-gray-400">Hilal Saraç Astroloji Programı</p>
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Seçilen Tarih</h3>
          <p className="text-gray-600 dark:text-gray-400">
            {selectedDate.toLocaleDateString('tr-TR', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
        <button
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
          onClick={() => setShowModal(true)}
        >
          Randevu Al
        </button>
      </div>

      {showModal && (
        <AppointmentModal
          selectedDate={selectedDate}
          onClose={() => setShowModal(false)}
          onSubmit={createAppointment}
        />
      )}
    </div>
  );
}