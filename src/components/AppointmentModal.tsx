import React, { useState } from 'react';

interface AppointmentModalProps {
  selectedDate: Date;
  onClose: () => void;
  onSubmit: (
    date: Date,
    name: string,
    email: string,
    phone?: string
  ) => Promise<{ success: boolean; error?: string }>;
}

export function AppointmentModal({ selectedDate, onClose, onSubmit }: AppointmentModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!name) {
      alert('Lütfen ad alanını doldurun!');
      return;
    }
    if(!email){
       alert('Lütfen email alanını doldurun!');
      return;
    }

    if (!validateEmail(email)) {
      alert('Lütfen geçerli bir Gmail adresi girin!');
      return;
    }

    if (phone && !validatePhone(phone)) {
      alert('Lütfen geçerli bir telefon numarası girin!');
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await onSubmit(selectedDate, name, email, phone || undefined);
      if (result.success) {
        alert('Randevu başarıyla kaydedildi!');
        onClose();
      } else {
        alert(result.error || 'Randevu kaydedilirken bir hata oluştu!');
      }
    } catch (error) {
      alert('Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96 transition-colors duration-200">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Bilgilerinizi Girin</h3>
        
        <input
          type="text"
          placeholder="Ad Soyad"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 mb-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
        <input
          type="email"
          placeholder="Gmail Adresi"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 mb-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
        <input
          type="tel"
          placeholder="Telefon Numarası (Opsiyonel)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 mb-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
        <div className="flex justify-end space-x-2">
          <button
            className="bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors duration-200"
            onClick={onClose}
            disabled={isSubmitting}
          >
            İptal
          </button>
          <button
            className={`bg-blue-500 text-white px-4 py-2 rounded-lg ${
              isSubmitting ? 'opacity-50' : 'hover:bg-blue-600'
            } transition-colors duration-200`}
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Kaydediliyor...' : 'Kaydet'}
          </button>
        </div>
      </div>
    </div>
  );
}

// Basit e-posta doğrulaması
function validateEmail(email: string) {
  return /^[^\s@]+@gmail\.com$/.test(email);
}

// Opsiyonel telefon doğrulaması (sadece rakam, 10–15 karakter arası)
function validatePhone(phone: string) {
  return /^\d{10,15}$/.test(phone);
}
