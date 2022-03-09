import "./App.css";
import { useState, useEffect } from "react";

export default function App() {
  const useFetch = () => {
    async function fetchFunction(url) {
      try {
        const response = await fetch(url);
        const fiftyPokes = await response.json();
        let urls = await fiftyPokes.results.map((poke) => poke.url);

        fetchAll(urls);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setData(null);
      }
    }

    const fetchAll = async (urls) => {
      try {
        const jsonsPromises = urls.map(async (u) => {
          const res = await fetch(u);
          const json = await res.json();
          return json;
        });
        const jsons = await Promise.all(jsonsPromises);
        setData(jsons);
      } catch (err) {
        console.log(err.message);
      }
    };

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    return [fetchFunction, { data, error, loading }];
  };
  const [offset, setOffset] = useState(0);

  const [fetchFunction, { data, error, loading }] = useFetch();

  useEffect(() => {
    fetchFunction(
      `https://pokeapi.co/api/v2/pokemon?limit=50&offset=${offset}`
    );
  }, [offset]);

  console.log("rendered");

  if (loading) return "Loading...";

  return (
    <div className="App">
      <h1>50 Pokemon</h1>
      {loading && <div>A moment please...</div>}
      {error && (
        <div>{`There is a problem fetching the post data - ${error}`}</div>
      )}
      <ul>
        {data &&
          data.map(({ id, species, sprites }) => (
            <li key={id}>
              <h2>{species.name}</h2>
              <img src={sprites.front_default}></img>
            </li>
          ))}
      </ul>
      {offset > 0 && (
        <button onClick={() => setOffset(offset - 50)} className="btn fourth">
          Previous
        </button>
      )}
      <button onClick={() => setOffset(offset + 50)} className="btn fourth">
        Next
      </button>
    </div>
  );
}
