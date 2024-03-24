'use strict';
const { KeyCodes } = Phaser.Input.Keyboard;
const startpos = [
    null,
    [326, 478],
    [1038, 286],
    [160.5, 1120],
];
class LevelScene extends Phaser.Scene {
    level = 1;

    constructor() {
        super({ key: 'level' });
    }

    preload() {
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

        this.load.image('bg', 'assets/background/uncolored_plain.png');
    }

    create() {
        if (this.level == 0) {
            this.scene.start('credits');
            return this.scene.stop();
        }

        this.add.tileSprite(1024, 200, 2048, 1024, 'bg').setScrollFactor(0.1);
        this.tilemap = this.make.tilemap({ key: this.level });
        this.tileset = this.tilemap.addTilesetImage('kenney');

        this.boundaries = this.physics.add.staticGroup();
        this.boundaries.add(this.add.line(this.tilemap.widthInPixels, this.tilemap.heightInPixels / 2, 0, 0, 0, this.tilemap.heightInPixels)); // right
        this.boundaries.add(this.add.line(this.tilemap.widthInPixels / 2, this.tilemap.heightInPixels, 0, 0, this.tilemap.widthInPixels)); // bottom
        this.boundaries.add(this.add.line(0, this.tilemap.heightInPixels / 2, 0, 0, 0, this.tilemap.heightInPixels)); // left
        this.boundaries.add(this.add.line(this.tilemap.widthInPixels / 2, 0, 0, 0, this.tilemap.widthInPixels)); // top

        this.player = this.physics.add.image(...startpos[this.level], 'frog1');
        this.player.setBounce(0.1);
        this.player.setScale(0.5);
        this.player.setMaxVelocity(800);
        this.player.body.setSize(128, 128);

        this.tadpoles = this.physics.add.group({ allowGravity: false, immovable: true });
        let tad = this.tilemap.getObjectLayer('Tadpole')?.objects[0];
        this.tad = this.tadpoles.create(tad.x, tad.y, `tad${this.level}`);
        this.tad.body.setSize(...(
            this.level == 1 ? [122, 61] :
                this.level == 2 ? [88, 34] :
                    this.level == 3 ? [126, 72] :
                        this.level == 4 ? [122, 50] : null));
        this.physics.add.collider(this.player, this.tadpoles, this.nextLevel, null, this);

        this.physics.add.collider(this.player, this.boundaries);
        this.cameras.main.startFollow(this.player, true, 0.2);

        this.water = this.tilemap.createLayer('Water', this.tileset);
        this.platforms = this.tilemap.createLayer('Platforms', this.tileset);
        this.platforms.setCollisionByExclusion(-1, true);
        this.physics.add.collider(this.player, this.platforms);
    }

    update() {
        this.player.inWater = this.water.getTileAtWorldXY(this.player.x, this.player.y) != null;

        this.player.setVelocityX(
            this.cursors.left.isDown || this.cursors.A.isDown ? this.player.inWater ? -400 : -300 :
                this.cursors.right.isDown || this.cursors.D.isDown ? this.player.inWater ? 400 : 300 : 0);

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

    nextLevel() {
        this.level++;
        this.level %= startpos.length;
        this.scene.restart();
    }
}