'use client';
import { useState } from 'react';

// Componente del tablero de bingo
const Tablero = () => {
    const [numberColors, setNumberColors] = useState(Array.from({ length: 75 }, () => 'white'));

    const handleClick = (index:any) => {
      setNumberColors((prevColors) => {
        const newColors = [...prevColors];
        newColors[index] = newColors[index] === 'white' ? 'red' : 'white';
        return newColors;
      });
    };
  
    const renderNumbers = () => {
      const numbers = [];
      for (let i = 0; i < 75; i++) {
        const color = numberColors[i];
        const number = i + 1;
        const column = Math.floor(i / 15);
        numbers.push(
          <div key={number} className="number flex items-center justify-center bg-white border border-gray-900 rounded-md w-11 h-11 cursor-pointer transition-colors duration-300 ease-in-out text-center text-2xl font-semibold mx-1" style={{ backgroundColor: color }} onClick={() => handleClick(i)}>
            {number}
          </div>
        );
      }
      return numbers;
    };
  
    return (
      <div className="bingo-board flex justify-center">
        <div className="grid grid-cols-165 gap-4">
          <div className="column flex flex-row items-center">
            <h2 className="flex items-center justify-center text-center text-2xl font-semibold w-11 h-11">B</h2>
            {renderNumbers().slice(0, 15)}
          </div>
          <div className="column flex flex-row items-center">
            <h2 className="flex items-center justify-center text-center text-2xl font-semibold w-11 h-11">I</h2>
            {renderNumbers().slice(15, 30)}
          </div>
          <div className="column flex flex-row items-center">
            <h2 className=" flex items-center justify-center text-center text-2xl font-semibold w-11 h-11">N</h2>
            {renderNumbers().slice(30, 45)}
          </div>
          <div className="column flex flex-row items-center">
            <h2 className="flex items-center justify-center text-center text-2xl font-semibold w-11 h-11">G</h2>
            {renderNumbers().slice(45, 60)}
          </div>
          <div className="column flex flex-row items-center">
            <h2 className="flex items-center justify-center text-center text-2xl font-semibold w-11 h-11">O</h2>
            {renderNumbers().slice(60)}
          </div>
        </div>

        
      </div>
    );
  
};

export default Tablero;