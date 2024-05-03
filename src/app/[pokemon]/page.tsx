"use client";
import { useState, useEffect } from 'react';
import { useLanguage } from '../LanguageContext';
import { PokemonVideo } from '@/components/ui/pokemon-video';
import { getColorsForGeneration, IPokemonDetailProps, pokemonTypesColors, IPokemonType } from '@/api/pokedex';
import { useInView, motion } from 'framer-motion';
import Image from 'next/image';
import { padIdWithZeros, dmToM, hgToKg } from '@/api/pokedex';
import Link from 'next/link';
import { i18n } from '@/app/i18n';

const fetchPokemonData = async (pokemon: string): Promise<IPokemonDetailProps> => {
  const response = await fetch(`/api/pokemon/detail/${pokemon}`, { next: { revalidate: 3600 } });
  const data = await response.json();

  return {
    id: data.generation_id,
    colors: getColorsForGeneration(data.generation_id),
    results: data
  };
};

export default function Home({ params }: { params: { pokemon: string } }) {
  const { language } = useLanguage();
  const [pokemonData, setPokemonData] = useState<IPokemonDetailProps>();

  useEffect(() => {
    const fetchData = async () => {
      let data = await fetchPokemonData(params.pokemon);
      setPokemonData(data);
    };

    fetchData();
  }, [params.pokemon]);


  if (!pokemonData) {
    return (
      <main>
        <section className='h-[96vh] bg-amber-500 w-full flex items-center justify-center'>
          <p>Lädt...</p>
        </section>
      </main>
    );
  }

  const bgColor = pokemonTypesColors[pokemonData.results.type[0]['en']].bgColor;
  const textColor = pokemonTypesColors[pokemonData.results.type[0]['en']].textColor;

  return (
    <main className={`${textColor} ${bgColor}`}>
      <Link className={`hidden lg:flex fixed z-50 top-16 shadow-lg left-5 text-sm p-2 rounded-full border-white border ${bgColor} ${textColor} hover:bg-white hover:text-black`} href="/">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
        </svg>
      </Link>
      <section
        data-bg-color={`${bgColor}`}
        data-current-nav-color={`bg-red-500`}
        data-text-color={`text-white`}
        id="detail"
        className={`flex flex-col py-32 items-center justify-center px-4 md:px-0 z-0`}>
        <div className='w-full px-4 md:px-0 max-w-7xl mx-auto flex flex-col justify-center items-center lg:flex-row'>
          <div className='w-full lg:w-1/2 text-center'>
            <motion.div
              className='origin-center'
              transition={{ duration: 10, delay: .3, ease: 'easeInOut' }}
              initial={{ rotate: 2, scale: 0.9 }}
              animate={{ rotate: 0, scale: 1 }}>
              <Image
                priority={true}
                className="aspect-square w-[500px] object-fit mx-auto"
                src={`/images/pokemons/${pokemonData.results.id}.png`}
                width={300}
                height={300}
                alt={pokemonData.results.names[language]} />
            </motion.div>
          </div>
          <div className='w-full lg:w-1/2'>
            <h1 className="text-7xl font-bold uppercase mb-10">{pokemonData.results.names[language]}</h1>
            <div className="text-base font-normal flex flex-row space-x-3">
              {pokemonData.results.type.map((type: IPokemonType, index: number) => (
                <span
                  key={index}
                  className={`block px-3 py-1 rounded-md border border-white ${pokemonTypesColors[type['en']].textColor} ${pokemonTypesColors[type['en']].bgColor}`}>
                  {type[language]}
                </span>
              ))}
            </div>
            <div className='w-2/3 my-10 grid grid-cols-1 grid-rows-4 gap-2'>
              <div className='flex space-x-1'>
                <span className='capitalize'>{i18n[language].number}:</span>
                <span>#{padIdWithZeros(pokemonData.results.id)}</span>
              </div>
              <div className='flex space-x-1'>
                <span className='capitalize'>{i18n[language].generation}:</span>
                <span>{pokemonData.results.generation_id} {i18n[language].generation}</span>
              </div>
              <div className='flex space-x-1'>
                <span className='capitalize'>{i18n[language].size}:</span>
                <span>{dmToM(pokemonData.results.height)}</span>
              </div>
              <div className='flex space-x-1'>
                <span className='capitalize'>{i18n[language].weight}:</span>
                <span>{hgToKg(pokemonData.results.weight)}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        data-bg-color={`${bgColor}`}
        data-current-nav-color={`bg-red-500`}
        data-text-color={`text-white`}
        id="video"
        className={`anchor flex flex-col pb-64 items-center justify-center px-4 md:px-0 z-0`}>
        <PokemonVideo pokemon={pokemonData.results.names[language]} language={language}></PokemonVideo>
      </section>
    </main >
  );
}
