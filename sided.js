// allow textarea indent on tab

$(document).delegate('#code--area', 'keydown', function (e) {
    let keyCode = e.keyCode || e.which;

    if (keyCode == 9) {
        e.preventDefault();
        let start = this.selectionStart;
        let end = this.selectionEnd;

        $(this).val($(this).val().substring(0, start) + "\t" + $(this).val().substring(end));

        this.selectionStart = this.selectionEnd = start + 1;
    }
})