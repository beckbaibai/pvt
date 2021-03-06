/**
 * Server side we import shared objects.
 */
if( 'undefined' !== typeof global ){
    var helper = require("./game.shared.helper.js");
	var CONSTANTS = helper.CONSTANTS;
}

var PhysicalObject = function(/*Point*/ center, /*Point*/velocity, /*int*/ accelerationY){
	this.center = center;
	this.velocity = velocity;
	this.accelerationY = accelerationY;
}

PhysicalObject.prototype.update = function(){
	this.center.X = this.center.X + this.velocity.X;
	this.center.Y = this.center.Y + this.velocity.Y;
	this.velocity.Y = this.velocity.Y + this.accelerationY;
}

PhysicalObject.prototype.gravity = function(){
	this.accelerationY = this.accelerationY + CONSTANTS.gravity;
}

/**
 * Server side we export PhysicalObject
 */
if( 'undefined' !== typeof global ) {
    module.exports = PhysicalObject;
}