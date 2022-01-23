import Lib from "../../lib/Lib";
import TILES from "../../lib/tiles";
import TileSimple from "../entities/TileSimple";
import TileBomb from "../entities/TileBomb";
import Tile from "../entities/Tile";

export default class Field extends PIXI.Container {
	constructor(view, options) {
		super()
		this.view = view
		this.rows = options.template.length
		this.cols = options.template[0].length
		this.cell = options.cell
		this.interactive = true
		this.on('click', (e) => this.fieldHandler(e))
		this.on('tap', (e) => this.fieldHandler(e))
		this.tiles = []
		this.create()
	}

	create() {
		const back = new PIXI.Graphics()
		back.lineStyle(1, 0xffffff, 0.2)
		back.beginFill(0x000000, 0.5)
		back.drawRoundedRect(0, 0, this.cols*this.cell.w, this.rows*this.cell.h, 5)
		this.addChild(back)
	}

	fieldHandler(e) {
		const tile = e.target
		if (e.target instanceof Tile) {
			for (let i = 0; i < this.tiles.length; i++) {
				if (this.tiles[i].timeLine?.isActive())
					return
			}

			this.view.tileHandler({
				id: tile.options.info.id,
				row: tile.options.row,
				col: tile.options.col,
				type: tile.options.info.type
			})
		}
	}

	createTile(row, col, pivot, type, Class) {
		return new Class({
			row: row,
			col: col,
			w: this.cell.w,
			h: this.cell.h,
			pivot: { x:0, y:pivot },
			info: type
		})
	}

	addTile(tile) {
		this.tiles.push(tile)
		this.addChild(tile)
	}

	removeTile(tile, index) {
		this.tiles.splice(index, 1)
		this.removeChild(tile)
	}

	createTiles(tiles) {
		const pivot = [...Array(this.cols)].map(() => Lib.randomInteger(0, 200))
		const arrTilesType = Object.values(TILES.simple)

		tiles.forEach(tile => {
			const r = tiles.reduce((acc, cur) => cur.row > acc.row && cur.col === tile.col ? cur : acc)
			const Y = (r.row*50+50) + pivot[tile.col] + (50*(r.row-tile.row))
			const type = arrTilesType.find(el => el.id === tile.id)
			const newTile = this.createTile(tile.row, tile.col, -Y, type, TileSimple)
			this.addTile(newTile)
		})
	}

	removeTiles(tiles) {
		tiles.forEach(pos => {
			const index = this.getTileIndex(pos)
			if (index !== -1) {
				const tile = this.tiles[index]
				this.view.addParticles(tile)
				this.removeTile(tile, index)
			}
		})
	}

	createSuperTile(tile) {
		const bomb = this.createTile(tile.row, tile.col, 0, TILES.super.bomb, TileBomb)
		this.addTile(bomb)
	}

	getTile(pos) {
		return this.tiles.find(tile => tile.options.row === pos.row && tile.options.col === pos.col)
	}

	getTileIndex(pos) {
		return this.tiles.findIndex(tile => tile.options.row === pos.row && tile.options.col === pos.col)
	}

	moveTiles(tiles) {
		tiles.forEach(pos => {
			const tile = this.getTile(pos.old)
			tile.updatePosition(pos.new.row, pos.new.col, -((pos.new.row-pos.old.row)*50))
		})
	}

	update(updates) {
		if (updates.remove)       this.removeTiles(updates.remove)
		if (updates.createSuper)  this.createSuperTile(updates.createSuper)
		if (updates.move)         this.moveTiles(updates.move)
		if (updates.createSimple) this.createTiles(updates.createSimple)
	}
}