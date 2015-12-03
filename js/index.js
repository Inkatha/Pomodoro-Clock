$(document).ready(function() {
  var sessionValue = document.getElementById("session-amount").innerHTML;
  var breakValue = document.getElementById("break-amount").innerHTML;
  var time = new Date();
  setTime(sessionValue);

  var isPaused = true;
  var onBreak = false;

  var timeout = 0;

  $(".clock-value").text(sessionValue + ":00");

  /*----Clock functions----*/
  function setTime(timeValue) {
    time.setHours(0, timeValue, 0);
  }
  
  function setTitle(titleName) {
    $(".clock-title").text(titleName);
  }

  function pause() {
    clearTimeout(timeout);
    isPaused = true;
  }

  function resume() {
    timeout = setTimeout(timer, 1000);
    isPaused = false;
  }

  function takeABreak() {
    pause();
    onBreak = true;
    setTime(breakValue);
    setTitle("Break");
    $(".clock-value").text(breakValue + ":00");
  }

  function backToWork() {
      pause();
      onBreak = false;
      setTime(sessionValue);
      setTitle("Session");
      $(".clock-value").text(sessionValue + ":00");
    }
    /*---------------------*/
  
  function errorMessage() {
    $("#error-message").show().delay(3000).fadeOut();
  }

  function timer() {
    var minutes = time.getMinutes();
    var seconds = time.getSeconds();

    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    time.setSeconds(time.getSeconds() - 1);

    $(".clock-value").text(minutes + ":" + seconds);

    if (minutes === "00" && seconds === "00") {
      if (onBreak === false) {
        takeABreak();
      } else {
        backToWork();
      }
    }
    resume();
  }

  $("#clock").click(function() {
    if (isPaused === false) {
      pause();
    } else {
      resume();
    }
  });
  
  /*-------Add and Subtract buttons------*/
  $(".add-session").click(function() {
    if (sessionValue < 60 && isPaused === true) {
      sessionValue++;
      sessionValue = (sessionValue < 10) ? "0" + sessionValue : sessionValue;
      $("#session-amount").text(sessionValue);
      $(".clock-value").text(sessionValue + ":00");
      setTitle("Session");
      setTime(sessionValue);
    } else {
      errorMessage();
    }
  });

  $(".subtract-session").click(function() {
    if (sessionValue > 0 && isPaused === true) {
      sessionValue--;
      sessionValue = (sessionValue < 10) ? "0" + sessionValue : sessionValue;
      $("#session-amount").text(sessionValue);
      $(".clock-value").text(sessionValue + ":00");
      setTitle("Session");
      setTime(sessionValue);
    } else {
      errorMessage();
    }
  });

  $(".add-break").click(function() {
    if (sessionValue < 60 && isPaused === true) {
      breakValue++;
      breakValue = (breakValue < 10) ? "0" + breakValue : breakValue;
      $("#break-amount").text(breakValue);
    } else {
      errorMessage();
    }
  });

  $(".subtract-break").click(function() {
    if (breakValue > 0 && isPaused === true) {
      breakValue--;
      breakValue = (breakValue < 10) ? "0" + breakValue : breakValue;
      $("#break-amount").text(breakValue);
    } else {
      errorMessage();
    }
  });
  /*----------------------------*/
  
  /*---- Restart Button ----*/
  $("#restart-button").click(function() {
    var sessionLength = document.getElementById("session-amount").innerHTML;;
    setTime(sessionLength);
    backToWork();
  });
  /*-------------------------*/
});