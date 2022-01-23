import LevelsView from "../view/LevelsView";
import LevelsModel from "../model/LevelsModel";
import Scene from "./Scene";

class Levels extends Scene {
	constructor() {
		super()
		this.model = new LevelsModel()
		this.view = new LevelsView(this, { btnLevels: this.model.btnLevels })
		this.addChild(this.view)
	}

	levelHandler(num) {
		app.scene.start('Level', { level: num })
	}

	homeHandler() {
		app.scene.start('Main')
	}
}

app.scene.add('Levels', Levels)