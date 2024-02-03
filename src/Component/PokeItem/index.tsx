import { useEffect } from "react";
import { usePokemon } from "../../Hooks/usePokemon.js";
import { type PokeInit } from "../../Types/type.js";
import pokeball from "../../assets/pokeball.svg";
import "./PokeItem.css"

const PokeItem = () => {

  const { pokemon ,nextPoke, getPokemon, node } = usePokemon();

  useEffect(()=>{
    const options = {
      threshold: 0.7,
    }

    const pokeItems:NodeListOf<Node> = document.querySelectorAll(".poke-item-box")

    const observer = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          const pokeItem:HTMLImageElement = entry.target.children[0]
          console.log(pokeItem)
          const url: string = pokeItem.getAttribute("data-src")
          pokeItem.setAttribute("src", url)
        }   
      })  
    }, options) 

    pokeItems.forEach((item)=>{
      observer?.observe(item)
    })

    return ()=>{
      observer.disconnect()
    }
  },[nextPoke, pokemon])
 
  useEffect(()=>{
    const observer = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          getPokemon(nextPoke, false)
        }   
      }) 
    }) 
    if(node.current != undefined){
      observer.observe(node.current)
    }
    return ()=>{
      observer.disconnect()
    }
  },[nextPoke, pokemon])
  
  return(
    <ul className="all-pokemon-box">
      {
        pokemon.length === 0 ? 
          <p>hola aqui estoy</p>
        : 
          pokemon.map((poke: PokeInit, i: number) => {
            return (
              <li key={i} ref={node} className="poke-item-box">
                <img data-src={poke.sprite} alt={poke.name} src={pokeball} className="poke-item-img"/>
              </li>
            );
          })
      }
    </ul>
        
    
  )
}

export {PokeItem}