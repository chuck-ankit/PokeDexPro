import React from 'react';
import { Link } from 'react-router-dom';
import PokemonCard from './PokemonCard';

const HomePage = ({ pokemonOfTheDay }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-mantis-50 to-white">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-mantis-900 mb-6">
            Welcome to PokedexPro
          </h1>
          <p className="text-xl text-mantis-700 mb-8 max-w-3xl mx-auto">
            Your ultimate Pokemon database. Explore detailed information about all Pokemon species,
            their stats, abilities, and more!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/pokemon"
              className="px-8 py-4 bg-mantis-500 text-white rounded-xl font-bold text-lg hover:bg-mantis-600 transform hover:scale-105 transition-all duration-300"
            >
              Explore Pokemon
            </Link>
            <Link
              to="/types"
              className="px-8 py-4 bg-white text-mantis-700 border-2 border-mantis-500 rounded-xl font-bold text-lg hover:bg-mantis-50 transform hover:scale-105 transition-all duration-300"
            >
              View Types
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-mantis-900 mb-12">
            What You Can Do
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-mantis-50 p-6 rounded-xl shadow-lg">
              <div className="w-12 h-12 bg-mantis-500 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-mantis-900 mb-2">Search Pokemon</h3>
              <p className="text-mantis-700">
                Find any Pokemon by name, type, or other attributes with our powerful search functionality.
              </p>
            </div>
            <div className="bg-mantis-50 p-6 rounded-xl shadow-lg">
              <div className="w-12 h-12 bg-mantis-500 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-mantis-900 mb-2">Detailed Stats</h3>
              <p className="text-mantis-700">
                View comprehensive information about each Pokemon's stats, abilities, and evolution chain.
              </p>
            </div>
            <div className="bg-mantis-50 p-6 rounded-xl shadow-lg">
              <div className="w-12 h-12 bg-mantis-500 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-mantis-900 mb-2">Save Favorites</h3>
              <p className="text-mantis-700">
                Create your own collection of favorite Pokemon and access them anytime.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pokemon of the Day Section */}
      {pokemonOfTheDay && (
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-mantis-900 mb-12">
              Pokemon of the Day
            </h2>
            <div className="flex justify-center">
              <div className="w-full max-w-xs">
                <PokemonCard pokemonData={pokemonOfTheDay} isFeatured={true} />
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default HomePage; 