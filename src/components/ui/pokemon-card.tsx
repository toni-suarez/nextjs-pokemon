import { cn } from "@/utils/cn";
import Image from 'next/image'
import { IPokemon, IPokemonType, pokemonTypesColors } from "@/api/pokedex";
import Link from 'next/link';
import { padIdWithZeros, dmToM, hgToKg } from '@/api/pokedex';
import { Language } from "@/i18n";
import { PokemonAudio } from './pokemon-audio';

export const PokemonCard = ({
  className,
  id,
  pokemon,
  language,
  sizeTranslation,
  weightTranslation,
}: {
  className?: string;
  id?: number;
  pokemon: IPokemon;
  language: Language;
  sizeTranslation: string;
  weightTranslation: string;
}) => {
  return (
    <div
      className={cn(
        "rounded-xl flex flex-col p-5 justify-center items-center relative transition group scale-100 lg:hover:-translate-y-1 lg:hover:shadow-xl",
        className
      )}
    >
      <span className="font-sans text-sm absolute top-2 right-2">#{padIdWithZeros(pokemon.id)}</span>

      <div className="text-[.65rem] flex flex-row space-x-1 absolute top-2 left-2">
        {pokemon.type.map((type: IPokemonType, index: number) => (
          <span
            key={index}
            className={`block px-1 rounded-md ${pokemonTypesColors[type['en']].textColor} ${pokemonTypesColors[type['en']].bgColor}`}>
            {type[language]}
          </span>
        ))}
      </div>

      <Link
        href={`/${language}/${pokemon.names[language]}`}
        className="transition aspect-square pt-5 group-hover:lg:scale-110">
        <Image
          className="aspect-square w-48 object-fit"
          src={'/images/pokemons/' + pokemon.id + '.png'}
          width={300} height={300} alt={pokemon.names[language]} />
      </Link>

      <div className="text-xl font-sans font-bold mb-10 mt-3 lg:mt-8 w-full text-center">
        {pokemon.names[language]}
      </div>

      <div className="text-[.65rem] font-sans absolute bottom-2 left-3">
        <div className='flex space-x-1'>
          <span className='capitalize'>{sizeTranslation}:</span>
          <span>{dmToM(pokemon.height)}</span>
        </div>
        <div className='flex space-x-1'>
          <span className='capitalize'>{weightTranslation}:</span>
          <span>{hgToKg(pokemon.weight)}</span>
        </div>
      </div>
      <PokemonAudio className="absolute bottom-2 right-2" pokemon={pokemon} />
    </div >
  );
};
