const API_BASE_URL = 'https://pokeapi.co/api/v2';

// Cache for storing API responses
const cache = new Map();

// Rate limiting configuration
const RATE_LIMIT = {
  maxRequests: 100,
  timeWindow: 60000, // 1 minute
  requests: new Map(),
};

const checkRateLimit = (ip) => {
  const now = Date.now();
  const userRequests = RATE_LIMIT.requests.get(ip) || [];
  
  // Remove requests older than the time window
  const recentRequests = userRequests.filter(time => now - time < RATE_LIMIT.timeWindow);
  
  if (recentRequests.length >= RATE_LIMIT.maxRequests) {
    throw new Error('Rate limit exceeded. Please try again later.');
  }
  
  recentRequests.push(now);
  RATE_LIMIT.requests.set(ip, recentRequests);
};

const validatePokemonId = (id) => {
  const numId = Number(id);
  if (isNaN(numId) || numId < 1 || numId > 1010) {
    throw new Error('Invalid Pokemon ID');
  }
  return numId;
};

const fetchWithCache = async (url) => {
  if (cache.has(url)) {
    return cache.get(url);
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    // Validate response data
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid response data');
    }

    cache.set(url, data);
    return data;
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('Request timeout. Please try again.');
    }
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const fetchPokemonData = async () => {
  try {
    const response = await fetchWithCache(`${API_BASE_URL}/pokemon?limit=898`);
    
    if (!response.results || !Array.isArray(response.results)) {
      throw new Error('Invalid response format');
    }
    
    // Fetch detailed data for each Pokemon in parallel with a concurrency limit
    const pokemonDetails = await Promise.all(
      response.results.map(async (pokemon) => {
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
    const validatedId = validatePokemonId(id);
    return await fetchWithCache(`${API_BASE_URL}/pokemon/${validatedId}`);
  } catch (error) {
    console.error(`Error fetching Pokemon with ID ${id}:`, error);
    throw error;
  }
};

export const fetchPokemonByType = async (type) => {
  try {
    const validTypes = [
      'normal', 'fire', 'water', 'electric', 'grass', 'ice',
      'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug',
      'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
    ];
    
    if (!validTypes.includes(type)) {
      throw new Error('Invalid Pokemon type');
    }
    
    const response = await fetchWithCache(`${API_BASE_URL}/type/${type}`);
    if (!response.pokemon || !Array.isArray(response.pokemon)) {
      throw new Error('Invalid response format');
    }
    return response.pokemon.map(p => p.pokemon);
  } catch (error) {
    console.error(`Error fetching Pokemon of type ${type}:`, error);
    throw error;
  }
};