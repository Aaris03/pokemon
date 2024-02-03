import { type PokeInit } from "../Types/type";
import { useEffect, useState, useRef } from "react";

export const usePokemon = () => {

  const [pokemon, setPokemon] = useState<PokeInit[]>([]);
  const [nextPoke, setNextPoke] = useState<string>("");

  const URL_All_Pokemon: string = "https://pokeapi.co/api/v2/pokemon/?limit=50";

  const getPokemon = (url:string = URL_All_Pokemon, firts:boolean = true) => {
    fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const poke: PokeInit[] = data.results;
      let pokemonArray: PokeInit[] = [];

      pokemonArray = poke.map((pokemon) => {
        const idPokemon: number = Number(
          pokemon.url.substring(34).replace("/", "")
        );

        const addPoke: PokeInit = {
          ...pokemon,
          id: idPokemon,
          sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${idPokemon}.png`,
        };
        return addPoke;
      });
 
      if(firts){
        setPokemon(pokemonArray);
      }else{
        const newPokemonArray = [...pokemon, ...pokemonArray];
        setPokemon([...newPokemonArray]);
      }
      setNextPoke(data.next);
    });

    return {pokemon, nextPoke}
  }

  useEffect(()=>{
    getPokemon(URL_All_Pokemon)
  },[])

  const node = useRef<HTMLLIElement>(null);

  return {pokemon, nextPoke, getPokemon, node}
};
