var inquirer = require("inquirer");
var Word = require("./Word.js");

var guessesLeft = 10;
var ranWord = "";
var word;
var WIN = false;
var LOSE = false;
var realLetters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var lettersguessed = [];


function play() {
    inquirer.prompt({
        name: "genre",
        type: "list",
        message: "What genre would you like to play with?",
        choices: ["MOVIES", "BOOKS", "SONGS"]
    }).then(function(answer) {
        if (answer.genre === "MOVIES") {
            movies();
        } else if (answer.genre === "BOOKS") {
            books();
        } else {
            songs();
        }
    })

    function movies() {
        var movielist = ["The Godfather", "The Dark Knight", "Star Wars A New Hope", "Raiders of the Lost Ark", "Titanic"];
        //calls a random movie from movielist 
        ranWord = newWord(movielist);
        //console.log(ranWord);
        //sets random movie as a new word
        word = new Word(ranWord);
        console.log(word.stringing());

        win(ranWord);
        check(movielist);

    }

    function books() {
        var booklist = ["Harry Potter and the Goblet of Fire", "The Catcher in the Rye", "The Red October", "The Maze Runner", "Percy Jackson and the Lightning Theif"];
        //calls a random movie from movielist 
        ranWord = newWord(booklist);
        //console.log(ranWord);
        //sets random movie as a new word
        word = new Word(ranWord);
        console.log(word.stringing());

        win(ranWord);
        check(booklist);
    }

    function songs() {
        var songlist = ["Happy", "Hey Jude", "Sweet Child O Mine", "Hotel California", "Back In Black"];
        //calls a random movie from movielist 
        ranWord = newWord(songlist);
        //console.log(ranWord);
        //sets random movie as a new word
        word = new Word(ranWord);
        console.log(word.stringing());

        win(ranWord);
        check(songlist);
    }

    function check() {
        if (WIN === true || LOSE === true) {
            inquirer.prompt({
                name: "replay",
                type: "list",
                message: "Do you want to play again?",
                choices: ["REPLAY", "LEAVE"]
            }).then(function(answer) {
                if (answer.replay === "REPLAY") {
                    lettersguessed = [];
                    WIN = false;
                    LOSE = false;
                    guessesLeft = 10;
                    play();
                } else {
                    return
                }
            })
        } else {
            inquirer.prompt({
                name: "inputLetter",
                type: "input",
                message: "Guess a letter!"
            }).then(function(answer) {
                if (letters(answer.inputLetter)) {
                    var trying = false;
                    var num = 0;
                    for (var i = 0; i < ranWord.length; i++) {
                        if (answer.inputLetter === ranWord.charAt(i).toLowerCase()) {
                            trying = true;
                        }
                    }
                    for (var t = 0; t < lettersguessed.length; t++) {
                        if (answer.inputLetter === lettersguessed[t]) {
                            num++;
                        }
                    }
                    if (trying && num === 0) {
                        word.guessing(answer.inputLetter);
                        console.log(word.stringing());
                        lettersguessed.push(answer.inputLetter);
                        win(word);
                        check();
                    } else if (trying && num !== 0) {
                        console.log("sorry you already guessed that!")
                        console.log(word.stringing());
                        check();
                    } else {
                        lose();
                        if (guessesLeft > 0) {
                            lettersguessed.push(answer.inputLetter);
                            console.log("sorry wrong answer !")
                            console.log("Guesses Left: " + guessesLeft);
                            console.log(word.stringing());
                        }
                        check();
                    }

                } else {
                    console.log("Sorry please enter a letter!");
                    console.log(word.stringing());
                    check();
                }
            })
        }
    }

    function win() {
        var temp = word.stringing();
        var tempAray = ranWord.split("");
        var complete = tempAray.join(" ");
        complete += " ";
        if (complete === temp) {

            WIN = true;
            console.log("Congrats you WON!");
        }
        // currently no way of winning
        // It would be something along the lines of comparing all the correctguesses in the correct array
        // to the ranWord variable.
    }

    function newWord(list) {
        var ranNum = Math.floor(Math.random() * list.length);
        return list[ranNum];
    }

    function letters(value) {
        for (var i = 0; i < realLetters.length; i++) {
            if (value === realLetters[i]) {
                return true;
            }
        }
    }

    function lose() {
        guessesLeft--;
        if (guessesLeft === 0) {
            LOSE = true;
            console.log("Better luck next time!");
        }
    }

}



play();