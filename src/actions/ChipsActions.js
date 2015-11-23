import ChessballDispatcher from '../dispatcher/ChessballDispatcher';

const TAKE_CHIP = 'TAKE_CHIP';

export function moveChip (chipId, top, left) {
	ChessballDispatcher.dispatch({
		type: TAKE_CHIP,
		payload: {chipId, top, left}
	})
}

export function leaveChip (chipId) {
	ChessballDispatcher.dispatch({
		type: LEAVE_CHIP
	})
}
