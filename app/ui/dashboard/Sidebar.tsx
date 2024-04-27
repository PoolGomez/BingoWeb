'use client';
import React, { createElement, useState } from 'react'
import Link from 'next/link';
// import Image from 'next/image';
import { HiHome } from 'react-icons/hi2';
import { FaReceipt } from 'react-icons/fa';
import { BsHeartFill } from 'react-icons/bs';
import { MdHelp } from 'react-icons/md';
import { IoTicketOutline } from "react-icons/io5";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import { LiaGolfBallSolid } from "react-icons/lia";



// import { signOut } from 'next-auth/react';
import DialogComponent from './DialogComponent';
import { useSideBarDrawer } from '@/app/lib/store';
import Logout from './logout';
import Image from 'next/image';


const Links = [
    { title: "Inicio", icon: HiHome, url: "/" },
    { title: "Tarjetas", icon: FaReceipt, url: "/dashboard/cards" },
    { title: "Tickets", icon: IoTicketOutline, url: "/dashboard/tickets" },
    { title: "Sorteos", icon: GiPerspectiveDiceSixFacesRandom, url: "/dashboard/sorteos" },
    { title: "Bingo", icon: LiaGolfBallSolid, url: "/dashboard/bingo" },
  ];
const SideBar = () => {

    const { isSideBarOpen, onSideBarClose } = useSideBarDrawer();

    

  return (
    <DialogComponent isVisible={isSideBarOpen} onClose={onSideBarClose}>
      <div className="flex flex-col gap-y-6 px-6 pt-8">
        
          <>
            <div className="flex justify-center my-3">
              {/* <Link href="/" className="outline-none">
                <Image src="/img/logo-ina.png" width={40} height={40} alt="logo" />
              </Link> */}
              <Link href="/">
                <span className="flex items-center gap-3 text-black px-2 py-1">
                  Iglesia Nueva Apostólica
                  <Image className="" src="/img/logo-ina.png" width={40} height={40} alt="logo" />
                </span> 
              </Link>
            </div>
            {/* <div className="flex items-center p-3 transition-all font-semibold">
              <Image
                src={user?.image!}
                width={40}
                height={40}
                alt="user-img"
                className="object-cover rounded-full"
              />
              <div className="flex flex-col space-y-2 text-xs">
                <span className="pl-4">{user?.name} </span>
                <Link href="/user" className="pl-4 text-green-600">
                  View Account
                </Link>
              </div>
            </div> */}

            {Links.map((link) => (
              <Link
                href={link.url}
                className="flex items-center p-3 transition-all font-semibold hover:text-green-500 hover:bg-green-100 rounded-md"
                key={link.title}
              >
                {createElement(link.icon, {
                  className: "h-5 w-5 mr-4 shrink-0",
                })}
                <span className="pl-2">{link.title}</span>
              </Link>
            ))}
            {/* <button className="flex items-center p-3 transition-all font-semibold"
            onClick={() => signOut({ callbackUrl: "/" })}
            >
              <HiOutlineArrowRightOnRectangle
                className="mr-4 shrink-0"
                size={26}
              />
              <span className="pl-2">Cerrar Sesión</span>
            </button> */}
            <Logout />
          </>
        
{/* 
        <div className="flex flex-col border-t ">
          {user?.role === "ADMIN" && (
            <div className="mt-5">
              <Link
                href="/dashboard"
                className="bg-green-600  text-white text-center hover:bg-green-200  hover:text-green-700  p-3 rounded "
              >
                Go to Dashboard
              </Link>
            </div>
            )} 
        </div> */}
      </div>
    </DialogComponent>
  )
}

export default SideBar