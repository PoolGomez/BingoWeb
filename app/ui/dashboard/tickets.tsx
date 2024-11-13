
import { HiOutlineUserGroup } from "react-icons/hi2";
import { FaRegClock } from "react-icons/fa";
import { HiOutlineBanknotes } from "react-icons/hi2";
import { PiCards } from "react-icons/pi";

import { lusitana } from '@/app/ui/fonts';
import { fetchTicketsData } from '@/app/lib/data';

const iconMap = {
  collected: HiOutlineBanknotes,
  customers: HiOutlineUserGroup,
  pending: FaRegClock,
  invoices: PiCards,
};

export default async function TicketWrapper() {
  const {
    numberOfTickets,
    numberOfTicketsPaid,
    numberOfTicketsPending,
    totalPaidTickets,
    totalPendingTickets,
    totalTickets
  } = await fetchTicketsData();

  return (
    <>
      {/* NOTE: comment in this code when you get to this point in the course */}

      {/* <Ticket fondo="blue-500" texto="white" color_icono='white' title="Total" value={totalTickets} type="invoices" /> */}
      <Ticket fondo="green-500" texto="white" color_icono='white' title="Recolectado" value={totalPaidTickets} type="collected" />
      <Ticket fondo="red-500" texto="white" color_icono='white' title="Pendiente" value={totalPendingTickets} type="pending" />
      {/* <Ticket fondo="blue-500" texto="white" color_icono='white' title="Total Tickets" value={numberOfTickets} type="invoices" /> */}
      <Ticket fondo="green-500" texto="white" color_icono='white' title="Pagados" value={numberOfTicketsPaid} type="collected" />
      <Ticket fondo="red-500" texto="white" color_icono='white' title="Pendientes" value={numberOfTicketsPending} type="pending" />
      {/* <Card
        title="Total Customers"
        value={numberOfCustomers}
        type="customers"
      /> */}
    </>
  );
}

export function Ticket({
  fondo,
  texto,
  color_icono,
  title,
  value,
  type,
}: {
  fondo: string;
  texto: string;
  color_icono: string;
  title: string;
  value: number | string;
  type: 'invoices' | 'customers' | 'pending' | 'collected';
}) {
  const Icon = iconMap[type];

  return (
    <div className={`rounded-xl bg-${fondo} p-2 shadow-sm`}>
      <div className="flex p-4">
        {Icon ? <Icon className={`h-5 w-5 text-${color_icono}`} /> : null}
        <h3 className={`ml-2 text-sm font-medium text-${texto}`}>{title}</h3>
      </div>
      <p
        className={`${lusitana.className}
          truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
      >
        {value}
      </p>
    </div>
  );
}
