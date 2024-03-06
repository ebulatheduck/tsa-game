'use strict';
const { KeyCodes } = Phaser.Input.Keyboard;

class Scene extends Phaser.Scene {
    preload = () => {
        this.cursors = this.input.keyboard.addKeys({
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

        this.tilemap = this.make.tilemap({ key: 'testmap' });
        this.tileset = this.tilemap.addTilesetImage('kenny');

        this.platforms = this.tilemap.createLayer('Platforms', this.tileset);
        this.platforms.setCollisionByExclusion(-1, true);

        this.boundaries = this.physics.add.staticGroup();
        this.boundaries.add(this.add.line(this.tilemap.widthInPixels, this.tilemap.heightInPixels / 2, 0, 0, 0, this.tilemap.heightInPixels)); // right
        this.boundaries.add(this.add.line(this.tilemap.widthInPixels / 2, this.tilemap.heightInPixels, 0, 0, this.tilemap.widthInPixels)); // bottom
        this.boundaries.add(this.add.line(0, this.tilemap.heightInPixels / 2, 0, 0, 0, this.tilemap.heightInPixels)); // left
        this.boundaries.add(this.add.line(this.tilemap.widthInPixels / 2, 0, 0, 0, this.tilemap.widthInPixels)); // top

        this.player = this.physics.add.image(1271, 483, 'ios');
        this.physics.add.collider(this.player, this.boundaries);
        this.physics.add.collider(this.player, this.platforms);
        this.player.setMaxVelocity(800);
        this.player.setBounce(0.1);

        this.water = this.tilemap.createLayer('Water', this.tileset);
        this.cameras.main.startFollow(this.player, true, 0.2);
    }

    update = () => {
        this.player.setVelocityX(
            this.cursors.left.isDown || this.cursors.A.isDown ? this.player.inWater ? -400 : -300 :
                this.cursors.right.isDown || this.cursors.D.isDown ? this.player.inWater ? 400 : 300 : 0);

        this.player.inWater = this.water.getTileAtWorldXY(this.player.x, this.player.y) != null;
        this.player.setGravity(this.player.inWater ? -300 : 0);
        this.player.setAcceleration(0);

        if (!this.player.inWater && (this.cursors.up.isDown || this.cursors.W.isDown) && this.player.body.blocked.down)
            this.player.setVelocityY(-450);
        if (this.player.inWater && (this.cursors.up.isDown || this.cursors.W.isDown))
            this.player.setAccelerationY(-800);
        if (this.player.inWater && (this.cursors.down.isDown || this.cursors.S.isDown))
            this.player.setAccelerationY(800);
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
