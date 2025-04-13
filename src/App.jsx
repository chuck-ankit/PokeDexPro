import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';

// Lazy load components
const HomePage = lazy(() => import('./components/HomePage'));
const PokemonList = lazy(() => import('./components/PokemonList'));
const PokemonDetails = lazy(() => import('./components/PokemonDetails'));
const TypesPage = lazy(() => import('./components/TypesPage'));
const FavoritesPage = lazy(() => import('./components/FavoritesPage'));

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 30, // 30 minutes
      refetchOnWindowFocus: false,
    },
  },
});

const AppContent = () => {
  const navigate = useNavigate();

  const handleSurpriseMe = () => {
    const randomId = Math.floor(Math.random() * 1010) + 1;
    navigate(`/pokemon/${randomId}`);
  };

  const handleTypeClick = (type) => {
    navigate('/pokemon', { state: { selectedType: type } });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onSurpriseMe={handleSurpriseMe} />
      <main className="flex-grow">
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<HomePage onSurpriseMe={handleSurpriseMe} />} />
            <Route path="/pokemon" element={<PokemonList />} />
            <Route path="/pokemon/:id" element={<PokemonDetails />} />
            <Route path="/types" element={<TypesPage onTypeClick={handleTypeClick} />} />
            <Route path="/favorites" element={<FavoritesPage />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AppContent />
      </Router>
    </QueryClientProvider>
  );
};

export default App;