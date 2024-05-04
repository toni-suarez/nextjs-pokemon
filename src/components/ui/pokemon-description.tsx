import { Language } from "@/i18n";
import { useTranslations } from "next-intl";

export const PokemonDescription = ({
  className,
  children,
  generation,
  pokeid,
  name,
  weight,
  size,
  ability,
  color,
}: {
  className?: string;
  children?: React.ReactNode;
  generation: number;
  pokeid: string;
  name: string;
  weight: string;
  size: string;
  ability: string;
  color: string;
}) => {
  const t = useTranslations('Pokemon');

  return (
    <div dangerouslySetInnerHTML={{
      __html: t.markup('description', {
        strong: (chunks) => `<strong>${chunks}</strong>`,
        name: name,
        pokeid: pokeid,
        generation: generation.toString(),
        size: size,
        weight: weight,
        ability: ability,
        color: color
      })
    }}></div >
  );
}
