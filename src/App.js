import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Countries from "./paginas/Countries";
import Authorities from "./paginas/Authorities";
import AgendaForm from "./paginas/AgendaForm";
import Agendas from "./paginas/Agendas";
import NotFound from "./paginas/NotFound";
import "./styles.css";

const g20Countries = [
  "Argentina",
  "Australia",
  "Brazil",
  "Canada",
  "China",
  "France",
  "Germany",
  "India",
  "Indonesia",
  "Italy",
  "Japan",
  "Mexico",
  "Russia",
  "Saudi Arabia",
  "South Africa",
  "South Korea",
  "Turkey",
  "United Kingdom",
  "United States",
  "European Union",
];
const tlds = {
  Argentina: ".ar",
  Australia: ".au",
  Brazil: ".br",
  Canada: ".ca",
  China: ".cn",
  France: ".fr",
  Germany: ".de",
  India: ".in",
  Indonesia: ".id",
  Italy: ".it",
  Japan: ".jp",
  Mexico: ".mx",
  Russia: ".ru",
  "Saudi Arabia": ".sa",
  "South Africa": ".za",
  "South Korea": ".kr",
  Turkey: ".tr",
  "United Kingdom": ".uk",
  "United States": ".us",
  "European Union": ".eu",
};

export default function App() {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [authorities, setAuthorities] = useState([]);
  const [agendas, setAgendas] = useState([]);

  return (
    <Router>
      <div className="app-container">
        <Sidebar
          onSelectCountry={setSelectedCountry}
          g20Countries={g20Countries}
        />
        <main>
          <div className="grid">
            <Routes>
              <Route path="/" element={<h1>Agendamento de apresentações do G20</h1>} />
              <Route
                path="/countries"
                element={
                  <Countries
                    selectedCountry={selectedCountry}
                    authorities={authorities}
                  />
                }
              />
              <Route
                path="/authorities"
                element={
                  <Authorities
                    g20Countries={g20Countries}
                    tlds={tlds}
                    authorities={authorities}
                    setAuthorities={setAuthorities}
                    onSelectCountry={setSelectedCountry}
                  />
                }
              />
              <Route
                path="/agenda-form"
                element={
                  <AgendaForm
                    authorities={authorities}
                    agendas={agendas}
                    setAgendas={setAgendas}
                  />
                }
              />
              <Route path="/agendas" element={<Agendas agendas={agendas} />} />
              <Route path="/agendas" element={<Agendas />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}
