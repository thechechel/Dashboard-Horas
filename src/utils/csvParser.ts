import Papa from 'papaparse';
import { RegistroHoras } from '../types';
import { parse, isValid } from 'date-fns';

export async function parseCSV(file: File): Promise<RegistroHoras[]> {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        try {
          const registros: RegistroHoras[] = results.data
            .map((row: any) => {
              try {
                // Converter horas de formato brasileiro (0,5) para decimal (0.5)
                const horasStr = row.Horas?.replace(',', '.') || '0';
                const horas = parseFloat(horasStr) || 0;

                // Converter data de DD/MM/YYYY para Date
                const data = parse(row.Data, 'dd/MM/yyyy', new Date());
                
                // Verificar se a data é válida
                if (!isValid(data)) {
                  return null;
                }

                return {
                  responsavel: row.Responsável?.trim() || '',
                  tipoTarefa: row['Tipo de tarefa']?.trim() || '',
                  tempoMinutos: parseInt(row['Tempo da tarefa em minutos']) || 0,
                  horas: horas,
                  data: data,
                };
              } catch (error) {
                console.warn('Erro ao processar linha:', row, error);
                return null;
              }
            })
            .filter((r: RegistroHoras | null): r is RegistroHoras => 
              r !== null && r.responsavel && r.tipoTarefa
            );

          resolve(registros);
        } catch (error) {
          reject(error);
        }
      },
      error: (error) => reject(error),
    });
  });
}
