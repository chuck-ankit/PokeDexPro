import React from 'react';
import { Link } from 'react-router-dom';
import PokemonCard from './PokemonCard';

const FavoritesPage = () => {
  // Popular Pokemon loved by fans
  const popularPokemon = [
    {
      id: 25,
      name: 'pikachu',
      sprites: {
        other: {
          'official-artwork': {
            front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png'
          }
        }
      },
      types: [{ type: { name: 'electric' } }],
      stats: [
        { stat: { name: 'hp' }, base_stat: 35 },
        { stat: { name: 'attack' }, base_stat: 55 },
        { stat: { name: 'defense' }, base_stat: 40 },
        { stat: { name: 'special-attack' }, base_stat: 50 },
        { stat: { name: 'special-defense' }, base_stat: 50 },
        { stat: { name: 'speed' }, base_stat: 90 }
      ]
    },
    {
      id: 6,
      name: 'charizard',
      sprites: {
        other: {
          'official-artwork': {
            front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png'
          }
        }
      },
      types: [{ type: { name: 'fire' } }, { type: { name: 'flying' } }],
      stats: [
        { stat: { name: 'hp' }, base_stat: 78 },
        { stat: { name: 'attack' }, base_stat: 84 },
        { stat: { name: 'defense' }, base_stat: 78 },
        { stat: { name: 'special-attack' }, base_stat: 109 },
        { stat: { name: 'special-defense' }, base_stat: 85 },
        { stat: { name: 'speed' }, base_stat: 100 }
      ]
    },
    {
      id: 150,
      name: 'mewtwo',
      sprites: {
        other: {
          'official-artwork': {
            front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png'
          }
        }
      },
      types: [{ type: { name: 'psychic' } }],
      stats: [
        { stat: { name: 'hp' }, base_stat: 106 },
        { stat: { name: 'attack' }, base_stat: 110 },
        { stat: { name: 'defense' }, base_stat: 90 },
        { stat: { name: 'special-attack' }, base_stat: 154 },
        { stat: { name: 'special-defense' }, base_stat: 90 },
        { stat: { name: 'speed' }, base_stat: 130 }
      ]
    },
    {
      id: 448,
      name: 'lucario',
      sprites: {
        other: {
          'official-artwork': {
            front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/448.png'
          }
        }
      },
      types: [{ type: { name: 'fighting' } }, { type: { name: 'steel' } }],
      stats: [
        { stat: { name: 'hp' }, base_stat: 70 },
        { stat: { name: 'attack' }, base_stat: 110 },
        { stat: { name: 'defense' }, base_stat: 70 },
        { stat: { name: 'special-attack' }, base_stat: 115 },
        { stat: { name: 'special-defense' }, base_stat: 70 },
        { stat: { name: 'speed' }, base_stat: 90 }
      ]
    },
    {
      id: 151,
      name: 'mew',
      sprites: {
        other: {
          'official-artwork': {
            front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/151.png'
          }
        }
      },
      types: [{ type: { name: 'psychic' } }],
      stats: [
        { stat: { name: 'hp' }, base_stat: 100 },
        { stat: { name: 'attack' }, base_stat: 100 },
        { stat: { name: 'defense' }, base_stat: 100 },
        { stat: { name: 'special-attack' }, base_stat: 100 },
        { stat: { name: 'special-defense' }, base_stat: 100 },
        { stat: { name: 'speed' }, base_stat: 100 }
      ]
    },
    {
      id: 149,
      name: 'dragonite',
      sprites: {
        other: {
          'official-artwork': {
            front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/149.png'
          }
        }
      },
      types: [{ type: { name: 'dragon' } }, { type: { name: 'flying' } }],
      stats: [
        { stat: { name: 'hp' }, base_stat: 91 },
        { stat: { name: 'attack' }, base_stat: 134 },
        { stat: { name: 'defense' }, base_stat: 95 },
        { stat: { name: 'special-attack' }, base_stat: 100 },
        { stat: { name: 'special-defense' }, base_stat: 100 },
        { stat: { name: 'speed' }, base_stat: 80 }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-mantis-50 to-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-mantis-900 mb-4">
            Fan Favorites
          </h1>
          <p className="text-xl text-mantis-700 max-w-3xl mx-auto">
            Discover the most beloved Pokemon that have captured the hearts of fans worldwide.
            These iconic creatures have become symbols of the Pokemon universe.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {popularPokemon.map((pokemon) => (
            <div key={pokemon.id} className="transform hover:scale-105 transition-transform duration-300">
              <PokemonCard pokemonData={pokemon} isFeatured={false} />
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/pokemon"
            className="inline-block px-6 py-3 bg-mantis-500 text-white rounded-xl font-bold hover:bg-mantis-600 transform hover:scale-105 transition-all duration-300"
          >
            Explore All Pokemon
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FavoritesPage; 