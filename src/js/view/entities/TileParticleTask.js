import TileParticle from "./TileParticle";
import Lib from "../../lib/Lib";

export default class TileParticleTask extends TileParticle {
	constructor(options) {
		super(options)
		this.anchor.set(0.5)
		this.position.set(options.x+this.width/2, options.y+this.height/2)
		this.start()
	}

	start() {
		const distance = Lib.distance({ x: this.x, y: this.y }, this.options.endPoint)
		const time = distance * 0.0015
		this.timeLine
			.to(this, time, {
				x: this.options.endPoint.x,
				y: this.options.endPoint.y,
				onStart: () => {
					this.options.startCB(time)
				},
				onComplete: () => {
					this.options.cb()
					this.destroy()
				}
			})
			.to(this, .1, {
				alpha: 0,
			}, time - .1)
	}
}