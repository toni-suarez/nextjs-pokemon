import { PokemonVideo } from '@/components/ui/pokemon-video';
import { getColorsForGeneration, IPokemonDetailProps, pokemonTypesColors, IPokemonType } from '@/data/pokedex';
import Image from 'next/image';
import { padIdWithZeros, dmToM, hgToKg } from '@/data/pokedex';
import Link from 'next/link';
import { PokemonDescription } from '@/components/ui/pokemon-description';
import { getTranslations } from 'next-intl/server';
import { Language } from '@/i18n';
import { PokemonAudio } from '@/components/ui/pokemon-audio';
import { notFound } from 'next/navigation';

async function fetchPokemonData(pokemon: string) {
  const response = await fetch(`${process.env.API_URL}/api/pokemon/detail/${pokemon}`);
  const data = await response.json();

  if (!data.generation_id) {
    return false;
  }

  return {
    id: data.generation_id,
    colors: getColorsForGeneration(data.generation_id),
    results: data
  };
};

export default async function Home({
  params: { locale, pokemon }
}: {
  params: { pokemon: string, locale: Language }
}) {
  const pokemonData = await fetchPokemonData(pokemon);
  const t = await getTranslations('Pokemon');

  if (!pokemonData) {
    notFound();
  }

  const bgColor = pokemonTypesColors[pokemonData.results.type[0]['en']].bgColor;
  const textColor = pokemonTypesColors[pokemonData.results.type[0]['en']].textColor;

  return (
    <main className={`${textColor} ${bgColor}`}>
      <div className='max-w-7xl mx-auto pt-20'>
        <Link
          className={`hidden lg:inline-flex text-xs rounded-lg py-2 px-3 ${bgColor} ${textColor} hover:bg-white hover:text-black`}
          href={`/${locale}`}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          <span className='ml-2'>{t('back')}</span>
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
            <Image
              priority={true}
              className="aspect-square w-[500px] object-fit mx-auto"
              src={`/images/pokemons/${pokemonData.results.id}.png`}
              width={300}
              height={300}
              alt={pokemonData.results.names[locale]} />
            <PokemonAudio pokemon={pokemonData.results} />
          </div>
          <div className='w-full lg:w-1/2 text-center lg:text-left'>
            <h1 className="text-4xl mb-5 font-bold uppercase lg:text-7xl lg:mb-10">{pokemonData.results.names[locale]}</h1>

            <div className="text-base font-normal flex flex-row space-x-3">
              {pokemonData.results.type.map((type: IPokemonType, index: number) => (
                <span
                  key={index}
                  className={`block px-3 py-1 rounded-md border border-white ${pokemonTypesColors[type['en']].textColor} ${pokemonTypesColors[type['en']].bgColor}`}>
                  {type[locale]}
                </span>
              ))}
            </div>

            <div className={`w-full lg:w-2/3 my-10 text-base p-3 text-left rounded-lg bg-white/60 text-black`}>
              <PokemonDescription
                name={pokemonData.results.names[locale]}
                pokeid={padIdWithZeros(pokemonData.results.id)}
                generation={pokemonData.results.generation_id}
                size={dmToM(pokemonData.results.height)}
                weight={hgToKg(pokemonData.results.weight)}
                color={pokemonData.results.color[locale]}
                ability={pokemonData.results.abilities[locale]}></PokemonDescription>
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
        <PokemonVideo pokemon={pokemonData.results.names[locale]}></PokemonVideo>
      </section>
    </main>
  );
}
