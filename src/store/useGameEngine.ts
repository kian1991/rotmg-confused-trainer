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

export const useGameEngine = create<GameEngineState>((set) => ({
	// State
	fieldSize: [500, 500],
	playerPosition: [0, 0],
	playerSize: [50, 50],
	playerSpeed: 10,
	playerConfused: false,

	// Actions
	movePlayer: (direction: 'up' | 'down' | 'left' | 'right') => {
		console.log('movePlayer', direction);
		set((state) => {
			const [x, y] = state.playerPosition;
			const speed = state.playerSpeed;
			switch (direction) {
				case 'up':
					return { playerPosition: [x, y - speed] };
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
