import ChessballDispatcher from '../dispatcher/ChessballDispatcher';
import EventEmiter from 'events';
import _ from 'lodash';
import Rx from 'rx';

window.rx = Rx;

const chips = [{
	chipId: 0,
	kind: 'ball',
	top: 0,
	left: 0
}];

var ChipsStore = _.assign({}, EventEmiter.prototype, {
	getChips: function () {
		return chips
	},
	emitChange: function () {
		this.emit('UPDATE_POSITION', chips)
	},
	subscribePositionChange: function (cb) {
		this.on('UPDATE_POSITION', cb)
	},
	unsubscribePositionChange: function (cb) {
		this.removeListener('UPDATE_POSITION', cb)
	}
});

const callbacks = {
	MOVE_CHIP: ({chipId, top, left}) => {
		let chip = _.find(chips, {chipId})
		_.assign(chip, {top, left})
		ChipsStore.emitChange()
	}
}

ChessballDispatcher.register(({type, payload})=> callbacks[type](payload) );

export default ChipsStore;