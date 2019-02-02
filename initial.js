function init() {
    renderer = new THREE.WebGLRenderer({canvas: document.getElementById("myCanvas"), antialias: false});
    renderer.setClearColor(0x000000);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.Enabled = true;
    renderer.shadowMapSoft = true;

    camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 10000);

    scene = new THREE.Scene();

    light = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(light);

    // light2 = new THREE.PointLight(0xffffff, 0.5);
    // light2.position.z += 500;
    // scene.add(light2);

    // light3 = new THREE.DirectionalLight( 0x4444cc, 2);
    // light3.position.set( 1, -1, 1 ).normalize();
    // scene.add( light3 );

    spotLight = new THREE.SpotLight( 0xFFFFFF );
    spotLight.target.position.set( 200, 0, 0 );
    spotLight.position.y = 600;
    spotLight.position.z = 300;
    spotLight.shadow.camera.near= 0.01;
    spotLight.shadow.camera.far = 1000;
    spotLight.castShadow		= true;
    spotLight.shadowDarkness	= 0.9;
    spotLight.shadow.mapSize.width	= 1024;
    spotLight.shadow.mapSize.height	= 1024;
    scene.add( spotLight );

    // let helper = new THREE.CameraHelper( spotLight.shadow.camera );
    // scene.add( helper );

    camera.position.set( 600, 400, 1500 );
    controls = new THREE.OrbitControls( camera );
    controls.enablePan = false;
    controls.update();

    player.geometry = new THREE.BoxGeometry(100, 100, 100);

    player.texture = new THREE.TextureLoader().load('CrossBowler-1.png');
    player.texture.anisotropy = 0;
    player.texture.magFilter = THREE.NearestFilter;
    player.texture.minFilter = THREE.NearestFilter;

    player.material = new THREE.MeshPhongMaterial({
        color: 0xF3FFE2,
        map: player.texture
        // emissive: 0x000000
    });
    player.mesh = new THREE.Mesh(player.geometry, player.material);
    player.mesh.position.z = 0;

    scene.add(player.mesh);
    player.mesh.castShadow = true;

    requestAnimationFrame(render);
}