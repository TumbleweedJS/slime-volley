/**
 * Created with JetBrains WebStorm.
 * User: NABOT
 * Date: 11/14/12
 * Time: 8:21 PM
 * To change this template use File | Settings | File Templates.
 */

function ia(){
    this.move = 10;
    this.img = null;
    this.collision = null;
    this.score = 0;
}

ia.prototype.moveleft = function () {
    if (this.img.x - this.move >= 410){
        this.img.x -= this.move;
        this.collision.x -= this.move;
    }
}

ia.prototype.moveright = function () {
    if (this.img.x + this.move <= 700){
        this.img.x += this.move;
        this.collision.x += this.move;
    }
}

ia.prototype.update = function () {

    if (obj_ball.img.x > 310 && obj_ball.img.y < this.img.y) {
        if (obj_ball.collision.x < this.collision.x - 5)
            this.moveleft();
        else if (obj_ball.collision.x > this.collision.x + 5)
            this.moveright();
       }
    else if (this.img.x < 600) {
        this.moveright();
    } else if (this.img.x > 600) {
        this.moveleft();
    }

}