class Piece {
    constructor(breakCount, className, ...messages) {
        this.break = breakCount;
        this.className = className;
        this.shakeCount = 0;
        this.timeShake = 200;
        this.messages = [...messages];
    }

    shakeIt() {
        if (!running) {
            running = true;
            const className = this.className;
            
            const self = this;
            $(this.className).addClass("shake-opacity");
            $(this.className).addClass('shake-constant');
            console.log(this.className);
            console.log(this.messages);
            if (this.messages && this.shakeCount < this.messages.length) {
                if (typing) {
                    return;
                }
                if (this.shakeCount < 2) {
                    typeSpeed = 200;
                } else {
                    typeSpeed = this.shakeCount * 200;
                }


                this.timeShake = typeSpeed + 100;
                myVoice.setRate(0.5 - (0.1 * this.shakeCount));
                sendMessage(this.messages[this.shakeCount]);
            }
            this.shakeCount++;
            if (this.shakeCount === this.break) {
                if (this.className === ".radio") {
                    breakInTwo();
                } else {
                    setTimeout(function () {
                        self.breakIt();
                        running = false;
                        transmissionRunning = true;
                    }, this.shakeCount * this.timeShake);
                }
            } else {
                setTimeout(function () {
                    console.log(className);
                    running = false;
                    $(className).removeClass("shake-opacity");
                    $(className).removeClass('shake-constant');
                }, this.shakeCount * this.timeShake);
            }


        }
    }

    setMessage(message, index) {
        this.messages[index] = message;
    }

    flash(time) {
        const className = this.className;
        $(className).addClass("highlight");
        setTimeout(() => $(className).removeClass("highlight"), time);
    }


    breakIt() {
        console.log(this.className);
        $(this.className).fadeOut('fast');
    }
}

class Pieces {
    constructor() {
        this.pieces = [];
        this.curIndex = 0;
    }

    setupTrack(trackNum) {
        console.log(trackNum);
        switch (trackNum) {
            case 0:
                this.curIndex = 0;
                break;
            case 1:

                this.curIndex = 1;
                break;
            case 2:
                this.curIndex = 4;
                break;
        }
        console.log(this.curIndex);
        this.showRemaining();
    }

    showRemaining() {
        for (let i = 0; i < this.curIndex; i++) {
            $(this.pieces[i].className).hide();
        }
    }


    curPiece() {
        if (this.curIndex < this.pieces.length) {
            return this.pieces[this.curIndex++];
        } else {
            console.error("End of pieces list");
            return false;

        }
    }

    prevPiece() {
        return this.pieces[this.curIndex - 1];
    }

    addPiece(piece) {
        this.pieces.push(piece);
        return piece;
    }

}

parts = new Pieces();
parts.addPiece(new Piece(3, '.antenna'));
parts.addPiece(new Piece(1, '.dial3'));
parts.addPiece(new Piece(1, '.dial2'));
parts.addPiece(new Piece(1, '.dial1'));
const screen = parts.addPiece(new Piece(6, '.screen', "OW! What the hell! Stop!", "Just listen!", "please", "don't", "leave", ""));
parts.addPiece(new Piece(3, '.speaker'));
parts.addPiece(new Piece(5, '.radio'));


let index = 0;
let running = false;
let missedClick = 0;

function makeUsable(part) {
    console.log(part);
    $(part.className).css("cursor", "pointer");
    $(part.className).click(function () {
        if(sendTransmission()){
            part.shakeIt();
        }
        
        
    });
    missedClick = 0;
}

function breakInTwo() {

    setTimeout(() => {
        $('#transmission').animate({ opacity: 0 }, 1000);
        $('.fullRadio').css({
            'left': '0',
            'top': '-50vh'
        });
        setTimeout(() => {
            $('.radio').removeClass('shake-opacity');
            $('.fullRadio').css("animation", "none")
            setTimeout(() => {
                $('.radioleft').css({
                    'transform-origin': '-60px 0px'
                });
                $('.fullRadio').css({
                    'left': '120px',
                });

            }, 1000);
        }, 3000);
    }, 2000);
}
