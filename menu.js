/**
 * Menu controls for interfacting with the index.html HTML document.
 */
 
/**
 * Setup menu controls
 */
var Menu = function(){
	//Setup lobby client.
	this.lobby = new LobbyClient(this);
	//Setup lobby socket io.
	this.lobby.newSocket();
};

/**
 * Code to execute when player enters game lobby.
 */
Menu.prototype.play = function(){
	//Setup lobby client.
	this.lobby.joinGame();
	this.game = new GameClient();
}

var menu = new Menu();