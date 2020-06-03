let timerID;
let timerTime;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.cmd === 'START_TIMER') {
    timerID = setTimeout(() => {
       // the time is up, alert the user.
        alert("Take a 20 sec break!");
    }, distance);
  } else if (request.cmd === 'GET_TIME') {
    sendResponse({ time: timerTime });
  }
});