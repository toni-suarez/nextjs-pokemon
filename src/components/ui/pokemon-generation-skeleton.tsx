export default function PokemonGenerationSkeleton() {
  return (
    <section
      data-bg-color="bg-amber-400"
      data-current-nav-color={`bg-amber-200`}
      data-text-color={`text-black`}
      className={`py-16 anchor bg-amber-400 text-center`}>

      <div className={`bg-amber-500 inline-block w-[450px] h-20 mb-16`}></div>
      <div className={"grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 px-4 md:px-0 max-w-7xl mx-auto"}>
        {[...Array(10)].map((_, index) => (
          <div key={index} className="bg-amber-200 h-80 rounded-xl flex flex-col p-5 justify-center items-center relative transition group scale-100 lg:hover:-translate-y-1 lg:hover:shadow-xl"></div>
        ))}
      </div>
    </section>
  );
}
