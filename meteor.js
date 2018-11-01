import GameObject from "./gameobject.js";
import TinyMeteor from "./tiny-meteor.js";
import { array, wrap, randRange } from "./utils.js";

const PADDING = 60;
const MAX_SPEED = 2;

export default class Meteor extends GameObject {
  start() {
    this.tag = "meteor";
    this.rotate = randRange(-0.05, 0.05);
    this.vx = randRange(-MAX_SPEED, MAX_SPEED);
    this.vy = randRange(-MAX_SPEED, MAX_SPEED);
  }

  update({ canvas }) {
    this.direction += this.rotate;

    this.x += this.vx;
    this.y += this.vy;

    this.x = wrap(this.x, canvas.width, PADDING);
    this.y = wrap(this.y, canvas.height, PADDING);
  }

  respawn(model) {
    const { canvas, objects } = model;

    model.shakeTime = 5;
    model.score++;

    const particles = array(randRange(20, 30)).map(
      () => new TinyMeteor(this.x, this.y, "images/meteorBrown_tiny1.png")
    );

    objects.addToHead(...particles);

    if (Math.random() > 0.5) {
      this.x = randRange(-PADDING, canvas.width + PADDING);
      this.y = -PADDING;
    } else {
      this.x = -PADDING;
      this.y = randRange(-PADDING, canvas.height + PADDING);
    }
  }
}
