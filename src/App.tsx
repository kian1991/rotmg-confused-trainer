import GameBox from "./components/GameBox"
import themeMusic from './assets/theme.mp3'

function App() {
  
  const audio = new Audio(themeMusic)
  audio.loop = true
  audio.play()
  


  return (
    <>
      <GameBox />
    </>
  )
}

export default App
