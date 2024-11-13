"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dice5, RotateCcw } from "lucide-react";

interface GameControlsProps {
  onDrawNumber: () => void;
  onResetGame: () => void;
  isGameComplete: boolean;
  remainingCount: number;
}

export function GameControls({
  onDrawNumber,
  onResetGame,
  isGameComplete,
  remainingCount,
}: GameControlsProps) {
  return (
    <Card className="p-6">
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex gap-4">
          <Button
            size="lg"
            onClick={onDrawNumber}
            disabled={isGameComplete}
            className="min-w-[140px]"
          >
            <Dice5 className="mr-2 h-5 w-5" />
            Draw Number
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={onResetGame}
            className="min-w-[140px]"
          >
            <RotateCcw className="mr-2 h-5 w-5" />
            Reset Game
          </Button>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Remaining Numbers</p>
          <p className="text-2xl font-bold">{remainingCount}</p>
        </div>
      </div>
    </Card>
  );
}