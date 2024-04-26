import { logout } from '@/app/lib/actions';
// import { signOut } from '@/auth';
import { FaPowerOff } from "react-icons/fa";
import React from 'react'

const Logout = () => {
  return (
    <form
            action={logout}
          >
            <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
              <FaPowerOff className="w-6" />
              <div>Cerrar Sesion</div>
            </button>
          </form>
  )
}

export default Logout