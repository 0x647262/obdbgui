import React from "react";
import "./Brewery.css";

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
