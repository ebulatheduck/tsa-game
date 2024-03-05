'use strict';
let player, cursors, platforms, tilemap, tileset, boundaries;
let {KeyCodes} = Phaser.Input.Keyboard;

class Scene extends Phaser.Scene {
    preload = () => {
        cursors = this.input.keyboard.addKeys({
            W: KeyCodes.W,
            A: KeyCodes.A,
            S: KeyCodes.S,
            D: KeyCodes.D,
            up: KeyCodes.UP,
            down: KeyCodes.DOWN,
            left: KeyCodes.LEFT,
            right: KeyCodes.RIGHT
        });

        // TODO: Replace test images with actual sprites
        this.load.image('chrome', 'assets/chrome-blank.png');
        this.load.image('train', 'assets/image0-17.png');
        this.load.image('ios', 'assets/ios_sample.png');

        this.load.image('kenny', 'assets/tileset/kenny_platformer.png');
        this.load.tilemapTiledJSON('testmap', 'assets/tilemap/test.json');
    }

    create = () => {
        this.add.image(800, 500, 'chrome');
        
        tilemap = this.make.tilemap({key: 'testmap'});
        tileset = tilemap.addTilesetImage('kenny');
        
        platforms = tilemap.createLayer('Platforms', tileset);
        platforms.setCollisionByExclusion(-1, true);

        boundaries = this.physics.add.staticGroup();
        boundaries.add(this.add.line(tilemap.widthInPixels, tilemap.heightInPixels / 2, 0, 0, 0, tilemap.heightInPixels)); // right
        boundaries.add(this.add.line(tilemap.widthInPixels / 2, tilemap.heightInPixels, 0, 0, tilemap.widthInPixels)); // bottom
        boundaries.add(this.add.line(0, tilemap.heightInPixels / 2, 0, 0, 0, tilemap.heightInPixels)); // left
        boundaries.add(this.add.line(tilemap.widthInPixels / 2, 0, 0, 0, tilemap.widthInPixels)); // top

        player = this.physics.add.image(29, 355, 'ios');
        this.physics.add.collider(player, boundaries);
        this.physics.add.collider(player, platforms);
        player.setBounce(0.1);

        this.cameras.main.startFollow(player, true, 0.2);
    }

    update = () => {
        player.setVelocityX(
            cursors.left.isDown || cursors.A.isDown ? -200 :
            cursors.right.isDown || cursors.D.isDown ? 200 : 0);

        if ((cursors.up.isDown || cursors.W.isDown) && player.body.blocked.down) {
            player.setVelocityY(-450);
        }
    }
}

const game = new Phaser.Game({
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 350 },
            debug: true
        }
    },
    scene: Scene
});
