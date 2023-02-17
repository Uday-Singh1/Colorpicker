class ColorCard{    //geef class id's aan om te gebruiken in code hier onder    
    id; //de id wordt hier veranderd naar newId dat dus door de constructors heen wordt her gebruikt
    color;    //de color wordt this.color = newColor, de this.color  wordt bijvoorbeeld  in "this.circle.style.background = this.color" waardoor de kleur voor de circle wordt aangegeven
    addToList;  //dit is de id van de lijst waar de circle
    htmlElement;    //dit is de id van de html element dat dus de li maakt 
    circle; //dit  genereert de circle
    text; //dit genereert de text

    constructor(newId, newColor, addToList) { //id's die je in elke constructor kan gebruiken om iets aan te roepen
        /*setting properties */
        this.id = newId; //hier wordt aangegeven wat voor id de constructor id's krijgen voor onderstaande code
        this.color = newColor;  //hier worden de colors aangegeven wat voor kleuren er worden gebruikt
        this.addToList = addToList; //Dit maakt de lijst met kleuren wat dus daarna wordt gerendered : this.addToList.appendChild(this.htmlElement); 

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
        this.circle.classList.add("colors__circle--selected");  //Dit laat zien waar de click wordt geactiveerd dus de selected circle
        document.title = this.color;    //op de plek waar de naam van de site staat wordt de color aangegeven in HSL
        window.navigator.clipboard.writeText(this.color);   //dit zorgt voor dat de copied text in de navigatie balk komt doormiddel van text
    }

    render() {
        this.htmlElement.appendChild(this.circle);  //dit rendered de circle
        this.htmlElement.appendChild(this.text);    //dit rendered de Copied! text
        this.addToList.appendChild(this.htmlElement);   //dit rendered de lijst met kleuren
    }
}


class ColorList {   //de Colorlist class is om de colors te pakken uit de scss "colors"
    id; //de  id voor de colorlist
    htmlElement;    //de  id voor de htmlelement waarmee de colorlist wordt gegenereerd

    constructor(newId) {    //dit is de "newId" die de colors maakt , vervolgens wordt het onder hergebruik om makelijker d ecolors te laten genereren
        this.id = newId;    //de "this" is nodig voor de id dus this.id wordt in de constructor om een nieuw id te maken
        this.htmlElement = document.createElement("ul");    //dit creeert de ul's waar de colors in komen
        this.htmlElement.id = this.id;  //de html element wordt in een id gezet dat dus daarna wordt bekend gemaakt als this.id dat daarna wordt omgezet in "newId" dat dus dan onderaan vervolgt
        this.htmlElement.classList.add("colors");   //de "colors" worden hier aangeroepen
        this.render();  //dit renderd de colors dat in de ul's worden geplaatst
    }

    render() {
        document.querySelector("body").appendChild(this.htmlElement);   //dit renderd de html body via javascript
    }
}

class HSLGenerator{     //de class om de Hsl te laten genereren
    randomHue;  //randomhue id "this.randomHue" laat  de Hue randomisen
    randomSaturation;//randomsaturation id "this.randomSaturation" laat  de saturatie randomisen
    randomLightness; //randomLightness id "this.randomLightness" laat  de lightness randomisen
    hsl;    // wordt in een string op "regel 92" gezet om aante geven wat het complete string is 

    constructor() {
        this.generateHSL(); //dit genereert de hsl
    }

    generateHue = function () { //de generateHue wordt in een functie gezet dat dus onderaan in werking wordt gezet
        this.randomHue = Math.floor(Math.random() * (360 - 1) + 1);  //de rekensom om de aantal Hue aan te passen

    }
    
    generateSaturation = function () {  //de generateSaturation wordt in een functie gezet dat dus onderaan in werking wordt gezet
        this.randomSaturation = Math.floor(Math.random() * (79 - 11) + 11)+ "%";    //de rekensom om de aantal Saturation aan te passen

    }

    generateLightness = function () {   //de generateLightness wordt in een functie gezet dat dus onderaan in werking wordt gezet
        this.randomLightness = Math.floor(Math.random() * (100 - 11) + 11) + "%";  //de rekensom om de aantal Lightness aan te passen
        
    }
    generateHSL = function () { //dit genereert de HSL
        this.generateHue(); //dit genereert de HUE
        this.generateSaturation(); //dit genereert de Saturatie
        this.generateLightness(); //dit genereert de lightness
        this.hsl = `hsl(${this.randomHue}, ${this.randomSaturation}, ${this.randomLightness})` //dit genereert random hsl door middel van strings
 
    }
}

class App{ // "APP" is de class  id dat dus kan worden hergebruikt om meer kleuren te generen naar wensen
    id;  //de id voor de class App
    ColorList; //De id's geven aan wat hun functie binnen de constructors wordt
    HSLGenerator; //de id voor De HSLGENERATOR

    constructor(newId) {
        this.id = newId;    //de "this" is nodig voor de id dus this.id wordt in de constructor om een nieuw id te maken
        this.ColorList = new ColorList(this.id); //dit creeert de colorlist met id new ColorList
        this.HSLGenerator = new HSLGenerator();
        this.generateColorCards();  //dit genereert de Color cards
    }

    generateColorCards = function () {  //Deze forloop regenereert steeds randomized kleuren
        for (let i = 1; i <= 100; i++){ 
            this.HSLGenerator.generateHSL();    //Dit zet de generate Hsl in de for loop dat dus uitendelijk herhaalt wanneer je refreshed
            new ColorCard(i, this.HSLGenerator.hsl, document.getElementById(this.ColorList.id));  //Dit is de color card dat dus elke keer bij refresh nieuwe colors genereert via de forloop
        }
        
    }
}
// copy paste onder elkaar en je kan dan de const veranderen van nummer en de js-- id veranderen om meer colors te maken
const app = new App("js--app");   // dit maakt de code compacter en je kan als je meer kleuren wilt hebben alles onder elkaar zetten
const app2 = new App("js--app--2"); //als je meer kleuren wilt hebben moet je een extra letter in de  const "app" toe voegen zoals "app2" en js--app kan je dan bijvoorbeeld js--app--2 doen zodat de javascript ook helemaal werkt
//const app3 = new App("js--app--3");
