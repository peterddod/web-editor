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
        }
        else if (this.caret.getSiblingLeft() != null && this.caret.getSibling() == null)
        {
            this.caret.getSiblingLeft().setSibling(letter);
            letter.setSibling(this.caret);
            this.caret.setSiblingLeft(letter);
            letter.setIndex(this.length);
        }
        else if (this.caret.getSiblingLeft() == null && this.caret.getSibling() != null)
        {
            this.caret.siblingRight = this.root;
            this.root = letter;
            this.root.setSibling(this.caret);
            this.caret.siblingLeft = this.root;
            letter.setIndex(0, true);
        }
        else
        {
            var index = this.caret.getSiblingLeft().getIndex() + 1;
            this.caret.siblingLeft.setSibling(letter);
            this.caret.siblingLeft = letter;
            this.caret.siblingLeft.setSibling(this.caret);
            this.caret.siblingLeft.setIndex(index, true);
        }

        this.length++;

        this.caret.getHTMLElement().insertAdjacentElement('beforebegin', letter.getHTMLElement());
        letter.formatLetter();
    }

    remove(del=false)
    {
        if (this.caret.siblingLeft != null)
        {
            var siblingLeftLeft = this.findLetter(this.caret.siblingLeft.getIndex()-1);

            if (siblingLeftLeft != null)
            {
                this.caret.siblingLeft.removeHTMLElement();
                this.caret.siblingLeft = siblingLeftLeft;
                this.caret.siblingLeft.setSibling(this.caret);
                this.caret.siblingLeft.setIndex(this.caret.siblingLeft.getIndex(), true);
            }
            else
            {
                this.caret.siblingLeft.removeHTMLElement();
                this.caret.siblingLeft = null;
                this.root = this.caret.siblingRight;
                if (this.caret.siblingRight != null)
                {
                    this.root.setIndex(0, true);
                }
                else
                {
                    if (this.root != null)
                    {
                        this.root.setIndex(0);
                    }
                }
                
            }

            this.length -= 1;
        }       
    }

    incrementCaret(plus)
    {
        if (plus)
        {
            if (this.caret.siblingRight != null)
            {
                if (this.caret.siblingLeft != null)
                {
                    var buffer = this.caret.siblingRight.getSibling();
                    this.caret.siblingLeft.setSibling(this.caret.siblingRight);
                    this.caret.siblingRight.setSibling(this.caret);
                    this.caret.siblingLeft = this.caret.siblingRight;
                    this.caret.siblingRight = buffer;
                }
                else if (this.caret.siblingRight != null)
                {
                    var buffer = this.caret.siblingRight.getSibling();
                    this.caret.siblingLeft = this.caret.siblingRight;
                    this.caret.siblingLeft.setSibling(this.caret);
                    this.caret.siblingRight = buffer;
                }

                this.caret.siblingLeft.getHTMLElement().insertAdjacentElement('afterend', this.caret.getHTMLElement());
            }
        }
        else
        {
            try
            {
                var llIndex = this.caret.getSiblingLeft().getIndex()-1;
            }
            catch
            {
                return;
            }

            if (llIndex >= 0)
            {
                var siblingLeftLeft = this.findLetter(llIndex);
                siblingLeftLeft.setSibling(this.caret);
                this.caret.siblingLeft.setSibling(this.caret.siblingRight);
                this.caret.siblingRight = this.caret.siblingLeft;
                this.caret.siblingLeft = siblingLeftLeft;
            }
            else
            {
                this.caret.siblingLeft.setSibling(this.caret.siblingRight);
                this.caret.siblingRight = this.caret.siblingLeft;
                this.caret.siblingLeft = null;
            }

            this.caret.siblingRight.getHTMLElement().insertAdjacentElement('beforebegin', this.caret.getHTMLElement());
        }
    }

    findLetter(index) 
    {
        if (index < 0)
        {
            return null;
        }

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

    printSiblings()
    {
        var left;
        var right;

        try
        {
            left = this.caret.siblingLeft.getValue();
        }
        catch
        {
            left = 'null';
        }

        try
        {
            right = this.caret.siblingRight.getValue();
        }
        catch
        {
            right = 'null';
        }

        console.log(left + " " + right);
        console.log(this.indices(this.root));
    }
    
    indices(e)
    {
        if (e != null)
        {
            return e.getIndex() + ", " + this.indices(e.getSibling());
        }
    }
}