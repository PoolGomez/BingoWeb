"use client";
import AcmeLogo from '@/app/ui/acme-logo';
import { MdKeyboardArrowRight } from "react-icons/md";

import Link from 'next/link';
import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image';
import { signIn, signOut } from 'next-auth/react';


export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52">
        <AcmeLogo />
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
        {/* <div className={styles.shape} /> */}
        {/* <div
            className="h-0 w-0 border-b-[30px] border-l-[20px] border-r-[20px] border-b-black border-l-transparent border-r-transparent"
          /> */}
          <p  className={`${lusitana.className} text-xl text-gray-800 md:text-3xl md:leading-normal`}>
            <strong>Bingo App Web.</strong>
            {/* <a href="https://nextjs.org/learn/" className="text-blue-500">
              Next.js Learn Course
            </a> */}
            {/* , brought to you by Vercel. */}
          </p>
          <p className={`${lusitana.className} text-xl text-gray-800 md:text-3xl md:leading-normal`}>
            Bienvenido.{' '}
          </p>
          
          <Link
            href="/login"
            className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
          >
            <span>Iniciar Sesión</span> <MdKeyboardArrowRight className="w-5 md:w-6" />
          </Link>

          {/* <button onClick={()=> signIn()} className="bg-sky-400 px-3 py-2 rounded">
            Login
           </button>
           <button
            onClick={async () => {
              await signOut({
                callbackUrl: "/",
              })
            }}
          >
            Logout
          </button> */}

        </div>
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
          {/* Add Hero Images Here */}
          <Image
            // src="/hero-desktop.png"
            src="/bingo.jpg"
            width={1000}
            height={760}
            className="hidden md:block"
            alt="Screenshots of the dashboard project showing desktop version"
          />
          <Image
            // src="/hero-mobile.png"
            src="/bingo.jpg"
            width={560}
            height={620}
            className="block md:hidden"
            alt="Screenshot of the dashboard project showing mobile version"
          />
        </div>
      </div>
    </main>
  );
}
