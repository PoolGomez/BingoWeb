import { fetchSorteo } from "@/app/lib/data";
import { FaCheck } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa";


import Link from "next/link";

export default async function DetalleSorteo(){

    const detalle = await fetchSorteo();

    return(
        // <div>
        <section className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20"></div>
        <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center"></div>
        <div className="mx-auto max-w-2xl lg:max-w-4xl">
            
            <figure className="mt-10">
            <blockquote className="text-center text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9">
                <p>“Ganador del sorteo es...”</p>
            </blockquote>

            <figcaption className="mt-10">
                
                <div className="mt-4 flex items-center justify-center space-x-3 text-base">
                
                
                <div className="text-gray-600">Numero: </div>
                <div className="font-semibold text-gray-900">{detalle[0].number}</div>
                </div>
            </figcaption>

            <figcaption className="mt-10">
                
                <div className="mt-4 flex items-center justify-center space-x-3 text-base">
                
                <div className="text-gray-600">Nombres: </div>
                <div className="font-semibold text-gray-900">{detalle[0].name}</div>
                </div>
            </figcaption>

            <figcaption className="mt-10">
                <div className="mt-4 flex items-center justify-center space-x-3 text-base">
                    <div className="text-gray-600">Estado: </div>
                    <div className="font-semibold text-gray-900">
                        {detalle[0].status ==='pendiente' ? (
                            <label className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-red-500 px-3 py-1.5 text-xs font-medium text-white">
                                Pendiente <FaRegClock className="h-4 w-4" />
                            </label>
                        ):(
                            <label className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white">
                                Pagado <FaCheck className="h-4 w-4" />
                            </label>
                        )}
                    </div>
                </div>
                
                
            </figcaption>



            </figure>


            <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link href='/dashboard/sorteos'>
                <span className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Regresar</span>
                {/* <a href="#" className="text-sm font-semibold text-gray-900">Contact support <span aria-hidden="true">&rarr;</span></a> */}
            
                </Link>
            </div>

        </div>
        </section>
        // </div>
    )
}