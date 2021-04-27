var editor = document.getElementById('editor');

document.addEventListener('keydown', function (e) {  
  e.preventDefault();
  e.stopPropagation();

  if (e.key == 'Tab') 
  {
    addChar('\t');
  }
  else if (e.key == 'Delete') 
  {
    delChar(caretPosition + 1);
  }
  else if (e.key == 'Enter') 
  {
    addChar('\n');
  }
  else if (e.key == 'Backspace') 
  {
    delChar(caretPosition);
    caretPosition -= 1;
  }
  else if (e.key == 'ArrowLeft') 
  {
    caretPosition -= 1;
  }
  else if (e.key == 'ArrowRight') 
  {
    caretPosition += 1;
  }
  else if (e.key.length == 1)
  {
    addChar(e.key);
  }

  if (caretPosition < 0)
  {
    caretPosition = 0;
  }
  else if (caretPosition > textValue.length)
  {
    caretPosition = textValue.length;
  }

  editor.innerText = textValue.substring(0, caretPosition) + '|' + textValue.substring(caretPosition, textValue.length);
})

window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.editor').forEach(el => {
      let characters = el['innerText'].split('');
      el.innerHTML = '';
      characters.forEach(char => {
          let span = document.createElement('span');
          span.innerText = char;
          span.addEventListener('click', function () {
              let position = 0;
              let el = this;
              while (el.previousSibling !== null) {
                  position++;
                  el = el.previousSibling;
              }
              caretPosition = position;
              editor.innerHTML = textValue.substring(0, caretPosition) + '|' + textValue.substring(caretPosition, textValue.length);
          });
          el.appendChild(span);
      });
  });
});

function addChar(char)
{
  textValue = textValue.substring(0, caretPosition) + char + textValue.substring(caretPosition, textValue.length);
  caretPosition += 1;
}

function delChar(pos)
{
  textValue = textValue.substring(0, pos - 1) + textValue.substring(pos, textValue.length);
}
