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


export function ChartBarCountCards({totalPagadas, totalPendiente}:{totalPagadas: number, totalPendiente:number}) {

    // const {
    //     amountCardTotalEfectivo,
    //     amountCardTotalYape
    //   } = await fetchCardsObservationDataChartBar();


    const data = {
        labels: ["Cantidad"],
        datasets: [
          {
            label: "Pagado",
            // data: [formatCurrency(totalEfectivo)],
            data: [totalPagadas],
            // backgroundColor: "rgba(54, 162, 235, 0.7)",
            backgroundColor:"#1c9f14"
          },
          
          {
            label: "Pendiente",
            data: [totalPendiente],
            // backgroundColor: "rgba(255, 99, 132, 0.7)",
            backgroundColor:"#f73a48"
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
        text: "Tarjetas Vendidas",
      },
    },
  };

  return (
    <Bar data={data} options={options} />
  )
}
