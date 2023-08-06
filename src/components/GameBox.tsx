import { useEffect, useRef, useState } from 'react';
import classes from './GameBox.module.css';
import Player from './Player';
import { GameEngineState, useGameEngine } from '../store/useGameEngine';
type Props = {};

type Position = [number, number];

enum Direction {
	UP = 'w',
	DOWN = 's',
	LEFT = 'a',
	RIGHT = 'd',
	ROTATE_LEFT = 'q',
	ROTATE_RIGHT = 'e',
}

//Left becomes Down, Down becomes Left, Right becomes Up, Up becomes Right, Rotate Left becomes Rotate Right, Rotate Right becomes Rotate Left.
enum DirectionConfused {
	UP = 'd',
	DOWN = 'a',
	LEFT = 's',
	RIGHT = 'w',
	ROTATE_LEFT = 'e',
	ROTATE_RIGHT = 'q',
}

const PLAYER_SIZE = 50;

const GameBox = (props: Props) => {
	const gameStore: GameEngineState = useGameEngine();

	const keyMap: { [key: string]: boolean } = {};

	const handleKeyDown = (event: KeyboardEvent) => {
		keyMap[event.key] = true;
	};

	const handleKeyUp = (event: KeyboardEvent) => {
		keyMap[event.key] = false;
	};

	// add keydown event listener
	useEffect(() => {
		window.addEventListener('keydown', handleKeyDown);
		window.addEventListener('keyup', handleKeyUp);
		return () => {
			window.removeEventListener('keydown', handleKeyDown);
			window.removeEventListener('keyup', handleKeyUp);
		};
	}, []);

	// game loop
	useEffect(() => {
		const interval = setInterval(() => {
			const CurrentDirections = Direction;

			if (keyMap[CurrentDirections.UP]) {
				gameStore.movePlayer('up');
			}
			if (keyMap[CurrentDirections.DOWN]) {
				gameStore.movePlayer('down');
			}
			if (keyMap[CurrentDirections.LEFT]) {
				gameStore.movePlayer('left');
			}
			if (keyMap[CurrentDirections.RIGHT]) {
				gameStore.movePlayer('right');
			}
		}, 1000 / 60); // 60 fps
		return () => clearInterval(interval);
	}, []);

	return (
		<>
			<div
				className={classes.gamebox}
				style={{
					width: gameStore.fieldSize[0] + 'px',
					height: gameStore.fieldSize[1] + 'px',
				}}>
				<Player playerPosition={gameStore.playerPosition} speed={1} />
			</div>
			<div className='flex gap-2 mx-auto'>
				<div className='flex gap-1 flex-col content-start'>
					<label htmlFor='confused'>Confused</label>
					<input
						type='checkbox'
						id='confused'
						name='confused'
						value='confused'
						onChange={() =>
							gameStore.setPlayerConfused(!gameStore.playerConfused)
						}></input>
				</div>

				<input
					type='range'
					id='speed'
					name='speed'
					min='1'
					max='10'
					value={gameStore.playerSpeed}
					onChange={(event) =>
						gameStore.setPlayerSpeed(parseInt(event.target.value))
					}></input>
				<label htmlFor='speed'>Speed</label>
			</div>
		</>
	);
};

export default GameBox;
