import { useEffect, useRef, useState } from "react";
import { usePokemon } from "../../Hooks/usePokemon.js";
import { type PokeInit } from "../../Types/type.d.js"

const Home = () => {
  const { pokemon, nextPoke, getPokemon } = usePokemon();

  const node = useRef<HTMLLIElement>(null);

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
      {/*<button onClick={() => getPokemon(nextPoke)}>siguiente</button>*/}
    </>
  );
};

export { Home };
