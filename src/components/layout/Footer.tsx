import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('Footer');
  return (
    <footer className="bg-blue-800 py-16 px-4 lg:px-0">
      <div className="space-x-5 text-center text-white max-w-7xl mx-auto">
        <div className="text-center mb-10 text-sm">
          <p className="pb-2">{t('disclaimer.trademark')}</p>
          <p className="pb-2">{t('disclaimer.usage')}</p>
          <p className="pb-2">{t('disclaimer.not_official')}</p>
          <p className="pb-2">{t('disclaimer.fair_use')}</p>
        </div>
        <p className="text-sm">{t('disclaimer.disclaimer_info')}</p>
      </div>
    </footer>
  )
}

