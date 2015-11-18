import React from 'react';
import ReactDOM from 'react-dom';
import boardDataBuilder from './builders/boardDataBuilder';
import Board from './Board';

const boardData = boardDataBuilder();

window.boardData = boardData;
const domNode = document.getElementById('game');
ReactDOM.render(<Board boardData={boardData} />, domNode);
