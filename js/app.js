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
    const playerX = player('X',name1)
    const playerO = player('O',name2)
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
    console.log(board)
    for(let i=0; i < pattern.length; i++){
      if(board[pattern[i][0]] == "X" && board[pattern[i][1]] == "X" && board[pattern[i][2]] == "X"){
        console.log('win')
      }
    }
  }

  return{createPlayers,nextRound,getCurrentPlayer,makeMove,checkWin}
})()

const controlDOM = (()=>{
  const gamePage = document.getElementById('gamePage')
  const startPage = document.getElementById('startPage')
  const startButton = document.getElementById('startGameButton')
  const buttonSignX = document.getElementById('buttonSignX')
  const buttonSignO = document.getElementById('buttonSignO')
  const player1Name = document.getElementById('player1Name')
  const player2Name = document.getElementById('player2Name')
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
    const player1Name = player1Name.value
    const player2Name = player2Name.value
    return [player1Name,player2Name]
  }

  const setNames = (playerNames) =>{
    scoreBoardCards[0].querySelector('p').textContent = playerNames[0]
    scoreBoardCards[2].querySelector('p').textContent = playerNames[1]
  }

  startButton.addEventListener('click', () =>{
    startPage.style.display = 'none'
    gamePage.style.display = 'flex'
    const playerNames = getNames()
    console.log(playerNames)
    setNames(playerNames)
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
      controlGame.checkWin()
      controlGame.nextRound()
      changeTurn()
    })
  }

})()