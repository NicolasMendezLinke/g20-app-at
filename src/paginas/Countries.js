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
  background-color: #34495e; /* Azul mais escuro */
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2); /* Sombra mais intensa */
  border-radius: 12px; /* Borda mais arredondada */
  font-family: "Arial", sans-serif;
  color: #ecf0f1; /* Texto claro */
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-bottom: 2px solid #1abc9c; /* Verde vibrante */
  padding-bottom: 10px;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  font-size: 2rem;
  margin: 0;
  color: #1abc9c; /* Verde vibrante */
  text-transform: uppercase;
  letter-spacing: 1.5px;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  width: 100%;
`;

const Info = styled.div`
  font-size: 1rem;
  color: #ecf0f1; /* Texto claro */
  background-color: #34495e; /* Fundo consistente com o tema */
  padding: 15px;
  border-radius: 8px;
  strong {
    color: #1abc9c; /* Verde vibrante */
  }
`;

const AuthoritiesSection = styled.div`
  margin-top: 20px;
  width: 100%;
`;

const AuthoritiesTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: #ecf0f1; /* Texto claro */
  border-bottom: 1px solid #16a085; /* Verde mais escuro */
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
    background-color: #2c3e50; /* Azul escuro */
    border: 1px solid #34495e; /* Azul mais escuro */
    border-radius: 5px;
    font-size: 0.9rem;
    color: #ecf0f1; /* Texto claro */
  }
`;

const NoAuthoritiesMessage = styled.p`
  font-size: 1rem;
  color: #bdc3c7; /* Cinza claro */
  margin: 20px 0;
`;

const Button = styled.button`
  margin-top: 20px;
  padding: 12px 20px;
  background-color: #1abc9c; /* Verde vibrante */
  color: #2c3e50; /* Texto escuro */
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  align-self: flex-start;
  font-weight: bold;

  &:hover {
    background-color: #16a085; /* Verde mais escuro */
    transform: scale(1.05); /* Leve aumento */
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
