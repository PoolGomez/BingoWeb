import { HiMiniGlobeAlt } from "react-icons/hi2";

import { lusitana } from '@/app/ui/fonts';

export default function AcmeLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <HiMiniGlobeAlt className="h-12 w-12 rotate-[15deg]" />
      <p className="text-[44px]">Bingo</p>
    </div>
  );
}
