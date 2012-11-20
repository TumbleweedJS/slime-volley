/**
 * Created with JetBrains WebStorm.
 * User: Zodoh
 * Date: 20/11/12
 * Time: 00:57
 * To change this template use File | Settings | File Templates.
 */

function ImageLoader() {
	this.imagesToLoad = [];
	this.imagesLoaded = [];
	this.loadingComplete = false;
}

ImageLoader.prototype.initialize = function() {
	this.addImageToLoad("images/background.png","background");
	this.addImageToLoad("images/ball.png","ball");
	this.addImageToLoad("images/net.png","net");
	this.addImageToLoad("images/score-red-0.png","red-0");
	this.addImageToLoad("images/score-red-1.png","red-1");
	this.addImageToLoad("images/score-red-2.png","red-2");
	this.addImageToLoad("images/score-red-3.png","red-3");
	this.addImageToLoad("images/score-red-4.png","red-4");
	this.addImageToLoad("images/score-red-5.png","red-5");
	this.addImageToLoad("images/score-red-6.png","red-6");
	this.addImageToLoad("images/score-red-7.png","red-7");
	this.addImageToLoad("images/score-yellow-0.png","yellow-0");
	this.addImageToLoad("images/score-yellow-1.png","yellow-1");
	this.addImageToLoad("images/score-yellow-2.png","yellow-2");
	this.addImageToLoad("images/score-yellow-3.png","yellow-3");
	this.addImageToLoad("images/score-yellow-4.png","yellow-4");
	this.addImageToLoad("images/score-yellow-5.png","yellow-5");
	this.addImageToLoad("images/score-yellow-6.png","yellow-6");
	this.addImageToLoad("images/score-yellow-7.png","yellow-7");
	this.addImageToLoad("images/slime-red-bad.png","red-bad");
	this.addImageToLoad("images/slime-red-happy.png","red-happy");
	this.addImageToLoad("images/slime-red-normal.png","red-normal");
	this.addImageToLoad("images/slime-yellow-bad.png","yellow-bad");
	this.addImageToLoad("images/slime-yellow-happy.png","yellow-happy");
	this.addImageToLoad("images/slime-yellow-normal.png","yellow-normal");
};

ImageLoader.prototype.addImageToLoad = function(imagePath, imageName) {
	this.imagesToLoad.push({src : imagePath, name : imageName});
};

ImageLoader.prototype.getImageByName = function(imageName) {
	for (var i = 0; i < this.imagesToLoad.length; i++) {
		if (this.imagesToLoad[i].name === imageName) {
			return this.imagesLoaded[i];
		}
	}
	return null;
};

ImageLoader.prototype.getLoadingPercents = function() {
	var nbImagesToLoad = this.imagesToLoad.length;
	var nbImagesLoaded = 0;

	for (var i = 0; i < this.imagesLoaded.length; i++) {
		if (this.imagesLoaded[i].complete === true)
			nbImagesLoaded++;
	}
	return ((nbImagesLoaded / nbImagesToLoad) * 100);
};

ImageLoader.prototype.loadImages = function() {
	this.imagesLoaded = [];
	var image_tmp = null;
	for (var i = 0; i < this.imagesToLoad.length; i++) {
		image_tmp = new Image();
		image_tmp.src = this.imagesToLoad[i].src;
		this.imagesLoaded.push(image_tmp);
	}
};

ImageLoader.prototype.isLoadingComplete = function() {
	if (this.loadingComplete === true)
		return true;
	for (var i = 0; i < this.imagesLoaded.length; i++) {
		if (this.imagesLoaded[i].complete === false)
			return false;
	}
	this.loadingComplete = true;
	return true;
};