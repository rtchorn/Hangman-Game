var wordList= ["bowser", "peach", "mario", "luigi", "toadstool", "starman", "yoshi",
				"mushroom", "rainbow", "wario", "koopa", "goomba", "princess", "overalls"
				];

var imageList = ["piq_330234_400x400.png"];





var ChosenWord="a";
var arrayWord = []; 
var arrayU = []; 
var chosenCharacter = "";
var guesses = 10;
var guessedLetters = [];
var chosenNumber = 0;
var gameStarted= false;
var wins = 0;
var losses = 0;
var keyPressed ="";

// why empty quotes

function StartGame(event){
	if (!gameStarted) {InitGame()}
	else{
		game()}
}

function InitGame(){ //sets starting parameters
	chosenNumber = Math.floor(Math.random() * wordList.length);
	ChosenWord = wordList[chosenNumber];
	arrayWord = ChosenWord.split(""); //split string into array of char
	chosenCharacter = imageList[1]
	guesses=12;
	underscore();
	document.getElementById("mario-pic").src= "assets/images/logo_plain.png";  //inserts logo at start of game
	document.getElementById("notStart").innerHTML = null; //"press any key" disappears because of null
	document.getElementById("problem").innerHTML = arrayU.join(" "); //replaces the html and adds corresponding underscores
	document.getElementById("guesses").innerHTML = "Guesses left: " + guesses;
	document.getElementById("wins").innerHTML = "Lives " + wins;
	document.getElementById("loss").innerHTML = "Deaths " + losses;
	gameStarted = true;
}
// Reset underscore for next word
function underscore(){
	arrayU=[null];
	for (var i=0; i<ChosenWord.length; i++)
	{
		arrayU[i] = "_";
	}
}
function game(){ //actual game loop
	keyPressed=CheckKey(event);
	update();
}

function CheckKey(event)
{
	return String.fromCharCode(event.which || event.keyCode);
}

function update(){
	checkInput();
	checkSolve();
	updateDisplay();
}
function checkInput(){
	var correct = false;
	var existing = false;

	
	// if m is pressed the first underscore will change to letter m
	for (var i = 0; i<arrayWord.length; i++) {
		if (keyPressed==arrayWord[i]) { //checks to see key input matches with word
			arrayU[i] = keyPressed; //if m matches with first letter, underscore changes to m
			correct = true;
		}
	}
	//look over
	if (guessedLetters == []) {
		guessedLetters=guessedLetters.push(keyPressed);
	}
	else{
		for (var i = 0; i<guessedLetters.length; i++) {
			if(guessedLetters[i]==keyPressed){existing=true}
		}
		if(!existing){guessedLetters.push(keyPressed)}
	}
	if(!correct&&!existing){guesses--}
	checkGameOver();
}
function checkSolve(){ //look over 
	if (arrayU.join("") == arrayWord.join("")){
		document.getElementById("notStart").innerHTML = "Press any key to start"; 
		wins++;
		document.getElementById("mario-pic").src = chosenCharacter;
		document.getElementById("wins").innerHTML = "Lives " + wins;
		gameStarted = false;
		guessedLetters = []; //resets guessed letters
	}
}
function checkGameOver(){
	if(guesses == 0){
		document.getElementById("notStart").innerHTML = "Press any key to start"; 
		losses++;
		document.getElementById("mario-pic").src = chosenCharacter;
		document.getElementById("loss").innerHTML = "Deaths " + losses;
		gameStarted=false;
		guessedLetters=[];
	}
}
function updateDisplay(){
		document.getElementById("problem").innerHTML = arrayU.join(" ");	
		document.getElementById("entered").innerHTML = guessedLetters;
		document.getElementById("guesses").innerHTML = "Guesses left: " + guesses;
}


// function quit() {
//     document.getElementById("message").innerHTML = "The word was "+word;
//     for (var j = 0; j < word.length; j++) {
//         answerArray[j] = word[j];
//     }
//     // Solve the puzzle
//     document.getElementById("answer").innerHTML = answerArray.join(" ");
// }
