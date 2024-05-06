import { NextResponse, NextRequest } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';
import { IPokemon } from '@/data/pokedex';

function getAllPokemons(): IPokemon[] {
  try {
    const allPokemons: IPokemon[] = [];

    for (let generation = 1; generation <= 9; generation++) {
      const filePath = join(process.cwd(), 'src/data/pokemons', `generation-${generation}.json`);
      const jsonData = readFileSync(filePath, 'utf-8');
      const parsedData: IPokemon[] = JSON.parse(jsonData);
      allPokemons.push(...parsedData);
    }

    return allPokemons;
  } catch (error) {
    throw new Error('Failed to load Pokémon data');
  }
}

export async function GET(request: NextRequest, context: { params: { pokemon: string } }) {
  const pokemonName: string = context.params.pokemon || '';

  try {
    const allPokemons = getAllPokemons();
    const foundPokemon = allPokemons.find(pokemon =>
      pokemon.names.de.toLowerCase() === pokemonName.toLowerCase() ||
      pokemon.names.en.toLowerCase() === pokemonName.toLowerCase()
    );

    if (!foundPokemon) {
      return NextResponse.json({ notFound: true }, { status: 404 });
    }

    return NextResponse.json(foundPokemon);

  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
