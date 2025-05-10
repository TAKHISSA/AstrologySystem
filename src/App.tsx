import React, { useState, useEffect } from 'react';
import { MonthlyCalendar } from './components/Calendar';
import { AstrologerInfo } from './components/AstrologerInfo';
import { Star, Sun, Moon } from 'lucide-react';

function App() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-indigo-950 py-12 px-4 transition-colors duration-200">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12 relative">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="absolute right-0 top-0 p-2 rounded-lg bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-200"
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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Astroloji Danışmanlık Randevu Sistemi
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Pazartesi'den Çarşamba'ya kadar randevu alabilirsiniz.
            Her gün için tek randevu mevcuttur.
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            Not: Randevu oluşturduktan sonra size gelen maile en geç 7 gün içerisinde 'Randevumu onaylıyorum' şeklinde cevap vermeniz gerekir yoksa randevunuz silinir.

          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <MonthlyCalendar
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
          />
          <AstrologerInfo selectedDate={selectedDate} />
        </div>
      </div>
    </div>
  );
}

export default App
