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
    { section: 'bg-amber-400', card: 'bg-amber-200', textColor: 'text-black' },
    { section: 'bg-blue-500', card: 'bg-blue-200', textColor: 'text-white' },
    { section: 'bg-green-500', card: 'bg-green-200', textColor: 'text-white' },
    { section: 'bg-yellow-500', card: 'bg-yellow-200', textColor: 'text-black' },
    { section: 'bg-gray-800', card: 'bg-gray-400', textColor: 'text-white' },
    { section: 'bg-orange-500', card: 'bg-orange-200', textColor: 'text-black' },
    { section: 'bg-purple-500', card: 'bg-purple-200', textColor: 'text-white' },
    { section: 'bg-teal-500', card: 'bg-teal-200', textColor: 'text-white' },
    { section: 'bg-pink-500', card: 'bg-pink-200', textColor: 'text-white' }
  ];

  const adjustedIndex = Math.max(0, Math.min(generation - 1, generationColors.length - 1));
  return generationColors[adjustedIndex];
}
