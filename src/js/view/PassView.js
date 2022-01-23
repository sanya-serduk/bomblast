import View from "./View";
import Button from "./entities/Button";

export default class PassView extends View {
	constructor(scene, options) {
		super(scene)
		this.options = options

		this.bkg = this.createBkg()
		this.btnPanel = new PIXI.Container()
		this.buttons = this.createButtons()

		this.btnPanel.addChild(...this.buttons)
		this.addChild(this.bkg, this.btnPanel)

		this.resize()
		window.addEventListener('resize', this.resize.bind(this))
	}

	createBkg() {
		const bkg = new PIXI.Graphics()
		bkg.beginFill(0x000000, 0.7)
		bkg.drawRect(0, 0, app.size.width, app.size.height)

		return bkg
	}

	createButtons() {
		const buttons = []

		if (this.options.nextLevel) {
			buttons.push(new Button({
				name: 'next',
				text: 'Следующий',
				color: 'yellow',
				textColor: '0x000000',
				action: () => this.scene.btnHandler('next')
			}))
		}

		buttons.push(new Button({
			name: 'home',
			text: 'Выход',
			action: () => this.scene.btnHandler('home')
		}))

		return buttons
	}

	resize() {
		this.resizeBtnPanel()
		this.resizeBkg()
	}

	resizeBtnPanel() {
		const margin = 50
		const maxW = app.size.width/4*3 - margin
		let w = 0, h = 0

		this.buttons.forEach(btn => {
			const tempW = w + btn.width + margin
			const tempH = h + btn.height + margin

			if (tempW <= maxW) {
				btn.position.set(w, h)
				w = tempW
			} else {
				btn.position.set(0, tempH)
				w = tempW - w
				h = tempH
			}
		})

		this.btnPanel.position.set(-this.btnPanel.width/2, -this.btnPanel.height/2)
	}

	resizeBkg() {
		this.bkg.width = app.size.width
		this.bkg.height = app.size.height
		this.bkg.position.set(-this.bkg.width/2, -this.bkg.height/2)
	}
}