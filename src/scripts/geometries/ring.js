import THREE from 'three';

class Ring extends THREE.Line{

    constructor( options ) {

	super();

	this.radius = options.radius || 300 ;
	this.obj_resolution = 10;
	this.buffer_size = 1000;
    this.rotateVelocity=Math.random()*10+0.009
    this.direction=Math.floor(Math.random()*2-1));

	const geometry = new THREE.BufferGeometry();
	const material = new THREE.LineBasicMaterial( { vertexColors: THREE.VertexColors } );

	const positions = new Float32Array( this.buffer_size * 3 );
	const colors = new Float32Array( this.buffer_size * 3 );
	const r = this.radius;
	this.waves_amount = options.wavesAmount || 10; // amount of waves per circle
	this.wave_height = 0.09 * this.radius;  // height of a wave
	const angle_step = ( ( 360 ) / this.obj_resolution );

	for ( let i = 0; i <  this.buffer_size; i ++ ) {

		let angle = ( Math.PI / 180 ) * angle_step * i;
		let x = ( this.radius ) * Math.cos( angle );
		let y = ( this.radius ) * Math.sin( angle );
		let z = this.wave_height * Math.sin( angle * this.waves_amount );

		positions[ i * 3 ] = x;
		positions[ i * 3 + 1 ] = y;
		positions[ i * 3 + 2 ] = z;

		colors[ i * 3 ] = ( x / r ) + 0.5;
		colors[ i * 3 + 1 ] = ( y / r ) + 0.5;
		colors[ i * 3 + 2 ] = ( z / r ) + 0.5;

	}

	geometry.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ).setDynamic( true ) );
	geometry.addAttribute( 'color', new THREE.BufferAttribute( colors, 3 ) );
	geometry.computeBoundingSphere();

	this.geometry = geometry;
	this.material = material;

    }

    updateResolution( resolution ) {

	this.obj_resolution = resolution;
	const angle_step = ( ( 360 ) / this.obj_resolution );
	const positions = this.geometry.attributes.position.array;

	for ( let i = 0; i <  this.buffer_size; i ++ ) {

		let angle = ( Math.PI / 180 ) * angle_step * i;
		let x = ( this.radius ) * Math.cos( angle );
		let y = ( this.radius ) * Math.sin( angle );
		let z = this.wave_height * Math.sin( angle * this.waves_amount );

		positions[ i * 3 ] = x;
		positions[ i * 3 + 1 ] = y;
		positions[ i * 3 + 2 ] = z;

	}

	this.geometry.attributes.position.needsUpdate = true;


    }


    update(){
        this.rotation.z+=this.rotateVelocity;
    }


}
export default Ring;
