"use client";
import Image from 'next/image';
import { i18n } from '@/app/i18n';
import { useLanguage } from './LanguageContext';
import { HeroWords } from '@/api/HeroWords';
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import { PokemonGeneration } from '@/components/ui/pokemon-generation';
import { motion } from "framer-motion";

export default function Home() {
  const { language } = useLanguage();

  return (
    <main>
      <section
        data-bg-color={`bg-red-500`}
        data-current-nav-color={`bg-red-500`}
        data-text-color={`text-white`}
        id="start"
        className="relative anchor flex flex-col h-[95vmin] items-center justify-center bg-red-500 text-white px-4 md:px-0">

        <motion.div
          className='origin-center'
          transition={{ duration: 3, delay: 1, ease: 'easeInOut' }}
          initial={{ rotate: 2, scale: 0.65 }}
          animate={{ rotate: 0, scale: 1 }}>
          <h1 className="text-3xl md:text-8xl tracking-tight font-bold text-white	text-center">
            <Image
              src="/images/pokemon_logo.png"
              width={800}
              height={300}
              alt="Pokemon Logo" />
          </h1>
        </motion.div>

        <TypewriterEffect
          className="text-2xl lg:text:3xl xl:text-5xl my-10 mb-24 text-white"
          duration={.75}
          delay={2}
          words={HeroWords[language]} />

        <a href="#1" className="px-5 py-3 text-lg transition font-bold border-2 border-blue-700 capitalize rounded-full w-fit bg-blue-700 text-white hover:bg-yellow-400 hover:text-blue-700">
          {i18n[language].hero_cta_button}
        </a>
      </section>

      {[...Array(9)].map((_, index) => (
        <PokemonGeneration
          key={index + 1}
          generation={index + 1}
          language={language} />
      ))}

    </main >
  );
}
