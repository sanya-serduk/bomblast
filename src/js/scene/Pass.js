import PassView from "../view/PassView";
import Scene from "./Scene";

class Pass extends Scene {
	constructor(options) {
		super()
		this.nextLevel = options.nextLevel || false
		this.view = new PassView(this, { nextLevel: this.nextLevel })
		this.addChild(this.view)
	}

	btnHandler(name) {
		if (name === 'home') app.scene.start('Main')
		if (name === 'next') app.scene.start('Level', { level: this.nextLevel })
	}
}

app.scene.add('Pass', Pass)