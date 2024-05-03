import { NextResponse, NextRequest } from 'next/server';
import fs from 'fs';
import path from 'path';

const CACHE_DURATION_MS = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds

async function fetchYouTubeData(pokemon: string) {
  const YOUTUBE_PLAYLIST_ITEMS_API = 'https://www.googleapis.com/youtube/v3/search';
  const response = await fetch(`${YOUTUBE_PLAYLIST_ITEMS_API}?key=${process.env.YOUTUBE_API_KEY}&type=video&part=snippet&maxResults=1&q=pokemon serie clip ${pokemon}`);
  const data = await response.json();
  return data;
}

function saveYouTubeDataLocally(pokemon: string, data: any) {
  const filePath = path.join('public/cache/pokemons', `youtube_cache_${pokemon}.json`);
  const expirationTime = Date.now() + CACHE_DURATION_MS;
  const cacheData = { expirationTime, data };
  fs.writeFileSync(filePath, JSON.stringify(cacheData));
}

function loadYouTubeDataLocally(pokemon: string) {
  const filePath = path.join('public/cache/pokemons', `youtube_cache_${pokemon}.json`);
  if (fs.existsSync(filePath)) {
    const cacheData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    if (cacheData.expirationTime > Date.now()) {
      return cacheData.data;
    } else {
      fs.unlinkSync(filePath);
    }
  }
  return null;
}

export async function GET(request: NextRequest, context: { params: { pokemon: string } }) {
  const pokemon: string = context.params.pokemon || '';
  let data = loadYouTubeDataLocally(pokemon);

  if (!data) {
    data = await fetchYouTubeData(pokemon);
    saveYouTubeDataLocally(pokemon, data);
  }

  if (!data || !data.items || data.items.length === 0) {
    return NextResponse.json({ status: 404, videoId: null, snippet: {} });
  }

  const videoId = data.items[0].id.videoId;
  const snippet = data.items[0].snippet;

  return NextResponse.json({ status: 200, videoId, snippet });
}
