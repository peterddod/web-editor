class Letter
{
    value;
    index;
    style;
    htmlElement;

    siblingRight;

    constructor(value, htmlElement, index=-1, bold=false, italic=false, underline=false, font='Arial', size=12)
    {
        this.value = value;
        this.htmlElement = htmlElement;
        htmlElement.innerHTML = this.value;
        this.index = index;
        this.style = {
            'bold': bold,
            'italic': italic,
            'underline': underline,
            'font': font,
            'size': size,
        };
        this.siblingRight = null;
    }  

    setSibling(siblingRight) { this.siblingRight = siblingRight; }
    getSibling() { return this.siblingRight; }
    getValue() { return this.value; }
    
    setIndex(index, cascade=false) 
    { 
        this.index = index;
        
        if (cascade)
        {
            if (this.siblingRight != null)
            {
                this.siblingRight.setIndex(index+1, true);
            }
        }
    }
    
    getIndex() { return this.index; }
    getHTMLElement() { return this.htmlElement; }

    removeHTMLElement()
    {
        this.htmlElement.remove();
    }

    formatLetter()
    {
        var styleString = "";

        if (this.style['bold'])
        {
            styleString += "font-weight:bold;";
        }
        if (this.style['italic'])
        {
            styleString += "font-style:italic;";
        }
        if (this.style['underline'])
        {
            styleString += "text-decoration:underline;";
        }

        this.htmlElement.setAttribute('style', styleString);
    }
} 