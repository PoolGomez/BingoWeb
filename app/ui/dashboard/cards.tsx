import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
} from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import { fetchCardsData } from '@/app/lib/data';

const iconMap = {
  collected: BanknotesIcon,
  customers: UserGroupIcon,
  pending: ClockIcon,
  invoices: InboxIcon,
};

export default async function CardWrapper() {
  const {
    numberOfCards,
    numberOfCardsPaid,
    numberOfCardsPending,
    totalPaidCards,
    totalPendingCards,
  } = await fetchCardsData();

  return (
    <>
      {/* NOTE: comment in this code when you get to this point in the course */}

      <Card fondo="green-500" texto="white" color_icono='white' title="Recolectado" value={totalPaidCards} type="collected" />
      <Card fondo="red-500" texto="white" color_icono='white' title="Pendiente" value={totalPendingCards} type="pending" />
      <Card fondo="blue-500" texto="white" color_icono='white' title="Total Tajetas" value={numberOfCards} type="invoices" />
      <Card fondo="green-500" texto="white" color_icono='white' title="Tarjetas Pagadas" value={numberOfCardsPaid} type="collected" />
      <Card fondo="red-500" texto="white" color_icono='white' title="Tarjetas Pendientes" value={numberOfCardsPending} type="pending" />
      {/* <Card
        title="Total Customers"
        value={numberOfCustomers}
        type="customers"
      /> */}
    </>
  );
}

export function Card({
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
