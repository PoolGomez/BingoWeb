'use client';

import { TicketForm } from '@/app/lib/definitions';

import { GrCurrency } from "react-icons/gr";
import { FaCheck } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa";
import { IoTicketOutline } from "react-icons/io5";
import { HiOutlineChatBubbleLeftEllipsis } from "react-icons/hi2";
import { GoTag } from "react-icons/go";


import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updateTicket } from '@/app/lib/actions';
import { useFormState } from 'react-dom';


export default function EditTicketForm({
  ticket
}: {
  ticket: TicketForm;
}) {
  const initialState = { message: null, errors: {} };
  const updateTicketWithId = updateTicket.bind(null, ticket.id);
  const [state, dispatch] = useFormState(updateTicketWithId, initialState);
  
  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">

        {/* Card Number */}
        <div className="mb-4">
          <label htmlFor="number" className="mb-2 block text-sm font-medium">
            Número
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="number"
                name="number"
                type="number"
                // step="0.01"
                placeholder="Ingrese el numero"
                defaultValue={ticket.number}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                // required
                aria-describedby="number-error"
              />
              
              <IoTicketOutline className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="number-error" aria-live="polite" aria-atomic="true">
              {state.errors?.number &&
                state.errors.number.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

        {/* Card Names */}
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Nombre
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="name"
                name="name"
                type="text"
                // step="0.01"
                placeholder="Ingrese el nombre"
                defaultValue={ticket.name}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                // required
                aria-describedby="name-error"
              />
              
              <GoTag className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="name-error" aria-live="polite" aria-atomic="true">
              {state.errors?.name &&
                state.errors.name.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>


        {/* Invoice Amount */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Monto
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="amount"
                name="amount"
                type="number"
                step="0.01"
                defaultValue={ticket.amount}
                placeholder="Enter USD amount"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <GrCurrency className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Invoice description */}
        <div className="mb-4">
          <label htmlFor="description" className="mb-2 block text-sm font-medium">
          Descripción
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <textarea
                id="description"
                name="description"
                // type="text_area"
                // step="0.01"
                placeholder="Ingrese una description"
                defaultValue={ticket.description}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                // required
                aria-describedby="description-error"
              />
              <HiOutlineChatBubbleLeftEllipsis  className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="description-error" aria-live="polite" aria-atomic="true">
              {state.errors?.description &&
                state.errors.description.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

        {/* Ticket Status */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Estado de Pago
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="pendiente"
                  name="status"
                  type="radio"
                  value="pendiente"
                  defaultChecked={ticket.status === 'pendiente'}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="pendiente"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-red-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  PENDIENTE <FaRegClock className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="pagado"
                  name="status"
                  type="radio"
                  value="pagado"
                  defaultChecked={ticket.status === 'pagado'}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="pagado"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  PAGADO <FaCheck className="h-4 w-4" />
                </label>
              </div>

              

            </div>
          </div>
        </fieldset>

        {/* Ticket Status 2 */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Estado de Atención
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="pendiente"
                  name="status2"
                  type="radio"
                  value="pendiente"
                  defaultChecked={ticket.status2 === 'pendiente'}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="pendiente"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-red-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  PENDIENTE <FaRegClock className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="atendido"
                  name="status2"
                  type="radio"
                  value="atendido"
                  defaultChecked={ticket.status2 === 'atendido'}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="atendido"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-blue-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  ATENDIDO <FaCheck className="h-4 w-4" />
                </label>
              </div>

              

            </div>
          </div>
        </fieldset>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/tickets"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancelar
        </Link>
        <Button type="submit">Editar Ticket</Button>
      </div>
    </form>
  );
}
