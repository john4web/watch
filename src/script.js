"use strict";

let click = new Audio('assets/sounds/tick.mp3');
let clockIsMuted = true;

function setTime(hours, minutes, seconds) {

    let degHours = 360 / 12 * (hours + minutes / 60 + seconds / 60 / 60);
    let stundenzeiger = document.getElementById("stundenzeiger");
    stundenzeiger.style.transform = "rotate(" + degHours.toString() + "deg)";


    let degMinutes = 360 / 60 * (minutes + seconds / 60);
    let minutenzeiger = document.getElementById("minutenzeiger");
    minutenzeiger.style.transform = "rotate(" + degMinutes.toString() + "deg)";


    let degSeconds = (360 / 60) * seconds;
    let sekundenzeiger = document.getElementById("sekundenzeiger");
    sekundenzeiger.style.transform = "rotate(" + degSeconds.toString() + "deg)";

}

function calcTime(offsetInHours) {
    let localDate = new Date();
    let utcTime = localDate.getTime() + (localDate.getTimezoneOffset() * 60000);
    let timeZoneDate = new Date(utcTime + (3600000 * offsetInHours));

    setTime(timeZoneDate.getHours(), timeZoneDate.getMinutes(), timeZoneDate.getSeconds());
    if (!clockIsMuted) {
        click.play();
    }

}

let interval = setInterval(function() {
    calcTime((new Date().getTimezoneOffset() / 60) * (-1));
}, 1000);

function changeInterval(offsetInHours, hasClockChange) {

    //Sommer- und Winterzeit beachten
    let currentDate = new Date();
    if ((currentDate.getMonth() > 2) && (currentDate.getMonth() < 10) && (hasClockChange)) {
        offsetInHours++;
    }

    clearInterval(interval);
    interval = setInterval(function() {
        calcTime(offsetInHours);
    }, 1000);
}


let isBlack = false;

function changeClock() {

    const clockDiv = document.getElementById("uhrcontainer");
    const stundenzeiger = document.getElementById("stundenzeiger");
    const minutenzeiger = document.getElementById("minutenzeiger");
    stundenzeiger.removeAttribute("src");
    minutenzeiger.removeAttribute("src");

    if (isBlack) {
        clockDiv.style.backgroundImage = "url('./assets/images/Ziffernblatt.svg')";
        stundenzeiger.setAttribute("src", "./assets/images/Stundenzeiger.svg");
        minutenzeiger.setAttribute("src", "./assets/images/Minutenzeiger.svg");
    } else {
        clockDiv.style.backgroundImage = "url('./assets/images/Ziffernblatt2.svg')";
        stundenzeiger.setAttribute("src", "./assets/images/Stundenzeiger2.svg");
        minutenzeiger.setAttribute("src", "./assets/images/Minutenzeiger2.svg");
    }

    isBlack = !isBlack;
}

let speakerIsLoud = false;
const speakerImage = document.getElementById("speaker-image");

function changeSymbol() {
    speakerIsLoud = !speakerIsLoud;
    clockIsMuted = !clockIsMuted;
    if (speakerIsLoud) {
        speakerImage.setAttribute("d", "M5 17h-5v-10h5v10zm2-10v10l9 5v-20l-9 5zm17 4h-5v2h5v-2zm-1.584-6.232l-4.332 2.5 1 1.732 4.332-2.5-1-1.732zm1 12.732l-4.332-2.5-1 1.732 4.332 2.5 1-1.732z");
    } else {
        speakerImage.setAttribute("d", "M5 17h-5v-10h5v10zm2-10v10l9 5v-20l-9 5zm15.324 4.993l1.646-1.659-1.324-1.324-1.651 1.67-1.665-1.648-1.316 1.318 1.67 1.657-1.65 1.669 1.318 1.317 1.658-1.672 1.666 1.653 1.324-1.325-1.676-1.656z");
    }
}