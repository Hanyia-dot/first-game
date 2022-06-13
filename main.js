const gameSummary = {
    numbers: 0,
    wins: 0,
    looses: 0,
    draws: 0,
}

const game = {
    playerItem: null,
    aiItem: null,
}

const items = [...document.querySelectorAll('.select img')];
const startBtn = document.querySelector('.start');
const resetBtn = document.querySelector('.reset');


//  first function
function itemSelection() {
    
    game.playerItem = this.dataset.option;
    //console.log(game.playerItem); 
    items.forEach(item => item.style.boxShadow = '');
    this.style.boxShadow = '0 0 10px 4px #f1c40f';
}

function computerChoice() {
    const aiItem = items[Math.floor(Math.random() * items.length)].dataset.option;

    return aiItem;
}

function checkResult(player, ai) {
    if(player === ai) {
        return "draw";
    } else if((player === "paper" && ai === "rock") || (player === "rock" && ai === "scissors") || (player ==="scissors" && ai == "paper")) {
        return "win";
    } else {return "loos";}



}

// Result function
function publishResult(player, ai, result) {

    document.querySelector('[data-summary="your-choice"]').textContent = player;

    document.querySelector('[data-summary="ai-choice"]').textContent = ai;

    document.querySelector('p.numbers span').textContent = ++gameSummary.numbers ;

    if(result === "win") {
        document.querySelector('p.wins span').textContent = ++gameSummary.wins ;
        document.querySelector('[data-summary="who-win"]').textContent = "You WIN!";
        document.querySelector('[data-summary="who-win"]').style.color = "#27ae60";
    } else if(result === "loos"){
        document.querySelector('p.losses span').textContent = ++gameSummary.looses;
        document.querySelector('[data-summary="who-win"]').textContent = "Looser"
        document.querySelector('[data-summary="who-win"]').style.color = "#c0392b";
    } else {
        document.querySelector('p.draws span').textContent = ++gameSummary.draws;
        document.querySelector('[data-summary="who-win"]').textContent = result;
        document.querySelector('[data-summary="who-win"]').style.color = "#2980b9";
    }
}

function endGame() {
    document.querySelector(`[data-option="${game.playerItem}"]`).style.boxShadow = "";
    game.playerItem = "";
    game.aiItem = "";
}

//  control function
function playing() {
    if(!game.playerItem) return alert('Make a choice!');

    game.aiItem = computerChoice();
    //console.log(game.aiItem);

    const gameResult = checkResult(game.playerItem, game.aiItem);
    //console.log(gameResult);
    publishResult(game.playerItem, game.aiItem, gameResult);

    endGame();
}

function resetGame() {
    console.log("reset");
    gameSummary.numbers = 0;
    gameSummary.wins = 0;
    gameSummary.looses = 0;
    gameSummary.draws = 0;
    game.playerItem = "";
    game.aiItem = "";
    document.querySelector('[data-summary="who-win"]').textContent = "";
    document.querySelector('[data-summary="ai-choice"]').textContent = "";
    document.querySelector('[data-summary="your-choice"]').textContent = "";

    document.querySelector('p.numbers span').textContent = "";
    document.querySelector('p.losses span').textContent = "";
    document.querySelector('p.wins span').textContent = "";
    document.querySelector('p.draws span').textContent = "";
    
}

items.forEach(item => item.addEventListener('click', itemSelection))
startBtn.addEventListener('click', playing)
resetBtn.addEventListener('click', resetGame)