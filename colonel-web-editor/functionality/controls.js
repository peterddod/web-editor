var editor = document.getElementById('editor');
var textSection = document.getElementById('textSection');

var active = null;

document.addEventListener('click', function (e) 
{
  active = e.target;
  spanText();
})

document.addEventListener('keydown', function (e) 
{  
  if (active == editor)
  {
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
    
    typed = true;
    spanText();
  }
  
})

function addChar(char)
{
  textValue = textValue.substring(0, caretPosition) + char + textValue.substring(caretPosition, textValue.length);
  caretPosition += 1;
}

function delChar(pos)
{
  textValue = textValue.substring(0, pos - 1) + textValue.substring(pos, textValue.length);
}

function spanText()
{
  editor.innerHTML = "";
  let characters = textValue.split('');
  var count = 1;
  let p = document.createElement('p');
  p.setAttribute('class', 'newline_p');
  editor.appendChild(p);

  characters.forEach(char => {
    let span = document.createElement('span');
    if (count == caretPosition && active == editor) 
    {
      span.innerHTML = char + '<span class="caret"></span>';
    }
    else
    {
      span.innerHTML = char;
    }
    span.setAttribute('class', 'char');

    span.addEventListener('mousedown', function () 
    {
      let position = 0;      
      let el = this;
      while (el.previousSibling !== null) {
              position++;
              el = el.previousSibling;
      }
      caretPosition = position;
      spanText();
    });
    p.appendChild(span);
    if (char == '\n')
    {
      let p = document.createElement('p');
      editor.appendChild(p);
    }

    count += 1;
  })

  if (count == 1) 
  {
    editor.innerHTML = '<span class="caret" id="caret"></span>';
  }
}

// Attempt at making caret flash

// setInterval(function()
// { 
//   var caret = document.getElementById('caret');
//   if (typed == false) 
//   {
//     if (caretVisible == false)
//     {
//       caret.setAttribute('style', 'background-color: rgba(0, 0, 0, 0.24);');
//       caretVisible = true;
//     }
//     else
//     {
//       caret.setAttribute('style', 'background-color: rgba(0, 0, 0, 0);');
//       caretVisible = false;
//     }
//   }
//   else
//   {
//     caret.setAttribute('style', 'background-color: rgba(0, 0, 0, 0.24);');
//     caretVisible = true;
//     typed = false;
//     alert("hello");
//   }
// }, 1000);