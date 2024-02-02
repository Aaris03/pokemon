import { useEffect, useRef, useState } from "react";

const Home = () => {
  const [pokemon, setPokemon] = useState<PokeInit[]>([]);
  const [nextPoke, setNextPoke] = useState<string>("");
  const [prevPoke, setPrevPoke] = useState<string>("");

  console.log("debajo del state", pokemon)

  const node = useRef<[HTMLImageElement] | null>(null);
  
  const URL_All_Pokemon: string = "https://pokeapi.co/api/v2/pokemon/?limit=1";

  type PokeInit = {
    name: string;
    url: string;
    sprite?: string;
    id?: number;
  };

  const getPokemon = (url: string) => {
    //Trae a todos los pokemon
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
    console.log("Aqui estoy", pokemon);
    getPokemon(URL_All_Pokemon);
  }, []);

  /*useEffect(()=>{
        
        const observer = new IntersectionObserver((entries)=>{
            entries.forEach(entry=>{
                if(entry.isIntersecting){
                    console.log('banana',node.current)
                    //getPokemon(nextPoke)
                }
            })
        })
        if(node.current != undefined && node.current?.length > 0){
            //console.log(node.current[node.current.length-1])
           observer.observe(node.current[node.current.length-1])
        }
        
        
        return ()=>{
            observer.disconnect()
        }
    },[nextPoke])*/

  

  return (
    <>
      <p>Hola mundo</p>
      <ul>
        {pokemon.length === 0 ? (
          <p>hola aqui estoy</p>
        ) : (
          pokemon.map((poke: PokeInit, i: number) => {
            return (
              <li key={i} style={{ minHeight: "300px" }}>
                <p>
                  {poke.id}-{poke.name}
                </p>
                <img
                  src={poke.sprite}
                  alt={poke.name}
                  ref={(element) => {
                    //console.log(element)
                    if (node.current && element) {
                      node.current.push(element);
                    } else if (element) {
                      node.current = [element];
                    }
                  }}
                />
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
