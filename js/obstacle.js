class Obstacle {
  constructor (x, y, w, h, t) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.type = t;
    const obstacles = [
      document.getElementById('obstacle_0'), 
      document.getElementById('obstacle_1'), 
      document.getElementById('obstacle_2'),
      document.getElementById('obstacle_3')
    ]
    this.c = obstacles[t];


    this.dx = -gameSpeed;
  }

  Update () {
    this.x += this.dx;
    this.Draw();
    this.dx = -gameSpeed;
  }

  Draw () {
    ctx.beginPath();
    ctx.drawImage(this.c, this.x, this.y, this.w, this.h)
    ctx.closePath();
  }
}