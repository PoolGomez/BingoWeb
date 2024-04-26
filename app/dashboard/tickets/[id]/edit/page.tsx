import Form from '@/app/ui/tickets/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchTicketById } from '@/app/lib/data';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const [ticket] = await Promise.all([
      fetchTicketById(id)
      ]);
    if (!ticket) {
    notFound();
    }
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Tickets', href: '/dashboard/tickets' },
          {
            label: 'Editar Ticket',
            href: `/dashboard/tickets/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form ticket={ticket} />
    </main>
  );
}