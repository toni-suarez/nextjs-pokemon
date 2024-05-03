import { NextResponse, NextRequest } from 'next/server';

async function fetchYouTubeData(pokemon: string) {
  const YOUTUBE_PLAYLIST_ITEMS_API = 'https://www.googleapis.com/youtube/v3/search';
  const response = await fetch(`${YOUTUBE_PLAYLIST_ITEMS_API}?key=${process.env.YOUTUBE_API_KEY}&type=video&part=snippet&maxResults=1&q=pokemon serie clip ${pokemon}`);
  const data = await response.json();
  return data;
}

export async function GET(request: NextRequest, context: { params: { pokemon: string } }) {
  const pokemon: string = context.params.pokemon || '';

  try {
    const newData = await fetchYouTubeData(pokemon);

    if (!newData || !newData.items || newData.items.length === 0) {
      return NextResponse.json({ status: 404, videoId: 'sC0fttPh-As', snippet: defaultVideoSnippet });
    }

    return NextResponse.json({ status: 200, videoId: newData.items[0].id.videoId, snippet: newData.items[0].snippet });
  } catch (error) {
    return NextResponse.json({ status: 500, message: error })
  }
}


const defaultVideoSnippet = {
  "publishedAt": "2023-02-23T20:50:38Z",
  "channelId": "UCFctpiB_Hnlk3ejWfHqSm6Q",
  "title": "Pokémon Theme Opening (Multi-Language) | Pokémon the Series",
  "description": "I wanna be the very best… 🎤🎶\n\nEveryone knows the lyrics to the first Pokémon opening by heart, right? Sing along in your own language to this multi-lingual rendition from the first season of Pokémon the Series!\n\nOfficial Site: https://www.pokemon.com\nShop: http://www.pokemoncenter.com\nFacebook: http://www.facebook.com/Pokemon\nTwitter: http://www.twitter.com/Pokemon\nInstagram: http://www.instagram.com/pokemon\nTikTok: https://www.tiktok.com/@pokemonofficial",
  "thumbnails": {
    "default": {
      "url": "https://i.ytimg.com/vi/sC0fttPh-As/default.jpg",
      "width": 120,
      "height": 90
    },
    "medium": {
      "url": "https://i.ytimg.com/vi/sC0fttPh-As/mqdefault.jpg",
      "width": 320,
      "height": 180
    },
    "high": {
      "url": "https://i.ytimg.com/vi/sC0fttPh-As/hqdefault.jpg",
      "width": 480,
      "height": 360
    },
    "standard": {
      "url": "https://i.ytimg.com/vi/sC0fttPh-As/sddefault.jpg",
      "width": 640,
      "height": 480
    },
    "maxres": {
      "url": "https://i.ytimg.com/vi/sC0fttPh-As/maxresdefault.jpg",
      "width": 1280,
      "height": 720
    }
  },
  "channelTitle": "The Official Pokémon YouTube channel",
  "tags": [
    "AniPoke",
    "Gotta Catch Em All",
    "I wanna be the very best",
    "I wanna be the very best opening",
    "Pokémon",
    "Pokémon Anime opening",
    "Pokémon Season 1 Opening",
    "Pokémon Theme",
    "Pokémon Theme Multi-language",
    "Pokémon animation",
    "Pokémon anime",
    "Pokémon multi-language",
    "Pokémon opening",
    "Pokémon opening multi-language",
    "Pokémon opening theme"
  ],
  "categoryId": "1",
  "liveBroadcastContent": "none",
  "localized": {
    "title": "Pokémon Theme Opening (Multi-Language) | Pokémon the Series",
    "description": "I wanna be the very best… 🎤🎶\n\nEveryone knows the lyrics to the first Pokémon opening by heart, right? Sing along in your own language to this multi-lingual rendition from the first season of Pokémon the Series!\n\nOfficial Site: https://www.pokemon.com\nShop: http://www.pokemoncenter.com\nFacebook: http://www.facebook.com/Pokemon\nTwitter: http://www.twitter.com/Pokemon\nInstagram: http://www.instagram.com/pokemon\nTikTok: https://www.tiktok.com/@pokemonofficial"
  }
};
