const COUNTRY_KEY = "g20Countries";

export const fetchCountriesFromAPI = async () => {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all");
    if (!response.ok) {
      throw new Error(`Failed to fetch countries: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching countries:", error);
    return [];
  }
};

export const getCachedCountries = () => {
  const cachedCountries = localStorage.getItem(COUNTRY_KEY);
  return cachedCountries ? JSON.parse(cachedCountries) : [];
};

export const cacheCountries = (countries) => {
  localStorage.setItem(COUNTRY_KEY, JSON.stringify(countries));
};

export const clearCacheByKey = (key) => {
  localStorage.removeItem(key);
};

export const fetchAndCacheCountries = async (g20Countries) => {
  console.log(g20Countries);
  console.log(typeof g20Countries);

  console.log("limpando cache");
  clearCacheByKey(COUNTRY_KEY);
  console.log("limpaou cache");
  console.log("fazendo fetch");
  const data = await fetchCountriesFromAPI();
  console.log("fetch feito");
  console.log(data);
  console.log("fazendo filter");
  const filteredCountries = data
    .filter((country) => g20Countries.includes(country.name.common))
    .sort((a, b) => a.name.common.localeCompare(b.name.common));

  console.log("passou do filter");
  console.log(filteredCountries);
  cacheCountries(filteredCountries);
  return filteredCountries;
};

export const getCountryByName = async (countryName) => {
  const cachedData = getCachedCountries();
  const cachedCountry = cachedData.find(
    (country) => country.name.common.toLowerCase() === countryName.toLowerCase()
  );

  if (cachedCountry) {
    return cachedCountry;
  }
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${countryName}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch country: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching country:", error);
    return null;
  }
};
