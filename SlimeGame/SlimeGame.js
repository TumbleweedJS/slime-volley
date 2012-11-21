/**
 * Created with JetBrains WebStorm.
 * User: Zodoh
 * Date: 20/11/12
 * Time: 00:49
 * To change this template use File | Settings | File Templates.
 */

function SlimeGame(canvasObject) {
	//Set the starting values
	this.ia_score = 0;
	this.player_score = 0;

	//Load the canvas in the object
	this.canvas = canvasObject;

	//Create the image loader that will load all the images
	this.imageLoader = new ImageLoader();

	//Create the window which will contain the game
	this.win = new TW.Graphic.Window(this.canvas);

	//Create the layer which will contain the different element
	this.layer = new TW.Graphic.Layer({width:800, height:600});

	//Create the event provider. This will ensure that the key are pressed or not
	this.keyboard = new TW.Event.KeyboardInput();

	//Create the object SlimeBall
	this.ball = new SlimeBall(150, 150, 0, 775, 375);

	//Create the player and the ia through the object SlimePlayer
	this.player = new SlimePlayer(100, 350, 0, 290, "PLAYER");
	this.ia = new SlimePlayer(600, 350, 410, 700, "IA");

	//Create the object SlimeNet
	this.net = new SlimeNet(390, 325, 20, 100);

	//Create the sprite of the background and the score
	this.background = new TW.Graphic.Sprite({x:0, y:0, width:800, height:600});
	this.sprite_score_ai = new TW.Graphic.Sprite({x:431, y:20, width:369, height:42});
	this.sprite_score_player = new TW.Graphic.Sprite({x:0, y:20, width:369, height:42});
}

SlimeGame.prototype.initialize = function() {
	//Start the image loader
	this.imageLoader.initialize();

	//Load the images
	this.imageLoader.loadImages();

	//Create the collision for the different object
	this.player.collision = new TW.Collision.CollisionCircle(250, 400, 50);
	this.ia.collision = new TW.Collision.CollisionCircle(650, 400, 50);

	//Set the images to each object
	this.player.sprite.setImage(this.imageLoader.getImageByName("yellow-normal"));
	this.ia.sprite.setImage(this.imageLoader.getImageByName("red-normal"));
	this.net.sprite.setImage(this.imageLoader.getImageByName("net"));
	this.ball.sprite.setImage(this.imageLoader.getImageByName("ball"));
	this.background.setImage(this.imageLoader.getImageByName("background"));
	this.sprite_score_ai.setImage(this.imageLoader.getImageByName("red-0"));
	this.sprite_score_player.setImage(this.imageLoader.getImageByName("yellow-0"));

	//Adding of the different sprite in the layer
	this.layer.addChild(this.background);
	this.layer.addChild(this.net.sprite);
	this.layer.addChild(this.ia.sprite);
	this.layer.addChild(this.player.sprite);
	this.layer.addChild(this.ball.sprite);
	this.layer.addChild(this.sprite_score_ai);
	this.layer.addChild(this.sprite_score_player);

	//Adding the layer to the window
	this.win.addChild(this.layer);
};

SlimeGame.prototype.draw = function() {

	//Call the window draw function
	this.win.draw();
};

SlimeGame.prototype.score = function () {

	//Looking at the position of the ball in order to know who is scoring
	//Change the score and reset all the setting of the ball
	if (this.ball.position.x < 400) {
		this.ia_score++;
		this.ball.reset(this.ia.collision.x);
	} else {
		this.player_score++;
		this.ball.reset(this.player.collision.x);
	}

	//When a player reach 8 point, reset the score
	if (this.ia_score === 8 || this.player_score === 8) {
		this.ia_score = 0;
		this.player_score = 0;
	}

	//Load the images for the current score
	this.sprite_score_player.setImage(this.imageLoader.getImageByName("yellow-" + this.player_score));
	this.sprite_score_ai.setImage(this.imageLoader.getImageByName("red-" + this.ia_score));

	//Load the images for the slime face depending on the score
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

	//Call the different update function that have to be used
	this.player.update(this.keyboard);
	this.ia.update(this.ball);
	this.ball.update(this.player.collision, this.ia.collision, this.net.collision);

	//Check if the ball touch the ground
	if (this.ball.position.y > this.ball.y_max) {
		//Call the score function that will change the score and the settings of the ball.
		this.score();
	}
}