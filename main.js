'use strict';

const switchTheme = (element) => {
  const iconClass = 'dark';
  const elementClass = 'dark-mode';

  $('.toggle--icon').toggleClass(iconClass);
  element.classList.toggle(elementClass);
};

const $codeArea = $('#code--area');

$codeArea.focus();

const $resultPlaceholder = $('#text--placeholder');
const $result = $('#result--text');

// change console.log default behavior
(function () {
  const oldLog = console.log;

  console.log = function (message) {
    const consoleMessage = `
      <span class='no-color'>Console is saying:</span><br />
      <span class='console'>${message}</span>
		`;
    $result.html(consoleMessage);

    $resultPlaceholder.css('display', 'none');
    return oldLog.apply(console, arguments);
  };
})();

const checkBrackets = ({ id }) => {
  const textarea = $(`#${id}`);
  const elementValue = textarea.val();

  const setCaretPosition = (textAreaID, caretPos) => {
    const textAreaElement = document.getElementById(textAreaID);

    if (textAreaElement.createTextRange) {
      const range = textAreaElement.createTextRange();
      return range.move('character', caretPos), range.select();
    }

    if (textAreaElement.selectionStart)
      return (
        textAreaElement.setSelectionRange(caretPos, caretPos),
        textAreaElement.focus()
      );

    return textAreaElement.focus();
  };

  const symbols = ['()', '[]', '{}', '<>'];

  symbols.forEach((pair) => {
    const symbol = pair.split('');
    const valueLength = elementValue.length;

    const lastChar = elementValue.slice(valueLength - 1, valueLength);

    if (lastChar === symbol[0]) {
      textarea.val(elementValue + symbol[1]);
      setCaretPosition(id, valueLength);
    } else return;
  });
};

const $runCodeButton = $('#run--code');

// hide things on code run
$runCodeButton.click(() => showCode($codeArea, $result, $resultPlaceholder));

const runOnCtrlEnter = (event) => {
  const keyCode = event.keyCode || event.which;
  const enterKey = 13;

  const enter = keyCode == enterKey;
  const ctrl = event.ctrlKey;

  if (enter && ctrl) showCode($codeArea, $result, $resultPlaceholder);
  else return;
};

document.addEventListener('keyup', runOnCtrlEnter);

const showCode = (input, output, elementToHide = '') => {
  try {
    const code = input.val();

    output.html(eval(code));
  } catch (err) {
    const errorMessage = `
      <span class='no-color'>Console and it's errors...</span><br />
      <span class='console'>${err}</span>
		`;

    output.html(errorMessage);
  }

  const hideElement = (element) => element.css('display', 'none');

  return hideElement(elementToHide);
};

// clear console, so it doesn't appear on the screen
setTimeout(() => console.clear(), 200);
