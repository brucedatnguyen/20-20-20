// Instance variables
var x;
var runTimer = false;
var countDownDate;
var distance = 20 * 60000;
var paused = false;

chrome.runtime.sendMessage({ cmd: 'GET_TIME' }, response => {
    if (response.time) {
      startTimer();
    }
  });

// method to start or resume the timer
function startTimer() {

    // run a timer if it one is not already running
    if (!runTimer){

        runTimer = true;
        
        // if timer is paused, take the distance it was at to continue
        // the timer from where they left off
        if (paused){
            countDownDate = new Date(Date.now() + distance).getTime();
            paused = false;
        } else {
            countDownDate = new Date(Date.now() + distance + 1000).getTime();
        }
        
        console.log("POPUP u should see 'outside' after dis");
        chrome.runtime.sendMessage({ cmd: 'START_TIMER', when: distance});

        // update timer every 1 second
        x = setInterval(startTimerHelper, 1000);
        
    }
}

document.getElementById("start").onclick = startTimer;

// function to stop and update timer
function startTimerHelper(){    

    // Get today's date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the element with id="demo"
    document.getElementById("display").textContent = minutes + "m " + seconds + "s ";
    console.log(minutes + "m " + seconds + "s ");
        
    // If the count down is finished, write some text 
    if (distance < 0) {
        
        clearInterval(x);
        paused = false;
        
        document.getElementById("display").textContent = "Time for a break!";
    } 

}

// function to clear the timer
function stopTimer() {
    
    runTimer = false;    
    clearInterval(x);
    
    distance = 20 * 60000;

    // Time calculations for days, hours, minutes and seconds
    document.getElementById("display").textContent = 20 + "m " + 0 + "s" ;
    
}

document.getElementById("stop").onclick = stopTimer;

// method to pause the timer and show the current time they are paused at
function pauseTimer(){  
    
    paused = true; 
    runTimer = false;
    
    // Time calculations for days, hours, minutes and seconds
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("display").textContent = minutes + "m " + seconds + "s" ;
    
    clearInterval(x);
    
}

document.getElementById("pause").onclick = pauseTimer;

