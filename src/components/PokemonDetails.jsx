import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchPokemonById } from '../api/PokemonAPI';
import LoadingSpinner from './LoadingSpinner';

// Sanitize text to prevent XSS
const sanitizeText = (text) => {
  if (typeof text !== 'string') return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

// Validate Pokemon data
const validatePokemonData = (pokemon) => {
  if (!pokemon || typeof pokemon !== 'object') return null;
  
  // Ensure required fields exist and are of correct type
  if (!pokemon.id || !pokemon.name || !pokemon.types || !Array.isArray(pokemon.types)) {
    return null;
  }
  
  // Sanitize and validate types
  const validTypes = [
    'normal', 'fire', 'water', 'electric', 'grass', 'ice',
    'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug',
    'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
  ];
  
  const sanitizedTypes = pokemon.types
    .filter(type => type && type.type && validTypes.includes(type.type.name))
    .map(type => ({
      type: {
        name: sanitizeText(type.type.name)
      }
    }));
  
  if (sanitizedTypes.length === 0) return null;
  
  return {
    ...pokemon,
    name: sanitizeText(pokemon.name),
    types: sanitizedTypes
  };
};

const PokemonDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: pokemon, isLoading, error } = useQuery({
    queryKey: ['pokemon', id],
    queryFn: () => fetchPokemonById(id),
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-mantis-50 to-white p-8">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-red-500 mb-4">Error Loading Pokemon</h2>
          <p className="text-mantis-700 mb-6">{error.message}</p>
          <button
            onClick={() => navigate('/pokemon')}
            className="px-6 py-3 bg-mantis-500 text-white rounded-xl hover:bg-mantis-600 transition-all duration-300 transform hover:scale-105 font-medium"
          >
            Back to Pokemon List
          </button>
        </div>
      </div>
    );
  }

  const validatedPokemon = validatePokemonData(pokemon);
  if (!validatedPokemon) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-mantis-50 to-white p-8">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-red-500 mb-4">Invalid Pokemon Data</h2>
          <p className="text-mantis-700 mb-6">The Pokemon data could not be validated.</p>
          <button
            onClick={() => navigate('/pokemon')}
            className="px-6 py-3 bg-mantis-500 text-white rounded-xl hover:bg-mantis-600 transition-all duration-300 transform hover:scale-105 font-medium"
          >
            Back to Pokemon List
          </button>
        </div>
      </div>
    );
  }

  const typeColors = {
    normal: 'bg-gray-400',
    fire: 'bg-red-500',
    water: 'bg-blue-500',
    electric: 'bg-yellow-400',
    grass: 'bg-green-500',
    ice: 'bg-blue-200',
    fighting: 'bg-red-700',
    poison: 'bg-purple-500',
    ground: 'bg-yellow-600',
    flying: 'bg-indigo-400',
    psychic: 'bg-pink-500',
    bug: 'bg-green-400',
    rock: 'bg-yellow-700',
    ghost: 'bg-purple-700',
    dragon: 'bg-indigo-600',
    dark: 'bg-gray-800',
    steel: 'bg-gray-500',
    fairy: 'bg-pink-300',
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-mantis-50 to-white py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-mantis-800 to-mantis-900 p-6 text-white">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h1 className="text-4xl font-bold capitalize">{validatedPokemon.name}</h1>
                <p className="text-mantis-200">#{validatedPokemon.id.toString().padStart(3, '0')}</p>
              </div>
              <div className="flex gap-2">
                {validatedPokemon.types.map((type) => (
                  <span
                    key={type.type.name}
                    className={`px-4 py-2 rounded-full text-white font-bold capitalize ${
                      typeColors[type.type.name] || 'bg-gray-500'
                    }`}
                  >
                    {type.type.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Image */}
              <div className="flex flex-col items-center">
                <img
                  src={validatedPokemon.sprites.other['official-artwork'].front_default}
                  alt={validatedPokemon.name}
                  className="w-64 h-64 object-contain"
                />
                <div className="mt-4 grid grid-cols-2 gap-4 w-full">
                  <div className="bg-mantis-50 p-4 rounded-xl text-center">
                    <p className="text-mantis-700 font-medium">Height</p>
                    <p className="text-2xl font-bold text-mantis-900">
                      {(validatedPokemon.height / 10).toFixed(1)} m
                    </p>
                  </div>
                  <div className="bg-mantis-50 p-4 rounded-xl text-center">
                    <p className="text-mantis-700 font-medium">Weight</p>
                    <p className="text-2xl font-bold text-mantis-900">
                      {(validatedPokemon.weight / 10).toFixed(1)} kg
                    </p>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div>
                <h2 className="text-2xl font-bold text-mantis-900 mb-4">Stats</h2>
                <div className="space-y-4">
                  {validatedPokemon.stats.map((stat) => (
                    <div key={stat.stat.name}>
                      <div className="flex justify-between mb-1">
                        <span className="text-mantis-700 font-medium capitalize">
                          {stat.stat.name.replace('-', ' ')}
                        </span>
                        <span className="text-mantis-900 font-bold">{stat.base_stat}</span>
                      </div>
                      <div className="w-full bg-mantis-100 rounded-full h-2.5">
                        <div
                          className="bg-mantis-500 h-2.5 rounded-full"
                          style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Abilities */}
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-mantis-900 mb-4">Abilities</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {validatedPokemon.abilities.map((ability) => (
                  <div
                    key={ability.ability.name}
                    className="bg-mantis-50 p-4 rounded-xl text-center"
                  >
                    <p className="text-mantis-900 font-medium capitalize">
                      {ability.ability.name.replace('-', ' ')}
                    </p>
                    {ability.is_hidden && (
                      <p className="text-sm text-mantis-600">(Hidden Ability)</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={() => navigate('/pokemon')}
            className="px-6 py-3 bg-mantis-500 text-white rounded-xl hover:bg-mantis-600 transition-all duration-300 transform hover:scale-105 font-medium"
          >
            Back to Pokemon List
          </button>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetails; 