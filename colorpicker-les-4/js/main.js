class ColorCard{    //geef clas id's aan om te gebruiken in code hier onder    
    id;
    color;          
    addToList;
    htmlElement;
    circle;
    text;

    constructor(newId, newColor, addToList) { //id's die je in elke constructor kan gebruiken om iets aan te roepen
        /*setting properties */
        this.id = newId; //hier wordt aangegeven wat voor id de constructor id's krijgen voor onderstaande code
        this.color = newColor;
        this.addToList = addToList;

        /*Make htmlelement to be rendered */
        this.htmlElement = document.createElement("li");
        this.htmlElement.classList = "colors__color";       //Dit creeert de  kleuren van de circles

        this.circle = document.createElement("figure");
        this.circle.classList = "colors__circle";       //dit is code om de circle zelf te generen
        this.circle.style.background = this.color;

        this.text = document.createElement("p");    //je geeft aan dat het in de paragraph moet komen
        this.text.innerText = "Copied";        //De innertext genereert door middel van jouw ingevoerde text een text op de circle na het drukken     //Dit genereet de "copied" text
        this.text.classList = "colors__text";

        this.htmlElement.onclick = this.onHTMLElementClicked;   //Dit genereert de onclick waardoor je dus de kleur copied, de text op de kleur krijgt en boven in je browser de hsl code krijgt
        //De "this" was niet erin gezet vanwege de klassen moet dit! /  er staat alleen element en geen "htmlElement"
        /* Final Render */
        this.render();      // this.render(); rendered alles wat boven staat
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


class ColorList {
    id;
    htmlElement;

    constructor(newId) {
        this.id = newId;
        this.htmlElement = document.createElement("ul");
        this.htmlElement.id = this.id;
        this.htmlElement.classList.add("colors");
        this.render();
    }

    render() {
        document.querySelector("body").appendChild(this.htmlElement); 
    }
}

class HSLGenerator{
    randomHue;
    randomSaturation;
    randomLightness;
    hsl;

    constructor() {
        this.generateHSL();
    }

    generateHue = function () {
        this.randomHue = Math.floor(Math.random() * (360 - 1) + 1);

    }
    
    generateSaturation = function () {
        this.randomSaturation = Math.floor(Math.random() * (79 - 11) + 11)+ "%";

    }

    generateLightness = function () {
        this.randomLightness = Math.floor(Math.random() * (100 - 11) + 11) + "%";
        
    }
    generateHSL = function () {
        this.generateHue();
        this.generateSaturation();
        this.generateLightness();
        this.hsl = `hsl(${this.randomHue}, ${this.randomSaturation}, ${this.randomLightness})`
 
    }
}

class App{ // "APP" is de class  id dat dus kan worden hergebruikt om meer kleuren te generen naar wensen
    id;
    ColorList; //De id's geven aan wat hun functie binnen de constructors wordt
    HSLGenerator;

    constructor(newId) {
        this.id = newId; 
        this.ColorList = new ColorList("this.id");
        this.HSLGenerator = new HSLGenerator();
        this.generateColorCards();
    }

    generateColorCards = function () {  //Deze forloop regenereert steeds randomized kleuren
        for (let i = 1; i <= 100; i++){
            this.HSLGenerator.generateHSL();
            new ColorCard(i, this.HSLGenerator.hsl, document.getElementById(this.ColorList.id));
        }
        
    }
}
// copy paste onder elkaar en je kan dan de const veranderen van nummer en de js-- id veranderen om meer colors te maken
const app = new App("js--app");     
const app2 = new App("js--app--2");
//const app3 = new App("js--app--3");
