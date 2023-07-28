import { useEffect, useRef, useState } from 'react';
import classes from './GameBox.module.css';
import Player from './Player';
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
	const [playerPosition, setPlayerPosition] = useState<Position>([0, 0]);
	const [fieldSize, setFieldSize] = useState<Position>([500, 500]);
	const [playerSpeed, _setPlayerSpeed] = useState<number>(3);
	const [confused, _setConfused] = useState<boolean>(false);

	const playerSpeedRef = useRef(playerSpeed);
	const setPlayerSpeed = (speed: number) => {
		playerSpeedRef.current = speed;
		_setPlayerSpeed(speed);
	};

	const confusedRef = useRef(confused);
	const setConfused = (confused: boolean) => {
		confusedRef.current = confused;
		_setConfused(confused);
	};

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
			setPlayerPosition((oldPosition) => {
				// if confused is true, use the confused direction enum
				const CurrentDirection = confusedRef.current
					? DirectionConfused
					: Direction;

				let newPosition = [...oldPosition];
				if (keyMap[CurrentDirection.UP] && oldPosition[0] > 0) {
					newPosition[0] -= playerSpeedRef.current;
				}
				if (
					keyMap[CurrentDirection.DOWN] &&
					oldPosition[0] < fieldSize[0] - PLAYER_SIZE
				) {
					newPosition[0] += playerSpeedRef.current;
				}
				if (keyMap[CurrentDirection.LEFT] && oldPosition[1] > 0) {
					newPosition[1] -= playerSpeedRef.current;
				}
				if (
					keyMap[CurrentDirection.RIGHT] &&
					oldPosition[1] < fieldSize[1] - PLAYER_SIZE
				) {
					newPosition[1] += playerSpeedRef.current;
				}
				return newPosition as Position;
			});
		}, 1000 / 60); // 60 fps
		return () => clearInterval(interval);
	}, []);

	return (
		<>
			<div
				className={classes.gamebox}
				style={{
					width: fieldSize[0] + 'px',
					height: fieldSize[1] + 'px',
				}}>
				<Player playerPosition={playerPosition} speed={1} />
			</div>
			<div className={classes.settings}>
				<input
					type='checkbox'
					id='confused'
					name='confused'
					value='confused'
					onChange={() => setConfused(!confused)}></input>
				<label htmlFor='confused'>Confused</label>
				<input
					type='range'
					id='speed'
					name='speed'
					min='1'
					max='10'
					value={playerSpeed}
					onChange={(event) =>
						setPlayerSpeed(parseInt(event.target.value))
					}></input>
				<label htmlFor='speed'>Speed</label>
			</div>
		</>
	);
};

export default GameBox;
