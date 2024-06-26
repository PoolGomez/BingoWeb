import { Card } from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';
import { fetchRevenue,fetchLatestInvoices, fetchCardsData } from '@/app/lib/data';
import { Suspense } from 'react';
import { RevenueChartSkeleton ,LatestInvoicesSkeleton, CardsSkeleton,} from '@/app/ui/skeletons';
import CardWrapper from '@/app/ui/dashboard/cards';
import TicketWrapper from '../ui/dashboard/tickets';

export default async function Page() {
  // const revenue = await fetchRevenue();
  // const latestInvoices = await fetchLatestInvoices();
  // const {
  //   numberOfCards,
  //   // numberOfCustomers,
  //   totalPaidCards,
  //   totalPendingCards,
  // } = await fetchCardsData();
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        BINGOS
      </h1>
      <div className="grid gap-6 sm:grid-cols-3 lg:grid-cols-6">
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
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        {/* <RevenueChart revenue={revenue}  /> */}

        {/* <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense> */}

        {/* <LatestInvoices latestInvoices={latestInvoices} /> */}

        {/* <Suspense fallback={<LatestInvoicesSkeleton />}>
          <LatestInvoices />
        </Suspense> */}
      </div>

      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        TICKETS
      </h1>
      <div className="grid gap-6 sm:grid-cols-3 lg:grid-cols-6">
        <Suspense fallback={<CardsSkeleton />}>
          <TicketWrapper />
        </Suspense>

        
        
      </div>

    </main>
  );
}