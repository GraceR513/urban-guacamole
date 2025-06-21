// Cache box elements
const boxes = Array.from({length: 9}, (_, i) => $(`#box${i}`));

let currentPlayer = 'X';
let turnCount = 0;
let gameOver = false;

$('#alertStart, #alertWinner, #alertDraw').hide();

const winningCombos = [
  [0,1,2],[3,4,5],[6,7,8],  // rows
  [0,3,6],[1,4,7],[2,5,8],  // columns
  [0,4,8],[2,4,6]           // diagonals
];

const endGame = () => {
  console.log("GAME OVER");
  $('.box').css('pointer-events','none');
};

// Check for a winner or draw
function checkGame() {
  for (const combo of winningCombos) {
    const [a,b,c] = combo;
    const textA = boxes[a].text(), textB = boxes[b].text(), textC = boxes[c].text();

    if (textA && textA === textB && textA === textC) {
      // Winner found
      combo.forEach(i => {
        boxes[i].removeClass('text-info bg-dark').addClass('text-dark bg-info');
      });
      $('#alertWinner').text(`GAME OVER... ${textA === 'X' ? 'Player 1' : 'Player 2'} WINS!`).show();
      gameOver = true;
      return endGame();
    }
  }

  if (turnCount === 9 && !gameOver) {
    $('#alertDraw').show();
    gameOver = true;
    endGame();
  }
}

function startGame() {
  $('#alertStart').show();
  $('.box').on('click', function() {
    if (gameOver || $(this).text()) return;

    $('#alertStart').hide();
    $(this).text(currentPlayer).toggleClass('text-info bg-dark'); // you can add styling here

    turnCount++;
    if (turnCount >= 5) checkGame();

    if (!gameOver) {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      $('#p1,#p2').toggleClass('bg-light border border-info');
    }
  });
}

$('#playBtn').on('click', startGame);
$('#resetBtn').on('click', () => location.reload(true));
