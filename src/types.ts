export interface RegistroHoras {
  responsavel: string;
  tipoTarefa: string;
  tempoMinutos: number;
  horas: number;
  data: Date;
}

export interface Filtros {
  periodo: {
    inicio: Date | null;
    fim: Date | null;
  };
  tiposTarefa: string[];
  responsaveis: string[];
}
