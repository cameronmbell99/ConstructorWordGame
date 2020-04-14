var letter = function(value) {
    this.word = value;
    this.guess = false;

    this.compare = function(character) {
        if (this.letter === " ") {
            this.guess = true;
            return " ";
        } else {
            if (this.guess === false) {
                return "_";
            } else {
                return this.letter;
            }
        }
    }

    this.guessed = function(guess) {
        if (guess === this.letter) {
            this.guess = true;
        }
    }
}
module.exports = letter;