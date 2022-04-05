import "./Details.css";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Details() {
  const [data, setData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  console.log(params);
  useEffect(() => {
    async function fetchPokemon() {
      try {
        setLoading(true);
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${params.pokemonId}`
        );
        const pokemonData = await response.json();
        setData(pokemonData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
      }
    }
    fetchPokemon();
  }, []);

  return (
    <main className="details-page">
      {loading && <div>A moment please...</div>}
      {error && (
        <div>{`There is a problem fetching the post data - ${error}`}</div>
      )}
      <div className="wrapper">
        <header className="header">
          <h1>{data.name}</h1>
        </header>
        <article className="main">
          <p>
            {console.log(data)}
            <img className="big-image" src={data.sprites?.front_default}></img>
          </p>
        </article>
        <aside className="aside aside-1">
          <h3>Height: {data.height}</h3>
          <h3>Weight: {data.weight}</h3>
        </aside>
        <aside className="aside aside-2">
          <ul>
            <h3 className="abilities">Abilities</h3>
            {data.abilities &&
              data.abilities.map((ability, i) => (
                <li key={i}>{ability.ability.name}</li>
              ))}
          </ul>
        </aside>
        <footer className="footer">
          <Link to={"/"}>
            <span className="details-btn details-fourth">back</span>
          </Link>
        </footer>
      </div>
    </main>
  );
}

export default Details;
