import { useState } from "react";
import "./App.css";
import GamePage from "./components/GamePage";
import HomePage from "./components/HomePage";
import ScorePage from "./components/ScorePage";

function App() {

  const [page, setPage] = useState(0); // החלפת עמודים
  const [computerDeck, setComputerDeck] = useState([]); // מערך קלפים של המחשב
  const [playerDeck, setPlayerDeck] = useState([]);// מערך קלפים של השחקן
  const [player, setPlayer] = useState(''); // מחרוזת של השחקן
  const [roundWin,setRoundWin] = useState(0) // כמה ניצחונות יש לשחקן שכרגע משחק
  const [roundLost,setRoundLost] = useState(0) // כמה הפסדים יש לשחקן המשחק
  const [allPlayers,setAllPlayers] = useState([]) // מערך כל השחקנים ששיחקו
  const [nameOfWinner,setNameOfWinner] = useState("") // מי ניצח

// function to create a random deck of cards
  const createDeck = () => {
    let temp = [];
    //  i = 1 to use % 4 == 0, cardValue = the value of card since we want 4 cards of each value
    for (let i = 1, cardValue = 1; i < 53; i++) {
      temp.push(cardValue);
      if (i % 4 === 0) {
        cardValue++;
      }
    }

    let rnd;
    let compDeck = [];
    let playDeck = [];

    //
    for (let i = 0; i < 26; i++) {
      
      // מחלק לשחקן קלפים קלפים רנדומלים
      rnd = Math.floor(Math.random() * temp.length); // getting random number 0 - 26
      playDeck.push(temp[rnd]); // pushing to playDeck array the number in temp array in location [rnd] random
      temp.splice(rnd, 1); // deleting the card that was given to the player from the array
      // splice params (index, how many to delete)

      // מחלק למחשב קלפים רנדומלים
      rnd = Math.floor(Math.random() * temp.length); // getting random number 0 - 26
      compDeck.push(temp[rnd]); // pushing to compDeck array the number in temp array in location [rnd] random
      temp.splice(rnd, 1); // deleting the card that was given to the computer from the array
    }

    setComputerDeck([...compDeck]); //updating the hook
    setPlayerDeck([...playDeck]); 
  };


  //! check if name is valid, if so create the deck, move page and setPlayer 
  //! sent to HomePage
  const validName = (name) => {
    if (name.length > 0) {
      // inserting the wins and losses if name is valid and page changes
      setPlayer(name);
      setPage(1);
      // running the function which creates our card deck
      createDeck();
      return true
    } else {
      alert("You must enter a name!");
      return false
    }
  };

  //! who won, compares the points sent to GamePage

  const checkWinner = (player1,pc1) =>{
    if(player1 > pc1){
      setNameOfWinner(player)
    }else if(pc1 > player1){
      setNameOfWinner("Computer")
    }else{
      setNameOfWinner("Nobody")
    }
  }

  


  //! reshuffle deck and retry game - sent to ScorePage
  const tryAgain = () =>{
    setPage(1) //  re-route to game page
    createDeck() //  reshuffle the decks
    updatePlayerInPlayerList() // update player information in player list
  }

  //! Add player to allPlayer list - sent to HomePage
  const addPlayerToPlayerList = (newPlayer) =>{
    setAllPlayers([...allPlayers,newPlayer]) //add new player to list and keeping the old list
  }

  //! Update player information in allPlayer, sent to ScorePage
  const updatePlayerInPlayerList = () =>{
    const allPlayersCopy = allPlayers.map( val =>{
      if (val.name === player){ // check if current player(string) exists in allPlayers, searching by .name
        return{ //if found , return new object
          name: val.name, //name
          roundWin: roundWin, // setting roundWin from local state
          roundLost: roundLost //setting roundLost from local state
        }
      }
      return val // we want to keep all elements anyway
    })
    setAllPlayers(allPlayersCopy) // no need for spread since map returns copy array
  }


    //! function to show different pages depending on page hook value

  const showPage = () => {
    if (page === 0) {
      //sending function that sets player property + changing pages + creating deck, else "error"
      return <HomePage valid={validName} allPlayers={allPlayers} addPlayerToPlayerList={addPlayerToPlayerList} setRoundWin={setRoundWin} setRoundLost={setRoundLost}/>;
    } else if (page === 1) {
      return (
        <GamePage roundLost={roundLost} roundWin={roundWin} setRoundWin={setRoundWin} setPage={setPage} setRoundLost={setRoundLost} computerDeck={computerDeck} playerDeck={playerDeck} player={player} checkWinner={checkWinner}/>
      );
    } else if (page === 2) {
      return <ScorePage allPlayers={allPlayers} updatePlayerInPlayerList={updatePlayerInPlayerList} roundLost={roundLost} roundWin={roundWin} setRoundLost={setRoundLost} setRoundWin={setRoundWin} nameOfWinner={nameOfWinner}  tryAgain={tryAgain} player={player} setPage={setPage}/>;
    }
  };

  return (
    <div className="App">
      {/* calling showPage function to show pages according to page hook */}
      {showPage()}
    </div>
  );
}

export default App;
