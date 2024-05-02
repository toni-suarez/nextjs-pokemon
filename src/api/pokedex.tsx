export interface IPokemonGenerationProps {
  id: number,
  results: IPokemon[];
  colors: {
    section: string;
    card: string;
    textColor: string;
  };
}

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

export function getColorsForGeneration(generation: number) {
  const generationColors = [
    { section: 'bg-amber-400 shadow-md', card: 'bg-amber-200', textColor: 'text-black' },
    { section: 'bg-blue-500 shadow-md', card: 'bg-blue-200', textColor: 'text-white' },
    { section: 'bg-green-500 shadow-md', card: 'bg-green-200', textColor: 'text-white' },
    { section: 'bg-yellow-400 shadow-md', card: 'bg-yellow-200', textColor: 'text-black' },
    { section: 'bg-gray-800 shadow-md', card: 'bg-gray-300', textColor: 'text-white' },
    { section: 'bg-orange-400 shadow-md', card: 'bg-orange-200', textColor: 'text-black' },
    { section: 'bg-purple-500 shadow-md', card: 'bg-purple-200', textColor: 'text-white' },
    { section: 'bg-teal-500 shadow-md', card: 'bg-teal-200', textColor: 'text-white' },
    { section: 'bg-pink-500 shadow-md', card: 'bg-pink-200', textColor: 'text-white' }
  ];

  const adjustedIndex = Math.max(0, Math.min(generation - 1, generationColors.length - 1));
  return generationColors[adjustedIndex];
}

export const pokemonTypesColors: Record<string, { bgColor: string, textColor: string }> = {
  normal: { bgColor: 'bg-gray-400', textColor: 'text-white' },
  fighting: { bgColor: 'bg-red-600', textColor: 'text-white' },
  flying: { bgColor: 'bg-blue-400', textColor: 'text-white' },
  poison: { bgColor: 'bg-purple-600', textColor: 'text-white' },
  ground: { bgColor: 'bg-yellow-800', textColor: 'text-white' },
  rock: { bgColor: 'bg-gray-700', textColor: 'text-white' },
  bug: { bgColor: 'bg-green-500', textColor: 'text-white' },
  ghost: { bgColor: 'bg-purple-700', textColor: 'text-white' },
  steel: { bgColor: 'bg-gray-500', textColor: 'text-gray-100' },
  fire: { bgColor: 'bg-red-600', textColor: 'text-white' },
  water: { bgColor: 'bg-blue-500', textColor: 'text-white' },
  grass: { bgColor: 'bg-green-400', textColor: 'text-gray-900' },
  electric: { bgColor: 'bg-yellow-400', textColor: 'text-gray-900' },
  psychic: { bgColor: 'bg-purple-500', textColor: 'text-white' },
  ice: { bgColor: 'bg-blue-200', textColor: 'text-gray-900' },
  dragon: { bgColor: 'bg-indigo-600', textColor: 'text-white' },
  dark: { bgColor: 'bg-gray-800', textColor: 'text-white' },
  fairy: { bgColor: 'bg-pink-400', textColor: 'text-gray-900' },
  unknown: { bgColor: 'bg-gray-300', textColor: 'text-gray-900' },
  shadow: { bgColor: 'bg-gray-900', textColor: 'text-white' },
};
