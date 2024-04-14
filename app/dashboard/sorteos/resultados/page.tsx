import { RevenueChartSkeleton } from "@/app/ui/skeletons";
import DetalleSorteo from "@/app/ui/sorteos/detalle-sorteo";
import { Suspense } from "react";
import Loading from "./loading";

export default function ResultadosPage(){
    return(
        <Suspense fallback={<Loading />}>
          <DetalleSorteo />
        </Suspense>
    )
}