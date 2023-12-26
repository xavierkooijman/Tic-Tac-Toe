const gameBoard = (()=>{

  let board = [,,,,,,,,]

  const setField = (index,sign) =>{
    board[index] = sign
    console.log(board)
  }

  const getBoard = () =>{
    return board
  }

  const clearBoard = () =>{
    board = [,,,,,,,,]
  }

  return{setField,getBoard,clearBoard,board}
})()

const player = (sign,name,wins)=>{
  this.sign = sign
  this.name = name
  this.wins = wins

  const getSign = () =>{
    return sign
  }

  const getName = () =>{
    return name
  }

  const getWins = () =>{
    return wins
  }

  const addWin = () =>{
    wins++
  }

  return {getSign, getName, getWins, addWin}
}

const controlGame = (()=>{

  let round = 1

  let playerX
  let playerO

  const pattern = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ]

  const createPlayers = (name1,name2,player1Sign) =>{
    if(player1Sign == 'X'){
      playerX = player('X',name1,0)
      playerO = player('O',name2,0)
    }
    else{
      playerX = player('X',name2,0)
      playerO = player('O',name1,0)
    }
    console.log(playerX.getName(),playerO.getName())
  }

  const nextRound = () =>{
    round++
    console.log(round)
  }

  const getCurrentPlayer = () =>{
    if(round % 2 == 0){
      return playerO
    }
    else{
      return playerX
    }
  }

  const getBothPlayers = () =>{
    return[playerX,playerO]
  }

  const makeMove = (index,sign) =>{
    gameBoard.setField(index,sign)
  }

  const checkWin = () =>{
    const board = gameBoard.getBoard()
    console.log(board)
    for(let i=0; i < pattern.length; i++){
      if(board[pattern[i][0]] == board[pattern[i][1]] && board[pattern[i][1]] == board[pattern[i][2]] && board[pattern[i][0]] != null){
        const currentPlayer = getCurrentPlayer()
        currentPlayer.addWin()
        return true
      }
    }
  }

  const restartGame = () =>{
    round = 1
    gameBoard.clearBoard()
  }

  return{createPlayers,nextRound,getCurrentPlayer,makeMove,getBothPlayers,checkWin,restartGame,playerX,playerO}
})()

const controlDOM = (()=>{
  const gamePage = document.getElementById('gamePage')
  const startPage = document.getElementById('startPage')
  const startButton = document.getElementById('startGameButton')
  const buttonSignX = document.getElementById('buttonSignX')
  const buttonSignO = document.getElementById('buttonSignO')
  const player1NameInput = document.getElementById('player1Name')
  const player2NameInput = document.getElementById('player2Name')
  const turnText = document.getElementById('turnText')
  const boardButtons = document.getElementsByClassName('gameBoardButtons')
  const scoreBoardCards = document.getElementsByClassName('scoreBoardCards')
  const restartButton = document.getElementById('restartButton')

  let player1Sign = 'X'

  const changeSignChoiceColor = (el,el2) =>{
    el.style.backgroundColor = '#ef4e7b'
    el2.style.backgroundColor = '#323f4e'
  }

  const setPlayer1Sign = (sign) =>{
    player1Sign = sign
  }

  const changeTurn = () =>{
    const currentPlayer = controlGame.getCurrentPlayer()
    turnText.textContent = ` TURN - ${currentPlayer.getName()}`
  }

  const getNames = () =>{
    const player1Name = player1NameInput.value
    const player2Name = player2NameInput.value
    controlGame.createPlayers(player1Name,player2Name,player1Sign)
    return [player1Name,player2Name]
  }

  const setScoreboardNames = (playerNames) =>{
    scoreBoardCards[0].querySelector('p').textContent = playerNames[0]
    scoreBoardCards[2].querySelector('p').textContent = playerNames[1]
  }

  const displayNumberOfWins = () =>{
    const players = controlGame.getBothPlayers()
    if(player1Sign == 'X'){
      scoreBoardCards[0].querySelector('p:nth-child(2)').textContent = players[0].getWins()
      scoreBoardCards[2].querySelector('p:nth-child(2)').textContent = players[1].getWins()
    }
    else{
      scoreBoardCards[0].querySelector('p:nth-child(2)').textContent = players[1].getWins()
      scoreBoardCards[2].querySelector('p:nth-child(2)').textContent = players[0].getWins()
    }
  }

  const displaySign = (sign,boardButton) =>{
    boardButton.textContent = sign
    if(sign == 'O'){
      boardButton.style.color = '#ef4e7b'
    }
  }

  const displayWinner = () =>{
    const currentPlayer = controlGame.getCurrentPlayer()
    turnText.textContent = `${currentPlayer.getName()} WINS!!!`
  }

  const clearDisplay = () =>{
    for(let i=0;i<boardButtons.length;i++){
      boardButtons[i].textContent = ''
    }
  }

  startButton.addEventListener('click', () =>{
    startPage.style.display = 'none'
    gamePage.style.display = 'flex'
    const playerNames = getNames()
    setScoreboardNames(playerNames)
    displayNumberOfWins()
    changeTurn()
  })

  buttonSignX.addEventListener('click', () =>{
    changeSignChoiceColor(buttonSignX,buttonSignO)
    setPlayer1Sign('X')
  })

  buttonSignO.addEventListener('click', () =>{
    changeSignChoiceColor(buttonSignO,buttonSignX)
    setPlayer1Sign('O')
  })

  for(let i=0; i<boardButtons.length;i++){
    boardButtons[i].addEventListener('click', () =>{
      const curentSign = controlGame.getCurrentPlayer().getSign()
      const index = boardButtons[i].getAttribute('data-id')
      controlGame.makeMove(index,curentSign)
      displaySign(curentSign,boardButtons[i])
      if(controlGame.checkWin() === true){
        displayNumberOfWins()
        displayWinner()
      }
      else{
        controlGame.nextRound()
        changeTurn()
      }
    })
  }

  restartButton.addEventListener('click', () =>{
    controlGame.restartGame()
    clearDisplay()
    changeTurn()
  })

})()