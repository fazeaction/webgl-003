import THREE from 'three'
import dat from 'dat-gui'
import AbstractApplication from 'scripts/views/AbstractApplication'
import Ring from 'scripts/geometries/ring'
import 'three-meshline/THREE.MeshLine'
import 'gsap'

class Main extends AbstractApplication {

    constructor() {

        super();

        this.mouseY = this.mouseX = 0;
        this.windowHalfX = window.innerWidth / 2;
        this.windowHalfY = window.innerHeight / 2;

        this.rings = [];
        this.tweens = [];
        this.tweens2 = [];
        this.numRings = 22;
        this.gapRings = 1;

        this.mode=2

        for (let i = 0; i < this.numRings; i++) {

            let mesh = new Ring({
                color: (i < this.numRings / 2) ? [1, 1, 1] : [1, 1, 1],
                radius: 150,
                wavesAmount: Math.floor(Math.random() * 10) + 10

            })

            this.rings.push(mesh);
            this.scene.add(mesh);

            const tl = new TimelineMax();
            if(this.mode===1) {
                mesh.position.z = -10000;
                mesh.scale.x = 1;
                mesh.scale.y = 1;
                tl.to(mesh.position, 8, {
                    z: 200,
                    ease: Power2.easeOut,
                });
                tl.to(mesh.position, 2, {
                    z: -6200,
                    ease: Power2.easeIn,
                });
            }
            else{
                mesh.position.z = -150;
                mesh.scale.x = 0;
                mesh.scale.y = 0;
                tl.to(mesh.position, 6, {
                    z: 150,
                    ease: Power2.easeOut,
                });
                tl.to(mesh.scale, 6, {
                    x: 1,
                    y:1,
                    ease: Power2.easeOut,
                },0);
                tl.to(mesh.position, 3, {
                    z: -150,
                    ease: Power2.easeOut,
                },6);
                tl.to(mesh.scale, 3, {
                    x: 0,
                    y: 0,
                    ease: Power2.easeOut,
                },6);
            }

            (i < this.numRings / 2) ? this.tweens.push(tl) : this.tweens2.push(tl);

        }

        this.angle = 0;
        this.phase = 0;

        this.onWindowResize();

        this.animate();
        const tl = new TimelineMax({repeat: -1});
        tl.insertMultiple(this.tweens, 0, 'start', this.gapRings);
        const tl2 = new TimelineMax({repeat: -1, delay: (this.numRings / 2) * this.gapRings});
        tl2.insertMultiple(this.tweens2, 0, 'start', this.gapRings);

        //document.addEventListener('mousemove', this.onDocumentMouseMove.bind(this), false);
    }

    onDocumentMouseMove(event) {

        this.mouseX = ( event.clientX - this.windowHalfX );
        this.mouseY = ( event.clientY - this.windowHalfY );

    }

    animate() {

         this.camera.position.x += ( this.mouseX - this.camera.position.x ) * .05;
         this.camera.position.y += ( -this.mouseY - this.camera.position.y ) * .05;
         this.camera.lookAt(this.scene.position);

        //this.camera.position.x += ( this.mouseX - this.camera.position.x * 6 ) * .05;
        //this.camera.position.y += ( -this.mouseY - this.camera.position.y * 6 ) * .05;


        for (let i = 0; i < this.rings.length; i++) {
            let ring = this.rings[i];
            ring.update();
        }


        super.animate();


    }

}
export default Main;
