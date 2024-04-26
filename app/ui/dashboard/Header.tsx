"use client";
import React from "react";
// import { HiBars4 } from "react-icons/hi2";
import { FaBars } from "react-icons/fa";

import { useSideBarDrawer } from "@/app/lib/store";


const Header = () => {

    const {onSideBarOpen} = useSideBarDrawer()

  return (
    <header className="grid grid-cols-2 py-5 px-4 md:px-12 items-center sticky top-0 z-10 bg-white">
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
      <div className="md:flex items-center justify-end space-x-4">
      <button>Iglesia Nueva Apostólica</button>
        {/* <Link
          href="/cart"
          className="relative p-2 bg-slate-200 rounded-full text-gray-500 hover:bg-green-200 hover:text-green-600"
        >
          <HiOutlineShoppingCart className="pr-1" size={28} />
          <span className="absolute top-0 right-1 font-bold text-green-600">
            0
          </span>
        </Link>
        {
          user ? (
            <AccountDropDown user={user} />
          ):( */}

          {/* <button className="bg-slate-200 text-gray-500 px-4 py-1 rounded-full"
          onClick={onOpen}
          >
            Login/Signup
          </button> */}

          {/* )
        } */}
        
      </div>
    </header>
  );
};
export default Header;
