'use strict';

const toggle_mode = (element) => (
  $('.toggle--icon').toggleClass('dark'), element.classList.toggle('dark-mode')
);

const $codeArea = $('#code--area');

$codeArea.focus();

const $resultPlaceholder = $('#text--placeholder');
const $result = $('#result--text');

// change console.log default behavior
(function () {
  var oldLog = console.log;

  console.log = function (message) {
    const consoleMessage = `
			<span class='no-color'>Console is saying:</span> <br/><span class='console'>${message}</span>
		`;
    $result.html(consoleMessage);

    $resultPlaceholder.css('display', 'none');
    return oldLog.apply(console, arguments);
  };
})();

const checkBrackets = (element) => {
  const elementID = $(`#${element.id}`);

  const ElementValue = elementID.val();
  const symbolsOpen = ['(', '[', '{', '<'];
  const symbolsClose = [')', ']', '}', '>'];

  const setCaretPosition = (textAreaID, caretPos) => {
    const textAreaElement = document.getElementById(textAreaID);

    if (textAreaElement.createTextRange) {
      let range = textAreaElement.createTextRange();
      return range.move('character', caretPos), range.select();
    }

    if (textAreaElement.selectionStart)
      return (
        textAreaElement.setSelectionRange(caretPos, caretPos),
        textAreaElement.focus()
      );

    return textAreaElement.focus();
  };

  symbolsOpen.forEach((symbol, index) => {
    const lastChar = ElementValue.slice(
      ElementValue.length - 1,
      ElementValue.length
    );

    if (lastChar === symbol) {
      elementID.val(ElementValue + symbolsClose[index]);

      setCaretPosition(element.id, ElementValue.length);
    }
  });
};

const runCodeButton = $('#run--code');

// hide things on code run
runCodeButton.click(() => showCode($codeArea, $result, $resultPlaceholder));

document.addEventListener('keyup', (e) => {
  if (e.keyCode === 13 && e.ctrlKey)
    return showCode($codeArea, $result, $resultPlaceholder);
});

function showCode(input, output, display_none = '') {
  try {
    const code = input.val();

    output.html(eval(code));
  } catch (err) {
    const errorMessage = `
			<span class='no-color'>Console and it's errors...</span> <br> <span class='console'>${err}</span>
		`;

    output.html(errorMessage);
  }

  const hideElement = (element) => element.css('display', 'none');

  return hideElement(display_none);
}

// clear console, so it doesn't appear in the screen;
setTimeout(() => {
  console.clear();
}, 200);
