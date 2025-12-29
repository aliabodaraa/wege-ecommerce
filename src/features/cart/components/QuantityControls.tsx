"use client";

import { Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
type QuantityControlsProps = {
  quantity: number;
  btnVariant?: "outline" | "ghost";
  isMinusDisabled?: boolean;
  onMinusClick: () => void;
  onPlusClick: () => void;
};

export default function QuantityControls({
  quantity,
  onMinusClick,
  onPlusClick,
  isMinusDisabled = false,
  btnVariant = "ghost",
}: QuantityControlsProps) {
  return (
    <div className="flex items-center border rounded-lg">
      <Button
        variant={btnVariant}
        size="icon"
        onClick={onMinusClick}
        disabled={isMinusDisabled}
      >
        -
      </Button>
      <span className="w-12 text-center font-medium">{quantity}</span>
      <Button variant={btnVariant} size="icon" onClick={onPlusClick}>
        +
      </Button>
    </div>
  );
}
