"use client";

import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";

interface PreviousNumbersProps {
  numbers: number[];
}

export function PreviousNumbers({ numbers }: PreviousNumbersProps) {
  const recentNumbers = [...numbers].reverse();

  return (
    <Card className="p-6 flex-grow">
      <h3 className="text-lg font-semibold mb-4">Previous Numbers</h3>
      <ScrollArea className="h-[calc(100%-2rem)] w-full rounded-md border p-4">
        <div className="flex flex-wrap gap-2">
          {recentNumbers.map((number, index) => (
            <motion.div
              key={`${number}-${index}`}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-secondary text-secondary-foreground font-bold text-2xl"
            >
              {number}
            </motion.div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
}