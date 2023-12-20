const gameBoard = (()=>{

  let board = [,,,,,,'X','X','X']

  const setField = (index,sign) =>{
    gameBoard[index] = sign
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

  const playerX = player('X')
  const playerO = player('O')
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

  const getCurrentPlayer = () =>{
    if(round % 2 == 0){
      return playerO
    }
    else{
      return playerX
    }
  }

  const makeMove = () =>{
    gameBoard.setField()
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

  return{getCurrentPlayer,makeMove,checkWin}
})()

const controlDOM = (()=>{
  const gamePage = document.getElementById('gamePage')
  const startPage = document.getElementById('startPage')
  const startButton = document.getElementById('startGameButton')
  const buttonSignX = document.getElementById('buttonSignX')
  const buttonSignO = document.getElementById('buttonSignO')
  const nameInputsContainer = document.getElementsByClassName('nameInputs')
  const turnText = document.getElementById('turnText')
  const boardButtons = document.getElementsByClassName('gameBoardButtons')
  const scoreBoardCards = document.getElementsByClassName('scoreBoardCards')
  const restartButton = document.getElementById('restartButton')

  startButton.addEventListener('click', () =>{
    startPage.style.display = 'none'
    gamePage.style.display = 'flex'
  })

})()