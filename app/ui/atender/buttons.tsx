'use client';

import { atenderTicket } from "@/app/lib/actions";
import Link from "next/link";
import { FaPlus } from "react-icons/fa6";
import Swal from "sweetalert2";
import { CiDeliveryTruck } from "react-icons/ci";

export function AtenderTicket({ id }: { id: string }) {
    const atenderTicketWithId = atenderTicket.bind(null, id);
    function testatenderticket(){
      Swal.fire({
        title: "Atender",
        text: "¿Esta seguro que desea atender este ticket?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Confirmar",
        cancelButtonText: "Cancelar"
      }).then( (result) => {
        if (result.isConfirmed) {
           
          Swal.fire({
            title: "Atendido!",
            text: "El ticket fue atendido",
            icon: "success"
          });
          
          atenderTicketWithId();
        }
      });
    }
  
    return (
      <form action={testatenderticket}>
        <button className="flex gap-2 items-center rounded-md border p-2 bg-blue-500">
          <span className="sr-only">Atender</span>
          <span className="text-white">Atender</span>
          <CiDeliveryTruck className=" text-white" />
        </button>
      </form>
    );
}
