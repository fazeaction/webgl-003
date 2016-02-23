import THREE from 'three'
import dat from 'dat-gui'
import AbstractApplication from 'scripts/views/AbstractApplication'
import Ring from 'scripts/geometries/ring'
import 'three-meshline/THREE.MeshLine'

class Main extends AbstractApplication {

    constructor() {

	super();


	//this.mesh.geometry.attributes.position.dynamic=true;
	this.rings = [];
	for ( let i = 0; i < 50; i ++ ) {

		let mesh = new Ring( {

			radius: Math.random() * 150 + 150,
			wavesAmount: Math.floor( Math.random() * 10 ) + 10

		} )
		mesh.position.z = 0;//Math.random() * 10 - 5;
		this.rings.push( mesh );
		this.scene.add( mesh );

	}

	this.angle = 0;
	this.phase = 0;

	this.onWindowResize();

	this.animate();

	setTimeout( this.updateResolution.bind( this ), 0 );



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
