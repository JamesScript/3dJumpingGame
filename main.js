let player = new Player();
let ground = [];
let segmentsGenerated = 0;
let frame = 0;

let renderer;

let camera;

let scene;

let light;
let light2;
let light3;
let spotLight;

let geometry;

let texture;
let material;

let controls;

init();
ground[0] = new Ground(0, -100, -24000, 600, 100, 50000, 0);
ground[0].insert();
//
// ground[1] = new Ground(50, 0, -3000, 100, 100, 100, 1);
// ground[1].insert();
//
// ground[2] = new Ground(150, 0, -3000, 100, 100, 100, 1);
// ground[2].insert();
//
// ground[3] = new Ground(250, 0, -3000, 100, 100, 100, 1);
// ground[3].insert();
//
// ground[4] = new Ground(-50, 0, -4200, 100, 100, 100, 1);
// ground[4].insert();
//
// ground[5] = new Ground(-150, 0, -4200, 100, 100, 100, 1);
// ground[5].insert();
//
// ground[6] = new Ground(-250, 0, -4200, 100, 100, 100, 1);
// ground[6].insert();

function levelGen(level, row) {
    for (let j = 0; j < levels[level][row].length; j++) {
        switch (levels[0][row][j]) {
            case "1":
                ground.push(new Ground(-250 + j * 100, 0, -10000, 100, 100, 100, 1));
                ground[ground.length - 1].insert();
                break;
            case "2":
                ground.push(new Ground(-250 + j * 100, 0, -10000, 100, 300, 100, 2));
                ground[ground.length - 1].insert();
                break;
        }
    }
}

document.onkeydown = checkKey;
document.onkeyup = stop;

function checkKey(e) {

    e = e || window.event;

    if (e.keyCode === 37) {
        player.xVel = -20;
    }
    if (e.keyCode === 39) {
        player.xVel = 20;
    }
    if ((e.keyCode === 32 || e.keyCode === 38) && player.grounded) {
        player.yVel = player.jumpStrength;
    }
}

function stop(e) {
    if (e.keyCode === 37 && player.xVel < 0 || e.keyCode === 39 && player.xVel > 0) {
        player.xVel = 0;
    }
}

function setUv( v, index, wr, hr ) {
    for (let i=index*4; i<(index+1)*4; i++) {
        for (let j=0; j<3; j++) {
            v[i][j].x = v[i][j].x * wr;
            v[i][j].y = v[i][j].y * hr;
        }
    }
}

function groundCheck() {
    let count = 0;
    for (let i = 0; i < ground.length; i++) {
        if (ground[i].holdingPlayer) {
            count++;
        }
    }
    count === 0 ? player.grounded = false : player.grounded = true;
}

function render() {
    renderer.render(scene, camera);
    if (player.z / 100 >= segmentsGenerated && segmentsGenerated < levels[0].length) {
        if (!(/\b0{6}/).test(levels[0][segmentsGenerated])) {
            levelGen(0, segmentsGenerated);
        }
        segmentsGenerated++;
    }
    player.update();
    for (let i = ground.length - 1; i >= 0; i--) {
        ground[i].update();
        if (ground[i].mesh.position.z > 10000 && i > 0) {
            ground[i].leaveWorld();
            ground.splice(i, 1);
        }
    }
    groundCheck();
    controls.update();
    requestAnimationFrame(render);
}