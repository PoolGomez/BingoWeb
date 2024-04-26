import React, { Suspense } from 'react'
import { lusitana } from "@/app/ui/fonts";
import Search from '@/app/ui/search';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { fetchTicketsPages } from '@/app/lib/data';
import Table from '@/app/ui/tickets/table';
import Pagination from '@/app/ui/tickets/pagination';
import { CreateTicket } from '@/app/ui/tickets/buttons';

export default async function TicketsPage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}){

  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchTicketsPages(query);

  return (
    <div className="w-full">
        <div className="flex w-full items-center justify-between">
          <h1 className={`${lusitana.className} text-2xl`}>Tickets</h1>
        </div>
        <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
          <Search placeholder="Buscar tickets..." />
          <CreateTicket />
        </div>

        <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
          <Table query={query} currentPage={currentPage} />
        </Suspense>

        <div className="mt-5 flex w-full justify-center">
          <Pagination totalPages={totalPages} />
        </div>
    </div>
  )
}
