import "./App.css";

import { useState, useEffect } from "react";

export default function App() {
  const [data, setData] = useState(null);
  const [pokemonData, setPokemonData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=50`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        return response.json();
      })
      .then((allpokemon) => {
        allpokemon.results.forEach(function (pokemon) {
          fetchPokemonData(pokemon);
        });
        setData(allpokemon);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setData(null);
      })
      .finally(() => {
        setLoading(false);
      });
    function fetchPokemonData(pokemon) {
      let url = pokemon.url;
      fetch(url)
        .then((response) => response.json())
        .then(function (pokeData) {
          setPokemonData((pokeObjList) => [...pokeObjList, pokeData]);
        });
    }
  }, []);
  console.log("rendered");
  return (
    <div className="App">
      <h1>50 Pokemon</h1>
      {loading && <div>A moment please...</div>}
      {error && (
        <div>{`There is a problem fetching the post data - ${error}`}</div>
      )}
      <ul>
        {pokemonData.map((pokeObj, i) => (
          <li key={i}>
            <h1>{data.results[i].name}</h1>
            <h3>Weight: {Math.round(pokeObj.weight / 10)} kg</h3>
            <h3>Abilities: {pokeObj.abilities.length} </h3>
            {pokeObj.abilities.map((abilityList, idx) => {
              return <h6 key={idx}>{abilityList.ability.name}</h6>;
            })}
            <img src={pokeObj.sprites.front_default}></img>
          </li>
        ))}
      </ul>
    </div>
  );
}
