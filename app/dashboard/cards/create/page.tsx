import Form from '@/app/ui/cards/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
// import { fetchCustomers } from '@/app/lib/data';
 
export default async function Page() {
//   const customers = await fetchCustomers();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Tarjetas', href: '/dashboard/cards' },
          {
            label: 'Agregar Tarjeta',
            href: '/dashboard/cards/create',
            active: true,
          },
        ]}
      />
      {/* <div className='flex items-center justify-center'> */}
          <Form href_cancel='/dashboard/cards' origen='create'
          //   customers={customers} 
          />
      {/* </div> */}
      
    
    </main>
  );
}