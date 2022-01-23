import Scene from "./Scene";
import FailView from "../view/FailView";

class Fail extends Scene {
	constructor(options) {
		super()
		this.level = options.level
		this.view = new FailView(this)
		this.addChild(this.view)
	}

	btnHandler(name) {
		if (name === 'home')  app.scene.start('Main')
		if (name === 'reset') app.scene.start('Level', { level: this.level })
	}
}

app.scene.add('Fail', Fail)