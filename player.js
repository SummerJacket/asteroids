import GameObject from "./gameobject.js";
import Laser from "./laser.js";
import { randRange, wrap } from "./utils.js";

const ACCELERATION_SPEED = 0.2;
const TURN_SPEED = 0.07;
const FRICTION = 0.02;
const PADDING = 50;

export default class Player extends GameObject {
  start() {
    this.tag = "player";
    this.vx = 0;
    this.vy = 0;
    this.speed = 0;
    this.counter = 0;
  }

  update(model) {
    const { canvas, keyboard, objects } = model;
    this.counter--;
    this.move(canvas, keyboard);
    this.shoot(keyboard, objects);
    this.checkCollisions(model);
  }

  move(canvas, keyboard) {
    const up = keyboard["ArrowUp"] || false;
    const left = keyboard["ArrowLeft"] || false;
    const right = keyboard["ArrowRight"] || false;

    this.direction += (right - left) * TURN_SPEED;
    this.acceleration = up * ACCELERATION_SPEED;

    this.vx += Math.cos(this.direction) * this.acceleration;
    this.vy += Math.sin(this.direction) * this.acceleration;
    this.vx -= this.vx * FRICTION;
    this.vy -= this.vy * FRICTION;

    this.x += this.vx;
    this.y += this.vy;
    this.x = wrap(this.x, canvas.width, PADDING);
    this.y = wrap(this.y, canvas.height, PADDING);
  }

  shoot(keyboard, objects) {
    const shoot = keyboard["Space"] || false;
    if (!shoot || this.counter > 0) return;

    this.counter = 8;
    const laser = new Laser(this.x, this.y, "images/laserBlue01.png");
    laser.direction = this.direction + randRange(-0.1, 0.1);
    laser.vx = Math.cos(laser.direction) * laser.speed;
    laser.vy = Math.sin(laser.direction) * laser.speed;
    objects.addToHead(laser);
  }

  checkCollisions(model) {
    const { objects } = model;
    let temp = objects.head;
    while (temp) {
      const obj = temp.value;
      if (obj.tag === "meteor" && this.collision(obj)) {
        obj.respawn(model);
      }
      temp = temp.next;
    }
  }
}
