const BLANK_BG = 'white';
const GOAL_BG = 'grey';
const getTuneByPosition = (a, b) => {
	return (row,col)=> (row+col)%2? a:b;
};

const getGrassTune = getTuneByPosition('#257334', '#2E9A43');
const getBigAreaTune = getTuneByPosition('#CE7520', '#FF9632');
const getSmallAreaTune = getTuneByPosition('#6F5039', '#A07555');
const getGoalTune = getTuneByPosition('#6F6E6E', 'grey');

// const kinds = {
// 	special: (row, col)=> getGrassTune(row, col),
// 	blank: (row, col)=> 'white',
// 	goal: (row, col)=> warna.darken(getGrassTune(row, col), 0.6).hex,
// 	game: (row, col)=> getGrassTune(row, col)
// };
const areas = {
	small: getSmallAreaTune,
	big: getBigAreaTune
};

export function calcBackground ({kind, row, col, area}) {
	let bg;
	if (area) {
		bg = areas[area](row, col)
	} else if (kind === 'blank') {
		bg = BLANK_BG;
	} else if (kind === 'goal') {
		bg = getGoalTune(row, col);
	} else {
		bg = getGrassTune(row, col)
	}
	return bg;
}
