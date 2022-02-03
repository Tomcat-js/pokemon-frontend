import "./App.css";

import { useState, useEffect } from "react";

export default function App() {
  const [data, setData] = useState(null);
  const [list, setList] = useState([]);
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
          setList((picList) => [...picList, pokeData.sprites.front_default]);
        });
    }
  }, []);

  return (
    <div className="App">
      <h1>50 Pokemon</h1>
      {loading && <div>A moment please...</div>}
      {error && (
        <div>{`There is a problem fetching the post data - ${error}`}</div>
      )}
      <ul>
        {list &&
          list.map((name) => (
            <li>
              <img src={name}></img>
            </li>
          ))}
      </ul>
    </div>
  );
}
