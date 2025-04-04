import React, { useState, useEffect } from 'react';
import PokemonCard from './components/PokemonCard';
import Pagination from './components/Pagination';
import SearchAndFilter from './components/SearchAndFilter';
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
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-mantis-50 to-white">
      
      <header className="bg-gradient-to-r from-mantis-800 to-mantis-900 text-white py-12 px-4 shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAzNGM0LjQxOCAwIDgtMy41ODIgOC04cy0zLjU4Mi04LTgtOC04IDMuNTgyLTggOCAzLjU4MiA4IDggOHoiIHN0cm9rZT0iI0ZGRiIgc3Ryb2tlLW9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-10"></div>
        <div className="max-w-7xl mx-auto relative">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6">
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
            </div>
            <button
              onClick={() => {
                const randomPokemon = pokemonList[Math.floor(Math.random() * pokemonList.length)];
                setFilteredPokemon([randomPokemon]);
                setCurrentPage(1);
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
          {showPokemonOfTheDay && pokemonOfTheDay && (
            <div className="fixed top-4 right-4 z-50 w-80 bg-white rounded-xl shadow-xl transform hover:scale-[1.02] transition-transform duration-300">
              <div className="flex items-center justify-between p-4 border-b border-mantis-100">
                <h2 className="text-lg font-bold text-mantis-700">Pokemon of the Day</h2>
                <button
                  onClick={() => setShowPokemonOfTheDay(false)}
                  className="text-mantis-400 hover:text-mantis-600 transition-colors duration-300"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-4">
                <PokemonCard pokemonData={pokemonOfTheDay} isFeatured={true} />
              </div>
            </div>
          )}

          <SearchAndFilter
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedType={selectedType}
            onTypeChange={setSelectedType}
            selectedSort={selectedSort}
            onSortChange={setSelectedSort}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
            {currentPokemon.map((pokemon) => (
              <PokemonCard key={pokemon.id} pokemonData={pokemon} />
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </main>

      <footer className="bg-mantis-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">About PokedexPro</h3>
              <p className="text-mantis-200">Your ultimate destination for comprehensive Pokemon information, stats, and details.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-mantis-200 hover:text-white transition-colors">Home</a></li>
                <li><a href="#" className="text-mantis-200 hover:text-white transition-colors">Pokemon List</a></li>
                <li><a href="#" className="text-mantis-200 hover:text-white transition-colors">Types</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Contact</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href="mailto:contact@pokedexpro.com" className="text-mantis-200 hover:text-white transition-colors">contact@pokedexpro.com</a>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                  </svg>
                  <a href="#" className="text-mantis-200 hover:text-white transition-colors">Join our Discord</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-mantis-800 mt-8 pt-8 text-center">
            <p className="text-mantis-300">© 2024 PokedexPro - All Pokemon data provided by PokeAPI</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;