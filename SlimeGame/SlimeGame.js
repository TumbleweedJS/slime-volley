/**
 * Created with JetBrains WebStorm.
 * User: Zodoh
 * Date: 20/11/12
 * Time: 00:49
 * To change this template use File | Settings | File Templates.
 */

function SlimeGame(canvasObject) {
	this.ia_score = 0;
	this.player_score = 0;
	this.canvas = canvasObject;
	this.imageLoader = new ImageLoader();
	this.win = new TW.Graphic.Window(this.canvas);
	this.layer = new TW.Graphic.Layer({width:800, height:600});
	this.keyboard = new TW.Event.KeyboardInput();
	this.ball = new SlimeBall(150, 150, 0, 775, 375);
	this.player = new SlimePlayer(100, 350, 0, 290, "PLAYER");
	this.ia = new SlimePlayer(600, 350, 410, 700, "IA");
	this.net = new SlimeNet(390, 325, 20, 100);
	this.background = new TW.Graphic.Sprite({x:0, y:0, width:800, height:600});
	this.sprite_score_ai = new TW.Graphic.Sprite({x:431, y:20, width:369, height:42});
	this.sprite_score_player = new TW.Graphic.Sprite({x:0, y:20, width:369, height:42});
}

SlimeGame.prototype.initialize = function() {
	this.imageLoader.initialize();
	this.imageLoader.loadImages();
	this.player.collision = new TW.Collision.CollisionCircle(250, 400, 50);
	this.ia.collision = new TW.Collision.CollisionCircle(650, 400, 50);
	this.player.sprite.setImage(this.imageLoader.getImageByName("yellow-normal"));
	this.ia.sprite.setImage(this.imageLoader.getImageByName("red-normal"));
	this.net.sprite.setImage(this.imageLoader.getImageByName("net"));
	this.ball.sprite.setImage(this.imageLoader.getImageByName("ball"));
	this.background.setImage(this.imageLoader.getImageByName("background"));
	this.sprite_score_ai.setImage(this.imageLoader.getImageByName("red-0"));
	this.sprite_score_player.setImage(this.imageLoader.getImageByName("yellow-0"));
	this.layer.addChild(this.background);
	this.layer.addChild(this.net.sprite);
	this.layer.addChild(this.ia.sprite);
	this.layer.addChild(this.player.sprite);
	this.layer.addChild(this.ball.sprite);
	this.layer.addChild(this.sprite_score_ai);
	this.layer.addChild(this.sprite_score_player);
	this.win.addChild(this.layer);
};

SlimeGame.prototype.draw = function() {
	this.win.draw();
	this.player.collision.draw(this.win.getCanvas());
};

SlimeGame.prototype.score = function () {

	if (this.ia_score === 8 || this.player_score === 8) {
		this.ia_score = 0;
		this.player_score = 0;
	}

	if (this.ball.position.x < 400) {
		this.ia_score++;
		this.sprite_score_ai.setImage(this.imageLoader.getImageByName("red-" + this.ia_score));
		this.ball.reset(this.ia.collision.x);
	} else {
		this.player_score++;
		this.sprite_score_player.setImage(this.imageLoader.getImageByName("yellow-" + this.player_score));
		this.ball.reset(this.player.collision.x);
	}
	if (this.ia_score > this.player_score) {
		this.player.sprite.setImage(this.imageLoader.getImageByName("yellow-bad"));
		this.ia.sprite.setImage(this.imageLoader.getImageByName("red-happy"));
	} else if (this.ia_score < this.player_score) {
		this.player.sprite.setImage(this.imageLoader.getImageByName("yellow-happy"));
		this.ia.sprite.setImage(this.imageLoader.getImageByName("red-bad"));
	} else {
		this.player.sprite.setImage(this.imageLoader.getImageByName("yellow-normal"));
		this.ia.sprite.setImage(this.imageLoader.getImageByName("red-normal"));
	}
};

SlimeGame.prototype.update = function() {
	this.player.update(this.keyboard);
	this.ia.update(this.ball.collision);
	this.ball.update(this.player.collision, this.ia.collision, this.net.collision);
	if (this.ball.position.y > this.ball.y_max) {
		this.score();
	}
}