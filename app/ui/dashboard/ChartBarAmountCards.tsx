"use client"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


export function ChartBarAmountCards({totalEfectivo, totalYape}:{totalEfectivo: number, totalYape:number}) {

  console.log((totalEfectivo/100).toLocaleString("en-US", { minimumFractionDigits: 2 }) )

    const data = {
        labels: ["Monto"],
        datasets: [
          {
            label: "Efectivo",
            // data: [formatCurrency(totalEfectivo)],
            data: [(totalEfectivo/100).toLocaleString("en-US", { minimumFractionDigits: 2 })  ],
            // backgroundColor: "rgba(54, 162, 235, 0.7)",
            backgroundColor:"#1c9f14"
            
          },
          
          {
            label: "Yape",
            data: [(totalYape/100).toLocaleString("en-US", { minimumFractionDigits: 2 }) ],
            // backgroundColor: "rgba(255, 99, 132, 0.7)",
            backgroundColor:"#8033ff"
          },
        ],
      };

      // Opciones de configuración del gráfico
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Recaudación",
      },
    },
  };

  return (
    <Bar data={data} options={options} />
  )
}
