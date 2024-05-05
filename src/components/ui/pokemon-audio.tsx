"use client"

import { IPokemon } from "@/api/pokedex";
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

export const PokemonAudio = ({
  className,
  id,
  pokemon,
}: {
  className?: string;
  id?: number;
  pokemon: IPokemon;
}) => {

  function playAudio(id: number): void {
    const audioElement = document.querySelector<HTMLAudioElement>('#audio-' + id);
    if (audioElement) {
      audioElement.play().catch(error => {
        console.error('Failed to play audio:', error);
      });
    }
  }

  return (
    <motion.button
      onClick={(event) => playAudio(pokemon.id)}
      className={cn(className)}
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
  );
};
