import Texture from "../../lib/Texture";
import { GlowFilter } from "pixi-filters";
import { Timeline } from "gsap/gsap-core";

export default class Button extends PIXI.Container {
	constructor(options = {}) {
		super()
		this.w          = options.w         || 0
		this.h          = options.h         || 0
		this.state      = options.state     || 'enabled'
		this.name       = options.name      || 'button'
		this.text       = options.text      || 'button'
		this.textColor  = options.textColor || '0xffffff'
		this.color      = options.color     || 'purple'
		this.fontSize   = options.fontSize  || 22
		this.paramScale = options.scale     || 1
		this.padding    = options.padding   || { x: 50, y: 25 }
		this.action     = options.action    || this.noAction

		this.gradients = this.getGradients()
		this.timeLine = new Timeline()
		this.outlineFilter = new GlowFilter({ outerStrength: 0, color: 0xffffff })
		this.filters = [this.outlineFilter]

		this.create()
		this.setEvent()
	}

	create() {
		const text = new PIXI.Text(this.text, {
			fontSize: this.fontSize,
			fill: this.textColor,
			fontWeight: 'bold'
		})

		this.w = (this.w > text.width + this.padding.x * 2) ? this.w : text.width + this.padding.x * 2
		this.h = (this.h > text.height + this.padding.y * 2) ? this.h : text.height + this.padding.y * 2

		text.position.set(this.w/2 - text.width/2, this.h/2 - text.height/2)

		const mask = new PIXI.Graphics()
		mask.beginFill(0x000000, 1)
		mask.drawRoundedRect(0, 0, this.w, this.h, 100)

		const back = new PIXI.Sprite(Texture.linearGradientVertical(this.w, this.h, this.gradients[this.color]))
		back.mask = mask

		this.addChild(back, mask, text)
		this.scale.set(this.paramScale)
	}

	getGradients() {
		return {
			yellow: [
				{ offset: 0,    color: '#ffd500' },
				{ offset: 0.55, color: '#eab300' },
				{ offset: 0.8,  color: '#e09200' },
				{ offset: 1,    color: '#eab300' },
			],
			purple: [
				{ offset: 0,    color: '#db57f7' },
				{ offset: 0.55, color: '#9310b5' },
				{ offset: 0.8,  color: '#700494' },
				{ offset: 1,    color: '#9310b5' },
			]
		}
	}

	setEvent() {
		if (this.state === 'enabled')  this.enable()
		if (this.state === 'disabled') this.disable()

		this.buttonMode = true
		this.on('click', this.action)
		this.on('tap', this.action)
		this.on('pointerover', this.pointerOver)
		this.on('pointerout', this.pointerOut)
	}

	enable() {
		this.state = 'enabled'
		this.interactive = true
		this.removeChild(this.getChildByName('disabledMask'))
	}

	disable() {
		this.state = 'disabled'
		this.interactive = false
		const disabledMask = new PIXI.Graphics()
		disabledMask.beginFill(0x000000, 0.5)
		disabledMask.drawRoundedRect(0, 0, this.w, this.h, 100)
		disabledMask.name = 'disabledMask'
		this.addChild(disabledMask)
	}

	pointerOver() {
		this.timeLine.clear()
		this.timeLine.to(this.outlineFilter, .2, { outerStrength: 2 })
	}

	pointerOut() {
		this.timeLine.clear()
		this.timeLine.to(this.outlineFilter, .2, { outerStrength: 0 })
	}

	noAction() {
		console.log('no action')
	}
}