// console.log("Alarm Clock");

// Grab all the items
let setBtn = document.getElementById('setBtn');
let stopBtn = document.getElementById('stopBtn');
let resetBtn = document.getElementById('resetBtn');
let alarmDisplay = document.getElementById('alarmDisplay');
let alarm = document.getElementById('alarm');



function setAlarmFunc(e) {
    // e.preventDefault();

    // alarm date
    let alarmTime = new Date(`${alarm.value}`);

    // time in the clock when you set  the alarm
    let now = new Date();
    console.log(now);

    // ringin time in alarm
    let ringingTime = alarmTime - now;

    // if ringing time is greater than zero
    if (ringingTime >= 0) {

        // take i variable for giving it to clear interval variable
        // set interval to update remaining time every second
        let i = setInterval(() => {
            // currentTime will take new time per second
            let currentTime = new Date();

            // will update remaining time to alarm every second
            let remRingingTime = alarmTime - currentTime;

            // if remaining time = 0 then show expired
            if (remRingingTime <= 0) {
                alarmDisplay.innerText = `Expired`
            }

            // if remaining time != 0 then show values
            else {
                let days = Math.floor(remRingingTime / (1000 * 60 * 60 * 24));
                let hours = Math.floor((remRingingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                let minutes = Math.floor((remRingingTime % (1000 * 60 * 60)) / (1000 * 60));
                let seconds = Math.floor((remRingingTime % (1000 * 60)) / (1000));
                alarmDisplay.innerText = `${days}d ${hours}h ${minutes}m ${seconds}s`;
            }

        }, 1000);

        // take j variable for giving it to clear timeout
       let j = setTimeout(() => {
            ringBell();
        }, ringingTime);

        // when clicks on stop button
        stopBtn.addEventListener('click', () => {
            clearInterval(i);
            clearTimeout(j);
        })

    }

    // if ringing time is less than zero
    else if (ringingTime < 0) {
        alarmDisplay.innerText = `Expired`;
    }

    // if ringing time is not given by user
    else {
        alarmDisplay.innerText = `Time not defined`;
    }
}

// alarm sound
var audio = new Audio('alarm.mp3');

// function to play alarm sound
function ringBell() {
    audio.play();
}

// set button when clicked call setAlarmFunc function
setBtn.addEventListener("click", setAlarmFunc);

// reloads the page
resetBtn.addEventListener('click', ()=>{
    location.reload();
})