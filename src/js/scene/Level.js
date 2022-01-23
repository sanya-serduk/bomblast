import Scene from "./Scene";
import LevelsModel from "../model/LevelModel";
import LevelView from "../view/LevelView";

class Level extends Scene {
	constructor(options) {
		super()
		this.level = options.level
		this.model = new LevelsModel(this.level)
		this.settings = this.model.setting
		this.view = new LevelView(this)
		this.addChild(this.view)

		this.init()
	}

	init() {
		const tiles = this.model.createTiles()
		this.view.createTiles(tiles)
	}

	/*get taskTiles() {
		return this.model.taskTiles
	}*/

	handlerTile(tile) {
		const updatesField = this.model.handlerTile(tile)
		const updatesTask = this.model.getUpdateTask()
		this.view.setUpdates({
			field: updatesField,
			task: updatesTask
		})
		this.checkStatusLevel()
	}

	checkStatusLevel() {
		const status = this.model.statusLevel

		if (status ===  1) this.pass()
		if (status === -1) this.fail()
	}

	pass() {
		this.view.end()
		app.scene.addLayer('Pass', { nextLevel: this.settings.nextLevel || false })
	}

	fail() {
		this.view.end()
		app.scene.addLayer('Fail', { level: this.level })
	}
}

app.scene.add('Level', Level)