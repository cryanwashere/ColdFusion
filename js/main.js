

class Cell {
    constructor() {
        this.height = Math.random() * 10;
    }
    addFeature( feature ) {

    }
}

class Grid {
    constructor() {
        this.mat = [];
        this.w_x = 10;
        this.w_z = 10;
        for (let i=0; i<this.w_x; i++) {
            const row = [];
            for (let j=0; j<this.w_z; j++) {
                const cell_ij = new Cell();
                row.push(cell_ij);
            }
            this.mat.push(row);
        }
        this.featureList = [];
        this.setup();
    }
    addFeature( feature, position ) {
        this.featureList.push(feature);
        this.mat[position.i][position.j].addFeature( feature );
    }
    setup() {
        this.addFeature(new Road(), {i:0,j:0});
    }
    addToScene( scene ) {
        const geometry = new THREE.BoxGeometry( this.w_x, 1, this.w_z );
        const material = new THREE.MeshBasicMaterial( {color: 0x0f802d} );
        const cube = new THREE.Mesh( geometry, material );
        scene.add( cube );
        this.featureList.forEach(feature => {
            scene.add( feature.sprite() );
        });
    }
}

class Road {
    constructor() {
    }
    sprite() {
        const geometry = new THREE.BoxGeometry( 1, 0.25, 1 );
        const material = new THREE.MeshBasicMaterial( {color: 0x74757d} );
        const cube = new THREE.Mesh( geometry, material );
        cube.position.y = 0.5;
        return cube;
    }
}

class CoalFurnace {
    constructor() {
        this.sprite = "coal_furnace";
        
        this.capacity = 100;
    }
}

class CoalOre {
    constructor() {
        this.sprite = "coal_ore";
    }
} 








const grid = new Grid();
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js';
var scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.z = 30;
const renderer = new THREE.WebGLRenderer({
    canvas : document.querySelector("#bg")
});
renderer.setSize( window.innerWidth, window.innerHeight);
document.body.appendChild( renderer.domElement );

const gridHelper = new THREE.GridHelper(200,50);
scene.add( gridHelper );
grid.addToScene( scene );
const controls = new OrbitControls( camera, renderer.domElement );
//controls.autoRotate=true;

function animate() {
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
    controls.update();
}
animate();

