import Cartilla from '@/app/ui/bingo/cartilla';
import Tablero from '@/app/ui/bingo/tablero';
import Link from 'next/link';

// Componente del tablero de bingo
const BingoPage = () => {
   
  
  
    return (
        <>
      <div className="flex justify-between gap-5">
        <Tablero />
        <Cartilla />

        


      </div>
      {/* <div className='flex items-center justify-end mt-5'>
        <Link href='/dashboard/bingo'>
      <span className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" >Limpiar</span>
      </Link>
      </div> */}
      
      </>
    );
  
};

export default BingoPage;