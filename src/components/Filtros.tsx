import React from 'react';
import { Filtros as FiltrosType } from '../types';
import './Filtros.css';

interface FiltrosProps {
  filtros: FiltrosType;
  tiposTarefa: string[];
  responsaveis: string[];
  onFiltrosChange: (filtros: FiltrosType) => void;
}

export default function Filtros({ filtros, tiposTarefa, responsaveis, onFiltrosChange }: FiltrosProps) {
  const handlePeriodoInicio = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFiltrosChange({
      ...filtros,
      periodo: {
        ...filtros.periodo,
        inicio: e.target.value ? new Date(e.target.value) : null,
      },
    });
  };

  const handlePeriodoFim = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFiltrosChange({
      ...filtros,
      periodo: {
        ...filtros.periodo,
        fim: e.target.value ? new Date(e.target.value) : null,
      },
    });
  };

  const handleTipoTarefa = (tipo: string) => {
    const novosTipos = filtros.tiposTarefa.includes(tipo)
      ? filtros.tiposTarefa.filter((t) => t !== tipo)
      : [...filtros.tiposTarefa, tipo];
    
    onFiltrosChange({
      ...filtros,
      tiposTarefa: novosTipos,
    });
  };

  const handleResponsavel = (responsavel: string) => {
    const novosResponsaveis = filtros.responsaveis.includes(responsavel)
      ? filtros.responsaveis.filter((r) => r !== responsavel)
      : [...filtros.responsaveis, responsavel];
    
    onFiltrosChange({
      ...filtros,
      responsaveis: novosResponsaveis,
    });
  };

  const handleSelecionarTodosTiposTarefa = () => {
    const todosSelecionados = tiposTarefa.every((tipo) => filtros.tiposTarefa.includes(tipo));
    
    onFiltrosChange({
      ...filtros,
      tiposTarefa: todosSelecionados ? [] : [...tiposTarefa],
    });
  };

  const handleSelecionarTodosResponsaveis = () => {
    const todosSelecionados = responsaveis.every((r) => filtros.responsaveis.includes(r));
    
    onFiltrosChange({
      ...filtros,
      responsaveis: todosSelecionados ? [] : [...responsaveis],
    });
  };

  const todosTiposTarefaSelecionados = tiposTarefa.length > 0 && tiposTarefa.every((tipo) => filtros.tiposTarefa.includes(tipo));
  const todosResponsaveisSelecionados = responsaveis.length > 0 && responsaveis.every((r) => filtros.responsaveis.includes(r));

  const formatarDataParaInput = (data: Date | null): string => {
    if (!data) return '';
    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const dia = String(data.getDate()).padStart(2, '0');
    return `${ano}-${mes}-${dia}`;
  };

  return (
    <div className="filtros-container">
      <h2>Filtros</h2>
      
      <div className="filtro-grupo">
        <label>Período</label>
        <div className="date-inputs">
          <div>
            <label htmlFor="data-inicio">De:</label>
            <input
              id="data-inicio"
              type="date"
              value={formatarDataParaInput(filtros.periodo.inicio)}
              onChange={handlePeriodoInicio}
            />
          </div>
          <div>
            <label htmlFor="data-fim">Até:</label>
            <input
              id="data-fim"
              type="date"
              value={formatarDataParaInput(filtros.periodo.fim)}
              onChange={handlePeriodoFim}
            />
          </div>
        </div>
      </div>

      <div className="filtro-grupo">
        <label>Tipo de Tarefa</label>
        <div className="checkbox-group">
          <label className="checkbox-label selecionar-todos">
            <input
              type="checkbox"
              checked={todosTiposTarefaSelecionados}
              onChange={handleSelecionarTodosTiposTarefa}
            />
            <span className="selecionar-todos-text">Selecionar todos</span>
          </label>
          <div className="checkbox-divider"></div>
          {tiposTarefa.map((tipo) => (
            <label key={tipo} className="checkbox-label">
              <input
                type="checkbox"
                checked={filtros.tiposTarefa.includes(tipo)}
                onChange={() => handleTipoTarefa(tipo)}
              />
              <span>{tipo}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="filtro-grupo">
        <label>Responsável</label>
        <div className="checkbox-group">
          <label className="checkbox-label selecionar-todos">
            <input
              type="checkbox"
              checked={todosResponsaveisSelecionados}
              onChange={handleSelecionarTodosResponsaveis}
            />
            <span className="selecionar-todos-text">Selecionar todos</span>
          </label>
          <div className="checkbox-divider"></div>
          {responsaveis.map((responsavel) => (
            <label key={responsavel} className="checkbox-label">
              <input
                type="checkbox"
                checked={filtros.responsaveis.includes(responsavel)}
                onChange={() => handleResponsavel(responsavel)}
              />
              <span>{responsavel}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
