import { cn } from "@/utils/cn";

export const PokemonGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div className={cn("grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 px-4 md:px-0 max-w-7xl mx-auto", className)}>
      {children}
    </div>
  );
};
