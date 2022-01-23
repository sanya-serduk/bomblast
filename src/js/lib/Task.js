export default class Task {
	constructor(param) {
		this.origin = JSON.parse(JSON.stringify(param))
		this.current = JSON.parse(JSON.stringify(param))
		this.progress = 0
	}

	getProgress() {
		return this.progress
	}

	setProgress() {
		const originSum = this.origin.tiles.reduce((acc, cur) => acc + cur.num, 0)
		const currentSum = this.current.tiles.reduce((acc, cur) => acc + cur.num, 0)
		this.progress = (originSum - currentSum) * 100 / originSum
	}

	getTiles() {
		return this.current.tiles
	}

	getTile(id) {
		const tile = this.current.tiles.find(tile => tile.id === id)
		return tile.num
	}

	setTile(id) {
		const tile = this.current.tiles.find(tile => tile.id === id)

		if (!tile)
			return

		tile.task = true
		tile.num -= tile.num > 0 ? 1 : 0
		this.setProgress()
	}

	getMoves() {
		return this.current.moves
	}

	setMoves() {
		this.current.moves -= this.current.moves > 0 ? 1 : 0
	}

	getStatus() {
		if (!this.getMoves() && this.getProgress() !== 100)
			return -1

		if (this.getProgress() === 100)
			return 1

		return 0
	}
}