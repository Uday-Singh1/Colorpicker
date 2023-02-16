class ColorCard{
    id;
    color;
    addToList;
    htmlElement;
    circle;
    text;

    constructor(newId, newColor, addToList) {
        /*setting properties */
        this.id = newId;
        this.color = newColor;
        this.addToList = addToList;

        /*Make htmlelement to be rendered */
        this.htmlElement = document.createElement("li");
        this.htmlElement.classList = "colors__color";

        this.circle = document.createElement("figure");
        this.circle.classList = "colors__circle";
        this.circle.style.background = this.color;

        this.text = document.createElement("p");
        this.text.innerText = "Copied";
        this.text.classList = "colors__text";

        this.htmlElement.onclick = this.onHTMLElementClicked;  //De "this" was niet erin gezet vanwege de klassen moet dit! /  er staat alleen element en geen "htmlElement"
        /* Final Render */
        this.render();
    }   

    onHTMLElementClicked =  ()  =>{     // een function zorgt er voor dat de "this" geen waarde heeft dus een arrow function moet als alternatief
        this.circle.classList.add("colors__circle--selected");
        document.title = this.color;
        window.navigator.clipboard.writeText(this.color);
    }

    render() {
        this.htmlElement.appendChild(this.circle);
        this.htmlElement.appendChild(this.text);
        this.addToList.appendChild(this.htmlElement);
    }
}


for (let i = 1; i < 101; i++){
  
    //colors[i].style.animationDelay = i / 10 + "s";
    let randomHue = Math.floor(Math.random() * (360 - 1) + 1);
    let randomSaturation = Math.floor(Math.random() * (79 - 11) + 11)+ "%";
    let randomLightness = Math.floor(Math.random() * (100 - 11) + 11) + "%";

    let hsl = `hsl(${randomHue}, ${randomSaturation}, ${randomLightness})`
    new ColorCard(i, hsl ,document.getElementById("js--colors"));
    
 }
