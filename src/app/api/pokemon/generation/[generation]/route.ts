import { NextResponse, NextRequest } from 'next/server'
import { readFileSync } from 'fs';
import { join } from 'path';
import { IPokemon } from '@/data/pokedex';


export async function GET(request: NextRequest, context: { params: { generation: string } }) {
  const generationParam: string = context.params.generation || '1';
  let generation: number = parseInt(generationParam, 10);

  if (isNaN(generation) || generation < 1 || generation > 9) {
    return NextResponse.json({ error: 'Not found' });
  }

  try {
    const filePath = join(process.cwd(), 'src/data/pokemons', `generation-${generation}.json`);
    const jsonData = readFileSync(filePath, 'utf-8');
    const parsedData: IPokemon[] = JSON.parse(jsonData);

    return NextResponse.json(parsedData)
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' });
  }


}
