const messageBox = document.querySelector('.msg-box');
let tagIt, tag, tagStart;

const setInitialState = () => {
  tagIt = false;
  tag = null;
  tagStart = 0;
};
setInitialState();

const setTags = event => {
  const nullifiers = [
    32, 46, 44, 33, 126, 96, 47, 92, 124,
    43, 61, 42, 38, 94, 37, 63, 60, 62
  ];

  const hash = 35, at = 64;
  const keyPressed = event.keyCode;

  if (keyPressed === hash || keyPressed === at) {
    tagIt = true;
    tagStart = event.target.selectionStart;
  } else if (nullifiers.includes(keyPressed)) {
    setInitialState();
  }

  if (tagIt) {
    const value = event.target.value;
    const inputString = event.keyCode !== 8 ?
    `${value}${event.keyCode === 8 ? '' : event.key}`
    :
    value.slice(0, value.length - 1);

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