var Letter = require("./Letter.js");

var Word = function(answer) {
    //Letter objects array
    this.objArray = [];

    for (var i = 0; i < answer.length; i++) {
        var letter = new Letter(answer[i]);
        this.objArray.push(letter);
    }

    this.stringing = function() {
        var string = "";
        for (var i = 0; i < this.objArray.length; i++) {
            var temp = this.objArray[i];
            string += temp.toString() + " ";
        }
        return string;
    }

    this.guessing = function(guess) {

        for (var i = 0; i < this.objArray.length; i++) {
            var temp = this.objArray[i];
            temp.compare(guess);

        }
    }
}

module.exports = Word;