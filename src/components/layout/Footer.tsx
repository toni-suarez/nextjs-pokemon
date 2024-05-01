"use client";
import { i18n } from "@/app/i18n";
import { useLanguage } from '@/app/LanguageContext';

export default function Footer() {
  const { language, setLanguage } = useLanguage();

  return (
    <footer className="bg-blue-800 py-16 px-4 lg:px-0">
      <div className="space-x-5 text-center text-white max-w-7xl mx-auto">
        <div className="text-center mb-10 text-sm">
          <p className="pb-2">{i18n[language].disclaimer.trademark}</p>
          <p className="pb-2">{i18n[language].disclaimer.usage}</p>
          <p className="pb-2">{i18n[language].disclaimer.not_official}</p>
          <p className="pb-2">{i18n[language].disclaimer.fair_use}</p>
        </div>
        <p className="text-sm">{i18n[language].disclaimer.disclaimer_info}</p>
      </div>
    </footer>
  )
}
