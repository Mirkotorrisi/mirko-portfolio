import * as Urpflanze from "@urpflanze/js";

export const initUrpflanze = (tick: number, mouseX: number, mouseY: number) => {
  const colorNumber = Math.floor((tick % 100) * 2.55)
    .toString(16)
    .padStart(2, "0")
    .repeat(3);
  const width = window.innerWidth;
  const height = window.innerHeight;
  const percX = Math.abs((mouseX / (width / 2)) * 50);
  const percY = 100 - Math.abs((mouseY / (height / 2)) * 50);
  const scene = new Urpflanze.Scene({
    width,
    height,
    background: "#343A40",
    color: `#${colorNumber}`,
  });

  const shape = new Urpflanze.ShapeLoop({
    repetitions: 25,
    distance: height / (percY * 0.1),
    sideLength: [width / 2, percX * 2],
    loop: {
      start: tick * 0.01,
      end: Math.PI * 2,
      inc: 0.2,
      vertex: (shapeLoopRepetition, propArguments) => {
        const frequency = propArguments.repetition.index;
        const angle = shapeLoopRepetition.offset * Math.PI * 2;

        const x = shapeLoopRepetition.offset * tick * 0.02 - 1;
        const y = Math.sin(angle * frequency);

        return [x, y];
      },
    },

    loopDependencies: ["propArguments"],
    bClosed: false,
  });
  scene.add(shape);

  const element = document.getElementById("urpflanze");
  if (element) {
    const drawer = new Urpflanze.DrawerCanvas(scene, element);
    drawer.draw();
  }
};
