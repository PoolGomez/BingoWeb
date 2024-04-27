'use client';
import Link from 'next/link';

import { FaCheck } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa";
import { GrCurrency } from "react-icons/gr";
import { IoTicketOutline } from "react-icons/io5";
import { HiOutlineChatBubbleLeftEllipsis } from "react-icons/hi2";
import { GoTag } from "react-icons/go";

import { Button } from '@/app/ui/button';
import { createCard } from '@/app/lib/actions';
import { useFormState } from 'react-dom';
import { useState } from 'react';
import TagButton from './tag-button';
import TagButtonText from './tag-button-text';

export default function Form() {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createCard, initialState);

  //tag-button-amount
  const [inputValue, setInputValue] = useState<string>('');
  const handleTagClick = (tagText: string) => {
    setInputValue(tagText);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };


  // tag-button-text
  const [inputValueDescription, setInputValueDescription] = useState<string>('');
  const handleTagClickDescription = (tagText: string) => {
    setInputValueDescription(tagText);
  };
  const handleInputChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValueDescription(e.target.value);
  };

  return (
    <form action={dispatch} >
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
            Nombres
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="name"
                name="name"
                type="text"
                // step="0.01"
                placeholder="Ingrese los nombres"
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
                // step="0.01"
                placeholder="Ingrese un monto"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                // required
                aria-describedby="amount-error"

                value={inputValue}
                onChange={handleInputChange}
              />
              <GrCurrency className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="amount-error" aria-live="polite" aria-atomic="true">
              {state.errors?.amount &&
                state.errors.amount.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

        <div className='flex mb-4'>
          <div className='px-2'>
            <TagButton tagText="S/1.50" tagValue='1.50' onClick={handleTagClick} />
          </div>
          <div className='px-2'>
            <TagButton tagText="S/2.00" tagValue='2.00' onClick={handleTagClick} />
          </div>
          <div className='px-2'>
            <TagButton tagText="S/3.00" tagValue='3.00' onClick={handleTagClick} />
          </div>
        </div>

        {/* Invoice Observation */}
        <div className="mb-4">
          <label htmlFor="observation" className="mb-2 block text-sm font-medium">
            Observación
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="observation"
                name="observation"
                // type="text_area"
                // step="0.01"
                placeholder="Ingrese una observación"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                // required
                aria-describedby="observation-error"

                value={inputValueDescription}
                onChange={handleInputChangeDescription}

              />
              <HiOutlineChatBubbleLeftEllipsis  className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="observation-error" aria-live="polite" aria-atomic="true">
              {state.errors?.observation &&
                state.errors.observation.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

        <div className='flex mb-4'>
          <div className='px-2'>
            <TagButton tagText="Yape" tagValue='Yape' onClick={handleTagClickDescription} />
          </div>
          <div className='px-2'>
            <TagButton tagText="Efectivo" tagValue='Efectivo' onClick={handleTagClickDescription} />
          </div>
          <div className='px-2'>
            <TagButton tagText="Borrar" tagValue='' onClick={handleTagClickDescription} />
          </div>
        </div>

        {/* Invoice Status */}
        <fieldset>
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
                  Pendiente <FaRegClock className="h-4 w-4" />
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
                  Pagado <FaCheck className="h-4 w-4" />
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
        </fieldset>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/cards"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancelar
        </Link>
        <Button type="submit">Agregar Tarjeta</Button>
      </div>
    </form>
  );
}
