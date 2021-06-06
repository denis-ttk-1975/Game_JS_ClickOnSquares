var $start = document.querySelector('#start');
var $game = document.querySelector('#game');
var gameFieldSize = $game.getBoundingClientRect();

var score = 0;

$start.addEventListener('click', startGame);
$game.addEventListener('click', handleBoxClick);


function startGame() {
	$game.style.backgroundColor = '#fff';
	$game.setAttribute('data-gameField', 'true');
	$start.classList.add('hide');
	renderBox();
}

function handleBoxClick(event) {
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
	

	box.style.height = box.style.width = boxSize + 'px';
	box.style.position = 'absolute';
	box.style.backgroundColor = 'red';
	box.style.top = boxTop + 'px';
	box.style.left = boxLeft + 'px';
	box.style.cursor = 'pointer';
	box.setAttribute('data-box', 'true');

	$game.insertAdjacentElement('afterbegin', box);

}

function getRandom (min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}