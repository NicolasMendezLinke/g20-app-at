import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";

const AgendaForm = ({ authorities, agendas, setAgendas }) => {
  const [formData, setFormData] = useState({
    authority: "",
    country: "", 
    date: "",
    time: "",
    role: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!formData.authority) {
      newErrors.authority = "Selecione uma autoridade.";
    }

    if (!formData.date) {
      newErrors.date = "Selecione uma data.";
    } else if (
      formData.date !== "2025-11-01" &&
      formData.date !== "2025-11-10"
    ) {
      newErrors.date =
        "Selecione uma data válida (18 ou 19 de novembro de 2025).";
    }

    if (!formData.time) {
      newErrors.time = "Selecione um horário.";
    } else {
      const selectedDateTime = new Date(`${formData.date}T${formData.time}`);
      const conflict = agendas.some((agenda) => {
        const agendaDateTime = new Date(`${agenda.date}T${agenda.time}`);
        const diff = Math.abs(selectedDateTime - agendaDateTime) / (1000 * 60);
        return diff < 15;
      });

      if (conflict) {
        newErrors.time = "Conflito de horário. Selecione um horário diferente.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setAgendas((prevAgendas) => [...prevAgendas, { ...formData }]);

    navigate("/agendas");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "authority") {
      const selectedAuthority = authorities.find(
        (authority) => authority.name === value
      );
      if (selectedAuthority) {
        setFormData((prevData) => ({
          ...prevData,
          role: selectedAuthority.role,
          country: selectedAuthority.country, 
        }));
      }
    }
  };

  return (
    <FormContainer>
      <Title>Cadastrar Apresentação</Title>

      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Autoridade:</Label>
          <Select
            name="authority"
            value={formData.authority}
            onChange={handleChange}
          >
            <option value="">Selecione uma autoridade</option>
            {authorities.map((authority, index) => (
              <option key={index} value={authority.name}>
                {authority.country}/{authority.name}/{authority.role}
              </option>
            ))}
          </Select>
          {errors.authority && <ErrorText>{errors.authority}</ErrorText>}
          <Button onClick={() => navigate("/authorities")}>
            Cadastrar Autoridade
          </Button>
        </FormGroup>

        <FormGroup>
          <Label>Data:</Label>
          <Input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            min="2025-11-01"
            max="2025-11-10"
          />
          {errors.date && <ErrorText>{errors.date}</ErrorText>}
        </FormGroup>

        <FormGroup>
          <Label>Hora:</Label>
          <Input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
          />
          {errors.time && <ErrorText>{errors.time}</ErrorText>}
        </FormGroup>

        <SubmitButton type="submit">Enviar Cadastro</SubmitButton>
      </form>
    </FormContainer>
  );
};

const FormContainer = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  background-color: #34495e; 
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); 
  color: #ecf0f1; 
`;

const Title = styled.h2`
  text-align: center;
  font-size: 1.8em;
  color: #1abc9c; 
  margin-bottom: 15px;
  text-transform: uppercase; 
  letter-spacing: 1px; 
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-size: 1em;
  color: #bdc3c7; 
`;

const Input = styled.input`
  width: 80%;
  padding: 12px; 
  margin-top: 8px;
  border: 1px solid #7f8c8d; 
  border-radius: 6px;
  font-size: 1em;
  background-color: #2c3e50; 
  color: #ecf0f1; 

  &:focus {
    outline: none;
    border-color: #1abc9c; 
    box-shadow: 0 0 5px #1abc9c;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px; 
  margin-top: 8px;
  border: 1px solid #7f8c8d; 
  border-radius: 6px;
  font-size: 1em;
  background-color: #2c3e50; 
  color: #ecf0f1; 

  &:focus {
    outline: none;
    border-color: #1abc9c; 
    box-shadow: 0 0 5px #1abc9c;
  }
`;

const ErrorText = styled.p`
  color: #e74c3c; 
  font-size: 0.9em;
  margin-top: 5px;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #1abc9c; 
  color: #2c3e50; 
  border: none;
  border-radius: 6px;
  font-size: 1em;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #16a085; 
    transform: scale(1.05); 
  }
`;

const Button = styled.button`
  margin-top: 20px;
  padding: 10px 15px; 
  background-color: #1abc9c; 
  color: #2c3e50; 
  font-size: 1rem;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #16a085; 
    transform: scale(1.05); 
  }
`;


export default AgendaForm;
