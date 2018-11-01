import GameObject from "./gameobject.js";
import { randRange } from "./utils.js";

const MAX_SPEED = 8;

export default class TinyMeteor extends GameObject {
  start() {
    this.tag = "tiny";
    this.vx = randRange(-MAX_SPEED, MAX_SPEED);
    this.vy = randRange(-MAX_SPEED, MAX_SPEED);
    this.decay = randRange(0.01, 0.1);
  }

  update() {
    this.opacity -= this.decay;
    if (this.opacity < 0) {
      this.opacity = 0;
      this.destroy = true;
    }

    this.x += this.vx;
    this.y += this.vy;
  }
}
