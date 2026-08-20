import { useState, useEffect } from 'react'
import './App.css'

const WEATHER_CODES = {
  0: { desc: "Despejado", icon: "☀️" },
  1: { desc: "Mayormente despejado", icon: "🌤️" },
  2: { desc: "Parcialmente nublado", icon: "⛅" },
  3: { desc: "Nublado", icon: "☁️" },
  45: { desc: "Niebla", icon: "🌫️" },
  48: { desc: "Niebla con escarcha", icon: "🌫️" },
  51: { desc: "Llovizna ligera", icon: "🌦️" },
  53: { desc: "Llovizna", icon: "🌦️" },
  55: { desc: "Llovizna intensa", icon: "🌧️" },
  61: { desc: "Lluvia ligera", icon: "🌧️" },
  63: { desc: "Lluvia", icon: "🌧️" },
  65: { desc: "Lluvia intensa", icon: "🌧️" },
  71: { desc: "Nevada ligera", icon: "🌨️" },
  73: { desc: "Nevada", icon: "🌨️" },
  75: { desc: "Nevada intensa", icon: "❄️" },
  80: { desc: "Chubascos ligeros", icon: "🌦️" },
  81: { desc: "Chubascos", icon: "🌧️" },
  82: { desc: "Chubascos intensos", icon: "⛈️" },
  95: { desc: "Tormenta", icon: "⛈️" },
  96: { desc: "Tormenta con granizo", icon: "⛈️" },
  99: { desc: "Tormenta con granizo fuerte", icon: "⛈️" },
}

function App() {
  const [city, setCity] = useState("")
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [recentSearches, setRecentSearches] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("recentCities")) || []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem("recentCities", JSON.stringify(recentSearches))
  }, [recentSearches])

  const fetchWeather = async (cityName) => {
    if (!cityName.trim()) return

    setLoading(true)
    setError("")
    setWeather(null)

    try {
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=es`
      )
      const geoData = await geoRes.json()

      if (!geoData.results || geoData.results.length === 0) {
        throw new Error("Ciudad no encontrada")
      }

      const { latitude, longitude, name, country } = geoData.results[0]

      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=auto&forecast_days=5`
      )
      const weatherData = await weatherRes.json()

      setWeather({
        city: name,
        country,
        current: weatherData.current,
        daily: weatherData.daily,
      })

      setRecentSearches((prev) =>
        [name, ...prev.filter((c) => c !== name)].slice(0, 5)
      )
      setCity("")
    } catch (err) {
      setError(err.message || "Error al obtener el clima")
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    fetchWeather(city)
  }

  const getWeatherInfo = (code) => WEATHER_CODES[code] || { desc: "Desconocido", icon: "❓" }

  return (
    <div className="app">
      <h1>Widget del Clima</h1>
      <p className="subtitle">Consulta el clima de cualquier ciudad del mundo</p>

      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Escribe una ciudad..."
          className="search-input"
        />
        <button type="submit" className="search-btn" disabled={loading}>
          {loading ? "Buscando..." : "Buscar"}
        </button>
      </form>

      {recentSearches.length > 0 && (
        <div className="recent">
          <span>Recientes: </span>
          {recentSearches.map((c) => (
            <button key={c} className="recent-btn" onClick={() => fetchWeather(c)}>
              {c}
            </button>
          ))}
        </div>
      )}

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-card">
          <div className="weather-main">
            <span className="weather-icon">
              {getWeatherInfo(weather.current.weather_code).icon}
            </span>
            <div>
              <h2>{weather.city}, {weather.country}</h2>
              <p className="weather-desc">{getWeatherInfo(weather.current.weather_code).desc}</p>
            </div>
          </div>

          <div className="weather-details">
            <div className="detail">
              <span className="detail-icon">🌡️</span>
              <div>
                <p className="detail-value">{weather.current.temperature_2m}°C</p>
                <p className="detail-label">Temperatura</p>
              </div>
            </div>
            <div className="detail">
              <span className="detail-icon">💧</span>
              <div>
                <p className="detail-value">{weather.current.relative_humidity_2m}%</p>
                <p className="detail-label">Humedad</p>
              </div>
            </div>
            <div className="detail">
              <span className="detail-icon">💨</span>
              <div>
                <p className="detail-value">{weather.current.wind_speed_10m} km/h</p>
                <p className="detail-label">Viento</p>
              </div>
            </div>
          </div>

          <div className="forecast">
            <h3>Pronóstico 5 días</h3>
            <div className="forecast-grid">
              {weather.daily.time.map((date, i) => (
                <div key={date} className="forecast-day">
                  <p className="forecast-date">
                    {new Date(date + "T00:00").toLocaleDateString("es-ES", { weekday: "short", day: "numeric" })}
                  </p>
                  <span className="forecast-icon">
                    {getWeatherInfo(weather.daily.weather_code[i]).icon}
                  </span>
                  <p className="forecast-temps">
                    {weather.daily.temperature_2m_max[i]}° / {weather.daily.temperature_2m_min[i]}°
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
