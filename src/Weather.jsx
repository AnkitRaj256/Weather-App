import React, { useState } from 'react'
import Input from './components/Input'
import { CardContent, Cards } from './components/Cards'
import Button from './components/Button'
import { Sun, Cloud, CloudRain, Snowflake, Zap } from 'lucide-react'

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

const Weather = () => {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchWeather = async () => {
    if (!city) return
    setLoading(true)
    setError('')
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      )
      if (!response.ok) throw new Error('City Not Found')
      const data = await response.json()
      setWeather(data)
    } catch (err) {
      setError(err.message)
      setWeather(null)
    }
    setLoading(false)
  }

  const getWeatherIcon = (main) => {
    switch (main) {
      case 'Clear':
        return <Sun className="text-yellow-400 w-16 h-16 animate-pulse" />
      case 'Rain':
        return <CloudRain className="text-blue-400 w-16 h-16 animate-wiggle" />
      case 'Snow':
        return <Snowflake className="text-blue-200 w-16 h-16 animate-float" />
      case 'Clouds':
        return <Cloud className="text-gray-400 w-16 h-16 animate-float" />
      case 'Thunderstorm':
        return <Zap className="text-yellow-500 w-16 h-16 animate-flash" />
      default:
        return <Sun className="text-yellow-300 w-16 h-16" />
    }
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-200 to-indigo-400 overflow-hidden flex items-center justify-center px-4">
      <div className="absolute top-10 left-10 opacity-90 animate-slow-spin">
        <Sun className="text-yellow-300 w-24 h-24" />
      </div>
      <div className="absolute top-1/8 right-16 opacity-90 animate-float">
        <Cloud className="text-white w-32 h-20 drop-shadow-lg" />
      </div>
      <div className="absolute bottom-20 left-20 opacity-90 animate-wiggle">
        <CloudRain className="text-blue-500 w-20 h-20" />
      </div>
      <div className="absolute bottom-24 right-24 opacity-90 animate-float">
        <Zap className="text-yellow-400 w-16 h-16" />
      </div>
      <div className="absolute top-12 left-1/2 transform -translate-x-1/2 opacity-80 animate-float delay-2000">
        <Snowflake className="text-gray-100 w-14 h-14" />
      </div>

      <Cards className="relative bg-white bg-opacity-90 backdrop-blur-md w-full max-w-lg p-6 sm:p-8 rounded-3xl shadow-2xl border border-white/30">
        <CardContent>
          <h1 className="text-4xl font-extrabold mb-6 text-center text-indigo-700 drop-shadow-md">
            Weather App
          </h1>
          <div className="flex flex-col sm:flex-row gap-3 mb-5">
            <Input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter City Name"
              className="w-full sm:flex-1 rounded-xl border-2 border-indigo-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400 transition"
            />
            <Button
              onClick={fetchWeather}
              disabled={loading}
              className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl px-6 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {loading ? 'Loading...' : 'Search'}
            </Button>
          </div>

          {error && (
            <p className="text-red-600 font-semibold text-center">{error}</p>
          )}

          {weather && (
            <div className="text-center space-y-3 mt-6">
              <div className="flex justify-center">
                {getWeatherIcon(weather.weather[0].main)}
              </div>
              <h2 className="text-2xl font-bold text-indigo-800 drop-shadow-sm">
                {weather.name}, {weather.sys.country}
              </h2>
              <p className="text-indigo-700 text-lg capitalize font-medium">
                {weather.weather[0].main} - {weather.weather[0].description}
              </p>
              <p className="text-5xl font-extrabold text-indigo-900">
                {Math.round(weather.main.temp)}°C
              </p>
            </div>
          )}
        </CardContent>
      </Cards>

      <style jsx>{`
        @keyframes slow-spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-15px);
          }
        }
        @keyframes wiggle {
          0%, 100% {
            transform: rotate(-5deg);
          }
          50% {
            transform: rotate(5deg);
          }
        }
        @keyframes flash {
          0%, 50%, 100% {
            opacity: 1;
          }
          25%, 75% {
            opacity: 0.4;
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-wiggle {
          animation: wiggle 3s ease-in-out infinite;
        }
        .animate-flash {
          animation: flash 1.5s linear infinite;
        }
        .animate-slow-spin {
          animation: slow-spin 20s linear infinite;
        }
      `}</style>
    </div>
  )
}

export default Weather
