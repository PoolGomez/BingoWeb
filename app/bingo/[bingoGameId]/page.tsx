// import { notFound } from "next/navigation";
import { BingoMonitor } from "./components";
// import { fetchBingoById } from "@/app/lib/data";

export default function BingoGamePage({ params }: { params: { bingoGameId: string } }) {

    const id = params.bingoGameId;
    // const [bingo] = await Promise.all([
    //     fetchBingoById(id)
    //   ]);
    // if (!bingo) {
    // notFound();
    // }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
        <BingoMonitor bingoId={id}/>
    </div>
  )
}
