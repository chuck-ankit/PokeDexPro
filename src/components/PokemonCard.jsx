import React from 'react';

const PokemonCard = ({ pokemonData, isFeatured }) => {
  const getTypeColor = (type) => {
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
      flying: 'bg-indigo-300',
      psychic: 'bg-pink-500',
      bug: 'bg-green-400',
      rock: 'bg-yellow-700',
      ghost: 'bg-purple-700',
      dragon: 'bg-indigo-600',
      dark: 'bg-gray-800',
      steel: 'bg-gray-500',
      fairy: 'bg-pink-300'
    };
    return typeColors[type] || 'bg-gray-400';
  };

  const getStatColor = (value) => {
    if (value >= 200) return 'bg-red-500';
    if (value >= 150) return 'bg-orange-500';
    if (value >= 100) return 'bg-yellow-500';
    if (value >= 50) return 'bg-mantis-500';
    return 'bg-blue-500';
  };

  return (
    <div className={`group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden ${isFeatured ? 'border-2 border-yellow-400' : ''} cursor-pointer`}>
      {isFeatured && (
        <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4">
          <div className="bg-yellow-400 text-black px-3 py-0.5 rounded-full text-xs font-bold shadow-lg rotate-12">
            Pokemon of the Day
          </div>
        </div>
      )}
      <div className="relative">
        <div className={`absolute inset-0 bg-gradient-to-br from-mantis-50 to-mantis-100 opacity-0 ${isFeatured ? 'opacity-100' : 'group-hover:opacity-100'} transition-opacity duration-300`} />
        <div className={`relative w-48 h-48 mx-auto mt-4 ${isFeatured ? 'scale-110' : ''}`}>
          <div className="absolute inset-0 bg-gradient-to-br from-mantis-200 to-mantis-300 rounded-full transform rotate-45 group-hover:rotate-90 transition-transform duration-500" />
          <div className="absolute inset-2 bg-gradient-to-br from-mantis-100 to-mantis-200 rounded-full transform -rotate-45 group-hover:-rotate-90 transition-transform duration-500" />
          <div className="absolute inset-4 bg-gradient-to-br from-mantis-50 to-white rounded-full">
            <img
              src={pokemonData.sprites.other['official-artwork'].front_default}
              alt={pokemonData.name}
              className={`w-full h-full object-contain transform ${isFeatured ? 'scale-125' : 'group-hover:scale-110'} transition-transform duration-300`}
            />
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className={`text-lg font-bold text-mantis-900 capitalize ${isFeatured ? 'text-xl' : 'group-hover:text-mantis-700'} transition-colors duration-300`}>
            {pokemonData.name}
          </h3>
          <span className="text-xs font-medium text-mantis-600">#{pokemonData.id.toString().padStart(3, '0')}</span>
        </div>

        <div className="flex gap-1.5 mb-3">
          {pokemonData.types.map((type) => (
            <span
              key={type.type.name}
              className={`${getTypeColor(type.type.name)} text-white px-2 py-0.5 rounded-full text-xs font-medium capitalize shadow-sm transform group-hover:scale-105 transition-transform duration-300`}
            >
              {type.type.name}
            </span>
          ))}
        </div>

        <div className="space-y-2">
          {pokemonData.stats.map((stat) => (
            <div key={stat.stat.name} className="space-y-0.5">
              <div className="flex justify-between text-xs">
                <span className="font-medium text-mantis-700 capitalize">{stat.stat.name.replace('-', ' ')}</span>
                <span className="font-bold text-mantis-900">{stat.base_stat}</span>
              </div>
              <div className="h-1.5 bg-mantis-100 rounded-full overflow-hidden">
                <div
                  className={`h-full ${getStatColor(stat.base_stat)} transition-all duration-500 ease-out`}
                  style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonCard; 