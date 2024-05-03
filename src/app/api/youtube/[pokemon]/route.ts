import { NextResponse, NextRequest } from 'next/server';

async function fetchYouTubeData(pokemon: string) {
  const YOUTUBE_PLAYLIST_ITEMS_API = 'https://www.googleapis.com/youtube/v3/search';
  const response = await fetch(`${YOUTUBE_PLAYLIST_ITEMS_API}?key=${process.env.YOUTUBE_API_KEY}&type=video&part=snippet&maxResults=1&q=pokemon serie clip ${pokemon}`, { next: { revalidate: 30 * 24 * 60 * 60 } });
  const data = await response.json();
  return data;
}

export async function GET(request: NextRequest, context: { params: { pokemon: string } }) {
  const pokemon: string = context.params.pokemon || '';

  try {
    const newData = await fetchYouTubeData(pokemon);

    if (!newData || !newData.items || newData.items.length === 0) {
      return NextResponse.json({ status: 404, videoId: null, snippet: {} });
    }

    return NextResponse.json({ status: 200, videoId: newData.items[0].id.videoId, snippet: newData.items[0].snippet });
  } catch (error) {
    console.error(`Error fetching YouTube data for ${pokemon}: ${error}`);
    return NextResponse.error(new Error(`Failed to fetch YouTube data for ${pokemon}`));
  }
}
