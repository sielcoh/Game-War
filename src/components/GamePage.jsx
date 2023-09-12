import React, { useState } from "react";
import Card from "./Card"

export default function GamePage(props) {
  const [index, setIndex] = useState(0);
  const [computerPoint, setComputerPoint] = useState(0);
  const [playerPoint, setPlayerPoint] = useState(0);

  //! compare current index of player and computer in card array who wins, then index++
  const increaseIndex = () => {
    let player = playerPoint;
    let computer = computerPoint;
    if (props.computerDeck[index] > props.playerDeck[index]) {
      computer++;
      setComputerPoint(computer);
    } else if (props.computerDeck[index] < props.playerDeck[index]) {
      player++;
      setPlayerPoint(player);
    }
    let temp = index;
    temp++;
    setIndex(temp);
    if (index === 25) { // if 25 its the end of the array
      props.checkWinner(playerPoint,computerPoint); //check who won and update setWinner hook
      props.setPage(2); // move to score page
      if(player > computer){
        props.setRoundWin(props.roundWin + 1) // add roundWin hook
      } else{
        props.setRoundLost(props.roundLost + 1) // add roundLost hook
      }
    }
  };

  

  const sendCardToComputer = () => {
    return props.computerDeck[index];
  };
  const sendCardToPlayer = () => {
    return props.playerDeck[index];
  };

  return (
    <div>
      <div className="container">
        
        <div className="card-container">

          <h1>Computer</h1>
          <Card cardValue={sendCardToComputer} />
          <p>Points: {computerPoint}</p>
          <p>Round Won: {props.roundLost}</p>
          <br />

        </div>

      
       <div className="card-container">
          <h1>{props.player}</h1>
          <Card cardValue={sendCardToPlayer} />
          <p>Points: {playerPoint}</p>
          <p>Rounds Won: {props.roundWin}</p>
          <br />
        </div>

      </div>
      <br />
        <button className="button-40" role="button" onClick={increaseIndex}>Next</button>
        <h4> Round: {index+1} / 26 </h4>
      
    </div>
  );
}
