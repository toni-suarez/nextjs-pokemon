import Link from 'next/link'
import { useTranslations } from 'next-intl';

export default function NotFound() {
  const t = useTranslations('NotFound');
  return (
    <main>
      <section
        data-bg-color={`bg-stone-100`}
        data-current-nav-color={`bg-black`}
        data-text-color={`text-black`}
        id="notFound"
        className="relative anchor h-[100vh] flex flex-col items-center justify-center bg-white text-black px-4 md:px-0 py-28 lg:py-40">

        <div className='text-black text-center mb-24'>
          <h1 className="text-3xl md:text-8xl tracking-tight font-bold mb-8">
            {t('title')}
          </h1>

          <p className='text-base md:text-2xl'>{t('text')}</p>
        </div>

        <Link href="/" className="px-5 py-3 text-lg transition font-bold border-2 border-blue-700 capitalize rounded-full w-fit bg-blue-700 text-white hover:bg-yellow-400 hover:text-blue-700">
          {t('back')}
        </Link>
      </section>
    </main >
  )
}
