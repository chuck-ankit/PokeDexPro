const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const fetchWithRetry = async (url, retries = MAX_RETRIES) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    if (retries > 0) {
      await delay(RETRY_DELAY);
      return fetchWithRetry(url, retries - 1);
    }
    throw error;
  }
};

export const fetchPokemonData = async () => {
  try {
    const API = "https://pokeapi.co/api/v2/pokemon?limit=1302";
    const data = await fetchWithRetry(API);

    const detailedPokemonData = data.results.map(async (curPokemon) => {
      try {
        const pokemonData = await fetchWithRetry(curPokemon.url);
        return pokemonData;
      } catch (error) {
        console.error(`Error fetching details for ${curPokemon.name}:`, error);
        return null;
      }
    });

    const detailedResponses = await Promise.all(detailedPokemonData);
    // Filter out any null responses from failed fetches
    return detailedResponses.filter(pokemon => pokemon !== null);
  } catch (error) {
    console.error('Error fetching Pokemon data:', error);
    throw new Error('Unable to fetch Pokemon data. Please check your internet connection and try again.');
  }
};