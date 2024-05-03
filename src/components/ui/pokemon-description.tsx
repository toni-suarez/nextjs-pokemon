import { Language } from "@/app/LanguageContext";
import { i18n } from "@/app/i18n";

export const PokemonDescription = ({
  className,
  children,
  generation,
  pokeid,
  name,
  weight,
  size,
  abilitiy,
  color,
  language,
}: {
  className?: string;
  children?: React.ReactNode;
  generation: number;
  pokeid: string;
  name: string;
  weight: string;
  size: string;
  abilitiy: string;
  color: string;
  language: Language
}) => {

  let text = i18n[language].description;
  text = text.replace('{name}', name);
  text = text.replace('{pokeid}', pokeid);
  text = text.replace('{generation}', generation.toString());
  text = text.replace('{size}', size);
  text = text.replace('{weight}', weight);
  text = text.replace('{abilitiy}', abilitiy);
  text = text.replace('{color}', color);

  return (
    <div dangerouslySetInnerHTML={{ __html: text }}></div>
  );
}
