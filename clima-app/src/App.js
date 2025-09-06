import React, { useState } from "react";
import "./App.css";

const api = {
  key: "d074098d3764d0a8fcc4847c1c61cd69",
  base: "https://api.openweathermap.org/data/2.5/"
};

function App() {
  const [query, setQuery] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const handleSearch = () => {
    const url = `${api.base}weather?q=${query}&lang=pt_br&units=metric&APPID=${api.key}`;
    fetch(url).then(r => r.json()).then(setWeatherData);
  };

  const background = !weatherData
    ? 'url("/default.jpg")'
    : weatherData.main.temp > 15
      ? 'url("/hot-background.jpg")'
      : 'url("/cold-background.jpg")';

  const dateStr = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric"
  });

  return (
    <div className="App" style={{ backgroundImage: background }}>
      <div className="search">
        <input
          type="text"
          placeholder="Digite o nome da cidade"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Pesquisar</button>
      </div>

      {weatherData && (
        <div className="info">
          <div className="city">{weatherData.name}, {weatherData.sys.country}</div>
          <div className="date">{dateStr}</div>
          <div className="temp">{Math.round(weatherData.main.temp)}°C</div>
          <div className="cond">{weatherData.weather[0].description}</div>
        </div>
      )}
    </div>
  );
}

export default App;
