var game = new Phaser.Game(600, 250 , Phaser.AUTO,"");
var main = new Phaser.State();
game.state.add('Main', main);
game.state.start('Main');

main.init = function(){
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.world.enableBody = true;
    game.stage.backgroundColor = "#489ad8";
}

main.preload = function(){
    game.load.image('box', 'img/box.png');
}

main.create = function(){
    this.walls = game.add.group();
    //left wall
    for(var i=0; i<4; i++){
        var wall = game.add.sprite(0, 30*i, 'box','', this.walls);
        wall.scale.setTo(0.6, 0.6);
    }
    //ground
    for(var i=1; i<13; i++){
        var wall = game.add.sprite(30*i, 90, 'box','', this.walls);
        wall.scale.setTo(0.6, 0.6);
    }
    //right wall
    for(var i=0; i<4; i++){
        var wall = game.add.sprite(390, 30*i, 'box','', this.walls);
        wall.scale.setTo(0.6, 0.6);
    }

    this.walls.x = 90;
    this.walls.y = game.world.centerY-60;
    this.walls.setAll('tint', 0x1a5882);
    this.walls.forEach(game.physics.enable, game.physics);
    this.walls.setAll('body.immovable', true);

    this.player = game.add.sprite(game.world.centerX+30, 80, 'box');
    this.player.scale.setTo(0.6, 0.6);
    this.player.body.gravity.y = 600;

    this.cursor = game.input.keyboard.createCursorKeys();

    this.lava = game.add.sprite(420, game.world.centerY, 'box');
    this.lava.scale.setTo(0.6, 0.6);
    this.lava.tint = 0xd95f49;

    this.coins = game.add.group();
    for(var i=0; i<3; i++){
        var coin = game.add.sprite(150+60*i, game.world.centerY, 'box','', this.coins);
        coin.scale.setTo(0.6, 0.6);
        coin.tint = 0xecc133;
    }
    this.coins.forEach(game.physics.enable, game.physics);
}

main.update = function(){
    game.physics.arcade.collide(this.player, this.walls);
    game.physics.arcade.overlap(this.player, this.lava, this.restart, null, this);
    game.physics.arcade.overlap(this.player, this.coins, this.getCoin, null, this);

    if (this.cursor.left.isDown) 
        this.player.body.velocity.x = -200;
    else if (this.cursor.right.isDown) 
        this.player.body.velocity.x = 200;
    else 
        this.player.body.velocity.x = 0;

    if (this.cursor.up.isDown && this.player.body.touching.down) 
        this.player.body.velocity.y = -250;
}

main.restart = function(){
     game.state.start('Main');
 }

 main.getCoin = function(player, coin){
    coin.kill();
 }