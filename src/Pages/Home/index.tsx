import { useEffect, useRef, useState } from "react";

const Home = () => {
  const [pokemon, setPokemon] = useState<PokeInit[]>([]);
  const [nextPoke, setNextPoke] = useState<string>("");
  const [prevPoke, setPrevPoke] = useState<string>("");

  const node = useRef<HTMLLIElement>(null);
  
  const URL_All_Pokemon: string = "https://pokeapi.co/api/v2/pokemon/?limit=5";

  type PokeInit = {
    name: string;
    url: string;
    sprite?: string;
    id?: number;
  };

  const getPokemon = (url: string) => {
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

        const newPokemonArray = [...pokemon, ...pokemonArray];
        setPokemon([...newPokemonArray]);

        setNextPoke(data.next);
        setPrevPoke(data.previous);
      });
  };

  useEffect(() => {
    getPokemon(URL_All_Pokemon);
  }, []);

  useEffect(()=>{
        
        const observer = new IntersectionObserver((entries)=>{
            entries.forEach(entry=>{
                if(entry.isIntersecting){
                    getPokemon(nextPoke)
                }
            })
        })
        if(node.current != undefined){
           observer.observe(node.current)
        }
        
        return ()=>{
            observer.disconnect()
        }
    },[nextPoke])

  return (
    <>
      <p>Hola mundo</p>
      <ul>
        {pokemon.length === 0 ? (
          <p>hola aqui estoy</p>
        ) : (
          pokemon.map((poke: PokeInit, i: number) => {
            return (
              <li key={i} ref={node}>
                <p>
                  {poke.id}-{poke.name}
                </p>
                <img src={poke.sprite} alt={poke.name}/>
              </li>
            );
          })
        )}
      </ul>
      <button onClick={() => getPokemon(prevPoke)}>anterior</button>
      <button onClick={() => getPokemon(nextPoke)}>siguiente</button>
    </>
  );
};

export { Home };
