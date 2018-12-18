//To  store interval in the local variable 'countdown' block to run or clear timer interval 
//FIXME: Why the damn error prompt?
let countdown;
//to display js timer output in html
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
//Get time duration from buttons in html
const buttons = document.querySelectorAll('[data-time]');

//NOTE STEP 1
function timer(seconds) {
    //To clear any existing timers
    clearInterval(countdown);
    
    const now = Date.now(); // timer start time
    const then = now + seconds * 1000;  //timer end time, multiply sec by 1000 to output millisecs
    // console.log({now, then}); To call timer func in console with sec param
    //To display initial time by calling displayTimeLeft
    displayTimeLeft(seconds);
    displayEndTime(then);
    // To display time left after every  second
     countdown = setInterval(() => {
       const secondsLeft = Math.round((then - Date.now()) / 1000);
        // to stop timer at 0, wrap func in countdown and add a clearinterval in conditional
        if (secondsLeft < 0) {
            clearInterval(countdown);
            return;
        }
        displayTimeLeft(secondsLeft);
    }, 1000);   //NOTE: To run interval every second
}

//To display initiating time before countdown
function displayTimeLeft(seconds) {
    //CHANGES: add hours
    const hours = Math.floor(seconds / (60 * 60));
    // To add minutes to counter and dividing secs by 60 to yield minutes
    const minutes = Math.floor(seconds / 60);
    //CHANGES added amendedMinutes
    const amendedMinutes = minutes >= 60 ? (minutes - 60) : minutes;
    //CHANGES added adjustedMinutes
    const adjustedMinutes = amendedMinutes >= 60 ? (amendedMinutes % 60) : amendedMinutes;
    // for remaining seconds
    const remainderSeconds = seconds % 60;
    // console.log(seconds);
    // display time in html and add a 0 infront of secs if less than 10
    //CHANGES: ADDED hours for hr counter, changed 'minutes' to amendedMinutes
    const display = `${hours < 10 ? ("0" + hours) : hours}h:${adjustedMinutes < 10 ? ("0" + adjustedMinutes) : adjustedMinutes}m:${remainderSeconds < 10 ? "0" : ""}${remainderSeconds}s`;
    //console.log({minutes, remainderSeconds});
    
    //update browser title tab with timer
    document.title = display;
    timerDisplay.textContent = display;
}


// show ending time
function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const hour = end.getHours();
    //added if statement to convert 24hrs time to 12hrs
    const adjustedHour = hour > 12 ? hour - 12 : hour;
    const minutes = end.getMinutes();
    
    //To display AM or PM depending on time
    const adjustedPM = hour >= 12 ? ' PM.' : ' AM.';
    
    //Added 0 infront of seconds to display when secs < 10
    endTime.textContent = `Be Back At ${adjustedHour}:${minutes < 10 ? '0' : ''}${minutes}${adjustedPM}`;
} 

// to start timer on click of the buttons
function startTimer() {
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));

//for input form listener
document.customForm.addEventListener('submit', function(e) {
    //stop from resubmitting
    e.preventDefault();
    // Get value of inputted minutes and convert to seconds
    const mins = this.minutes.value;
    timer(mins * 60);
    this.reset();
});
