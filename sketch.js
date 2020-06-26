let canvas, button1, button2, myFont;
let padding = 150;
let prevSize;
let size;
let color = 255;
let addStart = 0;
let home = true;
let running = false;
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
let prevAngle
let move = false;
let scrollActive = false;
let start;
let delta;
let scrollToDeg;
let scrollRate;
let count = 0;
let dialShowing = false;

const trackNums = 3;
const arcRad = radius*2.7;
const sizeArc = 75;
const arcStart = 110;
const lineSize = 5


function setup() {
    centerX = windowWidth/2;
    angleMode(DEGREES);
    centerY = windowHeight/2;
    createCanvas(windowWidth, windowHeight);
    fill(0);
    background(0);
    button1 = createButton('FULLSCREEN!');
    button1.position(windowWidth / 2 - button1.width / 2 + padding, windowHeight / 2 - button1.height / 2);
    button1.mousePressed(fullScreen);
    button1.style('font-family', 'Jost, sans-serif');

    button2 = createButton('NO FULLSCREEN!');
    button2.style('font-family', 'Jost, sans-serif');
    button2.position(windowWidth / 2 - button2.width / 2 - padding, windowHeight / 2 - button2.height / 2);
    button2.mousePressed(enterSite);

}


function windowResized() {
    centerX = windowWidth/2;
    centerY = windowHeight/2;
    resizeCanvas(windowWidth, windowHeight);
    button1.position(windowWidth / 2 - button1.width / 2 + padding, windowHeight / 2 - button1.height / 2);
    button2.position(windowWidth / 2 - button2.width / 2 - padding, windowHeight / 2 - button2.height / 2);
}


function draw() {

    if (home) {
        fill(0, 30);
        rect(0, 0, width, height)
        titleText(addStart, running);
    } else {
        translate(centerX, centerY);
        background(0);
        clear();
        noFill();
        //circle(0,0, radius * 3);
        stroke(255);
        
        arc(0, 0, arcRad, arcRad, arcStart, 175);
        arc(0, 0, arcRad, arcRad,  185, 265);
        arc(0, 0, arcRad, arcRad, 275, 355) ;
        arc(0, 0, arcRad, arcRad, 365, 70);
        line(arcStart-lineSize,0,arcStart+lineSize,0)
        line(-arcStart-lineSize,0,-arcStart+lineSize,0)
        line(0, -arcStart-lineSize,0,-arcStart+lineSize)
        
        noStroke();
        
        fill(255);
        dial = circle(0, 0, radius*2);
        rotate(angle);
        triangle(-radius ,0, radius, 0, 0, radius + 20)
        
        if(scrollActive){
            scrollTo(scrollRate, scrollToDeg);
        }
    }

}

function titleText(add) {
    if (running) {
        size = prevSize * 1.05;
        if (size > 300) {
            color -= 4;
        }

        if (color <= 0) {
            home = false;
            startIntro();
        }
    } else {
        size = 200 - Math.cos(frameCount / 100) * 200 + add;
    }
    prevSize = size;
    fill(color, color, color);
    textSize(size);
    textAlign(CENTER, CENTER);
    rotate(0);
    text(' radioIsNoiseBetweenStatic', windowWidth / 2, windowHeight / 2);
    rotate(90);
    text(' radioIsNoiseBetweenStatic', -200, -500);
}

function fullScreen() {
    let fs = fullscreen();
    fullscreen(!fs);
    resizeCanvas(windowWidth, windowHeight);
    enterSite();
}

function fullscreenButton() {
    let fs = fullscreen();
    fullscreen(!fs);
    resizeCanvas(windowWidth, windowHeight);
}



function enterSite() {
    button1.remove();
    button2.remove();
    running = true;
    background(0);
    clear();
    //document.getElementById("defaultCanvas0").style.zIndex = "1"

}

function mousePressed(){
    var d = dist(mouseX, mouseY, centerX, centerY)
    console.log(d);
    if(d < radius + 10){
      start = atan2(mouseY - centerX, mouseX - centerY);
      scrollActive = false;
      onDial = true;
      cur = angle;
    }
  }
  
function mouseDragged() {
    if(onDial){
        delta = start - atan2(mouseY - centerX, mouseX - centerY);
        //console.log("delta " + delta);
        angle = cur + delta;
        if(abs(angle) < 20){
            angle = 21 * Math.sign(angle);
            //make sound to signify end of thingy
            onDial = false;
        }
    }
}

function mouseReleased(){
    angle = angle % 360;
    if(abs(angle) < 20){
        angle = 21 * Math.sign(angle);
        //make sound to signify end of thingy
        onDial = false;
    }
    count = 0;
    if((angle > 70 && angle < 110) || (angle < -250 && angle > -290)){
        scrollActive = true;
        scrollToDeg = (Math.sign(angle) == 1)?  90 : -270;
        scrollRate = (angle - scrollToDeg)/300;
    } else if((angle > -200 && angle < -160) || (angle < 200 && angle > 160)){
        scrollActive = true;
        scrollToDeg = (Math.sign(angle) == 1)? 180:-180
        scrollRate = (angle - scrollToDeg)/300;
    } else if(angle > -110 && angle < -70){
        scrollActive = true;
        scrollToDeg = -90;
        scrollRate = (angle - scrollToDeg)/300;
    }


    console.log(angle);
}

function scrollTo(change, angleTo){
    angle -= change;
    if(count == 300){
        console.log('run before fade');
        $(".staticBackground").fadeTo(3000, 1, function(){
            console.log('running');
            scrollActive = false; 
            angle = Math.round(angle);
            if(angle == 90 || angle == -270){
                runVideo(1)
            } else if(angle == -180 || angle == 180){
                runVideo(2);
            } else {
                runVideo(3);
            }
            
            $("#fullBackground").fadeTo(1000, 1, function(){
                $(".staticBackground").fadeTo(3000, 1, function(){
                    $(".staticBackground").fadeTo(6000,0);
                }); 
            });
            
        });
       
        
    }
    count++;
}
    