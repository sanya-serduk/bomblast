import TileParticle from "./TileParticle";

export default class TileParticleBomb extends TileParticle {
	constructor(options) {
		super(options)
		this.anchor.set(0.5)
		this.animate()
	}

	animate() {
		this.timeLine
			.from(this.scale, .2, {
				x: Math.random(),
				y: Math.random()
			})
			.to(this, .6, {
				alpha: 0
			})
			.to(this, 1, {
				x: this.options.x2,
				y: this.options.y2,
				onComplete: () => {
					this.destroy()
				}
			}, 0)
	}
}