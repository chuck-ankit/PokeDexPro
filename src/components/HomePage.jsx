import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PokemonCard from './PokemonCard';
import { fetchPokemonById } from '../api/PokemonAPI';

const HomePage = () => {
  const [pokemonOfTheDay, setPokemonOfTheDay] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getPokemonOfTheDay = async () => {
      try {
        // Get today's date in YYYY-MM-DD format
        const today = new Date().toISOString().split('T')[0];
        
        // Check if we already have a Pokemon for today
        const storedDate = localStorage.getItem('pokemonOfTheDayDate');
        const storedPokemon = localStorage.getItem('pokemonOfTheDay');

        if (storedDate === today && storedPokemon) {
          // If we have a stored Pokemon for today, use it
          setPokemonOfTheDay(JSON.parse(storedPokemon));
        } else {
          // Generate a new random Pokemon ID (between 1 and 898)
          const randomId = Math.floor(Math.random() * 898) + 1;
          
          // Fetch the Pokemon data
          const pokemonData = await fetchPokemonById(randomId);
          
          // Store the Pokemon and date
          localStorage.setItem('pokemonOfTheDay', JSON.stringify(pokemonData));
          localStorage.setItem('pokemonOfTheDayDate', today);
          
          setPokemonOfTheDay(pokemonData);
        }
      } catch (error) {
        console.error('Error fetching Pokemon of the Day:', error);
      } finally {
        setIsLoading(false);
      }
    };

    getPokemonOfTheDay();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-mantis-50 via-white to-mantis-50">
      {/* Hero Section */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pokeball-pattern.svg')] opacity-5"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold text-mantis-900 mb-6 animate-fade-in">
            Welcome to <span className="text-mantis-600">PokedexPro</span>
          </h1>
          <p className="text-xl md:text-2xl text-mantis-700 mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in-up">
            Your ultimate Pokemon database. Explore detailed information about all Pokemon species,
            their stats, abilities, and more!
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-up">
            <Link
              to="/pokemon"
              className="group px-8 py-4 bg-mantis-500 text-white rounded-xl font-bold text-lg hover:bg-mantis-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              <span>Explore Pokemon</span>
              <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              to="/types"
              className="group px-8 py-4 bg-white text-mantis-700 border-2 border-mantis-500 rounded-xl font-bold text-lg hover:bg-mantis-50 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              <span>View Types</span>
              <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Pokemon of the Day Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-mantis-900 mb-4">
              Pokemon of the Day
            </h2>
            <p className="text-mantis-700 text-lg">
              Discover a new featured Pokemon every day!
            </p>
          </div>
          {isLoading ? (
            <div className="flex justify-center">
              <div className="w-full max-w-xs">
                <div className="bg-white rounded-xl shadow-lg p-6 animate-pulse">
                  <div className="h-48 bg-mantis-100 rounded-lg mb-4"></div>
                  <div className="h-6 bg-mantis-100 rounded w-3/4 mx-auto mb-2"></div>
                  <div className="h-4 bg-mantis-100 rounded w-1/2 mx-auto"></div>
                </div>
              </div>
            </div>
          ) : pokemonOfTheDay ? (
            <div className="flex justify-center transform hover:scale-105 transition-transform duration-300">
              <div className="w-full max-w-xs">
                <PokemonCard pokemonData={pokemonOfTheDay} isFeatured={true} />
              </div>
            </div>
          ) : (
            <div className="text-center text-mantis-700">
              Failed to load Pokemon of the Day. Please try again later.
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-mantis-900 mb-4">
              What You Can Do
            </h2>
            <p className="text-mantis-700 text-lg">
              Explore all the amazing features of PokedexPro
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="group bg-mantis-50 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-mantis-500 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-mantis-900 mb-4">Search Pokemon</h3>
              <p className="text-mantis-700 text-lg">
                Find any Pokemon by name, type, or other attributes with our powerful search functionality.
              </p>
            </div>
            <div className="group bg-mantis-50 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-mantis-500 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-mantis-900 mb-4">Detailed Stats</h3>
              <p className="text-mantis-700 text-lg">
                View comprehensive information about each Pokemon's stats, abilities, and evolution chain.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 