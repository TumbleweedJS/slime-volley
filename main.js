/**
 * Created with JetBrains WebStorm.
 * User: Zodoh
 * Date: 20/11/12
 * Time: 01:14
 * To change this template use File | Settings | File Templates.
 */
window.onload = function() {
	var gameloop = new TW.Gameloop.Gameloop();
	gameloop.tick_per_second = 30;
	var slimeGame = new SlimeGame(document.getElementById("my_canvas"));
	gameloop.object.push(slimeGame);
	slimeGame.initialize();
	gameloop.start();
};
