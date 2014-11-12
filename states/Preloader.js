BasicGame.Preloader = function (game) {
    this.random = null;
};

BasicGame.Preloader.prototype = {

    preload: function () {
        var preloadBar = this.add.image(70, 150, 'bar');
        this.load.setPreloadSprite(preloadBar);
        this.load.tilemap('level1', 'image.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('gameTiles', 'tileset.png');
        this.load.image('player', 'player.png');
        this.load.image('bg', 'bg.png');
        this.load.image('blocks', 'blocks.png');
        this.load.image('wall', 'wall.png');
        this.load.image('square', 'square.png');
        this.load.image('fireball', 'fireball.png');
        this.load.image('enemy', 'enemy.png');
    },

    create: function () {
        this.state.start('MainMenu');
    },

    update: function () {

    }

}