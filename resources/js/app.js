var scores, roundScore, activePlayer, gamePlaying;

init();

document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gamePlaying) {
        // 1. Random number
        var dice1Value = Math.floor(Math.random() * 6) + 1;
        var dice2Value = Math.floor(Math.random() * 6) + 1;
        // 2. Display the result
        var dice1 = document.getElementById('dice-1');
        var dice2 = document.getElementById('dice-2');

        dice1.style.display = 'block';
        dice2.style.display = 'block';

        dice1.src = 'resources/img/dice-' + dice1Value + '.png';
        dice2.src = 'resources/img/dice-' + dice2Value + '.png';

        if (dice1Value !== 1 && dice2Value !== 1 ) {
            // Add the score
            roundScore += dice1Value + dice2Value;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            // Next player turn
            nextPlayer();
        }
    }

});



document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
        // Add current score to global score
        scores[activePlayer] += roundScore;

        // Update UI
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

        var input = document.querySelector('.final-score').value;
        var winningScore;
        if (input) {
            winningScore = input;
        } else {
            winningScore = 100;
        }

        // Check if the player has won the game
        if (scores[activePlayer] >= winningScore) {
            document.getElementById('name-' + activePlayer).textContent = 'Winner!';
            document.getElementById('dice-1').style.display = 'none';
            document.getElementById('dice-2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            // Next player
            nextPlayer();
        }
    }
});

document.querySelector('.btn-new').addEventListener('click', init);

function nextPlayer() {
    activePlayer = activePlayer === 0 ? 1 : 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
}

function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;

    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    document.querySelector('.player-0-panel').classList.add('active');

}



/*
* *** Challenges
*
* 1. A player looses entire score when he rolls two 6s in a row. After that it is the next players turn. (Hint: Save previous dice roll in a separate variable)
* 2. Add input field to HTML where players can set winning score, so that they can change the predefined score. (Hint: you can read that .value property in JavaScript)
* 3. Add another die to the game so that there are two dice
* */