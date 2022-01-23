import { Timeline } from "gsap/gsap-core";

export default class TaskTile extends PIXI.Container {
	constructor(options) {
		super()
		this.options = options
		this.name = options.name
		this.num = options.num
		this.timeLine = new Timeline()
		this.create()
	}

	create() {
		const back = new PIXI.Graphics()
		back.beginFill(0x000000, 1)
		back.drawRoundedRect(0, 0, 50, 50, 5)

		const text = new PIXI.Text(this.num, {
			fontSize: 18,
			fill: 0xffffff,
			fontWeight: 'bold',
			dropShadow: true,
			dropShadowAngle: 0,
			dropShadowBlur: 5,
			dropShadowDistance: 0,
		})
		text.position.set(back.width/2-text.width/2, back.height/2-text.height/2)
		text.name = 'num'

		const tile = new PIXI.Sprite(this.options.texture)
		tile.width = 40
		tile.height = 40
		tile.anchor.set(0.5)
		tile.position.set(back.width/2, back.height/2)
		tile.name = 'tile'

		this.addChild(back, tile, text)
	}

	getNum() {
		return this.num
	}

	setNum() {
		this.num -= 1
	}

	pulse(time) {
		const tile = this.getChildByName('tile')
		this.timeLine.clear()
		this.timeLine
			.to(tile, time, { width: 50, height: 50 })
			.to(tile, 2, { width: 40, height: 40 })
	}

	update() {
		const textNum = this.getChildByName('num')
		textNum.text = this.num
		textNum.position.set(this.width/2-textNum.width/2, this.height/2-textNum.height/2)
	}
}