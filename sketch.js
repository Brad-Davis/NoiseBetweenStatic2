let canvas, button1, button2, myFont;
let padding = 200;
let prevSize;
let size;
let color = 255;
let addStart = 0;
let home = true;
let runningIntro = false;
let radius = 80;
let centerX;
let centerY;
let v1;
let dial;
let angle = 20.2;
let onDial = false;
let rotWorking = false;
let pX, pY;
let cur;
let prevAngle;
let move = false;
let scrollActive = false;
let start;
let delta;
let scrollToDeg;
let scrollRate;
let count = 0;
let dialShowing = false;
let staticSound;
let introSound;
let masterVolumeVal = 0.2;
let videoRunning = false;
let myVoice = new p5.Speech(); // speech synthesis object

// setTimeout(function () {
//     myVoice.setVoice();

//     myVoice.setPitch(0.01)
//     myVoice.setVoice(Math.floor(Math.random(myVoice.voices.length)));
//     myVoice.listVoices();
//     myVoice.setVoice("fr-FR");
//     myVoice.speak('hi there');
//     // say something
// }, 3000)

let choiceVoice = 5;//english;
let choicePitch = 0.7;
let choiceRate = 1;
let typeSpeed = 100;
let messageIndex = 0;
let lineBreakLength = 12;
let modal;
let modalContent;
let transmissionRunning = true;
let saidNo = false;
let findPart = false;
let givenName = "";
let stopType = false;
let typing = false;
let curPart = ""
let prevMessage;
let broadcast;



//english 5
//japan 12

//HELLO CAN U HEAR ME

let words = ["i", "heart", "p", "five"]; // some words

let iterator = 0; // a counter for the words

let listbutton; // button
let transmissions;
let curTrackNum;
let globalTransmissionNum = -1;
let curRandomVoice = 0;
let partTransmissions = ["Did u hear me?! Fix my " + curPart, "Are you kidding? THE " + curPart + "!!!!", ""];
function preload() {
    globalTransmissionNum = 0;
    choiceVoice = 5;//english;
    choicePitch = 0.7;
    choiceRate = 1;
    typeSpeed = 40;
    messageIndex = 0;
    lineBreakLength = 12;


    transmissions = [["Hey, hey you!",
        "Good you can hear me",
        "What's your name?",
        getName,
        "... That'll have to change if you ever wanna make it big but whatever",
        "Anyway you think you can help me out?",
        getYesNoFake,
        "You know you're alright, ",
        "Thanks for helping me out. people these days aren't giving me the respect I deserve",
        "It's actually in your best interest to help me cuz I've worked with everyone",
        "anyway can you fix up my antenna? Its been so janky lately",
        antennaAdjust,
        "WOAH OH MY GOD THAT HURT",
        "WAIT STOP",
        fadeOutRadio
    ], ["Damn you didn't have to adjust it so hard",
        "can't hear as much as I used to",
        "can u move stations around see if that'll fix it?",
        dialAdjust,//hit all three dials
        "JEEZ a little softer, my bolts aren't what they used to be",
        stopTransmission,
        "Ughhh try the other one",
        stopTransmission,
        fadeOutRadio
    ], ["Alright so now all I can hear are agressively loud ads for airlines",
        "You shoulda seen the heyday. I was everywhere",
        "You couldn't get away from me. Sports, stories, people cared",
        "Here wait listen to this",
        baseballBroadcast,
        "I'm serious just listen",
        "So tired of this pop 50s bullshirt",
        "People used to gather around and listen",
        "So that's what you're gonna do",
        mouthAdjust,
        speakerAdjust,
        radioAdjust,
        ""


        //baseball radio starts playing and will continue to until you touch the mouth
        //weird sounds start playing
    ]]
    soundFormats('mp3')
    staticSound = loadSound('static.mp3');
    introSound = loadSound('radio.mp3');
    broadcast = loadSound('./baseball.mp3');
}

function stopTransmission() {
    transmissionRunning = false;
}



function playTrack(trackNum) {
    curTrackNum = trackNum;
    parts.setupTrack(trackNum);
    curRandomVoice = trackNum * 0.2;
}

function draw() {
    // why draw when you can click?
}

function doList() {
    myVoice.listVoices(); // debug printer for voice options
}

function keyPressed() {
    background(255, 0, 0); // clear screen
}

function mousePressed() {
    if (transmissionRunning) {
        console.log(transmissionRunning);
        sendTransmission();

    } else if (findPart) {
        missedClick++;
        console.log(missedClick);
        if (missedClick > 5) {
            parts.prevPiece().flash(1000);
            missedClick = 0;
        }
    } else {
        //baseball broadcast send message every five
        missedClick++;
        if (missedClick > 5) {
            parts.prevPiece().flash(1000);
            missedClick = 0;
        }
    }

}

function randomVoice() {
    myVoice.setPitch(random(2));
    myVoice.setRate(random(0.5, 2));
    myVoice.setVoice(Math.floor(random(myVoice.voices.length)));
}

function normalVoice() {
    myVoice.setPitch(choicePitch);
    myVoice.setRate(choiceRate);
    myVoice.setVoice(choiceVoice);

}

function speakWithRandom(message, randomAmount) {
    //randomAmount bewteen 0 and 1
    let randAmt = random(1);
    if (randAmt < randomAmount) {
        randomVoice();
    }
    speakMes(message);
    normalVoice();
}

function speakMes(message) {
    myVoice.speak(message);
}

function sendTransmission() {
    if (!typing) {
        globalTransmissionNum++;
    }
    sendTransmissionArray(curTrackNum, globalTransmissionNum - 1);

}




function sendTransmissionArray(trackNum, transmissionNumber) {
    //This will send the transmissionNumber index 
    let curMessage = transmissions[trackNum][transmissionNumber];
    if (typeof curMessage === "function") {
        //if passed function returns false the text does not dissapear
        if (transmissions[trackNum][transmissionNumber]()) {
            document.getElementById("transmission").innerText = "";

        }
    } else {
        sendMessage(curMessage);
        //speakWithRandom(curMessage, transmissionNumber / 10)
    }

}


function sendMessage(message) {
    if (!typing) {
        messageIndex = 0;
        typing = true;
        speakWithRandom(message, curRandomVoice)
        $(".screen").addClass("talking");
        document.getElementById("transmission").innerText = ""
        typeMessage(message)
    } else {
        //show all message
        document.getElementById("transmission").innerText = message;
        typing = false;
        $(".screen").removeClass("talking");
    }
}

function typeMessage(message) {
    if (messageIndex < message.length) {
        const curChar = message.charAt(messageIndex);
        if (typing) {
            document.getElementById("transmission").innerHTML += message.charAt(messageIndex);
        } else {
            return;
        }
        messageIndex++;
        setTimeout(function () {
            typeMessage(message);
        }, typeSpeed);
    } else {
        typing = false;
        $(".screen").removeClass("talking");
    }
}

function getName() {
    openBox();
    const inputName = document.createElement("input");
    inputName.setAttribute("type", "text");
    const doneBtn = document.createElement("BUTTON");
    doneBtn.innerHTML = "Done!";
    doneBtn.className = "fullWidth";
    modalContent.appendChild(inputName);
    modalContent.appendChild(doneBtn);
    doneBtn.onclick = function () {
        console.log(inputName.value);
        givenName = inputName.value;
        if (givenName === "") {
            sendMessage("Fine! Being all coy. I'll just call u Georfry");
            givenName = "Georfry";
        }
        transmissions[0][4] = givenName + transmissions[0][4];
        transmissions[0][7] = transmissions[0][7] + givenName;
        screen.setMessage(givenName, 5);
        console.log(screen);
        closeBox();
    }
    return true;

}

function getYesNoFake() {
    let yesBtn = document.createElement("BUTTON");
    let noBtn = document.createElement("BUTTON");
    yesBtn.innerHTML = "YES";
    noBtn.innerHTML = "no";
    noBtn.onclick = function () {
        transmissions[0][8] = "I saw that $#!1 by the way don't ever try to pull that again";
        noBtn.innerHTML = "YES";
        if (saidNo === true) {
            closeBox();
        }
        saidNo = true;
    }
    yesBtn.onclick = function () {
        closeBox();
    }

    modalContent.appendChild(yesBtn);
    modalContent.appendChild(noBtn);
    openBox();
    return true;
}

function openBox() {
    modal.style.display = "block";
    transmissionRunning = false;
}

function closeBox() {
    modal.style.display = "none";
    modalContent.innerHTML = '';
    transmissionRunning = true;
}

function antennaAdjust() {
    transmissionRunning = false;
    makeUsable(parts.curPiece());
    findPart = true;
    return false;
}

function dialAdjust() {
    transmissionRunning = false;
    makeUsable(parts.curPiece());
    makeUsable(parts.curPiece());
    makeUsable(parts.curPiece());
    findPart = true;
}

function mouthAdjust() {
    transmissionRunning = false;
    makeUsable(parts.curPiece());
}

function speakerAdjust() {
    console.log('speaker');
    transmissionRunning = false;
    makeUsable(parts.curPiece());
}

function radioAdjust() {
    transmissionRunning = false;
    makeUsable(parts.curPiece());
}

function baseballBroadcast() {
    $(".speaker").addClass('shake-constant');
    broadcast.play();
}

function fadeInRadio(callback) {
    $('#wholeRadio').fadeIn("slow", function () {
        callback("woah");
    });
}

function fadeOutRadio() {
    $('.fullRadio').addClass("shake-opacity");
    $('#transmission').addClass("shake-opacity");
    $('#wholeRadio').animate({ opacity: 0 }, 1000, function () {
        $('.fullRadio').removeClass("shake-opacity");
        $('#transmission').removeClass("shake-opacity");

    });
    curTrackNum++;
}


function setup() {
    modal = document.getElementById("myModal");
    modalContent = document.getElementById("modalContent");
    normalVoice();
    myVoice.interrupt = true;
    masterVolume(masterVolumeVal);
    introSound.setVolume(1.0, 3);
    staticSound.setVolume(0.1, 3);
    introSound.loop();
    centerX = windowWidth / 2;
    centerY = windowHeight / 2;
    createCanvas(windowWidth, windowHeight);
    angleMode(DEGREES);
    fill(155);
    textAlign(CENTER, CENTER);
    rectMode(CENTER);
    rotate(0);
    background(0);
    textFont('Nintendoid1');
    button1 = createButton('FULLSCREEN!');
    button1.position(windowWidth / 2 - button1.width / 2 + padding, windowHeight / 2 - button1.height / 2);
    button1.mousePressed(function () {
        fullScreen();
        enterSite();
    });
    button1.style('font-family', 'Nintendoid1');

    button2 = createButton('NO FULLSCREEN!');
    button2.style('font-family', 'Nintendoid1');
    button2.position(windowWidth / 2 - button2.width / 2 - padding, windowHeight / 2 - button2.height / 2);
    button2.mousePressed(enterSite);

}


function windowResized() {
    centerX = windowWidth / 2;
    centerY = windowHeight / 2;
    resizeCanvas(windowWidth, windowHeight);
    button1.position(windowWidth / 2 - button1.width / 2 + padding, windowHeight / 2 - button1.height / 2);
    button2.position(windowWidth / 2 - button2.width / 2 - padding, windowHeight / 2 - button2.height / 2);
}


function draw() {
    if (home) {
        fill(0, 30);
        rect(centerX, centerY, width, height)
        titleText(addStart, runningIntro);
    } else {
        if (!videoRunning) {
            // startVideo(0);

        } else {
            if (player.getCurrentTime() > player.getDuration() * 0.98) {
                videoRunning = false;

                angle = prevAngle + 30;
                bringCanvasToFront();
                staticSound.setVolume(0.2, 2)
            }
        }
    }

}

function titleText(add, runningIntro) {
    if (runningIntro) {
        size = prevSize * 1.05;
        if (size > 300) {
            color -= 4;
        }
        if (color <= 0) {
            home = false;
            startIntro();
            fadeInRadio(console.log)
            playTrack(0);
        }
    } else {
        console.log(size)
        size = 200 - Math.cos(frameCount / 100) * 200 + add;
        // color = size + 255;
    }

    prevSize = size;
    fill(color, color, color);
    textSize(size * Math.random());
    // translate(width / 2, height / 2);
    // rotate(size * frameCount)
    text('Noise_Between_Static', Math.random() * window.width, Math.random() * window.height);

}

function fullScreen() {
    let fs = fullscreen();
    fullscreen(!fs);
    resizeCanvas(windowWidth, windowHeight);

}

function fullscreenButton() {
    let fs = fullscreen();
    fullscreen(!fs);
    resizeCanvas(windowWidth, windowHeight);
}



function enterSite() {
    button1.remove();
    button2.remove();
    runningIntro = true;
    introSound.setVolume(0, 5);
    staticSound.loop();
    background(0);
    clear();
    //document.getElementById("defaultCanvas0").style.zIndex = "1"

}


function startVideo(videoNum) {
    videoRunning = true;
    $(".staticBackground").fadeTo(1000, 1, function () {
        runVideo(videoNum);
        $("#fullBackground").fadeTo(1000, 1, function () {
            console.log('faded!');
            $(".staticBackground").fadeTo(1500, 1, function () {
                $(".staticBackground").fadeTo(3000, 0);
            });
        });
    });

}
