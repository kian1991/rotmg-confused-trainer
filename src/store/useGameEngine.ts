import { create } from 'zustand';

export interface GameEngineState {
	fieldSize: [number, number];
	playerPosition: [number, number];
	playerSize: [number, number];
	playerSpeed: number;
	playerConfused: boolean;
	movePlayer: (direction: 'up' | 'down' | 'left' | 'right') => void;
	setPlayerConfused: (confused: boolean) => void;
	setPlayerSpeed: (speed: number) => void;
}

type Direction = 'up' | 'down' | 'left' | 'right';

//Left becomes Down, Down becomes Left, Right becomes Up, Up becomes Right, Rotate Left becomes Rotate Right, Rotate Right becomes Rotate Left.
const getConfusedDirection = (direction: Direction) => {
	switch (direction) {
		case 'up':
			return 'right';
		case 'down':
			return 'left';
		case 'left':
			return 'down';
		case 'right':
			return 'up';
	}
};

const checkBounds = (position: [number, number], fieldSize: [number, number]) => {
    const [x, y] = position;
    const [fieldWidth, fieldHeight] = fieldSize;
    if (x < 0) {
        return [0, y];
    }
    if (x > fieldWidth) {
        

export const useGameEngine = create<GameEngineState>((set) => ({
	// State
	fieldSize: [500, 500],
	playerPosition: [500, 225],
	playerSize: [50, 50],
	playerSpeed: 10,
	playerConfused: false,

	// Actions
	movePlayer: (direction: 'up' | 'down' | 'left' | 'right') => {
		set((state) => {
			if (state.playerConfused) {
				direction = getConfusedDirection(direction);
			}
			const [x, y] = state.playerPosition;
			console.log(state.playerPosition);
			const speed = state.playerSpeed;
			switch (direction) {
				case 'up':
					return y - speed < state.fieldSize[1]
						? { playerPosition: [x, y - speed] }
						: { playerPosition: [x, state.fieldSize[1]] };
				case 'down':
					return { playerPosition: [x, y + speed] };
				case 'left':
					return { playerPosition: [x - speed, y] };
				case 'right':
					return { playerPosition: [x + speed, y] };
			}
		});
	},

	setPlayerConfused: (confused: boolean) => {
		set({ playerConfused: confused });
	},

	setPlayerSpeed: (speed: number) => {
		set({ playerSpeed: speed });
	},
}));
