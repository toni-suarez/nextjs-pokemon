import React, { useState, useEffect, useRef } from 'react';
import { useInView } from "framer-motion"
import { IPokemonYoutubeProps } from '@/api/pokedex';
import { Language } from '@/app/LanguageContext';
import { i18n } from '@/app/i18n';

const fetchPokemonVideo = async (pokemon: string): Promise<IPokemonYoutubeProps> => {
  const response = await fetch(`/api/youtube/${pokemon}`, { next: { revalidate: 3600 } });
  const data = await response.json();
  return data;
};

export const PokemonVideo = ({
  className,
  children,
  language,
  pokemon,
}: {
  className?: string;
  children?: React.ReactNode;
  language: Language;
  pokemon: string;
}) => {
  const [pokemonVideo, setPokemonVideo] = useState<IPokemonYoutubeProps>();
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px 5000px 0px" })

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPokemonVideo(pokemon);
      setPokemonVideo(data);
    };

    fetchData();
  }, [pokemon]);


  if (!pokemonVideo) {
    return (
      <p>Kein Video gefunden {pokemon}.</p>
    );
  }

  return (
    <div className='max-w-5xl w-full h-auto aspect-video'>
      <iframe
        className='w-full h-full aspect-video z-10'
        width="560"
        height="315"
        src={`https://www.youtube-nocookie.com/embed/${pokemonVideo.videoId}`}
        title="YouTube video player"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy='strict-origin-when-cross-origin'
        allowFullScreen></iframe>

      <div className='text-xs flex flex-col mt-3 text-right'>
        <span>{i18n[language].video_source}: Youtube; &quot;{pokemonVideo.snippet.title}&quot; ({i18n[language].channel}: &quot;{pokemonVideo.snippet.channelTitle}&quot;)</span>
      </div>
    </div>
  );
}
