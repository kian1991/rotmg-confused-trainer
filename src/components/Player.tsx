import React from 'react';
import wizard from '../assets/wizard.png';

enum Direction {
	UP,
	DOWN,
	LEFT,
	RIGHT,
}

type PlayerProps = {
	playerPosition: [number, number];
	playerSize: [number, number];
	speed: number;
};

const Player = (props: PlayerProps) => {
	return (
		<div
			style={{
				position: 'absolute',
				left: props.playerPosition[0] + 'px',
				top: props.playerPosition[1] + 'px',
				width: props.playerSize[0] + 'px',
				height: props.playerSize[1] + 'px',
			}}>
			<img
				src={wizard}
				alt='player'
				style={{
					width: '100%',
				}}
			/>
		</div>
	);
};

export default Player;
