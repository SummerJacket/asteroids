import GameObject from "./gameobject.js";
import { inside } from "./utils.js";

export default class Laser extends GameObject {
  start() {
    this.tag = "laser";
    this.vx = 0;
    this.vy = 0;
    this.speed = 25;
  }

  update(model) {
    const { canvas, objects } = model;
    this.x += this.vx;
    this.y += this.vy;

    if (!inside(this, canvas)) {
      this.destroy = true;
    }

    objects.forEach(obj => {
      if (obj.tag === "meteor" && this.collision(obj)) {
        this.destroy = true;
        obj.respawn(model);
      }
    });
  }
}
