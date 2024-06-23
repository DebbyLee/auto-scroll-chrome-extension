
(function () {
    const MINIMUM_SLEEPING_TIME_IN_MS = 500;
    const MAXIMUM_SLEEPING_TIME_IN_MS = 1000;
    const SCROLL_DISTANCE = 20;
    const MAXIMUM_NUMBER_OF_SCROLLS = 100;
  
    const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));
    const randomNumber = (minimum, maximum) =>
      Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
  
    let isStop = false

    const autoScrollUp = async () => {
      let numberOfScrolls = 0;
      let currentPosition = window.scrollY;

      while (numberOfScrolls < MAXIMUM_NUMBER_OF_SCROLLS  && isStop === false) {
        window.scrollBy(0, -SCROLL_DISTANCE); // Scroll up by the defined scroll distance
  
        await sleep(randomNumber(MINIMUM_SLEEPING_TIME_IN_MS, MAXIMUM_SLEEPING_TIME_IN_MS));
  
        let currentPosition = window.scrollY;
        if (currentPosition === 0) {
          console.log(`Scroll to top ${currentPosition}`);
          break
        } else {
          numberOfScrolls++;
          console.log(`The scroll up #${numberOfScrolls} was successful!`);
        }  
      }
    };

    const autoScrollDown = async () => {  
      let numberOfScrolls = 0;

      while (numberOfScrolls < MAXIMUM_NUMBER_OF_SCROLLS && isStop === false) {  

        let currentPosition = window.scrollY;
        window.scrollBy(0, SCROLL_DISTANCE);
  
        await sleep(randomNumber(MINIMUM_SLEEPING_TIME_IN_MS, MAXIMUM_SLEEPING_TIME_IN_MS));

        let newPosition = window.scrollY;
        console.log(`CurrentPostion: ${currentPosition}. ClientHeight: ${document.documentElement.clientHeight} ScrollHeight: ${document.documentElement.scrollHeight}`)

        if (currentPosition >= document.documentElement.clientHeight || currentPosition === newPosition) {
          console.log(`Scroll to bottom ${currentPosition} ${document.documentElement.clientHeight}`);
          break
        } else {
          numberOfScrolls++;
          console.log(`The scroll down #${numberOfScrolls} was successful!`);
        }
      }
    };
      
    chrome.runtime.onMessage.addListener((message) => {
      console.log(message)
      if (message.action === 'stopScrolling') {
        isStop = true
      }
    });

    const autoScroll = async () => {
      let currentPosition = window.scrollY;
      if (currentPosition > 0) {
        await autoScrollUp();
      } else {
        await autoScrollDown();
      }

      if (isStop === false) {
        scrollInterval = setTimeout(autoScroll, 1000);
      }
    }

    scrollInterval = setTimeout(autoScroll, 1000);
  })();
  