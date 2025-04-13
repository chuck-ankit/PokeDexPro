import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpeg';

const Navbar = ({ onSurpriseMe }) => {
  return (
    <header className="bg-gradient-to-r from-mantis-800 to-mantis-900 text-white py-12 px-4 shadow-xl relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAzNGM0LjQxOCAwIDgtMy41ODIgOC04cy0zLjU4Mi04LTgtOC04IDMuNTgyLTggOCAzLjU4MiA4IDggOHoiIHN0cm9rZT0iI0ZGRiIgc3Ryb2tlLW9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-10"></div>
      <div className="max-w-7xl mx-auto relative">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <Link to="/" className="flex items-center gap-6 group">
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
          </Link>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link
              to="/pokemon"
              className="px-6 py-3 bg-white text-mantis-900 rounded-xl font-bold shadow-lg hover:bg-mantis-100 transform hover:scale-105 transition-all duration-300"
            >
              Explore Pokemon
            </Link>
            <Link
              to="/types"
              className="px-6 py-3 bg-white text-mantis-900 rounded-xl font-bold shadow-lg hover:bg-mantis-100 transform hover:scale-105 transition-all duration-300"
            >
              View Types
            </Link>
            <button
              onClick={onSurpriseMe}
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
      </div>
    </header>
  );
};

export default Navbar; 