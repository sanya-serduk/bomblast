import { Timeline } from "gsap/gsap-core";

export default class ProgressBar extends PIXI.Container {
	constructor(options) {
		super()
		this.minW = options.minW
		this.minH = options.minH
		this.maxW = options.maxW
		this.maxH = options.maxH
		this.timeLine = new Timeline()
		this.progress = 0

		this.create()
	}

	create() {
		const back = new PIXI.Graphics()
		back.beginFill(0x000000, 0.5)
		back.drawRect(0, 0, this.maxW, this.maxH)

		this.line = new PIXI.Graphics()
		this.line.beginFill(0x00ff00, 1)
		this.line.drawRect(0, 0, this.minW, this.minH-2)
		this.line.position.set(1,1)
		this.line.width = 0

		this.addChild(back, this.line)
	}

	update(progress) {
		if (progress === this.progress)
			return

		this.progress = progress
		const newWidth = (this.maxW-2) / 100 * this.progress
		const speed = (newWidth - this.line.width) * 0.01

		this.timeLine.kill()
		this.timeLine.clear()
		this.timeLine.to(this.line,  speed, { width: newWidth })
	}
}