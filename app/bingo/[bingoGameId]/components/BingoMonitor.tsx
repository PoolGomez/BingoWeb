
// import { useBingoGame } from "@/hooks/use-bingo-game";
import { BingoBoard } from "./BingoBoard";
import { GameControls } from "./GameControls";
import { PreviousNumbers } from "./PreviousNumbers";
import { NumberDisplay } from "./NumberDisplay";
// import { BingoGame } from "@/app/lib/definitions";
// import { fetchBingoById, fetchBingoNumbers } from "@/app/lib/data";

export async function BingoMonitor({bingoId}:{bingoId:string}) {

  // const cards = await fetchBingoNumbers(bingoId);
  // const bingo = await fetchBingoById(bingoId)

  // const {
  //   currentNumber,
  //   drawnNumbers,
  //   remainingNumbers,
  //   drawNumber,
  //   resetGame,
  //   isGameComplete
  // } = useBingoGame();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
      {/* Left Block */}
      <div className="p-6 flex flex-col gap-6">
        <NumberDisplay 
          // currentNumber={bingo.current_number} 
          currentNumber={"0"} 
          // isGameComplete={isGameComplete}
          isGameComplete={false}
        />
        {/* <GameControls
          onDrawNumber={drawNumber}
          onResetGame={resetGame}
          isGameComplete={isGameComplete}
          remainingCount={remainingNumbers.length}
        />
        <PreviousNumbers numbers={drawnNumbers} /> */}
      </div>

      {/* Right Block */}
      {/* <div className="p-6 flex items-center">
        <BingoBoard drawnNumbers={drawnNumbers} />
      </div> */}
    </div>
  );
}