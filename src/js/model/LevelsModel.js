import Model from "./Model";

export default class LevelsModel extends Model {
	get btnLevels() {
		return [
			{ num: 1 },
			{ num: 2 },
			{ num: 3 },
			{ num: 4,  state: 'disabled' },
			{ num: 5,  state: 'disabled' },
			{ num: 6,  state: 'disabled' },
			{ num: 7,  state: 'disabled' },
			{ num: 8,  state: 'disabled' },
			{ num: 9,  state: 'disabled' },
			{ num: 10, state: 'disabled' },
			{ num: 11, state: 'disabled' },
			{ num: 12, state: 'disabled' },
			{ num: 13, state: 'disabled' },
			{ num: 14, state: 'disabled' },
			{ num: 15, state: 'disabled' },
		]
	}
}