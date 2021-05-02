class TextDocument
{
    head;
    caret;
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

        // let span = document.createElement('span');
        // var letter = new Letter('&#8203', span);
        // letter.formatLetter();
        // this.root = letter;
        // this.pBlock.appendChild(this.root.getHTMLElement());
        // this.root.setIndex(0);
        this.caret = new Caret(this.root, null);
        this.pBlock.appendChild(this.caret.getHTMLElement());
    }

    add(letter) 
    {
        if (this.root == null)
        {
            this.root = letter;
            this.caret.setSiblingLeft(letter);
            letter.setSibling(this.caret);
            letter.setIndex(0);
            length++;
        }
        else if (this.caret.getSiblingLeft() != null && this.caret.getSibling() == null)
        {
            this.caret.getSiblingLeft().setSibling(letter);
            letter.setSibling(this.caret);
            this.caret.setSiblingLeft(letter);
            letter.setIndex(length);
            length++;
        }
        else if (this.caret.getSiblingLeft() != null && this.caret.getSibling() == null)
        {
            this.caret.siblingLeft = this.root;
            this.root = letter;
            letter.setIndex(0, true);
            length++;
        }
        else
        {
            var index = this.caret.getSiblingLeft().getIndex();
            this.caret.getSiblingLeft().setSibling(letter);
            this.caret.setSiblingLeft(letter);
            letter.setSibling(this.caret);
            letter.setIndex(index, true);
        }

        this.caret.getHTMLElement().insertAdjacentElement('beforebegin', letter.getHTMLElement());
        letter.formatLetter();
    }

    remove(del=false)
    {
        var leftSibling = this.findLetter(this.caretPosition-1);
        if (leftSibling == null)
        {
            return;
        }
        this.caret.incrementCaret(false);  // this function aint working
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

    // moveCaret(plus)
    // {
    //     if (!plus)
    //     {
    //         if (this.caret.getSiblingLeft() != null)
    //         {
                
    //         }
    //     }
    // }

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
}