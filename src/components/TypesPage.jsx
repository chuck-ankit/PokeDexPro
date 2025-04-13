import React from 'react';
import { useNavigate } from 'react-router-dom';

const TypesPage = ({ onTypeClick }) => {
  const navigate = useNavigate();

  const typeColors = {
    normal: {
      bg: 'bg-gray-100',
      hover: 'hover:bg-gray-200',
      text: 'text-gray-800',
      border: 'border-gray-300',
      icon: '🟤'
    },
    fire: {
      bg: 'bg-red-100',
      hover: 'hover:bg-red-200',
      text: 'text-red-800',
      border: 'border-red-300',
      icon: '🔥'
    },
    water: {
      bg: 'bg-blue-100',
      hover: 'hover:bg-blue-200',
      text: 'text-blue-800',
      border: 'border-blue-300',
      icon: '💧'
    },
    electric: {
      bg: 'bg-yellow-100',
      hover: 'hover:bg-yellow-200',
      text: 'text-yellow-800',
      border: 'border-yellow-300',
      icon: '⚡'
    },
    grass: {
      bg: 'bg-green-100',
      hover: 'hover:bg-green-200',
      text: 'text-green-800',
      border: 'border-green-300',
      icon: '🌿'
    },
    ice: {
      bg: 'bg-cyan-100',
      hover: 'hover:bg-cyan-200',
      text: 'text-cyan-800',
      border: 'border-cyan-300',
      icon: '❄️'
    },
    fighting: {
      bg: 'bg-orange-100',
      hover: 'hover:bg-orange-200',
      text: 'text-orange-800',
      border: 'border-orange-300',
      icon: '🥊'
    },
    poison: {
      bg: 'bg-purple-100',
      hover: 'hover:bg-purple-200',
      text: 'text-purple-800',
      border: 'border-purple-300',
      icon: '☠️'
    },
    ground: {
      bg: 'bg-amber-100',
      hover: 'hover:bg-amber-200',
      text: 'text-amber-800',
      border: 'border-amber-300',
      icon: '🏜️'
    },
    flying: {
      bg: 'bg-sky-100',
      hover: 'hover:bg-sky-200',
      text: 'text-sky-800',
      border: 'border-sky-300',
      icon: '🦅'
    },
    psychic: {
      bg: 'bg-pink-100',
      hover: 'hover:bg-pink-200',
      text: 'text-pink-800',
      border: 'border-pink-300',
      icon: '🔮'
    },
    bug: {
      bg: 'bg-lime-100',
      hover: 'hover:bg-lime-200',
      text: 'text-lime-800',
      border: 'border-lime-300',
      icon: '🐛'
    },
    rock: {
      bg: 'bg-stone-100',
      hover: 'hover:bg-stone-200',
      text: 'text-stone-800',
      border: 'border-stone-300',
      icon: '🪨'
    },
    ghost: {
      bg: 'bg-violet-100',
      hover: 'hover:bg-violet-200',
      text: 'text-violet-800',
      border: 'border-violet-300',
      icon: '👻'
    },
    dragon: {
      bg: 'bg-indigo-100',
      hover: 'hover:bg-indigo-200',
      text: 'text-indigo-800',
      border: 'border-indigo-300',
      icon: '🐉'
    },
    dark: {
      bg: 'bg-slate-100',
      hover: 'hover:bg-slate-200',
      text: 'text-slate-800',
      border: 'border-slate-300',
      icon: '🌑'
    },
    steel: {
      bg: 'bg-zinc-100',
      hover: 'hover:bg-zinc-200',
      text: 'text-zinc-800',
      border: 'border-zinc-300',
      icon: '🛡️'
    },
    fairy: {
      bg: 'bg-rose-100',
      hover: 'hover:bg-rose-200',
      text: 'text-rose-800',
      border: 'border-rose-300',
      icon: '🧚'
    }
  };

  const handleTypeClick = (type) => {
    if (onTypeClick) {
      onTypeClick(type);
    }
    navigate('/pokemon', { state: { selectedType: type } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-mantis-50 to-white py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-mantis-900 mb-4">Pokemon Types</h1>
          <p className="text-xl text-mantis-700">
            Click on a type to view all Pokemon of that type
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {Object.entries(typeColors).map(([type, colors]) => (
            <div
              key={type}
              onClick={() => handleTypeClick(type)}
              className={`
                ${colors.bg} ${colors.hover} ${colors.text} ${colors.border}
                p-4 rounded-2xl shadow-md cursor-pointer 
                transform transition-all duration-300 hover:scale-105 hover:shadow-lg
                border-2
                flex flex-col items-center justify-center
                min-h-[140px]
                relative overflow-hidden
                group
              `}
            >
              <div className="absolute top-0 left-0 w-full h-full bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              <div className="text-4xl mb-2">{colors.icon}</div>
              <h2 className="text-xl font-bold capitalize mb-1">{type}</h2>
              <div className="text-sm opacity-80 text-center">
                {type === 'normal' && 'Balanced and versatile'}
                {type === 'fire' && 'Burns with passion'}
                {type === 'water' && 'Flows with power'}
                {type === 'electric' && 'Charged with energy'}
                {type === 'grass' && 'Grows with strength'}
                {type === 'ice' && 'Freezes with precision'}
                {type === 'fighting' && 'Fights with honor'}
                {type === 'poison' && 'Toxic and deadly'}
                {type === 'ground' && 'Sturdy and strong'}
                {type === 'flying' && 'Soars with grace'}
                {type === 'psychic' && 'Mind over matter'}
                {type === 'bug' && 'Small but mighty'}
                {type === 'rock' && 'Solid as stone'}
                {type === 'ghost' && 'Mysterious and eerie'}
                {type === 'dragon' && 'Ancient and powerful'}
                {type === 'dark' && 'Shrouded in mystery'}
                {type === 'steel' && 'Hard as metal'}
                {type === 'fairy' && 'Magical and enchanting'}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={() => navigate('/pokemon')}
            className="px-6 py-3 bg-mantis-500 text-white rounded-xl hover:bg-mantis-600 transition-all duration-300 transform hover:scale-105 font-medium shadow-md hover:shadow-lg"
          >
            View All Pokemon
          </button>
        </div>
      </div>
    </div>
  );
};

export default TypesPage; 