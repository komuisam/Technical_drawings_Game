// src/tools/board.tsx
import React, { useEffect, useRef } from "react";
import JXG from "jsxgraph";
import { CompassSvg, ProtractorSvg, RulerSvg } from "../assets/tools";
interface BoardProps {
  id: string; // Prop para el ID del tablero
}
class Ruler {
  private board: JXG.Board;
  public visible: boolean;
  private maxWith: number;
  private colors: {
    background: string;
    scaleTicks: string;
    distanceTicks: string;
    textBackgound: string;
    pointDistance: string;
    firstPoint: string;
    lastPoint: string;
  };

  constructor(board: JXG.Board) {
    this.maxWith = 0;
    this.board = board;
    this.visible = true;
    this.colors = {
      background: "green",
      scaleTicks: "black",
      distanceTicks: "red",
      textBackgound: "red",
      pointDistance: "red",
      firstPoint: "violet",
      lastPoint: "violet",
    };
  }

  distance = (pointA: JXG.Point, pointB: JXG.Point) => {
    const dx = pointB.X() - pointA.X(); // Cambio en las coordenadas x
    const dy = pointB.Y() - pointA.Y(); // Cambio en las coordenadas y
    return Math.sqrt(dx * dx + dy * dy); // Fórmula de distancia euclidiana
  };

  drawRuler(x1: number, y1: number, x2: number, y2: number, style = {}) {
    /*   const point_1: JXG.Point = this.board.create("point", [x1, y1], {
      name: "",
      size: 3,
      color: this.colors.firstPoint,
      highlightStrokeWidth: 10,
      transitionDuration: 1000,
      transitionProperties: [
        "width",
        "height",
        "stroke-width",
        "fill",
        "fill-opacity",
        "rx",
        "ry",
        "stroke",
        "stroke-opacity",
      ],
    });

    const point_2: JXG.Point = this.board.create("point", [x2, y2], {
      name: "",
      size: 3, // Size of the point
      color: this.colors.lastPoint,
      highlightStrokeWidth: 10,
      transitionDuration: 1000,
      transitionProperties: [
        "width",
        "height",
        "stroke-width",
        "fill",
        "fill-opacity",
        "rx",
        "ry",
        "stroke",
        "stroke-opacity",
      ],
      ...style,
    });
    this.maxWith = this.distance(point_1, point_2);

    // Create line background
    const line: JXG.Line = this.board.create(
      "segment",
      [point_1, point_2, 15],
      {
        strokeColor: this.colors.background,
        strokeWidth: 38,
        straightFirst: false,
        straightLast: false,
        highlight: false,
      }
    );
    // line for ticks
    const line2: JXG.Line = this.board.create(
      "segment",
      [point_1, point_2, 15],
      {
        //lineCap: "round",
        strokeWidth: 4,
        strokeColor: this.colors.scaleTicks,
        straightFirst: false,
        straightLast: false,
        highlight: false,
      }
    );

    const point_3: JXG.Point = this.board.create(
      "glider",
      [x2 / 2, y2, line2],
      {
        name: "",
        size: 3,
        color: this.colors.pointDistance,
        highlightStrokeWidth: 10,
        transitionDuration: 1000,
        transitionProperties: [
          "width",
          "height",
          "stroke-width",
          "fill",
          "fill-opacity",
          "rx",
          "ry",
          "stroke",
          "stroke-opacity",
        ],
      }
    );

    // scaleTicks
    this.board.create("ticks", [line], {
      ticksDistance: 1, // Distancia entre ticks
      minorTicks: 1, // Cantidad de ticks menores entre dos mayores
      drawLabels: true, // Si se deben dibujar etiquetas
      drawZero: false,
      strokeColor: this.colors.scaleTicks,
      includeBoundaries: true,
      majorHeight: 35, // Aumenta la longitud de los ticks mayores (ajusta este valor según sea necesario)
      minorHeight: 15,
      tickEndings: [true, false],
      majorTickEndings: [true, false],
      layer: 8,
      strokeWidth: 3,
      label: {
        visible: true,
        anchorX: "middle", // Centra horizontalmente
        anchorY: "top", // Centra verticalmente en la parte superior del tick
        offset: [-8, -5], // Ajusta la posición vertical si es necesario (puedes modificar este valor)
      },
    });

    const distanceTicks: JXG.Line = this.board.create(
      "line",
      [point_1, point_3],
      {
        lineCap: "round",
        strokeColor: this.colors.distanceTicks,
        strokeWidth: 3,
        straightFirst: false,
        straightLast: false,
        draggable: false, // Evita que la línea sea arrastrable
        highlight: false,
      }
    );

    // distanceTicks
    this.board.create("ticks", [distanceTicks], {
      ticksDistance: 1, // Distancia entre ticks
      minorTicks: 1, // Cantidad de ticks menores entre dos mayores
      drawLabels: true, // Si se deben dibujar etiquetas
      drawZero: false,
      strokeColor: this.colors.distanceTicks,
      includeBoundaries: true,
      majorHeight: 35, // Aumenta la longitud de los ticks mayores (ajusta este valor según sea necesario)
      minorHeight: 15,
      tickEndings: [true, false],
      majorTickEndings: [true, false],
      layer: 9,
      strokeWidth: 3,
      label: {
        visible: true,
        anchorX: "middle", // Centra horizontalmente
        anchorY: "top", // Centra verticalmente en la parte superior del tick
        offset: [-8, -5], // Ajusta la posición vertical si es necesario (puedes modificar este valor)
      },
    });

    const txt: JXG.Text = this.board.create(
      "text",
      [
        () =>
          point_3.X() -
          (this.distance(point_1, point_3) + 3.2 > this.maxWith ? 3 : -0.7), // Posición X a la izquierda de point_3
        () => point_3.Y(),
        () =>
          `<p style=" background-color: ${
            this.colors.textBackgound
          }; " class="text-Number"> ${this.distance(point_1, point_3).toFixed(
            2
          )} </p>`,
      ],
      {
        draggable: false,
        fixed: true,
        display: "html",
        fontSize: 18,
        anchor: point_3,
        //offset: [-3, 0],
      }
    );

    // Rotate text around point_1 by dragging point point_3
    const tRot: JXG.Transformation = this.board.create(
      "transform",
      [
        () => Math.atan2(point_3.Y() - point_1.Y(), point_3.X() - point_1.X()),
        point_3,
      ],
      { type: "rotate" }
    );
    tRot.bindTo(txt); */

    // Crear los puntos
    const point_1 = this.board.create("point", [x1, y1], {
      name: "",
      size: 3,
      color: "red",
    });
    const point_2 = this.board.create("point", [x2, y2], {
      name: "",
      size: 3,
      color: "red",
    });
    this.maxWith = this.distance(point_1, point_2);
    // Create line background
    const line: JXG.Line = this.board.create("segment", [point_1, point_2], {
      strokeColor: this.colors.background,
      strokeWidth: 38,
      straightFirst: false,
      straightLast: false,
      highlight: false,
    });
    // line for ticks
    const line2: JXG.Line = this.board.create(
      "segment",
      [point_1, point_2, 15],
      {
        //lineCap: "round",
        strokeWidth: 4,
        strokeColor: this.colors.scaleTicks,
        straightFirst: false,
        straightLast: false,
        highlight: false,
      }
    );

    const point_3: JXG.Point = this.board.create(
      "glider",
      [x2 / 2, y2, line2],
      {
        name: "",
        size: 3,
        color: this.colors.pointDistance,
        highlightStrokeWidth: 10,
        transitionDuration: 1000,
        transitionProperties: [
          "width",
          "height",
          "stroke-width",
          "fill",
          "fill-opacity",
          "rx",
          "ry",
          "stroke",
          "stroke-opacity",
        ],
      }
    );
    // scaleTicks
    this.board.create("ticks", [line], {
      highlight: false,
      ticksDistance: 1, // Distancia entre ticks
      minorTicks: 1, // Cantidad de ticks menores entre dos mayores
      drawLabels: true, // Si se deben dibujar etiquetas
      drawZero: false,
      strokeColor: this.colors.scaleTicks,
      includeBoundaries: true,
      majorHeight: 35, // Aumenta la longitud de los ticks mayores (ajusta este valor según sea necesario)
      minorHeight: 15,
      tickEndings: [true, false],
      majorTickEndings: [true, false],
      layer: 8,
      strokeWidth: 3,
      label: {
        visible: true,
        anchorX: "middle", // Centra horizontalmente
        anchorY: "top", // Centra verticalmente en la parte superior del tick
        offset: [-8, -5], // Ajusta la posición vertical si es necesario (puedes modificar este valor)
      },
    });

    const distanceTicks: JXG.Line = this.board.create(
      "line",
      [point_1, point_3],
      {
        lineCap: "round",
        strokeColor: this.colors.distanceTicks,
        strokeWidth: 3,
        straightFirst: false,
        straightLast: false,
        draggable: false, // Evita que la línea sea arrastrable
        highlight: false,
      }
    );

    // distanceTicks
    this.board.create("ticks", [distanceTicks], {
      ticksDistance: 1, // Distancia entre ticks
      highlight: false,
      minorTicks: 1, // Cantidad de ticks menores entre dos mayores
      drawLabels: true, // Si se deben dibujar etiquetas
      drawZero: false,
      strokeColor: this.colors.distanceTicks,
      includeBoundaries: true,
      majorHeight: 35, // Aumenta la longitud de los ticks mayores (ajusta este valor según sea necesario)
      minorHeight: 15,
      tickEndings: [true, false],
      majorTickEndings: [true, false],
      layer: 9,
      strokeWidth: 3,
      label: {
        visible: true,
        anchorX: "middle", // Centra horizontalmente
        anchorY: "top", // Centra verticalmente en la parte superior del tick
        offset: [-8, -5], // Ajusta la posición vertical si es necesario (puedes modificar este valor)
      },
    });

    this.addText(point_1, point_3);

    const button = this.board.create(
      "button",
      [
        3,
        4,
        "drawingLine",
        () => {
          this.drawingLine(point_1, point_3);
        },
      ],
      {
        visible: true,
        cssClass: "mybutton",
      }
    );
  }
  drawingLine = (point_1, point_2) => {
    const { positionA, positionB } = this.positionPoints(point_1, point_2);
    // Crear los puntos perpendiculares (inicialmente)
    const perpendicularPoint1 = this.board.create("point", positionA, {
      label: { visible: false },
      size: 3,
      color: "blue",
      draggable: false,
      //fixed: true,
    });

    const perpendicularPoint2 = this.board.create("point", positionB, {
      label: { visible: false },
      draggable: false,
      //fixed: true,
      size: 3,
      color: "blue",
    });
    const mPoint = this.board.create(
      "midpoint",
      [perpendicularPoint1, perpendicularPoint2],
      {
        label: { visible: false },
        draggable: false,
        //fixed: true,
        size: 3,
        color: "red",
      }
    );
    //this.addText(perpendicularPoint1, perpendicularPoint2);
    const traceLine: JXG.Line = this.board.create(
      "line",
      [perpendicularPoint1, perpendicularPoint2],
      {
        straightFirst: false,
        straightLast: false,
        highlight: false,
        strokeColor: "black",

        strokeWidth: 3,
      }
    );

    const txt = this.board.create(
      "text",
      [
        () => mPoint.X() - 1,
        () => mPoint.Y(),
        () =>
          `<p style=" background-color: ${
            this.colors.textBackgound
          }; " class="text-Number"> ${this.distance(
            perpendicularPoint1,
            perpendicularPoint2
          ).toFixed(2)} </p>`,
      ],
      {
        display: "html",
        anchor: mPoint,
      }
    );

    const tRot = this.board.create(
      "transform",
      [
        () =>
          Math.atan2(
            perpendicularPoint2.Y() - mPoint.Y(),
            perpendicularPoint2.X() - mPoint.X()
          ),
        mPoint,
      ],
      { type: "rotate" }
    );

    tRot.bindTo(txt);
  };
  positionPoints = (pointA, pointB, offset = 0.25) => {
    const dx = pointB.X() - pointA.X(); // Diferencia en X
    const dy = pointB.Y() - pointA.Y(); // Diferencia en Y
    // Calcular la longitud de la línea
    const length = Math.sqrt(dx * dx + dy * dy);
    // Normalizar el vector (dx, dy)
    const unitX = dx / length;
    const unitY = dy / length;
    const positionA = [pointA.X() - unitY, pointA.Y() + unitX - offset];
    const positionB = [pointB.X() - unitY, pointB.Y() + unitX - offset];
    return { positionA, positionB, length };
  };

  addText(point_1, point_2, center = true) {
    const txt: JXG.Text = this.board.create(
      "text",
      [
        () =>
          point_2.X() -
          (this.distance(point_1, point_2) + 3.2 > this.maxWith ? 3 : -0.7), // Posición X a la izquierda de point_2
        () => point_2.Y(),
        () =>
          `<p style=" background-color: ${
            this.colors.textBackgound
          }; " class="text-Number"> ${this.distance(point_1, point_2).toFixed(
            2
          )} </p>`,
      ],
      {
        draggable: false,
        fixed: true,
        display: "html",
        fontSize: 18,
        anchor: point_2,
        //offset: [-3, 0],
      }
    );

    // Rotate text around point_1 by dragging point point_3
    const tRot: JXG.Transformation = this.board.create(
      "transform",
      [
        () => Math.atan2(point_2.Y() - point_1.Y(), point_2.X() - point_1.X()),
        point_2,
      ],
      { type: "rotate" }
    );

    tRot.bindTo(txt);
  }
}

class Protractor {
  private board: JXG.Board;
  public protractorVisible: boolean;
  private angle: null | JXG.Angle;
  private modeAngle: boolean;

  private Colors: {
    background: string;
    scaleTicks: string;
    distanceTicks: string;
    textBackgound: string;
    pointDistance: string;
    firstPoint: string;
    lastPoint: string;
  };

  constructor(board: JXG.Board, protractorVisible = true) {
    this.board = board;
    this.modeAngle = true;
    this.protractorVisible = protractorVisible;
    this.board = board;
    this.angle = null;
    this.Colors = {
      background: "blue",
      scaleTicks: "black",
      distanceTicks: "red",
      textBackgound: "red",
      pointDistance: "red",
      firstPoint: "violet",
      lastPoint: "violet",
    };
  }

  drawProtractor(x: number = 0, y: number = 0, radius: number = 8) {
    // Crea el punto base del transportador en el origen (0, 0)
    const baseProtractor = this.board.create("point", [x, y], {
      highlight: false,
      label: { visible: false }, // Oculta la etiqueta del punto
      strokeColor: "blue", // Color del borde
      fillColor: "orange", // Color de relleno
      size: 10, // Tamaño del punto
      visible: () => this.protractorVisible,
    });

    // Crea un círculo centrado en el punto base con un radio fijo (radius) esto para crear el tamaño total del transportador
    const circleBase = this.board.create("circle", [baseProtractor, radius], {
      strokeWidth: 2, // Ancho del trazo del círculo
      visible: false, // Inicialmente oculta este círculo
    });

    // Crea un glider (punto móvil) en la circunferencia del círculo base
    const point_1 = this.board.create("glider", [x - 10, y, circleBase], {
      layer: 8,
      color: "blue", // Color del glider
      size: 3, // Tamaño del glider
      label: { visible: false }, // Oculta la etiqueta del glider
      visible: () => this.protractorVisible,
    });

    // Crea un punto espejo para point_1 a través del punto base (baseProtractor)
    const point_3 = this.board.create(
      "mirrorpoint",
      [point_1, baseProtractor],
      {
        color: "violet",
        visible: () => this.protractorVisible, //false, // Color y visibilidad del punto espejo
        layer: 8,
      }
    );

    const cemi = this.board.create("semicircle", [point_1, point_3], {
      strokeColor: "#00FF00", // Color del semicírculo
      visible: () => this.protractorVisible,
      strokeWidth: 8, // Ancho del trazo del semicírculo
      layer: 5,
    });

    const point_2 = this.board.create("glider", [0, 0, cemi], {
      label: { visible: false }, // Oculta la etiqueta del glider
      size: 3, // Tamaño del glider
      color: "black", // Color del glider
      visible: () => this.protractorVisible,
      layer: 9,
    });

    // Cambia esto según tu lógica

    // Función para crear un ángulo basado en el estado
    const createAngle = (pointA, pointB, pointC, mode: boolean = true) => {
      return this.board.create("angle", [pointA, pointB, pointC], {
        label: {
          fontSize: 18,
          offset: [0, -10],
          autoPosition: true,
          visible: () =>
            this.protractorVisible &&
            this.modeAngle == mode &&
            this.visibleAngle(pointA, pointB, pointC),
        },
        radius: 5.5,
        strokeColor: "#00FF00",
        strokeWidth: 5,
        visible: () =>
          this.protractorVisible &&
          this.modeAngle == mode &&
          this.visibleAngle(pointA, pointB, pointC),
        name: () => this.visibleAngle(pointA, pointB, pointC),
      });
    };

    this.angle = createAngle(
      point_3,
      baseProtractor,
      point_2,
      false
    ) as JXG.Angle; // Orden para izquierda a derecha

    this.angle = createAngle(
      point_2,
      baseProtractor,
      point_1,
      true
    ) as JXG.Angle;

    this.board.create("line", [baseProtractor, point_1], {
      layer: 7,
      strokeColor: "black", // Color de la línea
      strokeWidth: 10, // Ancho de la línea
      straightLast: false,
      straightFirst: false,
      visible: () => this.protractorVisible,
    });

    this.board.create("line", [baseProtractor, point_3], {
      layer: 7,
      strokeColor: "black", // Color de la línea
      strokeWidth: 10, // Ancho de la línea
      straightLast: false,
      straightFirst: false,
      visible: () => this.protractorVisible,
    });
    /* Pata del compás desde el punto base hasta point_2 */
    this.board.create("line", [baseProtractor, point_2], {
      layer: 8,
      strokeColor: "orange", // Color de la línea
      strokeWidth: 10, // Ancho de la línea
      visible: () => this.protractorVisible,
      straightLast: false,
      straightFirst: false,
      lastArrow: false, // Sin flecha al final de la línea
    });

    // Botón para crear un nuevo círculo basado en las posiciones actuales de los gliders.
    const button = this.board.create(
      "button",
      [
        3,
        4,
        "invertir",
        () => {
          this.setMode();
        },
      ],
      {
        visible: () => this.protractorVisible,
        cssClass: "mybutton",
      }
    );
  }

  visibleAngle = (p1, p2, p3) => {
    const angle = JXG.Math.Geometry.trueAngle(p1, p2, p3).toFixed(1) + "°";
    if (!["360.0°"].includes(angle)) {
      return angle;
    }
    return false;
  };

  setMode = (mode?: boolean) => {
    this.modeAngle = mode ?? !this.modeAngle;
  };

  setVisible(status: boolean = false) {
    this.protractorVisible = status;
  }
}

class Compass {
  private board: JXG.Board;
  public compasVisible: boolean;

  constructor(board: JXG.Board, compasVisible = true) {
    this.board = board;
    this.compasVisible = compasVisible;
  }

  drawCompass(x: number = 0, y: number = 0, radius: number = 8) {
    // Longitud de los brazos del compás
    // Array para almacenar los círculos creados
    const createCircle = [];

    // Crea el punto base del compás en el origen (0, 0)
    const baseCompas = this.board.create("point", [x, y], {
      highlight: false,
      label: { visible: false }, // Oculta la etiqueta del punto
      strokeColor: "blue", // Color del borde
      fillColor: "orange", // Color de relleno
      size: 10, // Tamaño del punto
      visible: this.compasVisible,
    });

    // Crea un círculo centrado en el punto base con un radio fijo (radius)
    const circleBase = this.board.create("circle", [baseCompas, radius], {
      strokeWidth: 2, // Ancho del trazo del círculo
      visible: false, // Inicialmente oculta este círculo
    });

    // Crea un glider (punto móvil) en la circunferencia del círculo base
    const point_1 = this.board.create(
      "glider",
      [x - 0.2, y - 0.3, circleBase],
      {
        color: "blue", // Color del glider
        size: 3, // Tamaño del glider
        label: { visible: false }, // Oculta la etiqueta del glider
        visible: this.compasVisible,
      }
    );

    // Crea un punto espejo para point_1 a través del punto base (baseCompas)
    const point_3 = this.board.create("mirrorpoint", [point_1, baseCompas], {
      color: "violet",
      visible: false, // Color y visibilidad del punto espejo
    });

    /* Apertura posible del compás */
    const cemi = this.board.create("semicircle", [point_1, point_3], {
      strokeColor: "red", // Color del semicírculo
      visible: false /* Aquí tiene que ir false; no se tiene que ver */,
      strokeWidth: 2, // Ancho del trazo del semicírculo
    });

    /*
 Sobre la apertura posible del compás se crea un punto point_2 
 que sirve para sacar la distancia que indica el tamaño del círculo 
*/
    const point_2 = this.board.create("glider", [-0.4, -0.4, cemi], {
      label: { visible: false }, // Oculta la etiqueta del glider
      size: 3, // Tamaño del glider
      color: "black", // Color del glider
      visible: this.compasVisible,
    });

    /* Pata del compás desde el punto base hasta point_1 */
    this.board.create("line", [baseCompas, point_1], {
      strokeColor: "grey", // Color de la línea
      strokeWidth: 10, // Ancho de la línea
      straightLast: false,
      straightFirst: false,
      visible: this.compasVisible,
    });

    /* Pata del compás desde el punto base hasta point_2 */
    this.board.create("line", [baseCompas, point_2], {
      strokeColor: "orange", // Color de la línea
      strokeWidth: 10, // Ancho de la línea
      visible: this.compasVisible,
      straightLast: false,
      straightFirst: false,
      lastArrow: false, // Sin flecha al final de la línea
    });

    // Función para calcular la distancia entre dos puntos
    const distance = (pointA: JXG.Point, pointB: JXG.Point) => {
      const dx = pointB.X() - pointA.X(); // Cambio en las coordenadas x
      const dy = pointB.Y() - pointA.Y(); // Cambio en las coordenadas y
      return Math.sqrt(dx * dx + dy * dy); // Fórmula de distancia euclidiana
    };

    // Crea una línea que representa la apertura entre point_1 y point_2
    const distanceLine = this.board.create("line", [point_1, point_2], {
      straightLast: false,
      straightFirst: false,
      color: "violet", // Color de la línea de apertura
      strokeWidth: 3, // Ancho de la línea de apertura
      dash: 2, // Línea discontinua
      visible: this.compasVisible,
    });

    // Crea un punto medio entre point_1 y point_2 para propósitos de etiquetado
    const midCompas = this.board.create("midpoint", [point_1, point_2], {
      label: { visible: true }, // Muestra la etiqueta para el punto medio
      visible: false, // El punto medio en sí no es visible; debe ser falso aquí.
      name: function () {
        const dis = distance(point_1, point_2).toFixed(2); // Calcula la distancia entre los gliders.
        return dis != "0.00" ? dis : ""; // Devuelve la distancia o una cadena vacía si es cero.
      },
    });

    // Dibuja un círculo punteado entre point_1 y point_2 para visualizar su conexión.
    this.board.create("circle", [point_1, point_2], {
      strokeColor: "#00FF00", // Color del círculo punteado.
      strokeWidth: 2,
      fillOpacity: 0.2,
      dash: 2,
      visible: this.compasVisible,
    });

    // Botón para crear un nuevo círculo basado en las posiciones actuales de los gliders.
    const button = this.board.create(
      "button",
      [
        2,
        4,
        "Trazar Círculo",
        () => {
          const circle = this.board.create(
            "circle",
            [
              point_1.coords.usrCoords.slice(0),
              point_2.coords.usrCoords.slice(0),
            ],
            {
              strokeColor: "red", // Color del nuevo círculo.
              strokeWidth: 2,
              fillOpacity: 0.2,
            }
          );

          createCircle.push(circle); // Agrega el círculo creado al array para referencia futura.
        },
      ],
      { cssClass: "mybutton" }
    );
  }
  setVisible(status: boolean = false) {
    this.compasVisible = status;
  }
}

class DrawingBoard {
  private boardInstance: JXG.Board | undefined;
  private ruler?: Ruler;
  private protractor?: Protractor;
  private compass?: Compass;

  constructor(
    id: string,
    boundingbox: [x1: number, y1: number, x2: number, y2: number] = [
      -15, 15, 15, -15,
    ]
  ) {
    const boardRef = document.getElementById(id);
    if (boardRef) {
      this.boardInstance = JXG.JSXGraph.initBoard(id, {
        boundingbox,
        pan: {
          enabled: true,
          needTwoFingers: true,
        },
        zoom: false,
        showCopyright: false,
        showNavigation: false,
        axis: true,
        defaultAxes: {
          x: {
            strokeColor: "black", // Color azul para el eje X

            ticks: {
              majorHeight: 8,
              color: "black",
              label: {
                layer: 2,
                anchorX: "middle",
                offset: [0, -10],
              },
            },
          },
          y: {
            strokeColor: "black", // Color azul para el eje X

            ticks: {
              majorHeight: 8,

              label: {
                layer: 2,
                anchorX: "middle",
                offset: [-10, 0],
              },
            },
          },
        },
        grid: true,
      });
    }
  }

  addRuler() {
    if (!this.ruler && this.boardInstance) {
      this.ruler = new Ruler(this.boardInstance as JXG.Board);
      // Dibuja una línea como ejemplo
      this.ruler.drawRuler(-7.5, 0, 7.5, 0);
    }
  }

  addProtractor() {
    if (!this.protractor) {
      this.protractor = new Protractor(this.boardInstance as JXG.Board);
      // Dibuja un transportador en una posición
      this.protractor.drawProtractor(0, 0);
      // this.protractor.setMode();
    }
  }

  addCompass() {
    if (!this.compass && this.boardInstance) {
      this.compass = new Compass(this.boardInstance);
      // Dibuja un compás en el centro
      this.compass.drawCompass(2, 2);
    }
  }
}

const Board: React.FC<BoardProps> = ({ id }) => {
  const boardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const drawingBoard = new DrawingBoard(id, [-15, 11, 15, -11]);

    // agregar las herramientas
    drawingBoard.addRuler();
    //drawingBoard.addProtractor();
    //drawingBoard.addCompass();

    // Puedes almacenar el objeto drawingBoard si necesitas acceder a él más tarde

    return () => {
      // Aquí podrías limpiar o destruir el tablero si es necesario
    };
  }, [id]);
  const darkMode = false;
  return (
    <div className="base">
      <div className="tools">
        <button className="toolBotton">{ProtractorSvg}</button>
        {/* CompassSvg, ProtractorSvg, RulerSvg */}
        <button className="toolBotton">{RulerSvg}</button>
        <button className="toolBotton">{CompassSvg}</button>
      </div>

      <div
        /* style={{
          backgroundColor: darkMode ? "" : "white",
        }} */
        id={id}
        ref={boardRef}
        className={"jxgboxBoard"}
      />
    </div>
  );
};

export default Board;
