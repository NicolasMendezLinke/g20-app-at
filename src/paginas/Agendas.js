import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";


const Agendas = ({ agendas }) => {
  const sortedAgendas = [...agendas].sort((a, b) => {
    const dateA = new Date(`${a.date}T${a.time}`);
    const dateB = new Date(`${b.date}T${b.time}`);
    return dateA - dateB;
  });

  return (
    <Container>
      <Title>Lista de Apresentações</Title>
      {sortedAgendas.length > 0 ? (
        <ul>
          {sortedAgendas.map((agenda, index) => (
            <AgendaItem key={index}>
              {agenda.date} {agenda.time} - {agenda.authority} ({agenda.country}
              ) ({agenda.role})
            </AgendaItem>
          ))}
        </ul>
      ) : (
        <p>Nenhuma apresentação cadastrada.</p>
      )}
    </Container>
  );
};

Agendas.propTypes = {
  agendas: PropTypes.arrayOf(
    PropTypes.shape({
      authority: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired,
    })
  ).isRequired,
};

const Container = styled.div`
  padding: 20px;
  background-color: #34495e; 
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); 
  color: #ecf0f1; 
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-3px); 
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.25); 
  }
`;

const Title = styled.h2`
  text-align: center;
  font-size: 1.8em;
  color: #1abc9c; 
  margin-bottom: 15px;
  text-transform: uppercase; 
  letter-spacing: 1px; 
`;

const AgendaItem = styled.li`
  font-size: 1em;
  margin-bottom: 12px;
  color: #bdc3c7; 
  list-style: none;
  padding: 10px;
  background-color: #2c3e50; 
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #1abc9c; 
    color: #2c3e50; 
    transform: scale(1.05); 
  }
`;


export default Agendas;
