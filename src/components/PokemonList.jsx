import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import PokemonCard from './PokemonCard';
import Pagination from './Pagination';
import SearchAndFilter from './SearchAndFilter';
import { fetchPokemonData } from '../api/PokemonAPI';

const POKEMON_PER_PAGE = 24;

const PokemonList = () => {
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedSort, setSelectedSort] = useState('random');

  // Get the selected type from the location state
  useEffect(() => {
    if (location.state?.selectedType) {
      setSelectedType(location.state.selectedType);
    }
  }, [location.state]);

  const { data: pokemonList = [], isLoading, error } = useQuery({
    queryKey: ['pokemonList'],
    queryFn: fetchPokemonData,
    staleTime: 1000 * 60 * 5, // 5 minutes
    cacheTime: 1000 * 60 * 30, // 30 minutes
  });

  let filteredPokemon = [...pokemonList];

  // Apply search filter
  if (searchTerm) {
    filteredPokemon = filteredPokemon.filter(pokemon =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Apply type filter
  if (selectedType !== 'all') {
    filteredPokemon = filteredPokemon.filter(pokemon =>
      pokemon.types.some(type => type.type.name === selectedType)
    );
  }

  // Apply sorting
  filteredPokemon.sort((a, b) => {
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
        return Math.random() - 0.5;
    }
  });

  const totalPages = Math.ceil(filteredPokemon.length / POKEMON_PER_PAGE);
  const startIndex = (currentPage - 1) * POKEMON_PER_PAGE;
  const currentPokemon = filteredPokemon.slice(startIndex, startIndex + POKEMON_PER_PAGE);

  if (isLoading) {
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
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-mantis-500 text-white rounded-xl hover:bg-mantis-600 transition-all duration-300 transform hover:scale-105 font-medium"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <SearchAndFilter
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedType={selectedType}
        onTypeChange={setSelectedType}
        selectedSort={selectedSort}
        onSortChange={setSelectedSort}
      />
      {selectedType !== 'all' && (
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-mantis-900">
            Showing {filteredPokemon.length} {selectedType} type Pokemon
          </h2>
        </div>
      )}
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
    </div>
  );
};

export default PokemonList; 