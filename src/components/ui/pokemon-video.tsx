import { Language } from "@/i18n";
import { getTranslations } from "next-intl/server";

async function fetchPokemonVideo(pokemon: string) {
  const response = await fetch(`${process.env.API_URL}/api/youtube/${pokemon}`);
  const data = await response.json();
  return data;
};

export async function PokemonVideo({
  className,
  children,
  pokemon,
}: {
  className?: string;
  children?: React.ReactNode;
  pokemon: string;
}) {
  const pokemonVideo = await fetchPokemonVideo(pokemon);
  const t = await getTranslations('Pokemon');

  if (!pokemonVideo) {
    return (
      <div className='max-w-5xl w-full h-auto aspect-video bg-gray-300 rounded flex justify-center items-center'>
        <p className='text-xl text-black'>{t('no_match', { name: pokemon })}</p>
      </div>
    );
  }

  return (
    <div className='max-w-7xl w-full h-auto bg-white p-4 shadow-lg rounded-md'>
      <iframe
        className='w-full h-full aspect-video z-10'
        width="560"
        height="315"
        src={`https://www.youtube-nocookie.com/embed/${pokemonVideo.videoId}`}
        title="YouTube video player"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy='strict-origin-when-cross-origin'
        allowFullScreen></iframe>

      <div className='flex flex-col mt-3 text-right text-xs text-gray-800'>
        <span>
          {`${t('video_source')}: Youtube; "${pokemonVideo.snippet.title}" (${t('channel')}: "${pokemonVideo.snippet.channelTitle}")`}
        </span>
      </div>
    </div>
  );
}
