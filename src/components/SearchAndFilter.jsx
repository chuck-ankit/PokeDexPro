import React from 'react';

const SearchAndFilter = ({ 
  searchTerm, 
  onSearchChange, 
  selectedType, 
  onTypeChange,
  selectedSort,
  onSortChange
}) => {
  const pokemonTypes = [
    'all', 'normal', 'fire', 'water', 'electric', 'grass', 'ice',
    'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug',
    'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
  ];

  const sortOptions = [
    { value: 'random', label: 'Random' },
    { value: 'name-asc', label: 'Name (A-Z)' },
    { value: 'name-desc', label: 'Name (Z-A)' },
    { value: 'hp-asc', label: 'HP (Low to High)' },
    { value: 'hp-desc', label: 'HP (High to Low)' },
    { value: 'attack-asc', label: 'Attack (Low to High)' },
    { value: 'attack-desc', label: 'Attack (High to Low)' }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 transform hover:scale-[1.01] transition-transform duration-300">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <div className="relative group">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search Pokemon..."
              className="w-full px-4 py-3 rounded-xl border-2 border-mantis-200 focus:border-mantis-500 focus:ring-2 focus:ring-mantis-200 transition-all duration-300 outline-none hover:border-mantis-300"
            />
            <svg
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-mantis-400 group-hover:text-mantis-500 transition-colors duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative group">
            <select
              value={selectedType}
              onChange={(e) => onTypeChange(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-mantis-200 focus:border-mantis-500 focus:ring-2 focus:ring-mantis-200 transition-all duration-300 outline-none bg-white appearance-none pr-8 hover:border-mantis-300 cursor-pointer"
            >
              {pokemonTypes.map((type) => (
                <option key={type} value={type} className="capitalize py-2 hover:bg-mantis-100">
                  {type === 'all' ? 'All Types' : type}
                </option>
              ))}
            </select>
            <svg
              className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-mantis-400 group-hover:text-mantis-500 transition-colors duration-300 pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>

          <div className="relative group">
            <select
              value={selectedSort}
              onChange={(e) => onSortChange(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-mantis-200 focus:border-mantis-500 focus:ring-2 focus:ring-mantis-200 transition-all duration-300 outline-none bg-white appearance-none pr-8 hover:border-mantis-300 cursor-pointer"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value} className="py-2 hover:bg-mantis-100">
                  {option.label}
                </option>
              ))}
            </select>
            <svg
              className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-mantis-400 group-hover:text-mantis-500 transition-colors duration-300 pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilter; 