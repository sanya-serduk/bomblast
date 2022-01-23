import View from "./View";
import Button from "./entities/Button";

export default class LevelsView extends View {
	constructor(scene, options) {
		super(scene)
		this.btnLevels = options.btnLevels

		this.btnPanel = new PIXI.Container()
		this.levelsBtn = this.createButtons()
		this.levelsBtn.push(new Button({ text: '<', action: () => this.scene.homeHandler(), w: 150 }))

		this.btnPanel.addChild(...this.levelsBtn)
		this.addChild(this.btnPanel)

		this.updateBtnPanel()
		window.addEventListener('resize', () => this.updateBtnPanel())
	}

	createButtons() {
		const w = 150
		return this.btnLevels.map(btn => {
			btn.action = () => this.scene.levelHandler(btn.num)
			btn.w = w
			btn.state = btn.state || 'enabled'
			btn.text = btn.num
			btn.color = 'yellow'
			btn.textColor = '0x000000'
			return new Button(btn)
		})
	}

	updateBtnPanel() {
		const margin = 50
		const maxW = app.size.width/4*3 - margin
		let w = 0, h = 0

		this.levelsBtn.forEach(btn => {
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
}