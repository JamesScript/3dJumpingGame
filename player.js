function Player() {
    this.xVel = 0;
    this.yVel = 0;
    this.zVel = 25;
    this.z = 0;
    this.jumpStrength = 30;
    this.grounded = true;
    this.update = () => {
        if (!this.grounded) {
            this.yVel -= 1.5;
        } else if (this.yVel < 0) {
            player.yVel = 0;
        }
        player.mesh.position.x += player.xVel;
        player.mesh.position.y += player.yVel;
        this.z += this.zVel;
    };
}