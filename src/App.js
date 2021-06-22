import { useEffect, useState } from "react";
import "./App.css";
import "./Brewery.css";
import Brewery from "./Brewery";

function App() {
  const [breweries, setBreweries] = useState([]);
  const [initialState, setInitialState] = useState(true);
  const [page, setPage] = useState(1);

  const filter = () => {
    const search = document.getElementById("searchBar").value;

    fetch(
      "https://api.openbrewerydb.org/breweries/search?query=" +
        encodeURI(search) +
        "&page=" +
        page +
        "&per_page=20"
    )
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setInitialState(false);
        setBreweries(json);
      })
      .catch((error) => {
        alert("Error: " + error.message);
      });
  };

  // Default state:
  useEffect(() => {
    fetch("https://api.openbrewerydb.org/breweries")
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setBreweries(json);
      })
      .catch((error) => {
        alert("Error: " + error.message);
      });
  }, []);
  useEffect(() => {
    if (initialState === false) {
      filter();
    }
  }, [page]);
  return (
    <div className="App">
      <input
        id="searchBar"
        type="search"
        defaultValue="🔍 Search Breweries"
        onChange={filter}
        onFocus={(e) =>
          e.target.value === "🔍 Search Breweries"
            ? (e.target.value = "")
            : null
        }
        onBlur={(e) =>
          e.target.value === ""
            ? (e.target.value = "🔍 Search Breweries")
            : null
        }
      />
      <br />
      {!initialState ? (
        <div className="pagination">
          <button
            disabled={initialState}
            onClick={() => {
              setPage(page !== 1 ? page - 1 : page);
            }}
          >
            Previous Page
          </button>
          <p>Page: {page}</p>
          <button
            disabled={initialState}
            onClick={() => {
              setPage(breweries.length > 0 ? page + 1 : page);
            }}
          >
            Next Page
          </button>
        </div>
      ) : null}
      {breweries.length ? (
        <p>{breweries.length} results</p>
      ) : (
        <p>No results!</p>
      )}
      {breweries.map((brewery) => {
        return <Brewery key={brewery.id} brewery={brewery} />;
      })}
    </div>
  );
}

export default App;
