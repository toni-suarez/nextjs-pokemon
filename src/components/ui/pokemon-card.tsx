import React, { useState } from 'react';
import { cn } from "@/utils/cn";
import Image from 'next/image'
import { IPokemon, IPokemonType, IPokemonName } from "@/api/pokedex";
import { Language } from "@/app/LanguageContext";
import { i18n } from '@/app/i18n';
import { motion } from 'framer-motion';

export const PokemonGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div className={cn("grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 px-4 md:px-0 max-w-7xl mx-auto", className)}>
      {children}
    </div>
  );
};

export const PokemonCard = ({
  className,
  id,
  language,
  pokemon
}: {
  className?: string;
  id?: number;
  language: Language;
  pokemon: IPokemon;
}) => {

  function padIdWithZeros(id: number) {
    return String(id).padStart(4, '0');
  }

  function dmToM(dm: number) {
    return (dm / 10) + ' m';
  }

  function hgToKg(hg: number) {
    return (hg / 10) + ' kg';
  }

  const [audioLoaded, setAudioLoaded] = useState(false);

  function loadAudio(id: number): void {
    const audioElement = document.querySelector<HTMLAudioElement>('#audio-' + id);
    if (audioElement && audioLoaded === false) {
      audioElement.load();
      setAudioLoaded(true);
    }
  }

  function playAudio(id: number): void {
    const audioElement = document.querySelector<HTMLAudioElement>('#audio-' + id);
    if (audioElement) {
      audioElement.play().catch(error => {
        console.error('Failed to play audio:', error);
      });
    }
  }

  return (
    <div
      onMouseEnter={() => loadAudio(pokemon.id)}
      onTouchStart={() => loadAudio(pokemon.id)}
      className={cn(
        "rounded-xl flex flex-col p-5 justify-center items-center relative transition group scale-100 lg:hover:scale-105 lg:hover:rotate-1 lg:hover:shadow-md",
        className
      )}
    >
      <span className="font-sans opacity-85 text-xs absolute top-2 right-2">#{padIdWithZeros(pokemon.id)}</span>

      <div className="text-[.65rem] flex flex-row space-x-1 absolute top-2 left-3">
        {pokemon.type.map((type: IPokemonType, index: number) => (
          <span key={index} className="block rounded">{type[language]}</span>
        ))}
      </div>

      <div
        className="transition aspect-square pt-5 group-hover:lg:scale-110 group-hover:lg:-rotate-1">
        <Image
          className="aspect-square w-48 object-fit"
          src={'/images/pokemons/' + pokemon.id + '.png'}
          width={300} height={300} alt={pokemon.names[language]} />
      </div>

      <div className="text-xl font-sans font-bold mb-10 mt-3 lg:mt-8 w-full text-center">
        {pokemon.names[language]}
      </div>

      <div className="text-[.65rem] font-sans absolute bottom-2 left-3">
        <div className='flex space-x-1'>
          <span className='capitalize'>{i18n[language].size}:</span>
          <span>{dmToM(pokemon.height)}</span>
        </div>
        <div className='flex space-x-1'>
          <span className='capitalize'>{i18n[language].weight}:</span>
          <span>{hgToKg(pokemon.weight)}</span>
        </div>
      </div>

      <motion.button
        onClick={(event) => playAudio(pokemon.id)}
        className={`absolute bottom-2 right-2`}
        whileHover={{ scale: 1.4, rotate: -5 }}
        whileTap={{ scale: 1.8, rotate: -15 }}
      >
        <audio preload="none" className="max-w-full hidden" id={`audio-${pokemon.id}`}>
          <source src={`/sounds/latest/${pokemon.id}.ogg`} type="audio/ogg" />
          <source src={`/sounds/latest/${pokemon.id}.mp3`} type="audio/mp3" />
        </audio>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
        </svg>
      </motion.button>
    </div>
  );
};
