'use strict';

const toggle_mode = (element) => (
    $('.toggle--icon').toggleClass('dark'),

    element.classList.toggle('dark-mode')
);

$('#code--area').focus();

(function () {
    var oldLog = console.log;
    console.log = function (message) {
        $('#result--text').html(`<span class='no-color'>Console is saying:</span> <br/> ${message}`);
        oldLog.apply(console, arguments);
    };
})();

// grow textarea
function auto_grow(element) {
    element.style.height = '5px';
    element.style.height = `${element.scrollHeight}px`;
}

function check_brackets(element) {
    let element_text = $(`#${element.id}`).val();
    const symbols_open = ['(', '[', '{', "'", '"'];
    const symbols_close = [')', ']', '}', "'", '"'];

    let last_char = element_text.slice(element_text.length - 1, element_text.length);

    for (let i = 0; i < symbols_open.length; i++)
        if (last_char == symbols_open[i]) {
            $(`#${element.id}`).val(element_text + symbols_close[i]);
            setCaretPosition(element.id, element_text.length);
        }

}

function check_word(element) {
    // let element_text = $(`#${element.id}`).val();

    // const word_array = ['let', 'const', 'var', 'console', 'return', 'function', 'if', 'else', 'while', 'for', 'do', 'try', 'catch', 'new'];

    // for (let i = 0; i < element_text.split(' ').length; i++)
    //     for (let j = 0; j < word_array.length; j++)
    //         if (element_text.split(' ')[i] == word_array[j])
    //             element_text.split(' ')[i].style.color = 'red';
}

const get_last_word = phrase => phrase.split(' ')[phrase.split(' ').length - 1];

function setCaretPosition(elemId, caretPos) {
    let elem = document.getElementById(elemId);

    if (elem != null) {
        if (elem.createTextRange) {
            let range = elem.createTextRange();
            range.move('character', caretPos);
            range.select();
        } else {
            if (elem.selectionStart) {
                elem.focus();
                elem.setSelectionRange(caretPos, caretPos);
            } else
                elem.focus();
        }
    }
}

$('#run--code').click(() => run_code($('#code--area'), $('#result--text'), $('#text--placeholder')));

function run_code(input, output, display_none = '') {
    let code = input.val();

    output.html(eval(code));

    display_none.css('display', 'none');
}

setTimeout(() => {
    console.clear();
}, 1000);