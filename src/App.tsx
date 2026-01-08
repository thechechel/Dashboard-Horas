import React, { useState, useEffect } from 'react';
import { RegistroHoras, Filtros } from './types';
import { parseCSV } from './utils/csvParser';
import { filtrarDados, obterTiposTarefaUnicos, obterResponsaveisUnicos } from './utils/dataProcessor';
import FiltrosComponent from './components/Filtros';
import Graficos from './components/Graficos';
import './App.css';

function App() {
  const [dadosOriginais, setDadosOriginais] = useState<RegistroHoras[]>([]);
  const [dadosFiltrados, setDadosFiltrados] = useState<RegistroHoras[]>([]);
  const [filtros, setFiltros] = useState<Filtros>({
    periodo: { inicio: null, fim: null },
    tiposTarefa: [],
    responsaveis: [],
  });
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    carregarDados();
  }, []);

  useEffect(() => {
    if (dadosOriginais.length > 0) {
      const filtrados = filtrarDados(dadosOriginais, filtros);
      setDadosFiltrados(filtrados);
    }
  }, [dadosOriginais, filtros]);

  async function carregarDados() {
    try {
      setCarregando(true);
      // Carregar o arquivo CSV
      const response = await fetch('/Planilha Horas.csv');
      const blob = await response.blob();
      const file = new File([blob], 'Planilha Horas.csv', { type: 'text/csv' });
      
      const dados = await parseCSV(file);
      setDadosOriginais(dados);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      alert('Erro ao carregar o arquivo CSV. Verifique se o arquivo está na pasta public.');
    } finally {
      setCarregando(false);
    }
  }

  if (carregando) {
    return (
      <div className="app-container">
        <div className="loading">Carregando dados...</div>
      </div>
    );
  }

  const tiposTarefa = obterTiposTarefaUnicos(dadosOriginais);
  const responsaveis = obterResponsaveisUnicos(dadosOriginais);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Dashboard de Horas</h1>
        <p>Visualização de horas trabalhadas por colaborador e tipo de tarefa</p>
      </header>

      <main className="app-main">
        <FiltrosComponent
          filtros={filtros}
          tiposTarefa={tiposTarefa}
          responsaveis={responsaveis}
          onFiltrosChange={setFiltros}
        />

        {dadosFiltrados.length > 0 ? (
          <Graficos dados={dadosFiltrados} />
        ) : (
          <div className="sem-dados">
            <p>Nenhum dado encontrado com os filtros selecionados.</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
