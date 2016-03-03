import THREE from 'three';

class Ring extends THREE.Line{

    constructor( options ) {

	super();

	this.nCoords = 3;
	this.step = 2 * Math.PI / this.nCoords;
	this.coords = [];
	this.radius = (options.radius!==undefined)? options.radius : 150;
	this.time=0;
	this.shape=Math.floor(Math.random()*3+1);

	this.obj_resolution = 99;
	this.buffer_size = 100;
    this.rotateVelocity=Math.random()*10+0.009
    this.direction=Math.floor(Math.random()*2-1);

	const geometry = new THREE.BufferGeometry();
	const material = new THREE.LineBasicMaterial( { vertexColors: THREE.VertexColors } );

	const positions = new Float32Array( this.buffer_size * 3 );
	const colors = new Float32Array( this.buffer_size * 3 );

	this.waves_amount = options.wavesAmount || 10; // amount of waves per circle
	this.wave_height = 0.09 * this.radius;  // height of a wave



		for(let i = 0; i < this.buffer_size; i++)
		{

			colors[ i * 3 ] = options.color[0];//( x / r ) + 0.5;
			colors[ i * 3 + 1 ] = options.color[1];//( y / r ) + 0.5;
			colors[ i * 3 + 2 ] = options.color[2];//0;
		}


	geometry.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ).setDynamic( true ) );
	geometry.addAttribute( 'color', new THREE.BufferAttribute( colors, 3 ) );
	geometry.computeBoundingSphere();


	this.geometry = geometry;
	this.material = material;
		//this.generateCoords2();

		this.generateCoords();

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

	generateCoords2() {
		const angle_step = ( ( 360 ) / this.obj_resolution );
		const positions = this.geometry.attributes.position.array;
		const colors = this.geometry.attributes.color.array;
		const r = this.radius;

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
	}

	generateCoords() {
		//x, y
		const s = 0.1;

		const positions = this.geometry.attributes.position.array;
		const angle_step = ( ( 360 ) / this.obj_resolution );

		for(let i = 0; i < this.buffer_size; i++)
		{
			let r =this.radius;
			let ang = ( Math.PI / 180 ) * angle_step * i;

			ang += 0.1 * Math.cos(0.01 * this.time + ang);
			ang += 0.25 * Math.cos(0.05 * this.time + ang);

			r += s * 15 * Math.cos(this.shape * ang + 0.1 * this.time);
			r -= s * 15 * Math.cos(2 * ang - 0.1 * this.time);
			r += s * 10 * Math.sin(this.shape * ang + 0.02 * this.time);
			r -= s * 15 * Math.sin(2 * ang - 0.01 * this.time);
			r += s * 10 * Math.cos(2 * ang + 0.01 * this.time) * Math.sin(this.shape * ang + 0.1 * this.time);
			r += s * 10 * Math.sin(this.shape * ang - 0.1 * this.time) * Math.sin(ang + 0.1 * this.time);

			positions[3 * i] = r * Math.cos(ang);
			positions[3 * i + 1] = r * Math.sin(ang);

		}



		this.geometry.attributes.position.needsUpdate = true;

	}


    update(){
		//this.generateCoords();
		this.rotation.z+=0.1;
		this.time += 0.5;
    }


}
export default Ring;
