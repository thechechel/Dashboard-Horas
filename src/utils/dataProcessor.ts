import { RegistroHoras, Filtros } from '../types';
import { isAfter, isBefore, startOfDay, endOfDay } from 'date-fns';

export function filtrarDados(dados: RegistroHoras[], filtros: Filtros): RegistroHoras[] {
  return dados.filter((registro) => {
    // Filtro de período
    if (filtros.periodo.inicio) {
      const inicio = startOfDay(filtros.periodo.inicio);
      if (isBefore(registro.data, inicio)) return false;
    }
    if (filtros.periodo.fim) {
      const fim = endOfDay(filtros.periodo.fim);
      if (isAfter(registro.data, fim)) return false;
    }

    // Filtro de tipo de tarefa
    if (filtros.tiposTarefa.length > 0) {
      if (!filtros.tiposTarefa.includes(registro.tipoTarefa)) return false;
    }

    // Filtro de responsável
    if (filtros.responsaveis.length > 0) {
      if (!filtros.responsaveis.includes(registro.responsavel)) return false;
    }

    return true;
  });
}

export function processarDadosParaGrafico(dados: RegistroHoras[]) {
  const agrupado: Record<string, Record<string, number>> = {};

  dados.forEach((registro) => {
    if (!agrupado[registro.responsavel]) {
      agrupado[registro.responsavel] = {};
    }
    if (!agrupado[registro.responsavel][registro.tipoTarefa]) {
      agrupado[registro.responsavel][registro.tipoTarefa] = 0;
    }
    agrupado[registro.responsavel][registro.tipoTarefa] += registro.horas;
  });

  return agrupado;
}

export function obterTiposTarefaUnicos(dados: RegistroHoras[]): string[] {
  return Array.from(new Set(dados.map((d) => d.tipoTarefa))).sort();
}

export function obterResponsaveisUnicos(dados: RegistroHoras[]): string[] {
  return Array.from(new Set(dados.map((d) => d.responsavel))).sort();
}
