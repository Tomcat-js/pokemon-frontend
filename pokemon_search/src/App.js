import "./App.css";
import { useState, useEffect } from "react";

export default function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=50&offset=${offset}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        return response.json();
      })
      .then((firstResData) => {
        let urls = firstResData.results.map((poke) => poke.url);
        fetchAll(urls);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setData(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [offset]);

  const fetchAll = async (urls) => {
    const res = await Promise.all(urls.map((u) => fetch(u)));
    const jsons = await Promise.all(res.map((r) => r.json()));
    setData(jsons);
  };

  console.log("rendered");
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
      <button onClick={() => setOffset(offset + 50)} className="btn fourth">
        Next 50?
      </button>
    </div>
  );
}
