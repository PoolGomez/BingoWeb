"use client";
import React from "react";
// import { HiBars4 } from "react-icons/hi2";
import { FaBars } from "react-icons/fa";

import { useSideBarDrawer } from "@/app/lib/store";
import Image from "next/image";
import Link from "next/link";
// import { getSession, signIn, useSession } from "next-auth/react";
import AccountDropDown from "./AccountDropDown";


const Header = () => {

    const {onSideBarOpen} = useSideBarDrawer()
    // const { data: session } = useSession();

    
    // console.log('session:');
    // console.log(sesion);
    // console.log(session?.user);

  return (
    <header className="flex w-full py-2 px-4 md:px-12 items-center justify-between sticky top-0 z-10 bg-white border border-gray-100">
      {/* Left Area */}
      <div className="flex items-center gap-x-8">
        <button className="p-2 rounded-full bg-state-200 text-gray-500 hover:bg-green-200 hover:text-green-600"
        onClick={onSideBarOpen}
        >
          <FaBars size={28} className="cursor-pointer shrink-0" />
          {/* BAR */}
        </button>

        <button>Mistura y Bingo </button>
      </div>

      {/* Right Area  */}
      <div className="flex items-center justify-end space-x-4">
      {/* <Image src="/img/logo-ina.png" width={30} height={30} alt="logo" />
      <button className="text-xs">Iglesia Nueva Apostólica</button> */}

        {/* <Link
          href="/"
          className="relative p-2 bg-slate-200 rounded-full text-gray-500 hover:bg-green-200 hover:text-green-600"
        >
          <HiOutlineShoppingCart className="pr-1" size={28} />
          <span className="absolute top-0 right-1 font-bold text-green-600">
            0
          </span>
        </Link> */}
        
            <AccountDropDown 
            // email={session?.user?.email ?? 'sin email'} image={session?.user?.image ?? '/customers/balazs-orban.png'} name={session?.user?.name ?? 'no tiene nombre'} 
            />
          
          <Link className="hidden lg:block" href="/">
            <span className="flex items-center gap-3 text-black px-2 py-1">
              Iglesia Nueva Apostólica
              <Image className="" src="/img/logo-ina.png" width={40} height={40} alt="logo" />
            </span> 
          </Link>
           
           
        
        
      </div>
    </header>
  );
};
export default Header;
