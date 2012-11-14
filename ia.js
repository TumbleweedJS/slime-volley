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

    if (this.img.x >= obj_ball.img.x)
        this.moveleft();
    else
        this.moveright();

}