import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    // <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-semibold mb-6 text-center">VENDER</h1>
        <div className="flex justify-center">
            <Link href={"/dashboard/vender/card"}>
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full mr-4 transition duration-300 ease-in-out">
                    Tarjetas Bingo
                </button>
            </Link>
            <Link href={"/dashboard/vender/ticket"}>
                <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full ml-4 transition duration-300 ease-in-out">
                    Tickets Viandas
                </button>
            </Link>
        </div>
      </div>
    // </div>

  )
}

export default page