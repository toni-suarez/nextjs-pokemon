import React, { useState, useEffect, useRef } from 'react';
import { PokemonGrid, PokemonCard } from "@/components/ui/pokemon-card";
import { IPokemon, IPokemonGenerationProps, getColorsForGeneration } from '@/api/pokedex';
import { Language } from '@/app/LanguageContext';
import { i18n } from '@/app/i18n';
import { motion, useInView } from "framer-motion"

const fetchPokemonData = async (generationNumber: number): Promise<IPokemonGenerationProps> => {
  const response = await fetch(`/api/pokemon?generation=${generationNumber}`, { next: { revalidate: 3600 } });
  const data = await response.json();

  return {
    id: generationNumber,
    colors: getColorsForGeneration(generationNumber),
    results: data
  };
};

export const PokemonGeneration = ({
  className,
  children,
  generation,
  language,
}: {
  className?: string;
  children?: React.ReactNode;
  generation: number;
  language: Language
}) => {
  const [pokemonData, setPokemonData] = useState<IPokemonGenerationProps>();
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px 5000px 0px" })

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPokemonData(generation);
      setPokemonData(data);
    };

    if (isInView && !pokemonData) {
      fetchData();
    }
  }, [generation, isInView, pokemonData]);

  if (!pokemonData) {
    return (
      <section ref={ref} id={generation.toString()} className="py-24 min-h-96 anchor bg-amber-400"></section>
    );
  }

  return (
    <section
      ref={ref}
      data-bg-color={`${pokemonData.colors.section}`}
      data-current-nav-color={`${pokemonData.colors.card}`}
      data-text-color={`${pokemonData.colors.textColor}`}
      id={pokemonData.id.toString()}
      className={`py-16 anchor ${pokemonData.colors.section}`}
      key={pokemonData.id}>

      <motion.div
        transition={{ duration: 1, delay: 0 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}>
        <h2 className={`${pokemonData.colors.textColor} text-3xl md:text-7xl tracking-tight font-bold text-center mb-16 capitalize`}>
          {pokemonData.id}. {i18n[language].generation}
        </h2>
      </motion.div>

      <PokemonGrid>
        {pokemonData.results.map((pokemon: IPokemon, i: number) => (
          <PokemonCard
            pokemon={pokemon}
            language={language}
            key={pokemon.id}
            id={pokemon.id}
            className={`text-black/80 ${pokemonData.colors.card}`}
          />
        ))}
      </PokemonGrid>
    </section>

  );
}
