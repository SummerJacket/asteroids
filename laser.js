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

    const meteors = objects.filter(x => x.tag === "meteor");
    meteors.some(meteor => {
      if (this.collision(meteor)) {
        this.destroy = true;
        meteor.respawn(model);
        return true;
      }
    });
  }
}
