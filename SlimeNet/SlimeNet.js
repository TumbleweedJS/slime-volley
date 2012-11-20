function SlimeNet(x, y, w, h) {
	this.collision = new TW.Collision.CollisionBox(x, y, w, h);
	this.sprite = new TW.Graphic.Sprite({x:x, y:y, width:w, height:h});
}