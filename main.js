var back_img = new Image();
back_img.src = "images/background.png";
var back_image_rect = new TW.Graphic.ImageRect(back_img, 0, 0, 800, 600);
var back_sprite = new TW.Graphic.Sprite(0, 0, 800, 600, back_image_rect);

var yellow_slime_img = new Image();
yellow_slime_img.src = "images/slime-yellow.png";
var yellow_slime_image_rect = new TW.Graphic.ImageRect(yellow_slime_img, 0, 0, 100, 50);
var yellow_slime_sprite = new TW.Graphic.Sprite(100, 350, 100, 50, yellow_slime_image_rect);
var yellow_slime = new player(0, 290, "PLAYER");
yellow_slime.img = yellow_slime_sprite;
var collision_yellow = new TW.Collision.CollisionCircle(150, 400, 50);
yellow_slime.collision = collision_yellow;

var slime_red = new Image();
slime_red.src = "images/slime-red.png";
var red_slime_img = new TW.Graphic.ImageRect(slime_red, 0, 0, 100, 50);
var red_slime_sprite = new TW.Graphic.Sprite(600, 350, 100, 50, red_slime_img);
var red_slime = new player(410, 700, "IA");
red_slime.img = red_slime_sprite;
var collision_red = new TW.Collision.CollisionCircle(650, 400, 50);
red_slime.collision = collision_red;

var net_img = new Image();
net_img.src = "images/net.png";
var net_image_rect = new TW.Graphic.ImageRect(net_img, 0, 0, 16, 100);
var net_sprite = new TW.Graphic.Sprite(390, 325, 20, 100, net_image_rect);
var collision_net = new TW.Collision.CollisionBox(390, 325, 20, 100);

var ball_img = new Image();
ball_img.src = "images/ball.png";
var ball_image_rect = new TW.Graphic.ImageRect(ball_img, 0, 0, 25, 25);
var ball_sprite = new TW.Graphic.Sprite(400, 200, 25, 25, ball_image_rect);
var ball = new ball();
ball.img = ball_sprite;
var collision_ball = new TW.Collision.CollisionCircle(413, 213, 13);
ball.collision = collision_ball;

var gameloop = new TW.Gameloop.Gameloop();
gameloop.fps = 30;
gameloop.tick_per_second = 60;

keyboard = new TW.Event.KeyboardInput();

window.onload = function()
{
  var context = document.getElementById("myCanvas").getContext("2d");
    var view = new TW.Graphic.View(800, 600, context);
    var background_layer = new TW.Graphic.Layer(context, 0, 0,800,600);
    background_layer.pushSprite(back_sprite);
    background_layer.pushSprite(yellow_slime_sprite);
    background_layer.pushSprite(red_slime_sprite);
    background_layer.pushSprite(net_sprite);
    background_layer.pushSprite(ball_sprite);
    view.pushLayer(background_layer);
    gameloop.object.push(red_slime);
    gameloop.object.push(yellow_slime);
    gameloop.object.push(collision_yellow);
    gameloop.object.push(ball);
    gameloop.object.push(view);
    gameloop.start();
}