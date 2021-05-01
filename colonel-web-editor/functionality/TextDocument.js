class TextDocument
{
    head;
    caretPosition;
    length;
    textValue;
    pBlock;

    constructor(document, editor)
    {
        this.root = null;
        this.caretPosition = 0;
        this.length = 0;
        this.textValue = "";

        this.pBlock = document.createElement('p');
        this.pBlock.setAttribute('class', 'newline_p');
        editor.appendChild(this.pBlock);

        let span = document.createElement('span');
        var letter = new Letter('&#8203', span);
        this.root = letter;
        this.pBlock.appendChild(this.root.getHTMLElement());
        this.root.setIndex(0);
        this.setCaretPosition(0, true);
    }

    add(letter) 
    {
        if (this.root==null)
        {
            this.root = letter;
            this.pBlock.appendChild(letter.getHTMLElement());
            letter.setIndex(0, true);
        }
        else
        {
            var leftLetter = this.findLetter(this.caretPosition);
            var leftSibling = leftLetter.getSibling();

            leftLetter.setSibling(letter);
            leftLetter.getHTMLElement().insertAdjacentElement('afterEnd', letter.getHTMLElement());
            
            if (leftSibling != null)
            {
               letter.setSibling(leftSibling); 
               letter.setIndex(this.caretPosition+1, true);
            }
            else
            {
                letter.setIndex(this.caretPosition+1);
            }
        }
      
        this.length += 1;
        this.setCaretPosition(1, true);
    }

    remove(del=false)
    {
        var leftSibling = this.findLetter(this.caretPosition-1);
        if (leftSibling == null)
        {
            return;
        }
        this.setCaretPosition(-1, true);
        
        

        var letter = leftSibling.getSibling();

        if (letter.getSibling() != null)
        {
            console.log("helloe")
            leftSibling.setSibling(letter.getSibling());
            leftSibling.setIndex(this.caretPosition, true);
        }

        this.length -= 1;
        letter.removeHTMLElement();
    }

    findLetter(index) 
    {
        var i = this.root;

        
        while (i!=null)
        {
            if (i.getIndex() == index)
            {
                return i;
            }

            i = i.getSibling();
        }

        return null;
    }

    setCaretPosition(value, increment=false)
    {
        var caretCurrentLetter = this.findLetter(this.caretPosition);
        caretCurrentLetter.getHTMLElement().setAttribute('id', '');

        if (increment)
        {
            var newCaretPos = this.caretPosition + value;

            if (value!=0 && newCaretPos >= 0 && newCaretPos <= this.length) 
            {
                this.caretPosition += value;
            }  
        }
        else
        {
            this.caretPosition = value;
        }
        
        this.findLetter(this.caretPosition).getHTMLElement().setAttribute('id', 'caret');
    }
}