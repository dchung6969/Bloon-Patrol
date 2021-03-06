// Rocket prefab
class Dart extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, keyL, keyR, keyFire) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);   // add to existing, displayList, updateList
        this.keyleft = keyL;
        this.keyright = keyR;
        this.keyfire = keyFire;
        this.isFiring = false;      // track rocket's firing status
        this.moveSpeed = 4;         // pixels per frame
        //this.sfxRocket = scene.sound.add('sfx_rocket') // add rocket sfx
    }

    update() {
        // left/right movement
        if(!this.isFiring) {
            if(this.keyleft.isDown && this.x >= 10) {
                this.x -= this.moveSpeed;
            } else if (this.keyright.isDown && this.x <= game.config.width - 10) {
                this.x += this.moveSpeed;
            }
        }
        // fire button
        if (this.keyfire.isDown && !this.isFiring) {
            this.isFiring = true;
            //this.sfxDart.play();  // play sfx
        }
        // if fired, move up
        if(this.isFiring && this.y >= 0) {
            this.y -= this.moveSpeed;
        }
        // reset on miss
        if(this.y <= 0) {
            this.reset();
        }
    }

    // reset rocket to "ground"
    reset() {
        this.isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding;
    }
}
