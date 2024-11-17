'use client';
import Link from 'next/link';

import { FaCheck } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa";
import { GrCurrency } from "react-icons/gr";
import { IoTicketOutline } from "react-icons/io5";
import { HiOutlineChatBubbleLeftEllipsis } from "react-icons/hi2";
import { GoTag } from "react-icons/go";

import { Button } from '@/app/ui/button';
import { useFormState } from 'react-dom';
import TagButton from './tag-button';
import { useState, useTransition } from 'react';
import TagButtonText from './tag-button-text';
import { createTicket } from '@/app/lib/actions';


export default function Form({href_cancel, origen}:{href_cancel:string, origen:string}) {
  const initialState = { message: null, errors: {}};
  const [state, dispatch] = useFormState(createTicket, initialState);

  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    startTransition( async()=>{

      try {
        const formData = new FormData(event.currentTarget);
        dispatch(formData);
       
      } catch (error) {
        console.log(error)
      }
      
      

    })
  }
  

  const [inputValue, setInputValue] = useState<string>('');
  const handleTagClick = (tagText: string) => {
    setInputValue(tagText);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const [descripionInputValue, descriptionSetInputValue] = useState<string>('');
  const handleTagDescriptionClick = (tagText: string, isActive: boolean) => {
    if(isActive){
      // descriptionSetInputValue(descripionInputValue + tagText + '');
      if(descripionInputValue.includes(tagText)){
        descriptionSetInputValue(descripionInputValue.replace(tagText + ' ', ''))
      }else{
        descriptionSetInputValue(descripionInputValue + tagText + ' ');
      }
    }else{
      descriptionSetInputValue(descripionInputValue.replace(tagText + ' ',''));
    }
  };
  const handleInputChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    descriptionSetInputValue(e.target.value);
  };


  const [inputValueObservation, setInputValueObservation] = useState<string>('');
  const handleTagClickObservation = (tagText: string) => {
    setInputValueObservation(tagText);
  };
  const handleInputChangeObservation = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValueObservation(e.target.value);
  };


  return (
    <form 
    // action={dispatch}
     onSubmit={handleSubmit} >
      <input type='hidden' id='origin' name='origin' value={origen} />
      <div className="rounded-md bg-gray-50 p-2 md:p-6">
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

        <div className='grid grid-cols-4 lg:grid-cols-8 gap-1 mb-4'>
          <div className='px-2'>
            <TagButton tagText="S/1.00" tagValue='1.00' onClick={handleTagClick} />
          </div>
          <div className='px-2'>
            <TagButton tagText="S/1.50" tagValue='1.50' onClick={handleTagClick} />
          </div>
          <div className='px-2'>
            <TagButton tagText="S/2.00" tagValue='2.00' onClick={handleTagClick} />
          </div>
          <div className='px-2'>
            <TagButton tagText="S/8.00" tagValue='8.00' onClick={handleTagClick} />
          </div>
          <div className='px-2'>
            <TagButton tagText="S/10.00" tagValue='10.00' onClick={handleTagClick} />
          </div>
          <div className='px-2'>
            <TagButton tagText="S/12.00" tagValue='12.00' onClick={handleTagClick} />
          </div>
          <div className='px-2'>
            <TagButton tagText="S/13.00" tagValue='13.00' onClick={handleTagClick} />
          </div>
          <div className='px-2'>
            <TagButton tagText="S/15.00" tagValue='15.00' onClick={handleTagClick} />
          </div>
        </div>         
          
          {/* Agrega más botones de etiquetas según sea necesario */}
    
        {/* Invoice description */}
        <div className="mb-4">
          <label htmlFor="description" className="mb-2 block text-sm font-medium">
            Descripción
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <textarea
              // <input
                id="description"
                name="description"
                // type="text_area"
                // step="0.01"
                placeholder="Ingrese una descripcion"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                // required
                aria-describedby="description-error"

                value={descripionInputValue}
                // onChange={handleInputChangeDescription}
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

        {/* grid grid-cols-3 lg:grid-cols-1 grid-flow-col-dense gap-0 mb-4 */}
        <div className='grid grid-cols-4 lg:grid-cols-8  gap-1 mb-4'>
          <div className='px-1'>
            <TagButtonText tagText='+ Vaso Chicha' onClick={handleTagDescriptionClick} />
            {/* <TagButton tagText="Vaso Chicha" tagValue='Vaso Chicha' onClick={handleTagDescriptionClick} /> */}
          </div>
          <div className='px-1'>
            <TagButtonText tagText='+ Arroz Chaufa' onClick={handleTagDescriptionClick} />
            {/* <TagButton tagText="Arroz Chaufa" tagValue='Arroz Chaufa' onClick={handleTagDescriptionClick} /> */}
          </div>
          <div className='px-1'>
            <TagButtonText tagText='+ Arroz con Pollo' onClick={handleTagDescriptionClick} />
            {/* <TagButton tagText="Arroz con Pollo" tagValue='Arroz con Pollo' onClick={handleTagDescriptionClick} /> */}
          </div>
          
          <div className='px-1'>
            <TagButtonText tagText='+ Pollo al horno' onClick={handleTagDescriptionClick} />
            {/* <TagButton tagText="Ceviche" tagValue='Ceviche' onClick={handleTagDescriptionClick} /> */}
          </div>
          <div className='px-1'>
            <TagButtonText tagText='+ Papa Huancaina' onClick={handleTagDescriptionClick} />
          </div>
          <div className='px-1'>
            <TagButtonText tagText='+ Queque' onClick={handleTagDescriptionClick} />
          </div>
          <div className='px-1'>
            <TagButtonText tagText='+ Tallarin con Chanfainita' onClick={handleTagDescriptionClick} />
            {/* <TagButton tagText="Tallarin con Pollo" tagValue='Tallarin con Pollo' onClick={handleTagDescriptionClick} /> */}
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

                value={inputValueObservation}
                onChange={handleInputChangeObservation}

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
            <TagButton tagText="Yape" tagValue='Yape' onClick={handleTagClickObservation} />
          </div>
          <div className='px-2'>
            <TagButton tagText="Efectivo" tagValue='Efectivo' onClick={handleTagClickObservation} />
          </div>
          <div className='px-2'>
            <TagButton tagText="Borrar" tagValue='' onClick={handleTagClickObservation} />
          </div>
        </div>


        {/* Ticket Status */}
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
        </fieldset>

{/* 
        {state.errors &&
                state.errors.map((error: string) => ( */}
                {
                  state.message &&(
                  <p className="mt-2 text-sm text-red-500" key='sss' >
                    {state.message}
                  </p>
                  )
                }
                  
                  {/* ))}  */}
        

      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href={href_cancel}
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancelar
        </Link>
        <Button type="submit" disabled={isPending}>
          {isPending ? (
            "Agregando..."
          ):("Agregar")}
          </Button>
      </div>
    </form>
  );
}
