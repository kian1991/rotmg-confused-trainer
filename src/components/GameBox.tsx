import { useEffect, useRef, useState } from 'react';
import classes from './GameBox.module.css';
import Player from './Player';
import { GameEngineState, useGameEngine } from '../store/useGameEngine';
type Props = {};

enum Direction {
	UP = 'w',
	DOWN = 's',
	LEFT = 'a',
	RIGHT = 'd',
	ROTATE_LEFT = 'q',
	ROTATE_RIGHT = 'e',
}

enum DirectionConfused {
	UP = 'd',
	DOWN = 'a',
	LEFT = 's',
	RIGHT = 'w',
	ROTATE_LEFT = 'e',
	ROTATE_RIGHT = 'q',
}

const GameBox = (props: Props) => {
	const gameEngine: GameEngineState = useGameEngine();

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
				gameEngine.movePlayer('up');
			}
			if (keyMap[CurrentDirections.DOWN]) {
				gameEngine.movePlayer('down');
			}
			if (keyMap[CurrentDirections.LEFT]) {
				gameEngine.movePlayer('left');
			}
			if (keyMap[CurrentDirections.RIGHT]) {
				gameEngine.movePlayer('right');
			}
		}, 1000 / 60); // 60 fps
		return () => clearInterval(interval);
	}, []);

	return (
		<>
			<div
				className={classes.gamebox}
				style={{
					width: gameEngine.fieldSize[0] + 'px',
					height: gameEngine.fieldSize[1] + 'px',
				}}>
				<Player
					playerSize={gameEngine.playerSize}
					playerPosition={gameEngine.playerPosition}
					speed={1}
				/>
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
							gameEngine.setPlayerConfused(!gameEngine.playerConfused)
						}></input>
				</div>

				<input
					type='range'
					id='speed'
					name='speed'
					min='1'
					max='10'
					value={gameEngine.playerSpeed}
					onChange={(event) =>
						gameEngine.setPlayerSpeed(parseInt(event.target.value))
					}></input>
				<label htmlFor='speed'>Speed</label>
			</div>
		</>
	);
};

export default GameBox;
