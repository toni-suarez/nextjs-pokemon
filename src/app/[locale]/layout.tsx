import { Inter } from "next/font/google";
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { NextIntlClientProvider, useTranslations, useMessages } from 'next-intl';
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({ subsets: ["latin"] });

export default function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {

  const t = useTranslations('Header');
  const messages = useMessages();

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <SpeedInsights />
        <NextIntlClientProvider messages={messages}>
          <Header locale={locale} />
        </NextIntlClientProvider>
        {children}
        <Footer />
      </body>
    </html>
  );
}

