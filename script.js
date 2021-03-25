function openNav() {
    document.getElementById("mySidebar").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
}


function startIntro() {
    bringCanvasToFront();
}

function bringCanvasToFront() {
    //document.getElementById('defaultCanvas0').classList.toggle('hide');

    $("#defaultCanvas0").fadeTo(0, 0);
    setTimeout(function () {
        console.log('start');
        document.getElementById('defaultCanvas0').style.zIndex = 0;
        $("#defaultCanvas0").fadeTo(1500, 0.3);
        setTimeout(function () {
            dialShowing = true;
            fadeInAndOut();
        }, 1500)

    }, 1000);

}

function fadeInAndOut() {
    const randomTime = Math.floor(Math.random() * 2500)
    $("#defaultCanvas0").fadeTo(randomTime, 0.05 + Math.random() * 0.5);
    setTimeout(function () {
        if (dialShowing) {
            fadeInAndOut()
        }
    }, randomTime);
}

const videos = ['uav_7l5WaH4', 'qStlJor9Z1k'];
function runVideo(videoNum) {
    $('#fullBackground').css("display", "block");
    $('#fullBackground').fadeIn('slow');
    player.videoId = videos[videoNum];
    console.log(player);
    player.playVideo();
    dialShowing = false;
    introSound.stop()
    staticSound.setVolume(0, 5)
    $("#defaultCanvas0").fadeTo(3000, 0);

}

$('#fullBackground').fadeOut()

var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;


function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '100%',
        width: '100%',
        videoId: 'g_FtYHLgNbE',
        controls: 0,
        rel: 0
    });
}

// 4. The API will call this function when the video player is ready.


// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;

function stopVideo() {
    player.stopVideo();
}



