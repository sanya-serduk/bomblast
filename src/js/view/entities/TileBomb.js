import TileSuper from "./TileSuper";
import TileParticleBomb from "./TileParticleBomb";

export default class TileBomb extends TileSuper {
	constructor(options) {
		super(options)
	}

	createParticles() {
		const particles = []
		const num = 30
		const angle = Math.PI * 2
		const x = this.parent.x + this.x + this.width / 2
		const y = this.parent.y + this.y + this.height / 2

		for (let i = 0; i < num; i++) {
			const radius = 30 * Math.random()
			const cos = radius * Math.cos(angle / num * i)
			const sin = radius * Math.sin(angle / num * i)

			particles.push(new TileParticleBomb({
				x  : x + cos,
				y  : y + sin,
				x2 : x + cos * 10,
				y2 : y + sin * 10,
				skin : app.visual.particle_blast
			}))
		}

		return particles
	}
}