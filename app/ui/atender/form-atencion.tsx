'use client';
import Link from 'next/link';

import { FaCheck } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa";
import { GrCurrency } from "react-icons/gr";
import { IoTicketOutline } from "react-icons/io5";
import { HiOutlineChatBubbleLeftEllipsis } from "react-icons/hi2";
import { GoTag } from "react-icons/go";

import { Button } from '@/app/ui/button';
// import { createTicket } from '@/app/lib/actions';
import { useFormState } from 'react-dom';
import { createTicket } from '@/app/lib/actions';


export default function Form() {
  const initialState = { message: null, errors: {}};
  const [state, dispatch] = useFormState(createTicket, initialState);


  return (
    <form action={dispatch} >
      {/* <input type='hidden' id='origin' name='origin' value={origen} /> */}
      <div className="rounded-md bg-gray-50 p-2 md:p-6">
        {/* Card Number */}
        <div className="mb-4">
          <label htmlFor="number" className="mb-2 block text-sm font-medium">
            Atención de Ticket
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="number"
                name="number"
                type="number"
                // step="0.01"
                placeholder="Ingrese el numero del ticket"
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


        {/* Ticket Status */}
        {/* <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Elije un estado
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="pendiente"
                  name="status"
                  type="radio"
                  value="pendiente"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  // required
                  aria-describedby="status-error"
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
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  // required
                  aria-describedby="status-error"
                />
                <label
                  htmlFor="pagado"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  PAGADO <FaCheck className="h-4 w-4" />
                </label>
              </div>

             

            </div>

            <div id="status-error" aria-live="polite" aria-atomic="true">
              {state.errors?.status &&
                state.errors.status.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>

          </div>
        </fieldset> */}

        

      </div>
      <div className="mt-6 flex justify-center gap-4 align-middle">
        {/* <Link
          href={href_cancel}
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancelar
        </Link> */}
        <Button type="submit">Entregar</Button>
        {/* <button className='flex h-10 items-center rounded-lg bg-blue-500 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50'>Entre</button> */}
      </div>
    </form>
  );
}
