var inquirer = require("inquirer");
var Word = require("./Word.js");

var guessesLeft = 10;
var ranWord = "";
var word;
var WIN = false;
var LOSE = false;
var realLetters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var correct = [];


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
        console.log(ranWord);
        //sets random movie as a new word
        word = new Word(ranWord);
        word.stringing();

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
        word.stringing();

        win(ranWord);
        check(booklist);
    }

    function songs() {
        var songlist = ["Happy", "Hey Jude", "Sweet child O Mine", "Hotel California", "Back In Black"];
        //calls a random movie from movielist 
        ranWord = newWord(songlist);
        //console.log(ranWord);
        //sets random movie as a new word
        word = new Word(ranWord);
        word.stringing();

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
                    for (var t = 0; t < correct.length; t++) {
                        if (answer.inputLetter === correct[t]) {
                            num++;
                        }
                    }
                    if (trying && num === 0) {
                        word.guessing(answer.inputLetter);
                        word.stringing();
                        correct.push(answer.inputLetter);
                        win(word);
                        check();
                    } else if (trying && num !== 0) {
                        console.log("sorry you already guessed that!")
                        word.stringing();
                        check();
                    } else {
                        console.log("sorry wrong answer !")
                        lose();
                        guessesLeft--;
                        console.log("Guesses Left: " + guessesLeft);
                        word.stringing();
                        check();
                    }

                } else {
                    console.log("Sorry please enter a letter!");
                    guessesLeft--;
                    word.stringing();
                    lose();
                    check();
                }
            })
        }
    }

    function win(word) {
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
        if (guessesLeft === 1) {
            LOSE = true;
        }
    }

}



play();