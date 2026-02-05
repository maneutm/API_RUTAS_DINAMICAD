import React from "react";
import Image from "next/image";
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
type PokemonApiResponse = {
  sprites: {
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
  types: {
    type: {//tipo del pokemon
      name: string;
    };
  }[];
};

async function getPokemon(name: string) {
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${name}`,
    { cache: "no-store" }
  );

  if (!res.ok) return null;

  const data: PokemonApiResponse = await res.json();

  return {
    image: data.sprites.other["official-artwork"].front_default,
    types: data.types.map(t => t.type.name),

  };
}

export default async function PokemonesPage() {

  const pokes = await Promise.all(
    pokemones.map(async (name) => ({
      name,
      data: await getPokemon(name),
    }))
  );

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">

{pokes.map(({ name, data }) => (
  <Link key={name} href={`/Pokemones/${name}`}>

    <div className="bg-white rounded-lg shadow hover:scale-105 transition">

      {data?.image && (
        <div className="relative h-64 w-full">
          <Image
            src={data.image}
            alt={name}
            fill
            className="object-contain p-4"
          />
        </div>
      )}

      <div className="p-2 text-center">

        <h3 className="font-bold capitalize">
          {name}
        </h3>

        {/* 👇 TIPOS */}
        <div className="flex justify-center gap-2 mt-1">
          {data?.types.map((type) => (
            <span
              key={type}
              className="bg-gray-200 px-2 py-1 rounded text-sm capitalize"
            >
              {type}
            </span>
          ))}
        </div>

      </div>

    </div>

  </Link>
))}
    </div>
  );
}
