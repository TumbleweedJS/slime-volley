/**
 * Created with JetBrains WebStorm.
 * User: NABOT
 * Date: 11/14/12
 * Time: 5:08 PM
 * To change this template use File | Settings | File Templates.
 */

function ball(){
    this.vx = 20;
    this.vy = 1
    this.img = null;
    this.collision = null;
    this.time = 0;
}
ball.prototype.reset = function () {
    this.vx = -10;
    this.vy = 1
    this.img.x = 300;
    this.img.y = 200;
}

ball.prototype.move = function() {
    if (this.img.y + this.vy + 1 >= 400) {
        this.vy = -20;
  //      this.reset();
    }
    if (this.img.x <= 0 || this.img.x + this.vx > 800) {
        this.vx *= -1;
    }
    if (this.img.x + this.vx < 410 && this.img.x + this.vx > 390 && this.img.y + this.vy > 325){
        this.vx *= -1;
    }


    if (this.vy < 10)
        this.vy += 1;
    this.img.x += this.vx;
    this.img.y += this.vy;
    this.collision.x += this.vx;
    this.collision.y += this.vy;
}



ball.prototype.update = function () {
    var date = new Date();

//alert("(" + this.img.x + "," + this.img.y + ") ("  + this.collision.x + "," + this.collision.y + ") (" + yellow.collision.x + "," + yellow.collision.y + ")");

    if (this.collision.isCollidingCircle(yellow.collision) || this.collision.isCollidingCircle(red.collision) ){
        this.vy = -20;
        this.vx *= -1;
        }
    if (this.time === 0) {
        this.move();
        this.time = date.valueOf();
    } else {
        var count = (date.valueOf() - this.time);
        count /= 20;
        if (count > 1){
            this.time = date.valueOf();
        }
        for (count; count > 1; count--) {
            this.move();
         }
    }
}