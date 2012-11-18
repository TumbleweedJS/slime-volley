/**
 * Created with JetBrains WebStorm.
 * User: NABOT
 * Date: 11/14/12
 * Time: 5:08 PM
 * To change this template use File | Settings | File Templates.
 */

function ball() {
	this.vx = -20;
	this.vy = 1;
	this.img = null;
	this.collision = null;
	this.time = 0;
}
ball.prototype.reset = function() {
	gameloop.pause();
	if (this.img.x < 390) {
		red_slime.score++;
	}
	else {
		yellow_slime.score++;
	}

	alert("Score : " + yellow_slime.score + " - " + red_slime.score);

	this.vx = -20;
	this.vy = 1;
	this.img.x = 400;
	this.collision.x = 413;
	this.img.y = 200;
	this.collision.y = 213;
	this.time = 0;
	gameloop.start();
};

ball.prototype.move = function() {
	if (this.img.y >= 375) {
		this.reset();
		//        this.collision.x -= this.vx;
		//        this.collision.y -= this.vy;
		//        this.img.x -= this.vx;
		//        this.img.y -= this.vy;
		//        this.vy = -20;
	}
	if (this.img.x <= 0) {
		this.vx *= -1;
		this.img.x = 0;
		this.collision.x = 13;
	}
	if (this.img.x > 775) {
		this.vx *= -1;
		this.img.x = 775;
		this.collision.x = 788;
	}
	if (this.collision.isCollidingBox(collision_net)) {
		while (this.collision.isCollidingBox(collision_net)) {
			this.collision.x -= this.vx / 10;
			this.collision.y -= this.vy / 10;
			this.img.x -= this.vx / 10;
			this.img.y -= this.vy / 10;
		}
		this.vx *= -1;
		this.vy *= -1;
	}
	if (this.vy < 20) {
		this.vy += 1;
	}

	this.img.x += this.vx;
	this.img.y += this.vy;
	this.collision.x += this.vx;
	this.collision.y += this.vy;
}
;

ball.prototype.bounce = function(circle) {

	if (this.collision.y > circle.collision.y) {
		return;
	}
	while (this.collision.isCollidingCircle(circle.collision)) {
		this.collision.x -= this.vx / 10;
		this.collision.y -= this.vy / 10;
		this.img.x -= this.vx / 10;
		this.img.y -= this.vy / 10;
	}
	var vector_normal_x = this.collision.x - circle.collision.x;
	var vector_normal_y = this.collision.y - circle.collision.y;
	var vector_x = -vector_normal_y;
	var vector_y = vector_normal_x;

	var dp1 = this.vx * vector_x + this.vy * vector_y;
	var dp2 = this.vx * vector_normal_x + this.vy * vector_normal_y;

	var proj1_x = dp1 * (vector_x / Math.sqrt(vector_x * vector_x + vector_y * vector_y));
	var proj1_y = dp1 * (vector_y / Math.sqrt(vector_x * vector_x + vector_y * vector_y));

	var proj2_x = dp2 * (vector_normal_x / Math.sqrt(vector_x * vector_x + vector_y * vector_y));
	var proj2_y = dp2 * (vector_normal_y / Math.sqrt(vector_x * vector_x + vector_y * vector_y));

	proj2_x *= -1;
	proj2_y *= -1;

	this.vx = proj1_x + proj2_x;
	this.vy = proj1_y + proj2_y;

	var lenght = (Math.sqrt(this.vx * this.vx + this.vy * this.vy) / 25);
	this.vx = this.vx / lenght;
	this.vy = this.vy / lenght;

};

ball.prototype.update = function() {
	var date = new Date();
	if (this.time === 0) {
		this.move();
		this.time = date.valueOf();
	} else {
		var count = (date.valueOf() - this.time);
		count /= 20;
		if (count > 1) {
			this.time = date.valueOf();
		}
		for (count; count > 1; count--) {
			this.move();
		}
	}
	if (this.collision.isCollidingCircle(yellow_slime.collision)) {
		this.bounce(yellow_slime);
	} else if (this.collision.isCollidingCircle(red_slime.collision)) {
		this.bounce(red_slime);
	}
};