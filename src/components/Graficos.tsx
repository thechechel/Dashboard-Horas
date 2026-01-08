import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { RegistroHoras } from '../types';
import { processarDadosParaGrafico } from '../utils/dataProcessor';
import './Graficos.css';

interface GraficosProps {
  dados: RegistroHoras[];
}

const CORES = ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#00f2fe', '#43e97b', '#fa709a', '#fee140'];

export default function Graficos({ dados }: GraficosProps) {
  const dadosProcessados = processarDadosParaGrafico(dados);

  // Preparar dados para gráfico de barras agrupadas
  const responsaveis = Object.keys(dadosProcessados);
  const tiposTarefa = Array.from(
    new Set(
      Object.values(dadosProcessados).flatMap((tarefas) => Object.keys(tarefas))
    )
  ).sort();

  const dadosGraficoBarras = tiposTarefa.map((tipo) => {
    const item: any = { tipoTarefa: tipo };
    responsaveis.forEach((responsavel) => {
      item[responsavel] = dadosProcessados[responsavel]?.[tipo] || 0;
    });
    return item;
  });

  // Preparar dados para gráfico de pizza por responsável
  const dadosGraficoPizza = responsaveis.map((responsavel) => {
    const total = Object.values(dadosProcessados[responsavel] || {}).reduce(
      (sum, horas) => sum + horas,
      0
    );
    return { name: responsavel, value: total };
  });

  // Preparar dados para gráfico de barras horizontais (horas totais por responsável)
  const dadosGraficoBarrasHorizontais = responsaveis.map((responsavel) => {
    const total = Object.values(dadosProcessados[responsavel] || {}).reduce(
      (sum, horas) => sum + horas,
      0
    );
    return { responsavel, horas: total };
  });

  // Preparar dados para gráfico de barras horizontais (horas totais por tipo de tarefa)
  const dadosGraficoBarrasHorizontaisTarefa = tiposTarefa.map((tipo) => {
    const total = responsaveis.reduce((sum, responsavel) => {
      return sum + (dadosProcessados[responsavel]?.[tipo] || 0);
    }, 0);
    return { tipoTarefa: tipo, horas: total };
  }).sort((a, b) => b.horas - a.horas); // Ordenar por horas (maior para menor)

  return (
    <div className="graficos-container">
      <h2>Visualizações</h2>

      <div className="graficos-grid">
        {/* Gráfico de barras agrupadas - Horas por tipo de tarefa e responsável */}
        <div className="grafico-card">
          <h3>Horas por Tipo de Tarefa e Responsável</h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={dadosGraficoBarras}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="tipoTarefa"
                angle={-45}
                textAnchor="end"
                height={120}
                interval={0}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              {responsaveis.map((responsavel, index) => (
                <Bar
                  key={responsavel}
                  dataKey={responsavel}
                  fill={CORES[index % CORES.length]}
                  name={responsavel}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfico de pizza - Distribuição de horas por responsável */}
        <div className="grafico-card">
          <h3>Distribuição de Horas por Responsável</h3>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={dadosGraficoPizza}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {dadosGraficoPizza.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={CORES[index % CORES.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfico de barras horizontais - Total de horas por responsável */}
        <div className="grafico-card">
          <h3>Total de Horas por Responsável</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dadosGraficoBarrasHorizontais} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="responsavel" type="category" width={100} />
              <Tooltip />
              <Bar dataKey="horas" fill="#667eea" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfico de barras horizontais - Total de horas por tipo de tarefa */}
        <div className="grafico-card">
          <h3>Total de Horas por Tarefa</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dadosGraficoBarrasHorizontaisTarefa} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="tipoTarefa" type="category" width={150} />
              <Tooltip />
              <Bar dataKey="horas" fill="#764ba2" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Tabela detalhada */}
        <div className="grafico-card">
          <h3>Detalhamento por Responsável e Tarefa</h3>
          <div className="tabela-container">
            <table className="tabela-detalhes">
              <thead>
                <tr>
                  <th>Responsável</th>
                  <th>Tipo de Tarefa</th>
                  <th>Horas</th>
                </tr>
              </thead>
              <tbody>
                {responsaveis.map((responsavel) =>
                  tiposTarefa
                    .filter((tipo) => dadosProcessados[responsavel]?.[tipo])
                    .map((tipo) => (
                      <tr key={`${responsavel}-${tipo}`}>
                        <td>{responsavel}</td>
                        <td>{tipo}</td>
                        <td>{dadosProcessados[responsavel][tipo].toFixed(2)}h</td>
                      </tr>
                    ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
