import ProgressBar from "./ProgressBar";
import TILES from "../../lib/tiles";
import TaskTile from "./TaskTile";

export default class TaskBar extends PIXI.Container {
	constructor(level, options) {
		super()
		this.level = level
		this.options = options
		this.w = 1000
		this.h = 150
		this.padding = 10
		this.tiles = []
		this.tilesPanel = new PIXI.Container()
		this.movePanel = this.createMovePanel()
		this.taskPanel = this.createTaskPanel()
		this.progressPanel = this.createProgressPanel()

		this.addChild(this.movePanel, this.progressPanel, this.taskPanel)
	}

	createMovePanel() {
		const size = this.h-this.padding*2
		const movePanel = new PIXI.Container()

		const back = new PIXI.Graphics()
		back.lineStyle(1, 0xffffff, 0.2)
		back.beginFill(0x000000, 0.6)
		back.drawRoundedRect(0, 0, size, size, 5)

		const title = new PIXI.Text('ХОДЫ', {
			fontSize: 10,
			fill: 0x999999
		})
		title.position.set(back.width/2-title.width/2, 10)

		const num = new PIXI.Text(this.options.moves, {
			fontSize: 55,
			fontWeight: 'bold',
			fill: 0xffffff
		})
		num.name = 'num'
		num.position.set(back.width/2-num.width/2, back.height/2-num.height/2)

		movePanel.addChild(back, num, title)
		return movePanel
	}

	createProgressPanel() {
		const progressPanel = new PIXI.Container()

		const title = new PIXI.Text('УРОВЕНЬ: '+this.level, {
			fontSize: 18,
			fill: 0xffffff,
			fontWeight: 'bold'
		})
		title.position.set(this.h, 10)

		this.progressBar = new ProgressBar({
			minW: 1,
			minH: 6,
			maxW: this.w-this.h-title.width-this.padding*3-5,
			maxH: 6
		})
		this.progressBar.position.set(this.h+title.width+this.padding, 18)

		progressPanel.addChild(this.progressBar, title)
		return progressPanel
	}

	createTaskPanel() {
		const w = this.w - this.h - this.padding
		const taskPanel = new PIXI.Container()

		const back = new PIXI.Graphics()
		back.lineStyle(1, 0xffffff, 0.2)
		back.beginFill(0x000000, 0.6)
		back.drawRoundedRect(0, 0, w, 90, 5)

		const title = new PIXI.Text('ЦЕЛЬ', {
			fontSize: 10,
			fill: 0x999999
		})
		title.position.set(back.width/2-title.width/2, 10)

		this.options.tiles.forEach((elem, i) => {
			const tile = new TaskTile({
				name: elem.name,
				texture: app.visual[TILES[elem.type][elem.name].skin],
				num: elem.num
			})
			tile.position.set(i*60, 0)
			this.tilesPanel.addChild(tile)
			this.tiles.push(tile)
		})
		this.tilesPanel.position.set(back.width/2-this.tilesPanel.width/2, 30)

		taskPanel.position.set(140, 40)
		taskPanel.addChild(back, title, this.tilesPanel)
		return taskPanel
	}

	updateMoves(num) {
		const textMove = this.movePanel.getChildByName('num')
		textMove.text = num
		textMove.position.set(this.movePanel.width/2-textMove.width/2, this.movePanel.height/2-textMove.height/2)
	}

	updateProgress(progress) {
		this.progressBar.update(progress)
	}

	checkTask(tile) {
		const taskTile = this.tiles.find(el => el.name === tile.info.name)

		if (!taskTile || !taskTile.getNum())
			return false

		taskTile.setNum()

		return {
			position: {
				x: this.x+this.taskPanel.x+this.tilesPanel.x+taskTile.x+taskTile.width/2,
				y: this.y+this.taskPanel.y+this.tilesPanel.y+taskTile.y+taskTile.height/2
			},
			cb: taskTile.update.bind(taskTile),
			startCB: taskTile.pulse.bind(taskTile)
		}
	}
}