import { useCallback, useEffect, useState } from "react";
import "./App.css";
import "./Brewery.css";
import Brewery from "./Brewery";

function App() {
  const [breweries, setBreweries] = useState([]);
  const [input, setInput] = useState("🔍 Search Breweries");
  const [pristine, setPristine] = useState(true);
  const [page, setPage] = useState(1);
  const [results, setResults] = useState(0);
  const perPage = 20;

  const isDefaultInput = useCallback(() => {
    return input === "🔍 Search Breweries";
  }, [input]);

  function previousPage() {
    if (page === 1) {
      return page;
    }

    return page - 1;
  }

  function nextPage() {
    if (breweries.length < 0) {
      return page;
    }

    return page + 1;
  }
  function isFirstPage() {
    return page === 1;
  }

  function isLastPage() {
    return page * perPage >= results;
  }

  function pageLowestResult() {
    return page * perPage - perPage + 1;
  }

  function pageHighestResult() {
    if (page * perPage < results) {
      return page * perPage;
    }

    return results;
  }

  const totalResults = useCallback(() => {
    fetch(
      "https://api.openbrewerydb.org/breweries/search?query=" + encodeURI(input)
    )
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setResults(json.length);
      })
      .catch((error) => {
        alert("Error: " + error.message);
      });
  }, [input]);

  const search = useCallback(() => {
    // Paginated results:
    fetch(
      "https://api.openbrewerydb.org/breweries/search?query=" +
        encodeURI(input) +
        "&page=" +
        page +
        "&per_page=" +
        perPage
    )
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setPristine(false);
        setBreweries(json);
      })
      .catch((error) => {
        alert("Error: " + error.message);
      });
  }, [page, input]);

  useEffect(() => {
    // Set the default state of the application (a default list of OBDB breweries):
    fetch("https://api.openbrewerydb.org/breweries")
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setBreweries(json);
        setResults(json.length);
      })
      .catch((error) => {
        alert("Error: " + error.message);
      });
  }, []);

  // Fetch new brewery results when a user requests a new page:
  useEffect(() => {
    if (!isDefaultInput()) {
      search();
    }
  }, [page, search, input, isDefaultInput, pristine]);

  // Only update the total number of results if the input has changed:
  useEffect(() => {
    if (!isDefaultInput()) {
      setPage(1);
      totalResults();
    }
  }, [input, isDefaultInput, totalResults]);

  return (
    <div className="App">
      <input
        id="searchBar"
        type="search"
        defaultValue="🔍 Search Breweries"
        onChange={(e) => {
          setInput(e.target.value);
        }}
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
      {!pristine ? (
        <div className="pagination">
          <button
            disabled={pristine || isFirstPage()}
            onClick={() => {
              setPage(previousPage());
            }}
          >
            Previous Page
          </button>
          <p>Page: {page}</p>
          <button
            disabled={pristine || isLastPage()}
            onClick={() => {
              setPage(nextPage());
            }}
          >
            Next Page
          </button>
        </div>
      ) : null}
      {pristine ? null : breweries.length ? (
        <p>
          Displaying results {pageLowestResult()}-{pageHighestResult()} of{" "}
          {results}
        </p>
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
