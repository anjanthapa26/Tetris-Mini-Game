import React, {useState} from 'react'

// required when needed to restart the game

import { createStage, checkCollision } from '../gameHelpers'

// components
import Stage from './Stage'
import Display from './Display'
import StartButton from './StartButton'
import { StyledTetrisWrapper } from './styles/StyledTetris'
import { StyledTetris } from './styles/StyledTetris'


//custom hooks
import { useInterval } from '../hooks/useInterval'
import { usePlayer } from '../hooks/usePlayer'
import { useStage } from '../hooks/useStage'



const Tetris = () => {

  const [dropTime, setDropTime] = useState(null);
  const[gameOver, setGameOver] = useState(null);

  const [player,updatePlayerPos,resetPlayer,playerRotate] = usePlayer();
  const [stage,setStage] = useStage(player,resetPlayer);

  


  const movePlayer = dir => {
    if(!checkCollision(player,stage, {x:dir, y:0})) {
      updatePlayerPos({x: dir, y: 0,collided:false})
    }

  }

  const startGame = () => {

    //Reset everything 
    setStage(createStage());
    setDropTime(1000);
    resetPlayer();
    setGameOver(false);

  }

  const drop = () => {
    if(!checkCollision(player,stage,{x:0, y:1})) {
      updatePlayerPos({x:0, y:1, collided: false})
    }
    else {
      // Game over 
      if(player.pos.y < 1) {
        console.log('Game over');
        setGameOver(true);
        setDropTime(null);
      }
      updatePlayerPos({x:0, y:0, collided:true})
    }
  }
  const keyUp = ({keyCode}) => {
    if(!gameOver) {
      if(keyCode === 40) {
        setDropTime(1000);
      }
    }
  }

  const dropPlayer = () => {
    setDropTime(null);
    drop();

  }

  const move = ({keyCode}) => {
    if(!gameOver) {
      if(keyCode === 37) {
        movePlayer(-1);
      }
      else if(keyCode === 39) {
        movePlayer(1)
      }
      else if(keyCode === 40) {
        dropPlayer();
      }
      else if (keyCode == 38) {
        playerRotate(stage,1);
      }
    }

  }

  useInterval(() => {
    drop()
  },dropTime)


  return (
    <StyledTetrisWrapper role="button" tabIndex="0" onKeyDown={e => move(e)} onKeyUp={e=> keyUp}>
      <StyledTetris>
        <Stage stage={stage}/>
        <aside>
          {gameOver ? (
            <Display gameOver={gameOver} text ="Game over" />
          ):(
          <div>
            <Display text="Score" />
            <Display text="Rows" />
            <Display text="Level" />
          </div>
          )}
          <StartButton callback={startGame} />
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  )
}

export default Tetris