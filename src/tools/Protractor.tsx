// src/tools/Protractor.tsx
import React, { useEffect, useState } from "react";
import JXG from "jsxgraph";

class Protractor {
  private board: any;

  constructor(board: any) {
    this.board = board;
  }

  drawProtractor(x: number, y: number) {
    this.board.create(
      "arc",
      [
        [x, y],
        [x + 2, y],
        [x + 2, y + 2],
      ],
      {
        strokeColor: "red",
        strokeWidth: 2,
        fillColor: "lightgray",
        fillOpacity: 0.5,
        startAngle: Math.PI,
        endAngle: Math.PI / 2,
      }
    );
  }
}

interface ProtractorProps {
  board: any;
}

const ProtractorComponent: React.FC<ProtractorProps> = ({ board }) => {
  const [isDrawn, setIsDrawn] = useState(false);

  useEffect(() => {
    if (!isDrawn) {
      const protractor = new Protractor(board);
      protractor.drawProtractor(1, 1);
      setIsDrawn(true);
    }
  }, [board, isDrawn]);

  return null; // No renderizamos nada aquí
};

export default ProtractorComponent;
