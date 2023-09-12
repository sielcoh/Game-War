import React, { useState } from "react";

export default function HomePage(props) {
  const [name, setName] = useState(""); // אתחול שם המשתמש שיוזן
  const [showTable, setShowTable] = useState(false); // State to track table visibility

  const findExistingPlayer = props.allPlayers.find((val) => val.name === name); // if not found will return undefined
  const checkIfPlayerExists = () => {
    if (props.valid(name)) {  //First check the name before creating a new player
      if (findExistingPlayer === undefined) {
        props.addPlayerToPlayerList({ name: name, roundWin: 0, roundLost: 0 });
      } else {
        props.setRoundWin(findExistingPlayer.roundWin); // setting roundWin hook to existingPlayer record
        props.setRoundLost(findExistingPlayer.roundLost); // setting roundLost hook to existingPlayer record
      }
    }
  };
  // console.log(findExistingPlayer);
  //
  const sortedPlayers = props.allPlayers.sort((a, b) => b.roundWin - a.roundWin); //Sort from big win to small win

  const toggleTable = () => {
    setShowTable(!showTable); // Toggle the table visibility
  };

  const renderTable = () => {
    if (showTable) {
      return (
        <table >
          <tr >
            <th>Name</th>
            <th>Won</th>
            <th> Lost</th>
          </tr>
          {sortedPlayers.map((val, index) => (
            <tr key={index}>
              <td>{val.name}</td>
              <td>{val.roundWin}</td>
              <td>{val.roundLost}</td>
            </tr>
          ))}
        </table>
      );
    }
  };

  return (
    <div>
      {/* Show this page in devtools how to hooks were updated */}
      <h1 className="war-header">Ready For War?</h1>
      <hr />
      <input className="name-input" type="text" onChange={(e) => { setName(e.target.value); }} placeholder="Enter your name" />
      <br />
      {/* sending the name to app.js player hook using the name */}
      {/* TODO check how to send checkIfPlayerExists only if valid works */}
      <button className="button-40" role="button" onClick={() => { checkIfPlayerExists();}}>
        START!
      </button>
      <br />
      <button className="button-40" role="button" onClick={toggleTable}>Toggle Score table</button>
        {renderTable()}
    </div>
  );
}
