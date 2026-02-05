import Link from "next/link";

const pokemones = [
  "pikachu",
  "jigglypuff",
  "psyduck",
  "growlithe",
  "machop",
  "geodude",
  "gastly",
  "magikarp",
  "eevee",
  "snorlax",
  "charizard"
];
export default function PokemonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">

      <nav className="bg-blue-600 p-3 flex flex-wrap gap-2 justify-center">
        {pokemones.map((name) => (
          <Link
            key={name}
            href={`/Pokemones/${name}`}
            className="bg-red px-3 py-2 rounded-md hover:bg-red"
          >
            {name}
          </Link>
        ))}
      </nav>

      <div className="flex-1">{children}</div>

      <footer className="bg-blue-600 text-white text-center p-2">
        Pokédex
      </footer>

    </div>
  );
}
