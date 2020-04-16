var letter = function(value) {
    this.letter = value;
    this.guess = false;
    //console.log(this.guess);
    this.toString = function() {
        if (this.letter === " ") {
            return " ";
        } else {
            if (this.guess === false) {
                return "_";
            } else {
                return this.letter;
            }
        }
    }

    this.compare = function(guess) {
        if (guess.toLowerCase() === this.letter.toLowerCase()) {
            this.guess = true;
        }
    }
}
module.exports = letter;