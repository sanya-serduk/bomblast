import Button from "./entities/Button";
import View from "./View";

export default class MainView extends View {
	constructor(scene) {
		super(scene)
		this.create()
	}

	create() {
		const btn = new Button({
			name: 'start',
			text: 'Выбор уровня',
			action: () => this.scene.btnHandler('start')
		})

		this.addChild(btn)
		this.position.set(-this.width/2, -this.height/2)
	}
}