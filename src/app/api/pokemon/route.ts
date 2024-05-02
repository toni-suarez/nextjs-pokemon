import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse, NextRequest } from 'next/server'
import { readFileSync } from 'fs';
import { join } from 'path';
import { IPokemon } from '@/api/pokedex';


export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams

  const generationParam: string = searchParams.get('generation') || '1';
  let generation: number = parseInt(generationParam, 10);

  if (isNaN(generation) || generation < 1 || generation > 9) {
    return;
  }

  try {
    const filePath = join(process.cwd(), 'src/api/pokemons', `generation-${generation}.json`);
    const jsonData = readFileSync(filePath, 'utf-8');
    const parsedData: IPokemon[] = JSON.parse(jsonData);

    return NextResponse.json(parsedData)
  } catch (error) {
    console.error('Fehler beim Laden der Pokemon-Daten:', error);
    // res.status(500).json({ error: 'Internal Server Error' });
  }


}
