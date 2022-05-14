class Player {
  constructor (x, y, w, h) {
    this.x = x;
    this.y = y - offset;
    this.w = w;
    this.h = h;
    this.player = document.getElementById('player')
    this.playerJumping = document.getElementById('player-jumping')

    this.dy = 0;
    this.jumpForce = 20;
    this.originalHeight = h;
    this.grounded = false;
    this.jumpTimer = 0;
  }

  Animate () {
    // Jump
    if (keys['touch']) {
      this.Jump();
    } else {
      this.jumpTimer = 0;
    }

    // console.log(this.y);
    this.y += this.dy;

    // Gravity
    if (this.y + this.h < canvas.height - offset) {
      this.dy += gravity;
      this.grounded = false;
    } else {
      this.dy = 0;
      this.grounded = true;
      this.y = canvas.height - this.h - offset;
    }

    this.Draw();
  }

  Jump () {
    if (this.grounded && this.jumpTimer == 0) {
      this.jumpTimer = 1;
      this.dy = -this.jumpForce;
    } else if (this.jumpTimer > 0 && this.jumpTimer < 15) {
      this.jumpTimer++;
      this.dy = -this.jumpForce - (this.jumpTimer / 50);
    }
  }

  Draw () {
    ctx.beginPath();
    if (this.jumpTimer === 0) {
      ctx.drawImage(this.player, this.x, this.y, this.w, this.h)
    } else {
      ctx.drawImage(this.playerJumping, this.x, this.y, this.w, this.h)
    }
    ctx.closePath();
  }
}