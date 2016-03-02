import THREE from 'three'
import dat from 'dat-gui'
import AbstractApplication from 'scripts/views/AbstractApplication'
import Ring from 'scripts/geometries/ring'
import 'three-meshline/THREE.MeshLine'
import 'gsap'

class Main extends AbstractApplication {

    constructor() {

	super();


	//this.mesh.geometry.attributes.position.dynamic=true;
	this.rings = [];
	this.tweens = [];
	for ( let i = 0; i < 10; i ++ ) {

		let mesh = new Ring( {

			radius: 100,
			wavesAmount: Math.floor( Math.random() * 10 ) + 10

		} )
		mesh.position.z = - 200;//i*40;//Math.random() * 10 - 5;
		mesh.scale.x = 0;//i*40;//Math.random() * 10 - 5;
		mesh.scale.y = 0;//i*40;//Math.random() * 10 - 5;
		this.rings.push( mesh );
		this.scene.add( mesh );

		this.tweens.push( TweenMax.to( mesh.position, 4, {
			z: 200,
            ease: Power1.easeInOut,
			repeat: - 1, yoyo: true
		} ) )
		this.tweens.push( TweenMax.to( mesh.scale, 4, {
			x: 1,
			y: 1,
            ease:Power1.easeInOut,
			repeat: - 1, yoyo: true
		} )
				);

	}

	this.angle = 0;
	this.phase = 0;

	this.onWindowResize();

	this.animate();
	const tl = new TimelineMax();
	tl.insertMultiple( this.tweens, 0, 'start', 0.5 );

    }

    updateResolution() {


	for ( let i = 0; i < this.rings.length; i ++ ) {

		let res = Math.random() * 100 + 3;
		let ring = this.rings[ i ];
		ring.updateResolution( Math.floor( res ) );

	}

	setTimeout( this.updateResolution.bind( this ), 10 );

    }

    initGUI() {


    }

    animate() {

	/*var points = this.mesh.geometry.attributes.position.array

	         var altitude = 10 * Math.sin( this.angle );
	         var altitude2 = 10 * Math.cos( this.angle );

	         for ( var i = 0; i < points.length; i ++ ) {

	         this.angle += 0.0001;
	         this.phase += 0.0001;

	         }
	         this.mesh.geometry.attributes.position.needsUpdate = true;*/
	for ( let i = 0; i < this.rings.length; i ++ ) {

		let ring = this.rings[ i ];
		ring.update();

	         }


	super.animate();


    }

}
export default Main;
