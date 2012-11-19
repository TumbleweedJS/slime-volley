var background_img = new Image();
background_img.src = "images/background.png";
var background_sprite = new TW.Graphic.Sprite(background_img);
background_sprite.setImage(background_img);

var net_img = new Image();
net_img.src = "images/net.png";
var net_sprite = new TW.Graphic.Sprite(net_img);
net_sprite.setImage(net_img);
net_sprite.x = 390;
net_sprite.y = 325;
var collision_net = new TW.Collision.CollisionBox(390, 325, 20, 100);

var ball_img = new Image();
ball_img.src = "images/ball.png";
var ball_sprite = new TW.Graphic.Sprite(ball_img);
ball_sprite.setImage(ball_img);
ball_sprite.x = 400;
ball_sprite.y = 200;
var ball = new ball();
ball.img = ball_sprite;
var collision_ball = new TW.Collision.CollisionCircle(413, 213, 13);
ball.collision = collision_ball;

var yellow_img = new Image();
yellow_img.src = "images/slime-yellow.png";
var yellow_slime_sprite = new TW.Graphic.Sprite(yellow_img);
yellow_slime_sprite.setImage(yellow_img);
yellow_slime_sprite.x = 100;
yellow_slime_sprite.y = 350;
var yellow_slime = new player(0, 290, "PLAYER");
yellow_slime.img = yellow_slime_sprite;
var collision_yellow = new TW.Collision.CollisionCircle(150, 400, 50);
yellow_slime.collision = collision_yellow;

var red_img = new Image();
red_img.src = "images/slime-red.png";
var red_slime_sprite = new TW.Graphic.Sprite(red_img);
red_slime_sprite.setImage(red_img);
red_slime_sprite.x = 600;
red_slime_sprite.y = 350;
var red_slime = new player(410, 700, "IA");
red_slime.img = red_slime_sprite;
var collision_red = new TW.Collision.CollisionCircle(650, 400, 50);
red_slime.collision = collision_red;

var red_score_img = new Image();
red_score_img.src = "images/score-red-0.png"
var red_score_sprite = new TW.Graphic.Sprite(red_score_img);
red_score_sprite.setImage(red_score_img);
red_score_sprite.x = 431;
red_score_sprite.y = 20;
var yellow_score_img = new Image();
yellow_score_img.src = "images/score-yellow-0.png"
var yellow_score_sprite = new TW.Graphic.Sprite(yellow_score_img);
yellow_score_sprite.setImage(yellow_score_img);
yellow_score_sprite.x = 0;
yellow_score_sprite.y = 20;

var layer = new TW.Graphic.Layer({width:800, height:600});
layer.addChild(background_sprite);
layer.addChild(yellow_slime_sprite);
layer.addChild(red_slime_sprite);
layer.addChild(net_sprite);
layer.addChild(ball_sprite);
layer.addChild(red_score_sprite);
layer.addChild(yellow_score_sprite);
var gameloop = new TW.Gameloop.Gameloop();
gameloop.fps = 30;
gameloop.tick_per_second = 30;

keyboard = new TW.Event.KeyboardInput();

window.onload = function()
{
	var canvas = document.getElementById("myCanvas");
	var window = new TW.Graphic.Window(canvas);
	window.addChild(layer);
	gameloop.object.push(window);
	gameloop.object.push(red_slime);
	gameloop.object.push(yellow_slime);
	gameloop.object.push(ball);
	gameloop.start();
};

