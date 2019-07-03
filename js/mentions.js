// The text box
const messageBox = document.querySelector('.msg-box');

let tagIt; // global boolean variable to track when to tag and otherwise
let tag; // will contain the actual tag or a null value
let tagStart; // will contain the starting position of a tag

/**
 * Sets the initial state of the global variables
 */
const setInitialState = () => {
  tagIt = false;
  tag = null;
  tagStart = 0;
};

setInitialState();


/**
 * Handles tracking of user input into @var messageBox using @event keypress
 * 
 * @param {DOMEvent} event 
 */
const setTags = event => {
  // Array of key codes that nullifies input tagging
  const nullifiers = [
    32, 46, 44, 33, 126, 96, 47, 92, 124,
    43, 61, 42, 38, 94, 37, 63, 60, 62
  ];


  const hash = 35; // key code for @ key
  const at = 64; // key code for # key

  // Obtain key code from the keypress or keydown event
  const keyPressed = event.keyCode;

  // If the key pressed is one of "@" or "#"
  if (keyPressed === hash || keyPressed === at) {
    // Start tagging
    tagIt = true;
    // Record the starting position of the tag
    tagStart = event.target.selectionStart;
  } else if (nullifiers.includes(keyPressed)) {
    // Otherwise reset to initial global variables state
    setInitialState();
  }

  if (tagIt) {
    const value = event.target.value;
    // Obtain input from key event and existing input
    const inputString = event.keyCode !== 8 ?
    `${value}${event.keyCode === 8 ? '' : event.key}`
    :
    value.slice(0, value.length - 1);

    // Get the tag
    tag = inputString.slice(tagStart).match(/(?:@|#)\w*/)[0];
    console.log(tag);
  }
};


messageBox.addEventListener('keypress', setTags);
messageBox.addEventListener('keydown', event => {
  if (tagIt && event.keyCode === 8) {
    if (event.target.selectionStart > tagStart + 1) setTags(event);
    else setInitialState();
  }
});