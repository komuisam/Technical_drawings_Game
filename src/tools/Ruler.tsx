import React, { useEffect } from "react";
import JXG from "jsxgraph";

class Ruler {
  private board: any;

  constructor(board: any) {
    this.board = board;
  }

  drawLine(x1: number, y1: number, x2: number, y2: number) {
    this.board.create(
      "line",
      [
        [x1, y1],
        [x2, y2],
      ],
      { strokeColor: "green", strokeWidth: 2 }
    );
  }
}

const RulerComponent: React.FC = () => {
  useEffect(() => {
    const board = JXG.JSXGraph.initBoard("jxgbox-ruler", {
      boundingbox: [-5, 5, 5, -5],
      axis: true,
    });
    const ruler = new Ruler(board);
    ruler.drawLine(-4, 0, 4, 0);
  }, []);

  return <div id="jxgbox-ruler" style={{ width: "500px", height: "500px" }} />;
};

export default RulerComponent;
