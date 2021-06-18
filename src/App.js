import { useEffect, useState } from "react";
import "./App.css";
import "./Brewery.css";
import Brewery from "./Brewery";

function App() {
  const [breweries, setBreweries] = useState([]);

  const filter = (element) => {
    const search = element.target.value;

    fetch(
      "https://api.openbrewerydb.org/breweries/search?query=" +
        encodeURI(search)
    )
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setBreweries(json);
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
      });
  }, []);
  return (
    <div className="App">
      <input
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
      <p>Results: {breweries.length}</p>
      {breweries.map((brewery) => {
        return <Brewery key={brewery.id} brewery={brewery} />;
      })}
    </div>
  );
}

export default App;
