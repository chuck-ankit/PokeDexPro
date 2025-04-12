import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PokemonCard from './components/PokemonCard';
import Pagination from './components/Pagination';
import SearchAndFilter from './components/SearchAndFilter';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import { fetchPokemonData } from './api/PokemonAPI';
import logo from './assets/logo.jpeg';

const App = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedSort, setSelectedSort] = useState('random');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const [pokemonOfTheDay, setPokemonOfTheDay] = useState(null);
  const [showPokemonOfTheDay, setShowPokemonOfTheDay] = useState(true);
  const [headerColor, setHeaderColor] = useState('from-blue-600 to-purple-600');

  const POKEMON_PER_PAGE = 24;

  const getRandomHeaderColor = () => {
    const colorCombinations = [
      'from-blue-600 to-purple-600',
      'from-red-600 to-orange-500',
      'from-green-600 to-teal-500',
      'from-purple-600 to-pink-500',
      'from-yellow-600 to-orange-500',
      'from-indigo-600 to-blue-500'
    ];
    return colorCombinations[Math.floor(Math.random() * colorCombinations.length)];
  };

  const getPokemonOfTheDay = () => {
    const today = new Date().toDateString();
    const storedDate = localStorage.getItem('pokemonOfTheDayDate');
    const storedPokemon = localStorage.getItem('pokemonOfTheDay');

    if (storedDate === today && storedPokemon) {
      return JSON.parse(storedPokemon);
    }
    return null;
  };

  const setPokemonOfTheDayInStorage = (pokemon) => {
    const today = new Date().toDateString();
    localStorage.setItem('pokemonOfTheDayDate', today);
    localStorage.setItem('pokemonOfTheDay', JSON.stringify(pokemon));
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchPokemonData();
      setPokemonList(data);

      // Set Pokemon of the day
      const storedPokemon = getPokemonOfTheDay();
      if (storedPokemon) {
        setPokemonOfTheDay(storedPokemon);
      } else {
        const randomIndex = Math.floor(Math.random() * data.length);
        const randomPokemon = data[randomIndex];
        setPokemonOfTheDay(randomPokemon);
        setPokemonOfTheDayInStorage(randomPokemon);
      }

      setLoading(false);
    } catch (error) {
      console.error('Error fetching Pokemon data:', error);
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    setHeaderColor(getRandomHeaderColor());
  }, []);

  useEffect(() => {
    let filtered = [...pokemonList];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply type filter
    if (selectedType !== 'all') {
      filtered = filtered.filter(pokemon =>
        pokemon.types.some(type => type.type.name === selectedType)
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (selectedSort) {
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'hp-asc':
          return a.stats[0].base_stat - b.stats[0].base_stat;
        case 'hp-desc':
          return b.stats[0].base_stat - a.stats[0].base_stat;
        case 'attack-asc':
          return a.stats[1].base_stat - b.stats[1].base_stat;
        case 'attack-desc':
          return b.stats[1].base_stat - a.stats[1].base_stat;
        default:
          // Random sorting
          return Math.random() - 0.5;
      }
    });

    setFilteredPokemon(filtered);
    setCurrentPage(1);
    setHeaderColor(getRandomHeaderColor());
  }, [pokemonList, searchTerm, selectedType, selectedSort]);

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    fetchData();
  };

  const totalPages = Math.ceil(filteredPokemon.length / POKEMON_PER_PAGE);
  const startIndex = (currentPage - 1) * POKEMON_PER_PAGE;
  const currentPokemon = filteredPokemon.slice(startIndex, startIndex + POKEMON_PER_PAGE);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-mantis-50 to-white">
        <div className="w-20 h-20 border-4 border-mantis-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-6 text-lg text-mantis-700 font-medium">Loading Pokemon data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-mantis-50 to-white p-8">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-red-500 mb-4">Error Loading Pokemon Data</h2>
          <p className="text-mantis-700 mb-6">{error.message}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleRetry}
              className="px-6 py-3 bg-mantis-500 text-white rounded-xl hover:bg-mantis-600 transition-all duration-300 transform hover:scale-105 font-medium"
            >
              {retryCount > 0 ? `Try Again (${retryCount})` : 'Try Again'}
            </button>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-all duration-300 transform hover:scale-105 font-medium"
            >
              Refresh Page
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-mantis-50 to-white">
        <header className="bg-gradient-to-r from-mantis-800 to-mantis-900 text-white py-12 px-4 shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAzNGM0LjQxOCAwIDgtMy41ODIgOC04cy0zLjU4Mi04LTgtOC04IDMuNTgyLTggOCAzLjU4MiA4IDggOHoiIHN0cm9rZT0iI0ZGRiIgc3Ryb2tlLW9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-10"></div>
          <div className="max-w-7xl mx-auto relative">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <Link to="/" className="flex items-center gap-6 group">
                <div className="relative group">
                  <img
                    src={logo}
                    alt="PokedexPro Logo"
                    className="w-24 h-24 rounded-full border-4 border-white shadow-lg transform group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-yellow-400 text-black w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-md group-hover:rotate-12 transition-transform duration-300">
                    P
                  </div>
                </div>
                <div className="text-center md:text-left">
                  <h1 className="text-4xl md:text-5xl font-bold tracking-tight animate-fade-in bg-clip-text text-transparent bg-gradient-to-r from-white to-mantis-200">
                    PokedexPro
                  </h1>
                  <p className="text-lg md:text-xl opacity-90 mt-2 animate-fade-in-delay text-mantis-100">
                    Your comprehensive Pokemon database
                  </p>
                </div>
              </Link>
              <button
                onClick={() => {
                  const randomPokemon = pokemonList[Math.floor(Math.random() * pokemonList.length)];
                  setFilteredPokemon([randomPokemon]);
                  setCurrentPage(1);
                  window.location.href = '/pokemon';
                }}
                className="px-6 py-3 bg-yellow-400 text-mantis-900 rounded-xl font-bold shadow-lg hover:bg-yellow-300 transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Surprise Me!
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 py-8 px-4">
          <div className="max-w-7xl mx-auto">
            <Routes>
              <Route path="/" element={<HomePage pokemonOfTheDay={pokemonOfTheDay} />} />
              <Route
                path="/pokemon"
                element={
                  <>
                    <SearchAndFilter
                      searchTerm={searchTerm}
                      onSearchChange={setSearchTerm}
                      selectedType={selectedType}
                      onTypeChange={setSelectedType}
                      selectedSort={selectedSort}
                      onSortChange={setSelectedSort}
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                      {currentPokemon.map((pokemon) => (
                        <PokemonCard key={pokemon.id} pokemonData={pokemon} />
                      ))}
                    </div>
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={setCurrentPage}
                    />
                  </>
                }
              />
              <Route
                path="/types"
                element={
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {pokemonList.reduce((types, pokemon) => {
                      pokemon.types.forEach(type => {
                        if (!types.includes(type.type.name)) {
                          types.push(type.type.name);
                        }
                      });
                      return types;
                    }, []).map(type => (
                      <div
                        key={type}
                        className="bg-white p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                        onClick={() => {
                          setSelectedType(type);
                          window.location.href = '/pokemon';
                        }}
                      >
                        <h3 className="text-lg font-bold text-center capitalize">{type}</h3>
                      </div>
                    ))}
                  </div>
                }
              />
              <Route
                path="/favorites"
                element={
                  <div className="text-center py-12">
                    <h2 className="text-3xl font-bold text-mantis-900 mb-4">Your Favorite Pokemon</h2>
                    <p className="text-mantis-700 mb-8">You haven't added any Pokemon to your favorites yet.</p>
                    <Link
                      to="/pokemon"
                      className="px-6 py-3 bg-mantis-500 text-white rounded-xl font-bold hover:bg-mantis-600 transform hover:scale-105 transition-all duration-300"
                    >
                      Explore Pokemon
                    </Link>
                  </div>
                }
              />
            </Routes>
          </div>
        </main>

        <Footer />
      </div>
    </Router>
  );
};

export default App;