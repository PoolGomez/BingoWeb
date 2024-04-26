import Form from '@/app/ui/tickets/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
// import { fetchCustomers } from '@/app/lib/data';
 
export default async function Page() {
//   const customers = await fetchCustomers();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Tickets', href: '/dashboard/tickets' },
          {
            label: 'Agregar Ticket',
            href: '/dashboard/tickets/create',
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}