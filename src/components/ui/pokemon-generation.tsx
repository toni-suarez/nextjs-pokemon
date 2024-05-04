import { PokemonCard } from "@/components/ui/pokemon-card";
import { PokemonGrid } from './pokemon-grid';
import { IPokemon, IPokemonGenerationProps, getColorsForGeneration } from '@/api/pokedex';
import { Language } from "@/i18n";

async function fetchPokemonData(generationNumber: number): Promise<IPokemonGenerationProps> {
  const response = await fetch(`${process.env.API_URL}/api/pokemon/generation/${generationNumber}`);
  const data = await response.json();

  return {
    id: generationNumber,
    colors: getColorsForGeneration(generationNumber),
    results: data
  };
};

export async function PokemonGeneration({
  className,
  children,
  generation,
  language,
}: {
  className?: string;
  children?: React.ReactNode;
  generation: number;
  language: Language
}) {
  const pokemonData = await fetchPokemonData(generation);
  // const ref = useRef<HTMLElement>(null);

  return (
    <section
      data-bg-color={`${pokemonData.colors.section}`}
      data-current-nav-color={`${pokemonData.colors.card}`}
      data-text-color={`${pokemonData.colors.textColor}`}
      id={pokemonData.id.toString()}
      className={`py-16 anchor ${pokemonData.colors.section}`}
      key={pokemonData.id}>

      {/* <motion.div
        transition={{ duration: 1, delay: 0 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}> */}
      <h2 className={`${pokemonData.colors.textColor} text-3xl md:text-7xl tracking-tight font-bold text-center mb-16 capitalize`}>
        {/* {pokemonData.id}. {i18n[language].generation} */}
      </h2>
      {/* </motion.div> */}

      <PokemonGrid>
        {pokemonData.results.map((pokemon: IPokemon, i: number) => (
          <PokemonCard
            pokemon={pokemon}
            language={language}
            key={pokemon.id}
            id={pokemon.id}
            className={`text-black/80 ${pokemonData.colors.card}`} />
        ))}
      </PokemonGrid>
    </section>

  );
}
