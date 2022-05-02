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

  // let currentRow = 0
  // let currentTile = 0
  // let isGameOver = false

  const handleClick = (letter) => {
    // console.log(letter, "clicked");

    if (!isGameOver) {
      if (letter === 'DELETE') {
        deleteLetter()
        return
      }
      if (letter === 'ENTER') {
        console.log(entry, "entry");
        console.log(color, "color");
        checkRow()
        return
      }
      addLetter(letter)
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

  // const checkRow = () => {
  //   const guess = guessRows[currentRow].join('')
  //   if (currentTile > 4) {
  //     fetch(`http://localhost:8000/check/?word=${guess}`)
  //       .then(response => response.json())
  //       .then(json => {
  //         if (json == 'Entry word not found') {
  //           showMessage('word not in list')
  //           return
  //         } else {
  //           flipTile()
  //           if (wordle == guess) {
  //             showMessage('Magnificent!')
  //             isGameOver = true
  //             return
  //           } else {
  //             if (currentRow >= 5) {
  //               isGameOver = true
  //               showMessage('Game Over')
  //               return
  //             }
  //             if (currentRow < 5) {
  //               currentRow++
  //               currentTile = 0
  //             }
  //           }
  //         }
  //       }).catch(err => console.log(err))
  //   }
  // }

  const showMessage = (message) => {
    setTimeout(() => { setMessageBool(false) }, 2000)
    // let pclass="hidden"
    // setTimeout(() => {console.log("inside settime");}, 2000)
    return <p className="show">{message}</p>
  }

  const flipTile = () => {
    let colorRowCopy = [...color]
    // colorRowCopy[currentRow][currentTile] = "grey-overlay"

    let rowArray = colorRowCopy[currentRow].map(item => { return item = " grey-overlay" })
    // colorRowCopy[currentRow].map((row, i) => {
    //   return row[i] = "grey-overlay"
    // })
    colorRowCopy[currentRow] = rowArray
    console.log(colorRowCopy);
    setColor(colorRowCopy)
  }


  return (
    <div className="game-container">
      <div className="title-container">
        <h1>Wordle</h1>
      </div>
      <div className="message-container">
        {message.length > 0 && messageBool && showMessage(message)}
      </div>
      <div className="tile-container">
        {entry.map((guessRow, guessRowIndex) => {
          return <div id={"guessRow-" + guessRowIndex}>
            {guessRow.map((guess, guessIndex) => {
              // console.log(guess, "guess");
              // console.log(color[guessRowIndex][guessIndex], "color with index");
              return <div className={"tile -" + color[guessRowIndex][guessIndex]} id={"guessRow-" + guessRowIndex + "-tile-" + guessIndex}>
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
  );
}

export default App;
