"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface BingoBoardProps {
  drawnNumbers: number[];
}

export function BingoBoard({ drawnNumbers }: BingoBoardProps) {
  const numbers = Array.from({ length: 75 }, (_, i) => i + 1);
  const columns = [
    { letter: "B", range: [1, 15] },
    { letter: "I", range: [16, 30] },
    { letter: "N", range: [31, 45] },
    { letter: "G", range: [46, 60] },
    { letter: "O", range: [61, 75] },
  ];

  return (
    <Card className="p-6 w-full h-full flex items-center justify-center">
      <div className="grid grid-cols-5 gap-1 w-full max-w-4xl">
        {columns.map(({ letter, range }) => (
          <div key={letter} className="space-y-1">
            <div className="h-16 flex items-center justify-center font-bold text-4xl bg-blue-500 text-primary-foreground rounded">
              {letter}
            </div>
            {numbers
              .filter((n) => n >= range[0] && n <= range[1])
              .map((number) => (
                <div
                  key={number}
                  className={cn(
                    "h-12 flex items-center justify-center rounded text-3xl font-medium transition-colors",
                    drawnNumbers.includes(number)
                      ? "bg-red-600 text-primary-foreground"
                      : "bg-muted"
                  )}
                >
                  {number}
                </div>
              ))}
          </div>
        ))}
      </div>
    </Card>
  );
}