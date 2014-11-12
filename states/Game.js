/**
 * Created by luca on 01/11/14.
 */
BasicGame.Game = function (game) {
    this.random = null;
    this.timer = null;
};

var player, cursors, map, layer, blocks, bg, text, walls, win, enemy, fires;
var wallsArray = [];
var enemies = false;
var speed = 0.5; 
var level = 1;

BasicGame.Game.prototype = {

    preload: function(){
    },

    create: function(){
        this.physics.startSystem(Phaser.Physics.ARCADE);
        walls = this.add.group();
        win = this.add.sprite(611, 160, 'square');
        win.scale.setTo(0.5, 0.5);
        wallsArray[0] = this.add.sprite(611,0, 'wall');
        walls.add(wallsArray[0]);
        wallsArray[1] = this.add.sprite(611,232, 'wall');
        walls.add(wallsArray[1]);
        bg = this.add.sprite(0, 0, 'bg');
        blocks = this.add.sprite(-600, 0, 'blocks');
        player = this.add.sprite(300, 100, 'player');
        text = this.add.text(30, 320, "level: " + level, {font: "30px Arial" , fill:"#fff"});
        player.scale.setTo(2, 2);
        fires = this.add.group();

        if(level >= 5){
            this.spawnSingleMob();
        }

        this.physics.arcade.enable(bg);
        this.physics.arcade.enable(player);
        this.physics.arcade.enable(walls);
        this.physics.arcade.enable(blocks);
        this.physics.arcade.enable(win);
        this.timer = this.time.events.loop(1000, this.fireball, this);
        cursors = this.input.keyboard.createCursorKeys();
    },

    update: function(){
        if(player.y < 29){player.y += 2;}
        if(player.y > 300){player.y -= 2;}
        // text.text = "x: " + player.x + " y: " + player.y;
        this.physics.arcade.overlap(walls, player, this.collide2, null, this);
        this.physics.arcade.overlap(blocks, player, this.collide, null, this);
        this.physics.arcade.overlap(win, player, this.win, null, this);
        this.physics.arcade.overlap(enemy, player, this.restart, null, this);
        this.physics.arcade.overlap(fires, player, this.restart, null, this);
        blocks.x += (0.1 * level) + 1;
//        blocks2.y += 1.9  ;
        
        if(cursors.left.isDown) {player.x -= 2;}
        if(cursors.right.isDown) {player.x += 2;}
        if(cursors.up.isDown) {player.y -= 2;}
        if(cursors.down.isDown) {player.y += 2;}
        
        if(enemies == false){
            return;
        }
        this.updateEnemy();
    },

    updateEnemy: function(){
        if(enemy.x < player.x){enemy.x += ((level / 20) + speed);}
        if(enemy.x > player.x){enemy.x -= ((level / 20) + speed);}

        if(enemy.y < player.y){enemy.y += ((level / 20) + speed);}
        if(enemy.y > player.y){enemy.y -= ((level / 20) + speed);}

    },

    win: function(){
        level = level + 1;
        this.state.start('Game');
    },

    collide2: function(){
      player.x -= 2;
    },

    collide: function(){
        this.state.start('MainMenu');
    },
    spawnSingleMob: function() {
        var p = Math.floor((Math.random() * 360) + 1);
        enemy = this.add.sprite(600, p, 'enemy');
        this.physics.arcade.enable(enemy);
        enemies = true;
    },
    restart: function(){
        level = 1;
        this.state.start('MainMenu');
    },
    fireball: function(){

        var x = Math.random();
        if(x < 0.1){x + 0.1;}
        x = (x + 0.1) * 360 - 30;
        // if(x < blocks.x + 360){this.fireball(); return;}
        
        var steveSprite = this.add.sprite(640, x, 'fireball', 0, fires);
        this.physics.arcade.enable(steveSprite);
        steveSprite.body.velocity.x = -100 - (level*5);
    }

}