// Importar JSXGraph
const board = JXG.JSXGraph.initBoard("jxgbox", {
  boundingbox: [-5, 5, 5, -5],
  axis: true,
});

// Clase para el Compás
class Compass {
  constructor(board) {
    this.board = board;
    this.center = null;
    this.radius = null;
  }

  drawCompass(x, y, radius) {
    this.center = this.board.create("point", [x, y], { name: "C", size: 2 });
    this.radius = radius;
    this.board.create("circle", [this.center, radius], { strokeColor: "blue" });
  }
}

// Clase para el Transportador
class Protractor {
  constructor(board) {
    this.board = board;
    this.anglePointA = null;
    this.anglePointB = null;
  }

  drawProtractor(x, y) {
    // Dibuja un transportador en la posición (x, y)
    const protractor = this.board.create(
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

    return protractor;
  }

  measureAngle(pointA, pointB) {
    // Lógica para medir el ángulo entre dos puntos
    const angle = Math.atan2(pointB.Y() - pointA.Y(), pointB.X() - pointA.X());
    return angle * (180 / Math.PI); // Convertir a grados
  }
}

// Clase para la Regla
class Ruler {
  constructor(board) {
    this.board = board;
  }

  drawLine(x1, y1, x2, y2) {
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

// Ejemplo de uso
const compass = new Compass(board);
compass.drawCompass(0, 0, 3); // Dibuja un círculo con centro en (0,0) y radio 3

const protractor = new Protractor(board);
protractor.drawProtractor(1, 1); // Dibuja un transportador en (1,1)

const ruler = new Ruler(board);
ruler.drawLine(-4, 0, 4, 0); // Dibuja una línea horizontal

// Medir ángulo entre dos puntos
const angleA = board.create("point", [-3, -1], { name: "A" });
const angleB = board.create("point", [3, -1], { name: "B" });
console.log(
  `El ángulo medido es: ${protractor.measureAngle(angleA, angleB)} grados`
);
