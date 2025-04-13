const API_BASE_URL = 'https://pokeapi.co/api/v2';

// Cache for storing API responses
const cache = new Map();

const fetchWithCache = async (url) => {
  if (cache.has(url)) {
    return cache.get(url);
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    cache.set(url, data);
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const fetchPokemonData = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/pokemon?limit=898`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    
    // Fetch detailed data for each Pokemon in parallel with a concurrency limit
    const pokemonDetails = await Promise.all(
      data.results.map(async (pokemon) => {
        try {
          return await fetchWithCache(pokemon.url);
        } catch (error) {
          console.error(`Error fetching details for ${pokemon.name}:`, error);
          return null;
        }
      })
    );

    // Filter out any failed requests and sort by ID
    return pokemonDetails
      .filter(pokemon => pokemon !== null)
      .sort((a, b) => a.id - b.id);
  } catch (error) {
    console.error('Error fetching Pokemon data:', error);
    throw error;
  }
};

export const fetchPokemonById = async (id) => {
  try {
    return await fetchWithCache(`${API_BASE_URL}/pokemon/${id}`);
  } catch (error) {
    console.error(`Error fetching Pokemon with ID ${id}:`, error);
    throw error;
  }
};

export const fetchPokemonByType = async (type) => {
  try {
    const response = await fetchWithCache(`${API_BASE_URL}/type/${type}`);
    return response.pokemon.map(p => p.pokemon);
  } catch (error) {
    console.error(`Error fetching Pokemon of type ${type}:`, error);
    throw error;
  }
};