import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-mantis-800 to-mantis-900 text-white py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">PokedexPro</h3>
            <p className="text-mantis-200">
              Your comprehensive Pokemon database with detailed information about all your favorite Pokemon.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-mantis-200 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/pokemon" className="text-mantis-200 hover:text-white transition-colors">
                  Explore Pokemon
                </Link>
              </li>
              <li>
                <Link to="/types" className="text-mantis-200 hover:text-white transition-colors">
                  Pokemon Types
                </Link>
              </li>
              <li>
                <Link to="/favorites" className="text-mantis-200 hover:text-white transition-colors">
                  Favorites
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">About</h3>
            <p className="text-mantis-200">
              This is a Pokemon fan website created by a fan for fans.
            </p>
          </div>
        </div>
        <div className="border-t border-mantis-700 mt-8 pt-8 text-center text-mantis-300">
          <p>&copy; {new Date().getFullYear()} PokedexPro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 