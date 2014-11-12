BasicGame.MainMenu = function (game) {
};

BasicGame.MainMenu.prototype = {

    preload: function () {
    },

    create: function () {
        this.stage.backgroundColor = "#360007";
        var text = this.add.text(134, 80, "Room Slayer", {font: "70px Impact" , fill:"#bd0018", stroke: "#fff", strokeThickness: 10});
	    var text = this.add.text(230, 166, "By CodeLuca", {font: "30px Impact" , fill:"#bd0018", stroke: "#fff", strokeThickness: 8});
	    var text = this.add.text(100, 205, "Controls: Arrows  &  Space to Start", {font: "30px Impact" , fill:"#000", stroke: "#fff", strokeThickness: 8});
	    var spacePress = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	    spacePress.onDown.add(this.press, this);
    },

    press: function(){
    	this.state.start('Game');
    },

    update: function () {

    }

}