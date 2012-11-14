/**
 * Created with JetBrains WebStorm.
 * User: NABOT
 * Date: 11/13/12
 * Time: 5:50 PM
 * To change this template use File | Settings | File Templates.
 */

function player(){
    this.move = 10;
    this.img = null;
    this.collision = null;
}

player.prototype.moveleft = function () {
    if (this.img.x - this.move >= 0){
        this.img.x -= this.move;
        this.collision.x -= this.move;
    }
}

player.prototype.moveright = function () {
    if (this.img.x + this.move <= 290){
        this.img.x += this.move;
        this.collision.x += this.move;
    }
}

player.prototype.update = function () {
    if (keyboard.getState("KEY_A") === TW.Event.KeyboardInput.KEY_PRESSED)
        this.moveleft();
    if (keyboard.getState("KEY_D") === TW.Event.KeyboardInput.KEY_PRESSED)
        this.moveright();

}