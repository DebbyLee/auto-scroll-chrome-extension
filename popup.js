document.addEventListener('DOMContentLoaded', function () {
    var stopButton = document.getElementById('stopButton');
    var startButton = document.getElementById('startButton');
    var tabId;
    var script;
  
    stopButton.addEventListener('click', function () {
      console.log("stop button click")
      console.log(tabId)

      if (tabId) {
        chrome.tabs.sendMessage(tabId, { action: 'stopScrolling' });

        startButton.disabled = false
        stopButton.disabled = true
      }
    });
  
    startButton.addEventListener('click', function () {
      console.log("start button click")
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        tabId = tabs[0].id;
        script = chrome.scripting.executeScript(
            {
                target: {tabId: tabId},
                files: ['scroll.js' ]
        });
      });

      startButton.disabled = true
      stopButton.disabled = false

    });
  });