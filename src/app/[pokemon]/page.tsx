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
import { PokemonDescription } from '@/components/ui/pokemon-description';

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
  const cardColor = pokemonData.colors.card;

  return (
    <main className={`${textColor} ${bgColor}`}>
      <div className='max-w-7xl mx-auto pt-20'>
        <Link className={`hidden lg:inline-flex text-xs rounded-lg py-2 px-3 ${bgColor} ${textColor} hover:bg-white hover:text-black`} href="/">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          <span className='ml-2'>{i18n[language].back}</span>
        </Link>
      </div>
      <section
        data-bg-color={`${bgColor}`}
        data-current-nav-color={`bg-red-500`}
        data-text-color={`text-white`}
        id="detail"
        className={`flex flex-col py-16 pb-24 items-center justify-center px-5 lg:px-0 z-0`}>
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
          <div className='w-full lg:w-1/2 text-center lg:text-left'>
            <h1 className="text-4xl mb-5 font-bold uppercase lg:text-7xl lg:mb-10">{pokemonData.results.names[language]}</h1>
            <div className="text-base font-normal flex flex-row space-x-3">
              {pokemonData.results.type.map((type: IPokemonType, index: number) => (
                <span
                  key={index}
                  className={`block px-3 py-1 rounded-md border border-white ${pokemonTypesColors[type['en']].textColor} ${pokemonTypesColors[type['en']].bgColor}`}>
                  {type[language]}
                </span>
              ))}
            </div>

            <div className={`w-full lg:w-2/3 my-10 text-base p-3 text-left rounded-lg bg-white/60 text-black`}>
              <PokemonDescription
                name={pokemonData.results.names[language]}
                pokeid={padIdWithZeros(pokemonData.results.id)}
                generation={pokemonData.results.generation_id}
                size={pokemonData.results.height}
                weight={pokemonData.results.weight}
                color={pokemonData.results.color[language]}
                abilitiy={pokemonData.results.abilities[language]}
                language={language}></PokemonDescription>
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
        <PokemonVideo
          pokemon={pokemonData.results.names[language]}
          language={language}></PokemonVideo>
      </section>
    </main >
  );
}
