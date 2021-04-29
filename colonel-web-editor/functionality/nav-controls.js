var boldEl = document.getElementById('bold');
var italEl = document.getElementById('italic');
var undlnEl = document.getElementById('underline');

var selectStyle = 'box-shadow: 0px 0px 4px 1px rgba(255, 255, 255, 0.1);background-color: rgba(255, 255, 255, 0.2);';

boldEl.addEventListener('click', activateBold);
italEl.addEventListener('click', activateItalic);
undlnEl.addEventListener('click', activateUnderline);

function activateBold() 
{
    if (bold) 
    {
        boldEl.setAttribute('style' , '');
        bold = false;
    }
    else
    {
        boldEl.setAttribute('style' , selectStyle);
        bold = true;
    }
}

function activateItalic() 
{
    if (italic) 
    {
        italEl.setAttribute('style' , '');
        italic = false;
    }
    else
    {
        italEl.setAttribute('style' , selectStyle);
        italic = true;
    }
}

function activateUnderline() 
{
    if (underline) 
    {
        undlnEl.setAttribute('style' , '');
        underline = false;
    }
    else
    {
        undlnEl.setAttribute('style' , selectStyle);
        underline = true;
    }
}