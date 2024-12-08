import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import {
  getCachedCountries,
  fetchAndCacheCountries,
} from "../API/PaisesAPI";
import CountryList from "./CountryList";

const Sidebar = ({ onSelectCountry, g20Countries }) => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const loadCountries = async () => {
      const cachedCountries = getCachedCountries();
      if (cachedCountries.length > 0) {
        setCountries(cachedCountries);
        setFilteredCountries(cachedCountries);
        setLoading(false);
      } else {
        const fetchedCountries = await fetchAndCacheCountries(g20Countries);
        setCountries(fetchedCountries);
        setFilteredCountries(fetchedCountries);
        setLoading(false);
      }
    };

    loadCountries();
  }, [g20Countries]);

  const regions = Array.from(
    new Set(countries.map((country) => country.region))
  );

  const handleRegionChange = (region) => {
    const isSelected = selectedRegions.includes(region);
    const updatedRegions = isSelected
      ? selectedRegions.filter((r) => r !== region)
      : [...selectedRegions, region];

    setSelectedRegions(updatedRegions);
    filterCountries(searchQuery, updatedRegions);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    filterCountries(query, selectedRegions);
  };

  const filterCountries = (query, regions) => {
    const filtered = countries.filter((country) => {
      const matchesName = country.name.common.toLowerCase().includes(query);
      const matchesRegion =
        regions.length === 0 || regions.includes(country.region);

      return matchesName && matchesRegion;
    });

    setFilteredCountries(filtered);
  };

  const handleCountryClick = (country) => {
    setSelectedCountry(country.name.common);
    onSelectCountry(country);
    navigate("/countries");
  };

  return (
    <SidebarContainer>
      <div>
        <SidebarTitle>Filtro de Pesquisa</SidebarTitle>
        <SearchInput
          type="text"
          placeholder="Qual país está procurando?"
          value={searchQuery}
          onChange={handleSearchChange}
        />

        <RegionFilterContainer>
          <h4>Continentes</h4>
          {regions.map((region) => (
            <div key={region}>
              <input
                type="checkbox"
                id={region}
                value={region}
                checked={selectedRegions.includes(region)}
                onChange={() => handleRegionChange(region)}
              />
              <label htmlFor={region}>{region}</label>
            </div>
          ))}
        </RegionFilterContainer>
      </div>

      <ContentWrapper>
        {loading ? (
          <p>Carregando...</p>
        ) : (
          <CountryList
            countries={filteredCountries}
            onCountryClick={handleCountryClick}
            highlightedCountry={selectedCountry}
          />
        )}
      </ContentWrapper>

      <Footer>
        <AddAgendaLink to="/agendas">Apresentações Agendadas</AddAgendaLink>
        <AddAgendaLink to="/agenda-form">Formulário de Cadastro</AddAgendaLink>
      </Footer>
    </SidebarContainer>
  );
};

const SidebarContainer = styled.aside`
  width: 250px;
  padding: 25px;
  background-color: #2c3e50; 
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.2); 
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: #ffffff 
  

`;

const RegionFilterContainer = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #34495e; 
  border-radius: 5px;
  font-size: 1em;
  background-color: #34495e; 
  color: #ecf0f1;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #1abc9c; 
  }
`;

const Footer = styled.footer`
  margin-top: auto;
  padding-top: 10px;
  border-top: 1px solid #34495e; 
  color: #bdc3c7;
  font-size: 0.9em;
`;

const SidebarTitle = styled.h3`
  margin-bottom: 20px;
  font-size: 1.8em;
  font-weight: bold;
  color: #ffffff; 
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const ContentWrapper = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const AddAgendaLink = styled(Link)`
  display: block;
  margin-top: 20px;
  padding: 12px 10px;
  background-color: #1abc9c; 
  color: #2c3e50; 
  text-align: center;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #16a085; 
    transform: scale(1.05); 
  }
`;

export default Sidebar;
