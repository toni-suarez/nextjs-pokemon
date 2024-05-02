import { Generation1 } from "./pokemons/Generation-1";
import { Generation2 } from "./pokemons/Generation-2";
import { Generation3 } from "./pokemons/Generation-3";
import { Generation4 } from "./pokemons/Generation-4";
import { Generation5 } from "./pokemons/Generation-5";
import { Generation6 } from "./pokemons/Generation-6";
import { Generation7 } from "./pokemons/Generation-7";
import { Generation8 } from "./pokemons/Generation-8";
import { Generation9 } from "./pokemons/Generation-9";

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
    const pokemons = [
      { id: 1, results: Generation1, colors: { section: 'bg-amber-400', card: 'bg-amber-200', textColor: 'text-black' } },
      { id: 2, results: Generation2, colors: { section: 'bg-blue-500', card: 'bg-blue-200', textColor: 'text-white' } },
      { id: 3, results: Generation3, colors: { section: 'bg-green-500', card: 'bg-green-200', textColor: 'text-white' } },
      { id: 4, results: Generation4, colors: { section: 'bg-yellow-500', card: 'bg-yellow-200', textColor: 'text-black' } },
      { id: 5, results: Generation5, colors: { section: 'bg-gray-800', card: 'bg-gray-400', textColor: 'text-white' } },
      { id: 6, results: Generation6, colors: { section: 'bg-orange-500', card: 'bg-orange-200', textColor: 'text-black' } },
      { id: 7, results: Generation7, colors: { section: 'bg-purple-500', card: 'bg-purple-200', textColor: 'text-white' } },
      { id: 8, results: Generation8, colors: { section: 'bg-teal-500', card: 'bg-teal-200', textColor: 'text-white' } },
      { id: 9, results: Generation9, colors: { section: 'bg-pink-500', card: 'bg-pink-200', textColor: 'text-white' } }
    ];

    return pokemons;
  } catch (error) {
    console.error('Error fetching pokemons:', error);
    throw error;
  }
}
