import React from 'react';
import ReactDOM from 'react-dom';
import boardDataBuilder from './builders/boardDataBuilder';
import ChessBall from './ChessBall';

const boardData = boardDataBuilder()

const domNode = document.getElementById('game')
ReactDOM.render(<ChessBall board={boardData} />, domNode)
