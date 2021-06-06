var $start = document.querySelector('#start');
var $game = document.querySelector('#game');
var gameFieldSize = $game.getBoundingClientRect();
var $time = document.querySelector('#time');
var $timeHeader = document.querySelector('#time-header');
var $resultHeader = document.querySelector('#result-header');
var $result = document.querySelector('#result');
var $gameTime = document.querySelector('#game-time');

var score = 0;
var isGameStarted = false;

$game.setAttribute('data-gameField', 'true');
$gameTime.addEventListener('input', setGameTime);
$start.addEventListener('click', startGame);
$game.addEventListener('click', handleBoxClick);


function startGame() {
	score = 0;
	setGameTime();
	$gameTime.setAttribute('disabled', 'true');
	$timeHeader.classList.remove('hide');
	$resultHeader.classList.add('hide');
	isGameStarted = true;
	$game.style.backgroundColor = '#fff';
	$start.classList.add('hide');

	var interval = setInterval(function() {
		var time = parseFloat($time.textContent);
		if (time <= 0) {
			clearInterval (interval);
			endGame();
		} else {
			$time.textContent = (time - 0.1).toFixed(1);
		}
	
	
	}, 100);
			
		
	renderBox();
}

function setGameTime() {
	var time = +$gameTime.value;
	$time.textContent = time.toFixed(1);
}

function setGameScore() {
	$result.textContent = score.toString();
}

function endGame () {
	isGameStarted = false;
	$game.innerHTML = '';
	$start.classList.remove('hide');
	$game.style.backgroundColor = '#ccc';
	$timeHeader.classList.add('hide');
	$resultHeader.classList.remove('hide');
	setGameScore();
	$gameTime.removeAttribute('disabled');


}

function handleBoxClick(event) {
	if (!isGameStarted) {
		return;
	}
	if(event.target.dataset.box) {
		renderBox();
		score++;
	}
}

function renderBox () {
	$game.innerHTML = '';
	var box = document.createElement('div');
	var boxSize = getRandom (30, 100);
	var maxTop = gameFieldSize.height - boxSize;
	var maxLeft = gameFieldSize.width - boxSize;
	var boxTop = getRandom (0, maxTop);
	var boxLeft = getRandom (0, maxLeft);
	var redColor = getRandom (0, 255);
	var greenColor = getRandom (0, 255);
	var blueColor = getRandom (0, 255);

	
	box.style.height = box.style.width = boxSize + 'px';
	box.style.position = 'absolute';
	box.style.backgroundColor = 'rgb(' + redColor + ', ' + greenColor +', ' + blueColor + ')';
	box.style.top = boxTop + 'px';
	box.style.left = boxLeft + 'px';
	box.style.cursor = 'pointer';
	box.setAttribute('data-box', 'true');

	$game.insertAdjacentElement('afterbegin', box);

}

function getRandom (min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}