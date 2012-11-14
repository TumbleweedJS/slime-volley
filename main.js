var background = new Image();
background.src = "images/background.png";
var background_img = new TW.Graphic.ImageRect(background, 0, 0, 800, 600);
var background_sprite = new TW.Graphic.Sprite(0, 0, 800, 600, background_img);

var slime_yellow = new Image();
slime_yellow.src = "images/slime-yellow.png";
var slime_yellow_img = new TW.Graphic.ImageRect(slime_yellow, 0, 0, 100, 50);
var slime_yellow_sprite = new TW.Graphic.Sprite(100, 350, 100, 50, slime_yellow_img);

var slime_red= new Image();
slime_red.src = "images/slime-red.png";
var slime_red_img = new TW.Graphic.ImageRect(slime_red, 0, 0, 100, 50);
var slime_red_sprite = new TW.Graphic.Sprite(600, 350, 100, 50, slime_red_img);

var net = new Image();
net.src = "images/net.png";
var net_img = new TW.Graphic.ImageRect(net, 0, 0, 16, 100);
var net_sprite = new TW.Graphic.Sprite(390, 325, 20, 100, net_img);


var ball_i = new Image();
ball_i.src = "images/ball.png";
var ball_img = new TW.Graphic.ImageRect(ball_i, 0, 0, 25, 25);
var ball_sprite = new TW.Graphic.Sprite(300, 200, 25, 25, ball_img);

var gameloop = new TW.Gameloop.Gameloop();
gameloop.fps = 30;
gameloop.tick_per_second = 60;

keyboard = new TW.Event.KeyboardInput();

var yellow = new player();
yellow.img = slime_yellow_sprite;

var red = new ia();
red.img = slime_red_sprite;

var obj_ball = new ball();
obj_ball.img = ball_sprite;

var collision_yellow = new TW.Collision.CollisionCircle(150, 400, 50);
var collision_red = new TW.Collision.CollisionCircle(650, 400, 50);
var collision_ball = new TW.Collision.CollisionCircle(313, 213, 13);

yellow.collision = collision_yellow;
obj_ball.collision = collision_ball;
red.collision = collision_red;

window.onload = function()
{
  var context = document.getElementById("myCanvas").getContext("2d");
    var view = new TW.Graphic.View(800, 600, context);
    var background_layer = new TW.Graphic.Layer(context, 0, 0,800,600);
    background_layer.pushSprite(background_sprite);
    background_layer.pushSprite(slime_yellow_sprite);
    background_layer.pushSprite(slime_red_sprite);
    background_layer.pushSprite(net_sprite);
    background_layer.pushSprite(ball_sprite);
    view.pushLayer(background_layer);
    gameloop.object.push(red);
    gameloop.object.push(yellow);
    gameloop.object.push(collision_yellow);
    gameloop.object.push(obj_ball);
    gameloop.object.push(view);
    gameloop.start();
}