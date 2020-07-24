// allow textarea to indent on tab

function indentOnTab(event) {
  const keyCode = event.keyCode || event.which;
  const tabKey = 9;

  if (keyCode == tabKey) {
    event.preventDefault();
    const start = this.selectionStart;
    const end = this.selectionEnd;

    const value = $(this).val();
    const valueBefore = value.substring(0, start);
    const valueAfter = value.substring(end);
    const tab = '\t';

    $(this).val(valueBefore + tab + valueAfter);

    return (this.selectionStart = this.selectionEnd = start + 1);
  }
}

$(document).delegate('#code--area', 'keydown', indentOnTab);
