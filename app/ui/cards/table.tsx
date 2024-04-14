import { UpdateInvoice, DeleteInvoice } from '@/app/ui/invoices/buttons';
import InvoiceStatus from '@/app/ui/invoices/status';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchFilteredCards } from '@/app/lib/data';
import CardStatus from './status';
import { DeleteCard, UpdateCard } from './buttons';

export default async function CardsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const cards = await fetchFilteredCards(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-600 p-2 md:pt-0">
          <div className="md:hidden">
            {cards?.map((invoice) => (
              <div
                key={invoice.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      {/* <Image
                        src={invoice.image_url}
                        className="mr-2 rounded-full"
                        width={28}
                        height={28}
                        alt={`${invoice.name}'s profile picture`}
                      /> */}
                      <p>{invoice.number}</p>
                    </div>
                    <p className="text-sm text-gray-500">{invoice.name}</p>
                  </div>
                  <CardStatus status={invoice.status} />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {formatCurrency(invoice.amount)}
                    </p>
                    <p>{invoice.observation}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateCard id={invoice.id} />
                    <DeleteCard id={invoice.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6 text-white">
                  Numero
                </th>
                <th scope="col" className="px-5 py-5 font-medium text-white">
                  Nombres
                </th>
                <th scope="col" className="px-3 py-5 font-medium text-white">
                  Monto
                </th>
                <th scope="col" className="px-5 py-5 font-medium text-white">
                  Observacion
                </th>
                <th scope="col" className="px-3 py-5 font-medium text-white">
                  Estado
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Editar</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {cards?.map((invoice) => (
                <tr
                  key={invoice.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      {/* <Image
                        src={invoice.image_url}
                        className="rounded-full"
                        width={28}
                        height={28}
                        alt={`${invoice.name}'s profile picture`}
                      /> */}
                      <p>{invoice.number}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-5 py-3">
                    {invoice.name}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatCurrency(invoice.amount)}
                  </td>
                  <td className="whitespace-nowrap px-5 py-4">
                    {/* {formatDateToLocal(invoice.date)} */}
                      {invoice.observation}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <CardStatus status={invoice.status} />
                  </td>
                  
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateCard id={invoice.id} />
                      <DeleteCard id={invoice.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
