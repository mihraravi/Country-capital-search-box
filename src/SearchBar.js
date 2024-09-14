// src/SearchBar.js
import React, { useState, useEffect } from 'react';
import './SearchBar.css';  // Create a CSS file for styling
import jsonData from './data.json';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  // Fetch countries data from the JSON URL
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const data = jsonData;
        setCountries(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCountries();
  }, []);

  // Update filtered countries based on the search term
  useEffect(() => {
    if (searchTerm) {
      const results = countries.filter((c) => {
        const nameMatch = c.country.toLowerCase().includes(searchTerm.toLowerCase());
        const capitalMatch = c.capital.toLowerCase().includes(searchTerm.toLowerCase());
        return nameMatch || capitalMatch;
      });
      setFilteredCountries(results);
    } else {
      setFilteredCountries([]);
    }
  }, [searchTerm, countries]);

  return (
    <div className="search-container">
      <h1>Country Search</h1>
      <input
        type="text"
        className="search-input"
        placeholder="Search by country or capital..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul className="suggestions-list">
        {filteredCountries.map((c1) => (
          <li key={c1}>
            {searchTerm && c1.country.toLowerCase().includes(searchTerm.toLowerCase()) && (
              <strong>{c1.country}</strong>
            )}
            {searchTerm && c1.capital.toLowerCase().includes(searchTerm.toLowerCase()) && (
              <span>{c1.capital}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBar;
