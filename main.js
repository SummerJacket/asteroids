import Player from "./player.js";
import Meteor from "./meteor.js";
import { array, choose, randRange } from "./utils.js";

const model = {};

model.canvas = document.querySelector("canvas");
model.ctx = model.canvas.getContext("2d");
model.shakeTime = 0;
model.score = 0;
model.keyboard = {};
model.objects = [
  new Player(100, 100, "images/playerShip1_blue.png"),
  ...array(12).map(_ => {
    const x = randRange(0, model.canvas.width);
    const y = randRange(0, model.canvas.height);
    const image = choose([
      "images/meteorBrown_big1.png",
      "images/meteorBrown_big2.png",
      "images/meteorBrown_big3.png",
      "images/meteorBrown_big4.png",
      "images/meteorBrown_med1.png",
      "images/meteorBrown_med3.png"
    ]);
    return new Meteor(x, y, image);
  })
];

const { canvas, ctx, keyboard, objects } = model;

document.addEventListener("keydown", e => (keyboard[e.code] = true));
document.addEventListener("keyup", e => (keyboard[e.code] = false));

ctx.fillStyle = "#fff";
ctx.font = "50px Righteous";

const update = () => {
  ctx.save();
  if (model.shakeTime) {
    model.shakeTime--;
    ctx.translate(randRange(-5, 5), randRange(-5, 5));
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  objects.forEach(obj => {
    obj.update(model);
    obj.draw(ctx);
    obj.lateUpdate(objects);
  });
  ctx.fillText(`Score: ${model.score}`, 40, canvas.height - 40);
  ctx.restore();
  requestAnimationFrame(update);
};
requestAnimationFrame(update);

window.model = model;
