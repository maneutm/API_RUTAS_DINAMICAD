import React from "react";

interface PokemonInterface {
  params: {
    names: string;
  };
}

type PokemonApiResponse = {
  sprites: {
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
};

export default async function PokemonPage(props: PokemonInterface) {

  const { names } = await props.params;

  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${names}`
  );

  const jsonResponse: PokemonApiResponse = await res.json();

  const image =
    jsonResponse.sprites.other["official-artwork"].front_default;

  if (!image) {
    return <div>Error en API</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-svh bg-red-500/10">

      <div className="max-w-180 mx-auto">

        <div className="relative flex flex-col bg-white shadow-md rounded-xl w-96">

          <div className="relative mx-4 mt-4 overflow-hidden rounded-xl h-96">

            <img
              src={image}
              alt={`Pokemon ${names}`}
              className="object-contain w-full h-full"
            />

          </div>

          <div className="p-6">

            <p className="text-3xl font-bold capitalize">
              Pokemon {names}
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}
