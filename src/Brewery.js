import React from "react";
import "./Brewery.css";

// TODO: Look into conditional rendering for the myriad of paragraph tags below. I'm certain that there is a better way
//       of doing it, but it has been almost 2 years since I last used React so my skills are a tad rusty.

export default function Brewery({ brewery }) {
  return (
    <div className="Brewery">
      <h3>{brewery.name}</h3>
      <p>
        {brewery.street}
        {brewery.street ? <br /> : null}
        {brewery.city}, {brewery.state}
        {brewery.city || brewery.state ? <br /> : null}
      </p>
      <p className="type">
        {brewery.brewery_type ? "Brewery type: " : null}
        {brewery.brewery_type}
        {brewery.brewery_type ? <br /> : null}
      </p>
      <p>
        {brewery.phone ? "Phone: " : null}
        <a href={"tel:" + brewery.phone}>{brewery.phone}</a>
        {brewery.phone ? <br /> : null}
      </p>
      <p>
        <a href={brewery.website_url}>{brewery.website_url}</a>
      </p>
    </div>
  );
}
