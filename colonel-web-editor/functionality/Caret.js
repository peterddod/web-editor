class Caret
{
    htmlElement;
    textSize = 12;
    index = -1;

    siblingRight;
    siblingLeft;

    constructor(siblingLeft=null, siblingRight=null)
    {
        this.siblingLeft = siblingLeft;
        this.siblingRight = siblingRight;
        this.htmlElement = document.createElement('span');
        this.htmlElement.innerHTML = '&#8203';
        this.htmlElement.setAttribute('id', 'caret');
        this.format();
    }  

    getIndex() { return this.index; }
    getHTMLElement() { return this.htmlElement; }
    getSibling() { return this.siblingRight; }
    getSiblingLeft() { return this.siblingLeft; }
    setSiblingLeft(letter) { this.siblingLeft = letter; }
    setSiblingRight(letter) { this.siblingRight = letter; }
    setTextSize(size) { this.textSize = size; this.format();}

    format() 
    {
        this.htmlElement.setAttribute('style', 'font-size:' + this.textSize + "px");
    }

    removeHTMLElement()
    {
        this.htmlElement.remove();
    }

    setIndex(index, cascade)
    {
        if (this.siblingRight != null)
        {
            this.siblingRight.setIndex(index, true);
        }      
    }
} 