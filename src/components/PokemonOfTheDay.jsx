import React, { useEffect, useState } from 'react';
import { fetchPokemonById } from '../api/PokemonAPI';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const PokemonOfTheDay = () => {
  const [pokemonId, setPokemonId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Generate a random Pokemon ID between 1 and 898
    const today = new Date().toDateString();
    const storedPokemon = localStorage.getItem('pokemonOfTheDay');
    const storedDate = localStorage.getItem('pokemonOfTheDayDate');

    if (storedPokemon && storedDate === today) {
      setPokemonId(parseInt(storedPokemon));
    } else {
      const randomId = Math.floor(Math.random() * 898) + 1;
      localStorage.setItem('pokemonOfTheDay', randomId.toString());
      localStorage.setItem('pokemonOfTheDayDate', today);
      setPokemonId(randomId);
    }
  }, []);

  const { data: pokemon, isLoading, error } = useQuery({
    queryKey: ['pokemonOfTheDay', pokemonId],
    queryFn: () => fetchPokemonById(pokemonId),
    enabled: !!pokemonId,
    retry: 3,
  });

  const handleViewDetails = () => {
    navigate(`/pokemon/${pokemonId}`);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-mantis-900 mb-4">Pokemon of the Day!</h2>
        
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="w-12 h-12 border-4 border-mantis-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600">Loading Pokemon...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-8">
            <p className="text-red-500 mb-4">Failed to load Pokemon data</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-mantis-500 text-white rounded-lg hover:bg-mantis-600"
            >
              Try Again
            </button>
          </div>
        ) : pokemon ? (
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-shrink-0">
              <img
                src={pokemon.sprites.other['official-artwork'].front_default}
                alt={pokemon.name}
                className="w-48 h-48 object-contain"
              />
            </div>
            
            <div className="flex-grow">
              <h3 className="text-xl font-semibold capitalize mb-4">
                {pokemon.name}
              </h3>
              
              <div className="flex gap-2 mb-4">
                {pokemon.types.map((type) => (
                  <span
                    key={type.type.name}
                    className={`px-3 py-1 rounded-full text-white text-sm font-medium capitalize bg-pokemon-${type.type.name}`}
                  >
                    {type.type.name}
                  </span>
                ))}
              </div>

              <p className="text-gray-600 mb-4">
                This Pokemon will be featured for the rest of today!
              </p>
              
              <button
                onClick={handleViewDetails}
                className="px-6 py-2 bg-mantis-500 text-white rounded-lg font-medium hover:bg-mantis-600 transition-colors duration-300"
              >
                View Details
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default PokemonOfTheDay; 