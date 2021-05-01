var active = null;

document.addEventListener('keydown', function (e) 
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
    typer.remove();
  }
  else if (e.key == 'ArrowLeft') 
  {
    typer.setCaretPosition(-1, true);
  }
  else if (e.key == 'ArrowRight') 
  {
    typer.setCaretPosition(1, true);
  }
  else if (e.key.length == 1 || e.key == 'Space')
  {
    addChar(e.key);
  }
})

function addChar(char)
{
  let span = document.createElement('span');
  var letter = new Letter(char, span);
  typer.add(letter);
}