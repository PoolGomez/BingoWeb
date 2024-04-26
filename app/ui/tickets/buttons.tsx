'use client';
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { FaPlus } from "react-icons/fa6";
import { FaRegTrashCan } from "react-icons/fa6";


import Link from 'next/link';
import { deleteTicket } from '@/app/lib/actions';
import Swal from 'sweetalert2'

export function CreateTicket() {
  return (
    <Link
      href="/dashboard/tickets/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Agregar Ticket</span>{' '}
      <FaPlus className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateTicket({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/tickets/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <HiOutlinePencilSquare className="w-5" />
    </Link>
  );
}

export function DeleteTicket({ id }: { id: string }) {
  const deleteTicketWithId = deleteTicket.bind(null, id);
  function testdeletecat(){
    Swal.fire({
      title: "Eliminar",
      text: "¿Esta seguro que desea eliminar este elemento?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar"
    }).then( (result) => {
      if (result.isConfirmed) {
         
        Swal.fire({
          title: "Eliminado!",
          text: "El elemento fue eliminado",
          icon: "success"
        });
        
        deleteTicketWithId();
      }
    });
  }

  return (
    <form action={testdeletecat}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Borrar</span>
        <FaRegTrashCan className="w-4" />
      </button>
    </form>
  );
}
