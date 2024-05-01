import { Generation1 } from "./pokemons/Generation-1";
import { Generation2 } from "./pokemons/Generation-2";
import { Generation3 } from "./pokemons/Generation-3";
import { Generation4 } from "./pokemons/Generation-4";
import { Generation5 } from "./pokemons/Generation-5";
import { Generation6 } from "./pokemons/Generation-6";
import { Generation7 } from "./pokemons/Generation-7";
import { Generation8 } from "./pokemons/Generation-8";
import { Generation9 } from "./pokemons/Generation-9";
import { Language } from "@/app/LanguageContext";

export interface IPokemonType {
  en: string;
  de: string;
}

export interface IPokemonName {
  en: string;
  de: string;
}

export interface IPokemonColor {
  en: string;
  de: string;
}

export interface IPokemonAbilities {
  en: string;
  de: string;
}

export interface IPokemon {
  readonly id: number;
  readonly name: string;
  readonly names: IPokemonName;
  readonly generationId: number;
  readonly captureRate: number;
  readonly color: IPokemonColor;
  readonly height: number;
  readonly weight: number;
  readonly cries: {
    readonly latest: string;
    readonly legacy: string;
  };
  readonly abilities: IPokemonAbilities;
  readonly type: IPokemonType[];
}

export async function getPokemons() {
  try {
    const generations = [
      { data: Generation1, bgColor: 'bg-amber-400', bgColorLight: 'bg-amber-200', textColor: 'text-black' },
      { data: Generation2, bgColor: 'bg-blue-500', bgColorLight: 'bg-blue-200', textColor: 'text-white' },
      { data: Generation3, bgColor: 'bg-green-500', bgColorLight: 'bg-green-200', textColor: 'text-white' },
      { data: Generation4, bgColor: 'bg-yellow-500', bgColorLight: 'bg-yellow-200', textColor: 'text-black' },
      { data: Generation5, bgColor: 'bg-gray-800', bgColorLight: 'bg-gray-400', textColor: 'text-white' },
      { data: Generation6, bgColor: 'bg-orange-500', bgColorLight: 'bg-orange-200', textColor: 'text-black' },
      { data: Generation7, bgColor: 'bg-purple-500', bgColorLight: 'bg-purple-200', textColor: 'text-white' },
      { data: Generation8, bgColor: 'bg-teal-500', bgColorLight: 'bg-teal-200', textColor: 'text-white' },
      { data: Generation9, bgColor: 'bg-pink-500', bgColorLight: 'bg-pink-200', textColor: 'text-white' }
    ];

    const pokemonPromises = generations.map(async (generation, index) => {
      return {
        id: index + 1,
        colors: {
          section: generation.bgColor,
          card: generation.bgColorLight,
          textColor: generation.textColor
        },
        results: generation.data
      };
    });

    const allPokemons = await Promise.all(pokemonPromises);

    return allPokemons;
  } catch (error) {
    console.error('Error fetching pokemons:', error);
    throw error;
  }
}
