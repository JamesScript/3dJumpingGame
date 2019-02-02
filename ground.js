function Ground(x, y, z, w, h, l, s) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
    this.h = h;
    this.l = l;
    this.skin = s;
    this.holdingPlayer = false;
    this.insert = () => {
        this.geometry = new THREE.BoxGeometry(this.w, this.h, this.l);
        this.texture = new THREE.TextureLoader().load(skin(this.skin));
        if (this.skin === 0) {
            this.texture.anisotropy = 0;
            this.texture.magFilter = THREE.NearestFilter;
            this.texture.minFilter = THREE.NearestFilter;
            this.texture.wrapS = THREE.RepeatWrapping;
            this.texture.wrapT = THREE.RepeatWrapping;
            this.texture.repeat.x = 1;
            this.texture.repeat.y = 1;
        }
        // this.texture.repeat.set( this.w * 0.006, this.l * 0.002 );
        this.material = new THREE.MeshBasicMaterial({
            // color: "x0000ff",
            map: this.texture
        });
        this.mesh = new THREE.Mesh( this.geometry, this.material );
        if (this.skin === 0) {
            let v = this.mesh.geometry.faceVertexUvs[0];
            // setUv( v, 0, 3, 0.3 );
            // setUv( v, 1, 1.5, 4 );
            // setUv( v, 2, 1.5, 1 );
            setUv( v, 0, this.l * 0.003, this.l * 0.00002 );
            setUv( v, 1, 1.5, 45 );
            setUv( v, 2, 1.5, 1 );
        }
        this.m = this.mesh.position;
        this.m.x = this.x;
        this.m.y = this.y;
        this.m.z = this.z;
        this.mesh.receiveShadow = true;
        this.mesh.castShadow = true;
        scene.add(this.mesh);
    };
    this.update = () => {
        let pW = player.geometry.parameters.width;
        let pH = player.geometry.parameters.height;
        let pL = player.geometry.parameters.depth;
        let pX = player.mesh.position.x;
        let pY = player.mesh.position.y;
        let pZ = player.mesh.position.z;
        this.m.z += player.zVel;
        this.holdingPlayer = false; // overridden below
        if (
            // Player within length
            pZ - pL / 2 <= this.m.z + this.l / 2 &&  pZ + pL / 2 >= this.m.z - this.l
        ) {
            if (
                // Player within width
            pX - pW / 2 <= this.x + this.w / 2
            && pX + pW / 2 >= this.x - this.w / 2
            ) {
                if (pY - pH / 2 === this.y + this.h / 2) {
                    this.holdingPlayer = true;
                } else if (Math.abs((pY - pH / 2) - (this.y + this.h / 2)) < Math.abs(player.yVel)) {
                    player.mesh.position.y = this.y + this.h / 2 + pH / 2;
                    this.holdingPlayer = true;
                }

                if (
                    // Player within width AND height
                    pY - pH / 2 < this.y + this.h / 2
                    && pY + pH / 2 > this.y - this.h / 2
                ) {
                    // More forgiving - if a little bit under the top, push to top
                    if (pY - pH / 2 > this.y + this.h * 0.05) {
                        player.mesh.position.y += this.h * 0.45;
                    } else {
                        player.zVel = 0;
                    }
                }
            } else if (
                // Player within height and length but not width
            pY - pH / 2 < this.y + this.h / 2
            && pY + pH / 2 > this.y - this.h / 2
            ) {
                // console.log(Math.abs((pX + pW / 2) - (this.x - this.w / 2)) + " :  " + player.xVel);
                if ((pX - pW / 2) - (this.x + this.w / 2) < Math.abs(player.xVel)) {
                    if (pX > this.x && player.xVel < 0 || pX < this.x && player.xVel > 0) {
                        player.xVel = 0;
                    }
                }
            }
        }
    };
    this.leaveWorld = () => {
        scene.remove(this.mesh);
    }
}