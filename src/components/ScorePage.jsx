import React from "react";

export default function ScorePage(props) {

  const exitAndReset = () =>{
    props.updatePlayerInPlayerList(); // update in playerList the player who left
    props.setPage(0); // back to home page
    props.setRoundWin(0); // reset roundWin to 0
    props.setRoundLost(0) // reset roundLost to 0
  }
  

  return (
    <div>
      <button className="button-40" role="button" onClick={exitAndReset}>Exit Game</button>
        <br />
        <h1>Winner: {props.nameOfWinner}</h1>
        <h2> Win-Loss:</h2>
        <p>{props.player}: {props.roundWin} wins, {props.roundLost} losses</p>
      <button className="button-40" role="button" onClick={()=>{props.tryAgain()}}>Again?</button>
    </div>
  );
}
