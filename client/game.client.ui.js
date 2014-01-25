/** 
 * Game Client UI.
 */s

var GameClientUI = function(/*GameClient*/ client){
    this.client = client;
    
    this.stage = new Kinetic.Stage({
        container: 'game',
        id: 'gameCanvas',
        width: CONSTANTS.width,
        height: CONSTANTS.height
    });
    this.backLayer = new Kinetic.Layer();
    this.platformLayer = new Kinetic.Layer();
    this.frontLayer = new Kinetic.Layer();
    
    // sprites
    this.background = null;
    this.floor = null;
    this.platform = null;
    this.grassHalf = null;
    this.grassHalfLeft = null;
    this.grassHalfMid = null;
    this.grassHalfRight = null;
};

/**
 * Function to load all sprite images.
 */
GameClientUI.prototype.loadImage = function(){

    var loadImage = function(url) {
        var img = new Image();
        img.src = url;
        return img;
    };
    
    this.background = loadImage("..\\sprites\\background.png");
    this.floor = loadImage("..\\sprites\\floor.png");
    this.grassHalf = loadImage("..\\sprites\\grassHalf.png");
    this.grassHalfLeft = loadImage("..\\sprites\\grassHalfLeft.png");
    this.grassHalfMid = loadImage("..\\sprites\\grassHalfMid.png");
    this.grassHalfRight = loadImage("..\\sprites\\grassHalfRight.png");
};

/**
 * Initialize game UI.
 */
GameClientUI.prototype.initGameUI = function(){

    // Create two Kinetic image objects for the scrolling background
    var bg1 = new Kinetic.Image({
        x: 0,
        y: 0,
        image: this.background,
        width: this.background.width,
        height: CONSTANTS.height
	});
	var bg2 = new Kinetic.Image({
        x: this.background.width,
        y: 0,
        image: this.background,
        width: this.background.width,
        height: CONSTANTS.height
	});
	this.backLayer.add(bg1);
	this.backLayer.add(bg2);
    
    // Kinetic animation to scroll the background
    this.bgAnim = new Kinetic.Animation(function(frame){
        var timeDiff = frame.timeDiff;
        //assuming 16ms/f is maximum
        if((bg1.getAbsolutePosition().x + bg1.width()) <= 0){ 
            bg1.setX(bg2.getAbsolutePosition().x + bg2.width());
        }
        if((bg2.getAbsolutePosition().x + bg2.width()) <= 0){
            bg2.setX(bg1.getAbsolutePosition().x + bg1.width());
        }
        bg1.move({x: CONSTANTS.backgroundScrollSpeed * (timeDiff / 16), 
                  y: 0});
        bg2.move({x: CONSTANTS.backgroundScrollSpeed * (timeDiff / 16), 
                  y: 0});
	}, this.backLayer);
    this.bgAnim.start();
    
    // Create two Kinetic image objects for the scrolling floor
    var floor1 = new Kinetic.Image({
        x: 0,
        y: CONSTANTS.height - CONSTANTS.floorHeight,
        image: this.floor,
        width: this.floor.width,
        height: this.floor.height
    });
    var floor2 = new Kinetic.Image({
        x: this.floor.width,
        y: CONSTANTS.height - CONSTANTS.floorHeight,
        image: this.floor,
        width: this.floor.width,
        height: this.floor.height
    });
    this.platformLayer.add(floor1);
    this.platformLayer.add(floor2);
    
    // Kinetic animation to scroll the floor and the platform
    this.platformLayerAnim = new Kinetic.Animation(function(frame){
        var timeDiff = frame.timeDiff;
        //assuming 16ms/f is maximum
        if((floor1.getAbsolutePosition().x + floor1.width()) <= 0){ 
            floor1.setX(floor2.getAbsolutePosition().x + floor2.width());
        }
        if((floor2.getAbsolutePosition().x + floor2.width()) <= 0){
            floor2.setX(floor1.getAbsolutePosition().x + floor1.width());
        }
        floor1.move({x: CONSTANTS.platformScrollSpeed * (timeDiff / 16), 
                    y: 0});
        floor2.move({x: CONSTANTS.platformScrollSpeed * (timeDiff / 16), 
                    y: 0});
	}, this.platformLayer);
    this.platformLayerAnim.start();

    // A Kinetic text to show text message at the center of canvas.
    // var centerMsg = new Kinetic.Text({
        // text: "Placeholder",
        // x: 80,
        // y: 260,
        // fill: 'rgba(127, 155, 0, 0.5)',
        // fontFamily: 'Calibri',
        // fontSize: 60,
        // fontStyle: 'italic'
    // });
    // frontLayer.add(centerMsg);
    
    // A Kinetic animation to change the text message at the center of canvas.
    //this.msgAnim = new Kinetic.Animation(function(frame) {}, frontLayer);
    //this.msgAnim.start();
};

GameClientUI.prototype.cleanUp = function(){

    // stop all animations
    this.bgAnim.stop();
    // this.msgAnim.stop();
    
    // destroy all layers and the stage
    this.backLayer.destroy();
    this.platformLayer.destroy();
    this.frontLayer.destroy();
    this.stage.destroy();
};