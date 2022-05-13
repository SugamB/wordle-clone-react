import React, { useState } from 'react';
import './App.css';


function App() {


  const wordle = 'SUPER'
  const keys = [
    'Q',
    'W',
    'E',
    'R',
    'T',
    'Y',
    'U',
    'I',
    'O',
    'P',
    'A',
    'S',
    'D',
    'F',
    'G',
    'H',
    'J',
    'K',
    'L',
    'ENTER',
    'Z',
    'X',
    'C',
    'V',
    'B',
    'N',
    'M',
    'DELETE',
  ]
  //  '«',

  const guessRows = [
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', '']
  ]

  let [entry, setEntry] = useState(guessRows)
  let [color, setColor] = useState(JSON.parse(JSON.stringify(guessRows)))
  let [currentTile, setCurrentTile] = useState(0)
  let [currentRow, setCurrentRow] = useState(0)
  let [isGameOver, setIsGameOver] = useState(false)
  let [message, setMessage] = useState('')
  let [messageBool, setMessageBool] = useState(false)

  // let [count, setCount] = useState(0)
  // let currentRow = 0
  // let currentTile = 0
  // let isGameOver = false


  const handleClick = (letter) => {
    letter = letter.toUpperCase();


    console.log(letter, "clicked");

    if (!isGameOver) {
      if (letter === 'DELETE' || letter === 'BACKSPACE') {
        deleteLetter()
        return
      }
      if (letter === 'ENTER') {
        // console.log(entry, "entry");
        // console.log(color, "color");
        checkRow()
        return
      }
      if (letter.length === 1 && letter.match(/[a-z]/i)) addLetter(letter)
    }
  }
  // console.log(currentTile, "currTile outside");

  const addLetter = (letter) => {
    if (currentTile < 5 && currentRow < 6) {
      let guessRowCopy = [...entry]
      guessRowCopy[currentRow][currentTile] = letter
      // console.log(guessRowCopy);
      setEntry(guessRowCopy)
      setCurrentTile(currentTile + 1)

    }
  }

  const deleteLetter = () => {
    if (currentTile > 0) {
      let guessRowCopy = [...entry]
      guessRowCopy[currentRow][currentTile - 1] = ''
      console.log(guessRowCopy);
      setEntry(guessRowCopy)

      if (currentTile === 1) setCurrentTile(0)
      else {
        setCurrentTile(currentTile - 1)
      }
    }
  }

  const checkRow = () => {
    const guess = entry[currentRow].join('')
    // console.log("guess", guess);
    if (currentTile > 4) {
      flipTile()
      if (wordle === guess) {
        console.log("guess == wordle", guess);
        setMessage("Magnificent")
        setMessageBool(true)
        setIsGameOver(true)
        return
      } else {
        if (currentRow >= 5) {
          setMessage("Game Over")
          setMessageBool(false)
          setIsGameOver(true)
        }
        if (currentRow < 5) {
          setCurrentRow(currentRow + 1)
          setCurrentTile(0)
        }
      }
    }

  }

  const showMessage = (message) => {
    setTimeout(() => { setMessageBool(false) }, 2000)
    // let pclass="hidden"
    // setTimeout(() => {console.log("inside settime");}, 2000)
    return <p className="show">{message}</p>
  }

  const flipTile = () => {
    let checkWordle = wordle.split('')
    let guessRowCopy = [...entry]
    let colorRowCopy = [...color]

    let count = 0

    let guess = entry[currentRow].join('')


    colorRowCopy[currentRow] = colorRowCopy[currentRow].map((item, idx) => {

      let checkIndex = checkWordle.indexOf(guess[idx])

      // if (guess[idx] === checkWordle[idx]) {
      //   item = "green-overlay"
      // } else if (checkWordle.includes(guess[idx])) {
      //   item = "yellow-overlay"
      // } else {
      //   item = "grey-overlay"
      // }


      //need to find the index of the letter in the keyboard array
      //then update the keyboard color array with the new color
      //using the state
      item = "grey-overlay"
      if (checkWordle[idx] === guess[idx]) { item = "green-overlay" }
      if (item !== "green-overlay" && checkIndex !== -1) {
        item = "yellow-overlay"
      }
      const removeStr = guess[idx] 
      const regex = new RegExp(removeStr, 'g'); 
      guess = guess.replace(regex, '1'); 

      console.log(guess);

      return item
    })

    // colorRowCopy[currentRow] = rowArray
    console.log(colorRowCopy);
    setColor(colorRowCopy)
  }
  // setTimeout(() => {}, 500 * index)
  return (
    <div>
    <div className="game-container" tabIndex={-1} onKeyUp={(event) => handleClick(event.key)}>
      <div className="title-container">
        <h1>Wordle Clone</h1>
      </div>
      <div className="message-container">
        {message.length > 0 && messageBool && showMessage(message)}
      </div>
      <div className="tile-container">
        {entry.map((guessRow, guessRowIndex) => {
          return <div id={"guessRow-" + guessRowIndex}>
            {guessRow.map((guess, guessIndex) => {
              return <div className={"tile - " + color[guessRowIndex][guessIndex]} id={"guessRow-" + guessRowIndex + "-tile-" + guessIndex}>
                {guess}
              </div>
            })}
          </div>
        })}
      </div>
      <div className="key-container">
        {keys.map((key) => {
          return <button id={key} onClick={() => handleClick(key)}>{key}</button>
        })}
      </div>
    </div>
    </div>
  );
}

export default App;
