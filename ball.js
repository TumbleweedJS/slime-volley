/**
 * Created with JetBrains WebStorm.
 * User: NABOT
 * Date: 11/14/12
 * Time: 5:08 PM
 * To change this template use File | Settings | File Templates.
 */

function ball(){
    this.vx = 20;
    this.vy = 1;
    this.img = null;
    this.collision = null;
    this.time = 0;
}
ball.prototype.reset = function () {
    gameloop.pause();
    if (this.img.x < 390)
        red.score++;
    else
        yellow.score++;

    alert("Score : " + yellow.score + " - " + red.score);

    this.vx = -20;
    this.vy = 1
    this.img.x = 300;
    this.collision.x = 313;
    this.img.y = 200;
    this.collision.y = 213;
    this.time = 0;
    gameloop.start();
}

ball.prototype.move = function() {
    if (this.img.y >= 375) {
//        this.reset();
        this.vy = -20;
    }
    if (this.img.x <= 0 || this.img.x + this.vx >= 800) {
        this.vx *= -1;
    }
    if (this.collision.isCollidingBox(collision_net)) {
        this.vx *= -1;
    }


    if (this.vy < 10)
        this.vy += 1;
    this.img.x += this.vx;
    this.img.y += this.vy;
    this.collision.x += this.vx;
    this.collision.y += this.vy;
}

ball.prototype.bounce = function(circle) {
//    alert(circle.collision.x + "," + circle.collision.y);
//    alert(this.collision.x + "," + this.collision.y);

    var vector_normal_x = this.collision.x - circle.collision.x;
    var vector_normal_y = this.collision.y - circle.collision.y;

var penetration = circle.collision.radius + this.collision.radius - Math.sqrt(vector_normal_x * vector_normal_x + vector_normal_y * vector_normal_y);

    if (penetration > 0){
        this.collision.x -= penetration;
        this.collision.y -= penetration;
        this.img.x -= penetration;
        this.img.y -= penetration;
        vector_normal_x = this.collision.x - circle.collision.x;
        vector_normal_y = this.collision.y - circle.collision.y;
    }

    vector_normal_x /=  Math.sqrt(vector_normal_x * vector_normal_x + vector_normal_y * vector_normal_y);
    vector_normal_y /=  Math.sqrt(vector_normal_x * vector_normal_x + vector_normal_y * vector_normal_y);

    var vector_x = -vector_normal_y;
    var vector_y = vector_normal_x;

//    alert("vector normal: " + vector_normal_x + "," + vector_normal_y);
//    alert("vector : " + vector_x + "," + vector_y);
//    alert("vitesse vec : "+ this.vx + "," + this.vy);

    var dp1 = this.vx * vector_x + this.vy * vector_y;
    var dp2 = this.vx * vector_normal_x + this.vy * vector_normal_y;
//    alert ("dp1 : " + dp1 + " dp2 : " + dp2);

    var proj1_x = dp1 * (vector_x / Math.sqrt(vector_x * vector_x + vector_y * vector_y));
    var proj1_y = dp1 * (vector_y / Math.sqrt(vector_x * vector_x + vector_y * vector_y));
//    alert("proj 1 = " + proj1_x + ","+ proj1_y);

    var proj2_x = dp2 * (vector_normal_x / Math.sqrt(vector_x * vector_x + vector_y * vector_y));
    var proj2_y = dp2 * (vector_normal_y / Math.sqrt(vector_x * vector_x + vector_y * vector_y));

    proj2_x *= -1;
    proj2_y *= -1;

//    alert(this.vx + "," + this.vy);
    this.vx = proj1_x + proj2_x;
    this.vy = proj1_y + proj2_y;
//    alert(this.vx + "," + this.vy);
//    this.vx /= 10;
//    this.vy /= 10;
//    this.vy = -20;
}

ball.prototype.update = function () {
    var date = new Date();

//    if (this.collision.isCollidingCircle(yellow.collision) || this.collision.isCollidingCircle(red.collision) ){
//        this.vy = -20;
//        this.vx *= -1;
//        }

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
    if (this.collision.isCollidingCircle(yellow.collision)) {
        this.bounce(yellow);
    } else if (this.collision.isCollidingCircle(red.collision)) {
        this.bounce(red);
    }
}