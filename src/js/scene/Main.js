import MainView from "../view/MainView";
import Scene from "./Scene";

class Main extends Scene {
	constructor() {
		super()
		this.view = new MainView(this)
		this.addChild(this.view)
	}

	btnHandler(name) {
		if (name === 'start') app.scene.start('Levels')
	}
}

app.scene.add('Main', Main)