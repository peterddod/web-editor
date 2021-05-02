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
    typer.remove(true);
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
    typer.incrementCaret(false);  // fix this
  }
  else if (e.key == 'ArrowRight') 
  {
    typer.incrementCaret(true);  // and this
  }
  else if (e.key.length == 1 || e.key == 'Space')
  {
    addChar(e.key);
  }
})

function addChar(char)
{
  let span = document.createElement('span');
  var letter = new Letter(char, span, -1, bold, italic, underline, font, textSize);
  typer.add(letter);
}