'use client';
import { useEffect, useState } from "react";

export default function Loading(){

    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        const countdownInterval = setInterval(() => {
        setCountdown(prevCountdown => prevCountdown - 1);
        }, 1000);

        return () => clearInterval(countdownInterval);
    }, []);

    return(
        
        // <div className="flex justify-center items-center">
        // <div className="spinner-border text-primary" role="status">
        //     <span className="sr-only">Loading...</span>
        // </div>
        // </div>

        // <div className="flex h-screen items-center justify-center bg-white dark:bg-black">
        //     <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-blue-500 border-t-transparent"></div>
        // </div>


        // <div className="flex justify-center items-center h-screen">
        // <div className="relative">
        //     <div className="spinner-border spinner-border-lg text-white" role="status">
        //     <span className="sr-only">Loading...</span>
        //     </div>
        //     <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        //     <p className="text-4xl font-bold text-blue-700" id="countdown">5</p>
        //     </div>
        // </div>
        // </div>

    <div className="flex justify-center items-center h-screen">
      <div className="relative">
        <div className="spinner-border spinner-border-lg text-black" role="status">
          <span className="sr-only">Loading...</span>
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-blue-500 border-t-transparent"></div>
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <p className="text-4xl font-bold text-blue-700">{countdown}</p>
        </div>
      </div>
    </div>  


    )
}