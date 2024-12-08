import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 1200px;
  margin: 20px auto;
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  font-family: "Arial", sans-serif;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-bottom: 2px solid #007bff;
  padding-bottom: 10px;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  font-size: 2rem;
  margin: 0;
  color: #333;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  width: 100%;
`;

const Info = styled.div`
  font-size: 1rem;
  color: #555;
  strong {
    color: #007bff;
  }
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 8px;
`;

const AuthoritiesSection = styled.div`
  margin-top: 20px;
  width: 100%;
`;

const AuthoritiesTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: #444;
  border-bottom: 1px solid #ddd;
  padding-bottom: 5px;
`;

const AuthorityList = styled.ul`
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 15px;

  li {
    padding: 15px;
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 0.9rem;
    color: #333;
  }
`;

const NoAuthoritiesMessage = styled.p`
  font-size: 1rem;
  color: #888;
  margin: 20px 0;
`;

const Button = styled.button`
  margin-top: 20px;
  padding: 12px 20px;
  background-color: #007bff;
  color: white;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  align-self: flex-start;
  &:hover {
    background-color: #0056b3;
  }
`;

const Countries = ({ selectedCountry, authorities }) => {
  const navigate = useNavigate();

  if (!selectedCountry) {
    return (
      <Container>
        <p>Selecione um país para ver os detalhes.</p>
      </Container>
    );
  }

  const { name, capital, region, languages, tld } = selectedCountry;
  const countryAuthorities = authorities.filter(
    (authority) => authority.country === name.common
  );

  return (
    <Container>
      <Header>
        <Title>{name.common}</Title>
        <Button onClick={() => navigate("/authorities")}>
          Cadastrar Autoridade
        </Button>
      </Header>
      <InfoGrid>
        <Info>
          <strong>Capital:</strong> {capital?.[0] || "N/A"}
        </Info>
        <Info>
          <strong>Região:</strong> {region}
        </Info>
        <Info>
          <strong>Idioma:</strong>{" "}
          {languages ? Object.values(languages)[0] : "N/A"}
        </Info>
        <Info>
          <strong>TLD:</strong> {tld?.[0] || "N/A"}
        </Info>
      </InfoGrid>
      <AuthoritiesSection>
        <AuthoritiesTitle>Autoridades</AuthoritiesTitle>
        {countryAuthorities.length > 0 ? (
          <AuthorityList>
            {countryAuthorities.map((authority, index) => (
              <li key={index}>
                <strong>{authority.role}:</strong> {authority.name} (
                {authority.email})
              </li>
            ))}
          </AuthorityList>
        ) : (
          <NoAuthoritiesMessage>
            Nenhuma autoridade cadastrada.
          </NoAuthoritiesMessage>
        )}
      </AuthoritiesSection>
    </Container>
  );
};

Countries.propTypes = {
  selectedCountry: PropTypes.shape({
    name: PropTypes.shape({
      common: PropTypes.string.isRequired,
    }).isRequired,
    capital: PropTypes.arrayOf(PropTypes.string),
    region: PropTypes.string.isRequired,
    languages: PropTypes.object,
    tld: PropTypes.arrayOf(PropTypes.string),
  }),
  authorities: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      country: PropTypes.string,
      role: PropTypes.string,
      email: PropTypes.string,
    })
  ).isRequired,
};

export default Countries;
