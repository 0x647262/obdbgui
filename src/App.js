import { useEffect, useState } from "react";
import "./App.css";
import "./Brewery.css";
import Brewery from "./Brewery";

// TODO: Add a sane method of handling additional results returned by the API (pagination, lazy loading)
// TODO: Add error reporting for cases where the API may be down

function App() {
  const [breweries, setBreweries] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);

  const filter = (element) => {
    const search = element.target.value;

    if (search === "") {
      setFilteredResults(breweries);
    }

    const results = breweries.filter((brewery) => {
      return brewery.name.toLowerCase().startsWith(search.toLowerCase());
    });
    setFilteredResults(results);
  };

  useEffect(() => {
    fetch("https://api.openbrewerydb.org/breweries")
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setBreweries(json);
        setFilteredResults(json);
      });
  }, []);
  return (
    <div className="App">
      <input
        type="search"
        defaultValue="🔍 Search"
        onChange={filter}
        onFocus={(e) =>
          e.target.value === "🔍 Search" ? (e.target.value = "") : null
        }
        onBlur={(e) =>
          e.target.value === ""
            ? (e.target.value = "🔍 Search")
            : (e.target.value = "")
        }
      />
      {filteredResults.map((brewery) => {
        return <Brewery key={brewery.name} brewery={brewery} />;
      })}
    </div>
  );
}

export default App;
