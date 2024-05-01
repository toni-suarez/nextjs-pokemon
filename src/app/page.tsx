"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { i18n } from '@/app/i18n';
import { useLanguage } from './LanguageContext';
import { HeroWords } from '@/api/HeroWords';
import { IPokemon, getPokemons } from '@/api/pokedex';
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { PokemonGrid, PokemonCard } from "@/components/ui/pokemon-card";

export default function Home() {
  const [pokemonData, setPokemonData] = useState<any[]>([]);
  const { language, setLanguage } = useLanguage();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let pokemonData = await getPokemons();
        setPokemonData(pokemonData);
      } catch (error) { }
    };

    fetchData();
    return () => { };
  }, []);

  return (
    <main>
      <section
        data-bg-color={`bg-red-500`}
        data-current-nav-color={`bg-red-500`}
        data-text-color={`text-white`}
        id="start"
        className="relative flex flex-col h-[95vmin] items-center justify-center bg-red-500 text-white px-4 md:px-0">

        <h1 className="text-3xl md:text-8xl tracking-tight font-bold text-white	text-center">
          <Image
            src="/images/pokemon_logo.png"
            width={800}
            height={300}
            alt="Pokemon Logo" />
        </h1>

        <TypewriterEffectSmooth
          className="text-2xl lg:text:3xl xl:text-5xl my-10 text-white/85"
          duration={.75}
          words={HeroWords[language]} />

        <a href="#1" className="bg-blue-700 capitalize rounded-full w-fit text-white px-4 py-2">
          {i18n[language].hero_cta_button}
        </a>
      </section>

      {pokemonData.map((generation, index) => (
        <section
          data-bg-color={`${generation.colors.section}`}
          data-current-nav-color={`${generation.colors.card}`}
          data-text-color={`${generation.colors.textColor}`}
          id={generation.id}
          className={`py-16 anchor ${generation.colors.section}`}
          key={index}>

          <h2 className={`${generation.colors.textColor} text-3xl md:text-7xl tracking-tight font-bold text-center mb-16 capitalize`}>
            {generation.id}. {i18n[language].generation}
          </h2>

          <PokemonGrid>
            {generation.results.map((pokemon: IPokemon, i: number) => (
              <PokemonCard
                pokemon={pokemon}
                language={language}
                key={pokemon.id}
                id={pokemon.id}
                className={`text-black/80 ${generation.colors.card}`}
              />
            ))}
          </PokemonGrid>
        </section>
      ))}
    </main>
  );
}
