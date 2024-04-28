import Form from '@/app/ui/tickets/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
// import { fetchCustomers } from '@/app/lib/data';
 
export default async function Page() {
//   const customers = await fetchCustomers();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Vender', href: '/dashboard/vender' },
          {
            label: 'Agregar Ticket',
            href: '/dashboard/vender/ticket',
            active: true,
          },
        ]}
      />
      <Form href_cancel='/dashboard/vender' origen='venta'/>
    </main>
  );
}