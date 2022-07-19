$(document).ready(function() {
    var slider = $('#autoWidth').lightSlider({
        item: 3,
        controls: false,
        autoWidth:true,
        loop:false,
        onSliderLoad: function() {
            $('#autoWidth').removeClass('cS-hidden');
        }
    });
    $('#goToPrevSlide').on('click', function () {
        slider.goToPrevSlide();
    });
    $('#goToNextSlide').on('click', function () {
        slider.goToNextSlide();
    });
  });

    document.getElementById("play").style.display = "inline";
    document.getElementById("pause").style.display = "none";
    document.getElementById("volume").style.display = "inline-block";
    document.getElementById("mute").style.display = "none";

    var vid = document.getElementById("vid");

    vid.onloadedmetadata = function(){
        var durationMin = (Math.floor((vid.duration)/60));
        var durationSec = Math.round((vid.duration) % 60);
        document.getElementById("duration").innerText = durationMin + ":" + durationSec;
    }

    function getTime(time) {
        let minutes = Math.floor(Math.round(time) / 60);
        let seconds = Math.round(time % 60).toString();
        seconds = seconds.length === 1 ? "0" + seconds : seconds === 60 ? "00" : seconds;
        return minutes + ":" + seconds + " /";
    }
    
    var clickPlayCount = 0;
    
    function playVid(){
        clickPlayCount++;

        if(clickPlayCount == 1)
            vid.pause();
        vid.play();
        document.getElementById("playicon").style.display = "none";
        document.getElementById("play").style.display = "none";
        document.getElementById("pause").style.display = "inline";

        setInterval(function(){
            var videoTime = getTime(vid.currentTime)
            document.getElementById("timer").innerText = videoTime;
            document.getElementById("playProgress").style.width = ((vid.currentTime / vid.duration) *100) + "%";
        }, 1000);
    }

    function pauseVid(){
        clickPlayCount++;
        
        if(clickPlayCount % 2 != 0){
            vid.play();
            document.getElementById("playicon").style.display = "none";
            document.getElementById("play").style.display = "none";
            document.getElementById("pause").style.display = "inline";

            setInterval(function(){
                var videoTime = getTime(vid.currentTime)
                document.getElementById("timer").innerText = videoTime;
                document.getElementById("playProgress").style.width = ((vid.currentTime / vid.duration) *100) + "%";
            }, 1000);
        }
        else{
            vid.pause();
            document.getElementById("playicon").style.display = "block";
            document.getElementById("play").style.display = "inline";
            document.getElementById("pause").style.display = "none";
        }
    }


    function volume(){
        document.getElementById("mute").style.display = "inline";
        document.getElementById("volume").style.display = "none";
        vid.volume = 0;
    }

    function mute(){
        document.getElementById("volume").style.display = "inline";
        document.getElementById("mute").style.display = "none";
        vid.volume = 1;
    }

    function getPlaySpeed(){
        var playBackValue = document.getElementById("play-speed").value;
        if(playBackValue == 0.5)
            vid.playbackRate = 0.5;
        else if(playBackValue == 0.75)
            vid.playbackRate = 0.75;
        else if(playBackValue == 1.25)
            vid.playbackRate = 1.25;
        else if(playBackValue == 1.5)
            vid.playbackRate = 1.5;
        else
            vid.playbackRate = 1;
    }

    function openFullscreen() {
        if (vid.requestFullscreen) {
            vid.requestFullscreen();
        } else if (vid.webkitRequestFullscreen) { /* Safari */
            vid.webkitRequestFullscreen();
        } else if (vid.msRequestFullscreen) { /* IE11 */
            vid.msRequestFullscreen();
        }
    }


    function changeVideo(videoId,videoHeading,videoDetail){

        var mainVideo = document.getElementById("vid");
        var selectedVideo = document.getElementById(videoId);
        var mainHeading = document.getElementById("vid-heading").innerText;
        var mainDetail = document.getElementById("vid-detail").innerText;        

        if(videoId){
            var mainVideoSource = mainVideo.src;
            var selectedVideoSource = selectedVideo.src;
            var mainVideoPoster = mainVideo.poster;
            var selectedVideoPoster = selectedVideo.poster;
            var itemHeading = document.getElementById(videoHeading).innerText;
            var itemDetail = document.getElementById(videoDetail).innerText;

            mainVideo.src = selectedVideoSource;
            selectedVideo.src = mainVideoSource;
            mainVideo.poster = selectedVideoPoster;
            selectedVideo.poster = mainVideoPoster;
            
            document.getElementById("vid-heading").innerText = itemHeading;
            document.getElementById("vid-detail").innerText = itemDetail;
            document.getElementById(videoHeading).innerText = mainHeading;
            document.getElementById(videoDetail).innerText = mainDetail;
        }
    }

    function forwardVid(val){
        vid.currentTime +=val;
    }

    function backwardVid(val){
        vid.currentTime -=val;
    }

    function restartVid(){
        vid.currentTime = 0;
    }
    var clickCount = 0;

    function showThemes(){
        clickCount++;
        if(clickCount % 2 != 0)
            document.getElementById("theme").style.right = "0px";
        else
            document.getElementById("theme").style.right = "-50px";
    }

    function formValidation(){
        
        if(document.getElementById("first_name").value == ""){
            document.getElementById("firstname_err").innerHTML = "First Name is Empty or Invalid";
            return false;
        }else if(document.getElementById("last_name").value == ""){
            document.getElementById("lastname_err").innerHTML = "Last Name is Empty or Invalid";
            return false;
        }else if(document.getElementById("email").value == ""){
            document.getElementById("email_err").innerHTML = "Email is Empty or Invalid";
            return false;
        }else if(document.getElementById("phone_no").value == ""){
            document.getElementById("phone_err").innerHTML = "Phone Number is Empty or Invalid";
            return false;
        }else if(document.getElementById("comment").value == ""){
            document.getElementById("comment_err").innerHTML = "Comment is Empty or Invalid";
            return false;
        }
    }

    function checkFields(){

        if(document.getElementById("first_name").value.length >= 3)
            document.getElementById("firstname_err").style.display = "none";
        else{
            document.getElementById("firstname_err").style.display = "block";
        }

        if(document.getElementById("last_name").value.length >= 3)
            document.getElementById("lastname_err").style.display = "none";
        else{
            document.getElementById("lastname_err").style.display = "block";
        }

        if(document.getElementById("email").value.length >= 4)
            document.getElementById("email_err").style.display = "none";
        else{
            document.getElementById("email_err").style.display = "block";
        }

        if(document.getElementById("phone_no").value.length >= 10)
            document.getElementById("phone_err").style.display = "none";
        else{
            document.getElementById("phone_err").style.display = "block";
        }

        if(document.getElementById("comment").value.length >= 10)
            document.getElementById("comment_err").style.display = "none";
        else{
            document.getElementById("comment_err").style.display = "block";
        }
    }


   
