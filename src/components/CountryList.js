import styled from "styled-components";

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ListItem = styled.li`
  padding: 12px 15px; 
  cursor: pointer;
  background-color: ${(props) =>
    props.isHighlighted ? "#34495e" : "transparent"}; 
  border-radius: 5px;
  color: #ecf0f1; 
  font-weight: bold; 
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #1abc9c; 
    transform: translateY(-2px); 
  }
`;


const CountryList = ({ countries, onCountryClick, highlightedCountry }) => {
  return (
    <List>
      {countries.map((country) => (
        <ListItem
          key={country.name.common}
          onClick={() => onCountryClick(country)}
          isHighlighted={highlightedCountry === country.name.common}
        >
          {country.name.common}
        </ListItem>
      ))}
    </List>
  );
};

export default CountryList;
