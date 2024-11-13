"use client";

import { Card } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy } from "lucide-react";

interface NumberDisplayProps {
  currentNumber: string | null;
  isGameComplete: boolean;
}

export function NumberDisplay({ currentNumber, isGameComplete }: NumberDisplayProps) {
  return (
    <Card className="p-8 text-center text-foreground flex-grow">
     {/* <Card className="p-8 text-center bg-primary text-primary-foreground flex-grow"> */}
      <AnimatePresence mode="wait">
        {isGameComplete ? (
          <motion.div
            key="complete"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="flex flex-col items-center justify-center min-h-[300px]"
          >
            <Trophy className="w-24 h-24 mb-4" />
            <h2 className="text-4xl font-bold">Game Complete!</h2>
          </motion.div>
        ) : (
          <motion.div
            key="number"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center justify-center min-h-[280px]"
          >
            <h2 className="text-2xl mb-4">Número Actual</h2>
            <p className="text-[16rem] font-bold">
              {currentNumber ?? "-"}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}