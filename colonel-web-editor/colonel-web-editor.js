class Colonel
{
    textValue;
    targetElement;

    constructor(targetElement, path) 
    {
        document.getElementById(targetElement).src = path + "/cwb-frame.html";
    }
}