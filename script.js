'use strict';
const { KeyCodes } = Phaser.Input.Keyboard;
let scene;
const startpos = [
    [326, 478],
    [1038, 286],
    [1138, 222]
]

class Scene extends Phaser.Scene {
    level = 0;

    preload = () => {
        scene = this;

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
        this.load.image('frog1', 'assets/frog1.png');
        this.load.image('frog2', 'assets/frog2.png');

        this.load.image('kenney', 'assets/tileset/kenney_platformer.png');
        this.load.tilemapTiledJSON(1, 'assets/tilemap/level1.json');
        this.load.tilemapTiledJSON(2, 'assets/tilemap/test.json');
        this.load.tilemapTiledJSON(3, 'assets/tilemap/test2.json');
    }

    create = () => {
        this.add.image(800, 500, 'chrome');

        this.tilemap = this.make.tilemap({ key: this.level + 1 });
        this.tileset = this.tilemap.addTilesetImage('kenney');

        this.boundaries = this.physics.add.staticGroup();
        this.boundaries.add(this.add.line(this.tilemap.widthInPixels, this.tilemap.heightInPixels / 2, 0, 0, 0, this.tilemap.heightInPixels)); // right
        this.boundaries.add(this.add.line(this.tilemap.widthInPixels / 2, this.tilemap.heightInPixels, 0, 0, this.tilemap.widthInPixels)); // bottom
        this.boundaries.add(this.add.line(0, this.tilemap.heightInPixels / 2, 0, 0, 0, this.tilemap.heightInPixels)); // left
        this.boundaries.add(this.add.line(this.tilemap.widthInPixels / 2, 0, 0, 0, this.tilemap.widthInPixels)); // top

        this.player = this.physics.add.image(...startpos[this.level], 'frog1');
        this.player.setScale(0.5);
        this.physics.add.collider(this.player, this.boundaries);
        this.player.setMaxVelocity(800);
        this.player.setBounce(0.1);

        this.water = this.tilemap.createLayer('Water', this.tileset);
        this.cameras.main.startFollow(this.player, true, 0.2);

        this.platforms = this.tilemap.createLayer('Platforms', this.tileset);
        this.platforms.setCollisionByExclusion(-1, true);
        this.physics.add.collider(this.player, this.platforms);
    }

    update = () => {
        this.player.setVelocityX(
            this.cursors.left.isDown || this.cursors.A.isDown ? this.player.inWater ? -400 : -300 :
                this.cursors.right.isDown || this.cursors.D.isDown ? this.player.inWater ? 400 : 300 : 0);

        this.player.inWater = this.water.getTileAtWorldXY(this.player.x, this.player.y) != null;
        this.player.setGravity(this.player.inWater ? -300 : 0);
        this.player.setAcceleration(0);

        if (this.player.inWater && this.player.texture.key !== 'frog2') this.player.setTexture('frog2');
        if (!this.player.inWater && this.player.texture.key !== 'frog1') this.player.setTexture('frog1');

        if (!this.player.inWater && (this.cursors.up.isDown || this.cursors.W.isDown) && this.player.body.blocked.down)
            this.player.setVelocityY(-450);
        if (this.player.inWater && (this.cursors.up.isDown || this.cursors.W.isDown))
            this.player.setAccelerationY(-600);
        if (this.player.inWater && (this.cursors.down.isDown || this.cursors.S.isDown))
            this.player.setAccelerationY(600);
    }

    nextLevel = () => {
        this.level++;
        this.level %= startpos.length;
        this.scene.restart();
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

document.body.addEventListener('keypress', e => {
    if (e.key == 'e') scene?.nextLevel();
});
