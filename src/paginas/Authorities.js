import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import { getCountryByName } from "../API/PaisesAPI";

const roles = [
  "Chefe de Estado",
  "Ministro de Finança",
  "Presidente de Banco Central",
];

const validateForm = (formData, authorities, tlds) => {
  const newErrors = {};
  if (!formData.name || formData.name.split(" ").length < 2) {
    newErrors.name = "É necessário informar o nome e o sobrenome da autoridade";
  }

  if (!formData.country) {
    newErrors.country = "É necessário informar o páis da autoridade";
  }

  if (!formData.role) {
    newErrors.role = "É necessário informar o cargo da autoridade";
  } else if (
    authorities.some(
      (authority) =>
        authority.country === formData.country &&
        authority.role === formData.role
    )
  ) {
    newErrors.role = "Já existe uma autoridade cadastrada para esse Cargo";
  }

  if (!formData.email) {
    newErrors.email = "É necessário informar o email da autoridade";
  } else {
    const selectedTld = tlds[formData.country];
    const emailDomain = formData.email.split("@")[1];
    if (!emailDomain || !emailDomain.endsWith(selectedTld)) {
      newErrors.email = `O email da autoridade deve ter o domínio do país (${selectedTld}).`;
    }
  }

  return newErrors;
};


const Authorities = ({
  g20Countries,
  tlds,
  authorities,
  setAuthorities,
  onSelectCountry,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    country: "",
    role: "",
    email: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const setSelectCountry = async (countryName) => {
    const country = await getCountryByName(countryName);
    onSelectCountry(country);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm(formData, authorities, tlds);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setAuthorities((prevAuthorities) => [...prevAuthorities, { ...formData }]);
    setSelectCountry(formData.country);

    navigate(`/countries`);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Container>
      <Title>Cadastro de Autoridade</Title>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Nome completo:</Label>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Informe o nome e sobrenome"
          />
          {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label>País representado:</Label>
          <Select
            name="country"
            value={formData.country}
            onChange={handleChange}
          >
            <option value="">Selecione um país</option>
            {g20Countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </Select>
          {errors.country && <ErrorMessage>{errors.country}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label>Cargo:</Label>
          <Select name="role" value={formData.role} onChange={handleChange}>
            <option value="">Selecione um cargo</option>
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </Select>
          {errors.role && <ErrorMessage>{errors.role}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label>Email:</Label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Ex: autoridade@dominio.sa"
          />
          {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
        </FormGroup>

        <Button type="submit">Cadastrar</Button>
      </Form>
    </Container>
  );
};

Authorities.propTypes = {
  g20Countries: PropTypes.arrayOf(PropTypes.string).isRequired,
  tlds: PropTypes.objectOf(PropTypes.string).isRequired,
  authorities: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      country: PropTypes.string,
      role: PropTypes.string,
      email: PropTypes.string,
    })
  ).isRequired,
  setAuthorities: PropTypes.func.isRequired,
};

const Container = styled.div`
  padding: 20px;
  max-width: 600px;
  margin: 40px auto;
  background-color: #2c3e50; 
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2); 
  border-radius: 10px;
  font-family: "Arial", sans-serif;
  color: #ecf0f1; 
`;

const Title = styled.h2`
  font-size: 1.8rem;
  color: #1abc9c; 
  margin-bottom: 20px;
  text-align: center;
  text-transform: uppercase; 
  letter-spacing: 1.5px; 
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 1rem;
  color: #bdc3c7; 
  margin-bottom: 8px;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #34495e; 
  border-radius: 8px;
  font-size: 1rem;
  background-color: #34495e; 
  color: #ecf0f1; 
  &:focus {
    border-color: #1abc9c; 
    outline: none;
    box-shadow: 0 0 5px #1abc9c;
  }
`;

const Select = styled.select`
  padding: 12px;
  border: 1px solid #34495e; 
  border-radius: 8px;
  font-size: 1rem;
  background-color: #34495e; 
  color: #ecf0f1;
  &:focus {
    border-color: #1abc9c; 
    outline: none;
    box-shadow: 0 0 5px #1abc9c;
  }
`;

const ErrorMessage = styled.p`
  font-size: 0.9rem;
  color: #e74c3c; 
  margin-top: 5px;
`;

const Button = styled.button`
  padding: 12px 20px;
  background-color: #1abc9c; 
  color: #2c3e50;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  align-self: center;
  font-weight: bold;
  &:hover {
    background-color: #16a085; 
    transform: scale(1.05); 
  }
`;


export default Authorities;
