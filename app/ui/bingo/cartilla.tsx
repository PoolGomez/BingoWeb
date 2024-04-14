'use client';
import { useState } from 'react';
import { lusitana } from '../fonts';

const Cartilla = () => {
  const [cellColors, setCellColors] = useState(Array.from({ length: 25 }, () => 'white'));

  const handleClick = (index:any) => {
    setCellColors((prevColors) => {
      const newColors = [...prevColors];
      newColors[index] = newColors[index] === 'white' ? 'red' : 'white';
      return newColors;
    });
  };

  const renderCells = () => {
    const cells = [];
    for (let i = 0; i < 25; i++) {
      const color = cellColors[i];
      const row = Math.floor(i / 5);
      const col = i % 5;
      const label = String.fromCharCode(65 + col); // Convertimos el índice de la columna a letra (A, B, C, D, E)
      const number = (row * 5) + col + 1; // Calculamos el número correspondiente
      cells.push(
        <div key={i} className={`cell flex items-center justify-center ${number === 13 ? 'bg-gray-600' : 'bg-white'} border border-gray-900 rounded-md w-12 h-12 cursor-pointer transition-colors duration-300 ease-in-out`} style={{ backgroundColor: color }} onClick={() => handleClick(i)}>
          {number === 13 ? 'Libre' : ''} {/* La celda del centro se etiqueta como "Free" */}
        </div>
      );
    }
    return cells;
  };

  return (
    <div className="bingo-board">
        {/* <div className=' text-center pb-5'>
        <h1 className={`${lusitana.className} text-2xl`}>Objetivo</h1>
        </div>
         */}
      <div className="grid grid-cols-5 gap-4">
      <h2 className="text-center text-2xl font-semibold">B</h2>
      <h2 className="text-center text-2xl font-semibold">I</h2>
      <h2 className="text-center text-2xl font-semibold">N</h2>
      <h2 className="text-center text-2xl font-semibold">G</h2>
      <h2 className="text-center text-2xl font-semibold">O</h2>
        {renderCells()}
      </div>
    </div>
  );
};

export default Cartilla;
