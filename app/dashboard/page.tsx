import { Card } from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';
import { fetchRevenue,fetchLatestInvoices, fetchCardsData, fetchCardsObservationDataChartBar, fetchTicketsDataChartBar } from '@/app/lib/data';
import { Suspense } from 'react';
import { RevenueChartSkeleton ,LatestInvoicesSkeleton, CardsSkeleton,} from '@/app/ui/skeletons';
import CardWrapper from '@/app/ui/dashboard/cards';
import TicketWrapper from '../ui/dashboard/tickets';
import { ChartBarAmountCards } from '../ui/dashboard/ChartBarAmountCards';
import { ChartBarCountCards } from '../ui/dashboard/ChartBarCountCards';

export default async function Page() {
  // const revenue = await fetchRevenue();
  // const latestInvoices = await fetchLatestInvoices();
  // const {
  //   numberOfCards,
  //   // numberOfCustomers,
  //   totalPaidCards,
  //   totalPendingCards,
  // } = await fetchCardsData();

  const {
    amountCardTotalEfectivo,
    amountCardTotalYape,
    countCardPagados,
    countCardPendientes
  } = await fetchCardsObservationDataChartBar();

  const {
    amountTicketTotalEfectivo,
    amountTicketTotalYape,
    countTicketPagados,
    countTicketPendientes,
  } = await fetchTicketsDataChartBar();



  return (
    // <main>
      <div className="h-full p-4">
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        BINGOS
      </h1>
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4 p-2">
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>

        
        {/* <Card title="Collected" value={totalPaidInvoices} type="collected" />
        <Card title="Pending" value={totalPendingInvoices} type="pending" />
        <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
        <Card
          title="Total Customers"
          value={numberOfCustomers}
          type="customers"
        /> */}
      </div>

      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2 p-2">

        <div className='border rounded-lg'>
          <ChartBarAmountCards totalEfectivo={amountCardTotalEfectivo} totalYape={amountCardTotalYape}/>
        </div>

        <div className='border rounded-lg'>
          <ChartBarCountCards totalPagadas={countCardPagados} totalPendiente={countCardPendientes} />
        </div>
        
        
        

        {/* <div className='w-full'>
        <ChartBarCards totalEfectivo={amountCardTotalEfectivo} totalYape={amountCardTotalYape}/>
        </div> */}







      </div>

      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        TICKETS
      </h1>
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4 p-2">
        <Suspense fallback={<CardsSkeleton />}>
          <TicketWrapper />
        </Suspense>

        
        
      </div>

      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2 p-2">

          <div className='border rounded-lg'>
            <ChartBarAmountCards totalEfectivo={amountTicketTotalEfectivo} totalYape={amountTicketTotalYape}/>
          </div>

          <div className='border rounded-lg'>
            <ChartBarCountCards totalPagadas={countTicketPagados} totalPendiente={countTicketPendientes} />
          </div>
      </div>

      </div>
    // </main>
  );
}