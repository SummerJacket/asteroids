import { remove, distance } from "./utils.js";

export default class GameObject {
  constructor(x, y, imgPath) {
    this.x = x;
    this.y = y;
    this.direction = 0;
    this.opacity = 1;
    this.destroy = false;

    this.img = new Image();
    this.img.src = imgPath;

    this.start();
  }

  start() {}

  update() {
    throw new Error("Update method must be overloaded");
  }

  lateUpdate(objects) {
    if (this.destroy) {
      objects.remove(this);
    }
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.direction);

    const centerX = this.img.width / 2;
    const centerY = this.img.height / 2;
    ctx.globalAlpha = this.opacity;
    ctx.drawImage(this.img, -centerX, -centerY);

    ctx.restore();
  }

  collision(other) {
    const touchDistance = this.img.width + other.img.width;
    return distance(this, other) < touchDistance / 2;
  }
}
