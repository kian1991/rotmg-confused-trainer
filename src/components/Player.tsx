import React from 'react'
import wizard from '../assets/wizard.png'

enum Direction {
UP,
DOWN,
LEFT,
RIGHT
}

type PlayerProps = {
    playerPosition: [number, number],
    speed: number,
}

const Player = (props: PlayerProps) => {
  return (
    <div style={{
        position: 'absolute',
        top: props.playerPosition[0] * props.speed + 'px',
        left: props.playerPosition[1] * props.speed + 'px',
        width: '50px',
        height: 'auto',

    }}>
        <img src={wizard} alt="player" style={{
            width: '100%',
        }}/>
    </div>
  )
}

export default Player;