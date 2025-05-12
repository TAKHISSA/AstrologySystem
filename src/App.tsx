import React, { useState, useEffect } from 'react';
import { MonthlyCalendar } from './components/Calendar';
import { AstrologerInfo } from './components/AstrologerInfo';
import { Star, Sun, Moon } from 'lucide-react';
import { InfoSection } from './components/InfoSection';

function App() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showAppointment, setShowAppointment] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('darkMode') === 'true' ||
        window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  const backgroundStyle = {
    backgroundImage: darkMode
      ? 'url("https://images.pexels.com/photos/2469122/pexels-photo-2469122.jpeg")'
      : 'url("https://images.pexels.com/photos/9754/mountains-clouds-forest-fog.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    position: 'relative' as const,
  };

  return (
    <div className="min-h-screen transition-colors duration-200" style={backgroundStyle}>
      {/* Overlay katmanı */}
      <div className="absolute inset-0 bg-white/30 dark:bg-black/80  z-0" />

      <div className="min-h-screen relative z-10 bg-gray-50/90 dark:bg-black/80 py-12 px-4 ">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 relative">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="absolute right-0 top-0 p-2 rounded-lg bg-white/90 dark:bg-gray-800/90 shadow-md hover:shadow-lg transition-all duration-200"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun className="w-6 h-6 text-yellow-500" />
              ) : (
                <Moon className="w-6 h-6 text-gray-700" />
              )}
            </button>
            <div className="flex items-center justify-center mb-4">
              <Star className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
              Astroloji Danışmanlık
            </h1>
                      <p className="text-gray-600 dark:text-gray-300">
            Pazartesi'den Çarşamba'ya kadar randevu alabilirsiniz.
            Her gün için tek randevu mevcuttur.
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            Not: Randevu oluşturduktan sonra size gelen maile en geç 7 gün içerisinde 'Randevumu onaylıyorum' şeklinde cevap vermeniz gerekir yoksa randevunuz silinir.

          </p>
            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={() => setShowAppointment(false)}
                className={`px-6 py-3 rounded-lg transition-all duration-200 ${
                  !showAppointment
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
                }`}
              >
                Bilgilendirme
              </button>
              <button
                onClick={() => setShowAppointment(true)}
                className={`px-6 py-3 rounded-lg transition-all duration-200 ${
                  showAppointment
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
                }`}
              >
                Randevu Al
              </button>
            </div>
          </div>

          {showAppointment ? (
            <div className="grid md:grid-cols-2 gap-6">
              <MonthlyCalendar
                selectedDate={selectedDate}
                onDateSelect={setSelectedDate}
              />
              <AstrologerInfo selectedDate={selectedDate} />
            </div>
          ) : (
            <InfoSection />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;