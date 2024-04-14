import Form from '@/app/ui/cards/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchCardById } from '@/app/lib/data';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const [card] = await Promise.all([
        fetchCardById(id)
      ]);
    if (!card) {
    notFound();
    }
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Tarjetas', href: '/dashboard/cards' },
          {
            label: 'Editar Tarjeta',
            href: `/dashboard/cards/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form card={card} />
    </main>
  );
}