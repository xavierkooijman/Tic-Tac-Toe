const gameBoard = (()=>{

  let board = [,,,,,,,,]

  const setField = (index,sign) =>{
    board[index] = sign
  }

  const getField = (index) =>{
    return board[index]
  }

  return{setField,getField,board}
})()

const player = (sign,name)=>{
  this.sign = sign
  this.name = name

  const getSign = () =>{
    return sign
  }

  const getName = () =>{
    return name
  }

  return {getSign, getName}
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

  const createPlayers = (name1,name2) =>{
    playerX = player('X',name1)
    playerO = player('O',name2)
  }

  const nextRound = () =>{
    round++
  }

  const getCurrentPlayer = () =>{
    if(round % 2 == 0){
      return playerO
    }
    else{
      return playerX
    }
  }

  const makeMove = (index,sign) =>{
    gameBoard.setField(index,sign)
  }

  const checkWin = () =>{
    let board = gameBoard.board
    for(let i=0; i < pattern.length; i++){
      if(board[pattern[i][0]] == board[pattern[i][1]] && board[pattern[i][1]] == board[pattern[i][2]] && board[pattern[i][0]] != null){
        return true
      }
    }
  }

  return{createPlayers,nextRound,getCurrentPlayer,makeMove,checkWin,playerX,playerO}
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

  const changeSignChoiceColor = (el,el2) =>{
    el.style.backgroundColor = '#ef4e7b'
    el2.style.backgroundColor = '#323f4e'
  }

  const changeTurn = () =>{
    const currentPlayer = controlGame.getCurrentPlayer()
    turnText.textContent = ` TURN - ${currentPlayer.getName()}`
  }

  const getNames = () =>{
    const player1Name = player1NameInput.value
    const player2Name = player2NameInput.value
    controlGame.createPlayers(player1Name,player2Name)
    return [player1Name,player2Name]
  }

  const setScoreboardNames = (playerNames) =>{
    scoreBoardCards[0].querySelector('p').textContent = playerNames[0]
    scoreBoardCards[2].querySelector('p').textContent = playerNames[1]
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
    
  }

  startButton.addEventListener('click', () =>{
    startPage.style.display = 'none'
    gamePage.style.display = 'flex'
    const playerNames = getNames()
    setScoreboardNames(playerNames)
    changeTurn()
  })

  buttonSignX.addEventListener('click', () =>{
    changeSignChoiceColor(buttonSignX,buttonSignO)
  })

  buttonSignO.addEventListener('click', () =>{
    changeSignChoiceColor(buttonSignO,buttonSignX)
  })

  for(let i=0; i<boardButtons.length;i++){
    boardButtons[i].addEventListener('click', () =>{
      const curentSign = controlGame.getCurrentPlayer().getSign()
      const index = boardButtons[i].getAttribute('data-id')
      controlGame.makeMove(index,curentSign)
      displaySign(curentSign,boardButtons[i])
      if(controlGame.checkWin() === true){
        displayWinner()
      }
      else{
        controlGame.nextRound()
        changeTurn()
      }
    })
  }

  restartButton.addEventListener('click', () =>{
    clearDisplay()
  })

})()