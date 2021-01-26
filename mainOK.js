//image upload

const chooseFile = document.getElementById("choose-file");
const imgPreview = document.getElementById("imgPreview");

/* add an event listener that detects a value change on the input field.
When this change is detected we’ll call a function to get the image data */
chooseFile.addEventListener("change", function () {
    getImgData();
});

//The getImgData() function uses the FileReader API to insert the image into the page
function getImgData() {
    const files = chooseFile.files[0];
    if (files) {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(files);
        fileReader.addEventListener("load", function () {
            imgPreview.style.backgroundImage = `url(${this.result})`;
            document.getElementById('imgPreview').style.opacity = '1';
            
            /* imgPreview.style.display = 'block'; */
            /* imgPreview.innerHTML = '<img src="' + this.result + '" />'; */
        });
    }
}

let title = [];
    
let i = localStorage.getItem('counter');

function textInput(){
    i++

    localStorage.setItem('counter', i);

    let titleObj = {};
    
    let titleName = document.getElementById('title').value;

    document.getElementById('title').value = '';

    //create title elements and put them into an object
    titleObj = {'name':'Title'+i, 'title':`${titleName}`};
    title.push(titleObj);

    //removed after element ', index'
    const index = title.findIndex((element) => {
        if (element.title === `${titleName}`) {
            return true;
        }
    });

    let titleAdd = {'index':`${index}`};
    //to add new elements to titleObj
    Object.entries(titleAdd).forEach(([key,value]) => { titleObj[key] = value });

    document.getElementById('imgPreview').innerHTML += `
    <div id="cardFront${index}" class="cardFront" data-item="${index}" style="color: var(--pick-color);">
    <div class="title">
    ${titleName}
    </div>
    </div>
    `;

    startDrag();
    console.log(titleObj.index);
    console.log(index);
    console.log(Object.values(titleObj));
    console.log(title);

    /* document.getElementById('selection').innerHTML += `<option value="${titleObj.name}">${titleObj.name}</option>`; */

    
    /* document.getElementById(`cardFront${titleObj.name}`);
    let selectStyle = document.createElement(style); */

    document.getElementById('selectedTitle').innerHTML += `
    <div id="style${titleObj.name}" class="window" data-item="${index}" onclick="titleWindow(this);" style="cursor: pointer;">
    <a>${titleObj.name}<img src="./images/arrow-down.png" height="10vmin"></a>
    <div id=placeStyle${titleObj.name} style="display:none">
    </div>
    <div id="deleteItem" data-item="${index}" onclick="deleteItem(this, this)">Delete</button>
    </div>
    `

    /* color(); */
    
}

function resetText(){

    document.getElementById('imgPreview').innerHTML = '';
    document.getElementById('imgPreview').style.backgroundImage = '';

    //this removes every object within the array
    title.length = 0;
    //this just reset local storage
    localStorage.clear();
    document.getElementById('selectedTitle').innerHTML = '';

}

function deleteItem (element, event) {
    el = 'cardFront'+(element.getAttribute('data-item'));
    let toDelete = document.getElementById(el);
    toDelete.remove();
    event.parentNode.remove();
    console.log(el);
    console.log(toDelete);    
}
/* function getIndex(){

} */

let indexButton = '';

function titleWindow(element){

    if(element.id != null){

    document.getElementById(element.id);//CHECK IT IF IT IS RIGHT, because it works
    //to get the right index number
    indexButton = element.getAttribute('data-item');
    //to get the title name, so you can create or call the right element id
    let titleStyle = title[indexButton].name;
    console.log(element.id);
    console.log(titleStyle);
    console.log(indexButton);


    document.getElementById(`placeStyle${titleStyle}`).innerHTML = `
    <div class="font-size">
    <label for="sel${titleStyle}">Font size:</label>
    <select class="form-control" id="sel${titleStyle}" onchange="changeSize(this);">
    <option>8</option>
    <option>12</option>
    <option>16</option>
    <option>20</option>
    <option>24</option>
    <option>28</option>
    <option>32</option>
    <option>36</option>
    <option>40</option>
    <option>44</option>
    <option>48</option>
    <option>52</option>
    <option>56</option>
    <option>60</option>
    <option>64</option>
    <option>68</option>
    <option>72</option>
    <option>90</option>
    <option>110</option>
    <option>144</option>
    </select>
    </div>

    <div class="p-color">
    <label for="select_color${indexButton}">Pick a color: </label>
    <input type="color"id="select_color${indexButton}">
    <span id="hex"></span>
    </div>

    <div class="text-font">
    <label for="sel2">Font family:</label>
    <select class="form-control" id="sel2" onchange="changeFont(this);">
    <option value="Times New Roman" selected="selected">Times New Roman</option>
    <option value="Arial">Arial</option> 
    <option value="Courier New">Courier New</option>
    </select>
    </div>
    <div class="text-style">
    <label for="sel3">Font style:</label>
    <select class="form-control" id="sel3" onchange="changeStyle(this);">
    <option value="selected" selected="selected">Select</option>
    <option value="normal">Normal</option>
    <option value="italic">Italic</option>
    </select>
    </div>
    <div class="text-weight">
    <label for="sel4">Font weight:</label>
    <select class="form-control" id="sel4" onchange="changeWeight(this);">
    <option value="selected" selected="selected">Select</option>
    <option value="normal">Normal</option>
    <option value="bold">Bold</option>
    </select>
    </div>
    <div class="text-shadow">
    <label for="sel5">Text shadow:</label>
    <select class="form-control" id="sel5" onchange="shadow(this);">
    <option value="selected" selected="selected">Select</option>
    <option value="none">None</option>
    <option value="3px 3px 10px black">Shadow</option>
    </select>
    </div>
    `
    let window = document.getElementById(`placeStyle${titleStyle}`);
    let style = window.style.display;
    if(style == 'block'){
        window.style.display = 'none';
        }else{
        window.style.display = 'block';
    }

    document.getElementById(`cardFront${indexButton}`);
    console.log(document.getElementById(`cardFront${indexButton}`));
    color();
    }
}

function startDrag(){

    for(let i = 0; i < title.length; i++){
        const titleIndex = title[i];
        let el = document.getElementById(`cardFront${titleIndex.index}`);
        console.log(titleIndex);
        console.log(el);
        dragElement(el);
    }
}

// Make the DIV element draggable:
function dragElement(el) {
    
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    //move the DIV from anywhere inside the DIV:
    el.onmousedown = dragMouseDown;
    
    function dragMouseDown(e) {
        e = e || window.event; //add an event to the window just for IE- 'e' is an object
        e.preventDefault();//prevent the default action to happen.
        // get the mouse cursor position at startup(coordinates):
        pos3 = e.clientX;
        pos4 = e.clientY;
        console.log(pos3, pos4);
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    
    }
    
    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        console.log(pos1, pos2, pos3, pos4);
        // set the element's new position:
        el.style.top = (el.offsetTop - pos2) + "px";
        el.style.left = (el.offsetLeft - pos1) + "px";
        console.log(el.style.top, el.style.left);
    }
    
    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

//font size
function changeSize(n) {
    let s = document.getElementById(`cardFront${indexButton}`);
    s.style.fontSize = n.value + 'px';
}

//SELECT COLOR
// read color from ColorPicker
function color(){
    let theInput = document.getElementById(`select_color${indexButton}`);

    let theColor = theInput.value;
    theInput.addEventListener("input", function() {

        // write color code (Hex)
        document.getElementById("hex").innerHTML = theInput.value;

        // write color variable
        document.getElementById(`cardFront${indexButton}`).style.setProperty('--pick-color',theInput.value);

    }, false);
}

//FONT FAMILY
let changeFont = function (font) { 
    document.getElementById(`cardFront${indexButton}`).style.fontFamily = font.value;
}

//FONT STYLE
let changeStyle = function (style) { 
    document.getElementById(`cardFront${indexButton}`).style.fontStyle = style.value;
}

//FONT WEIGHT
let changeWeight = function (weight) { 
    document.getElementById(`cardFront${indexButton}`).style.fontWeight = weight.value;
}

//TEXT SHADOW
let shadow = function (shadow) { 
    document.getElementById(`cardFront${indexButton}`).style.textShadow = shadow.value;
}

//////BACK SIDE//////

//DESIGN
function selectBack(cardDesign){
    
    if(cardDesign.value == 'classic'){
        
        document.getElementById('backImg').style.backgroundImage = `url('./images/classic-card.jpg')`;
        document.getElementById('backImg').style.opacity = '1';

        document.getElementById('cardBackP').style.height = '53vmin';
        document.getElementById('cardBackP').style.marginTop = '4vmin';

        document.getElementById('ws').style.width = '6vmin';
        document.getElementById('ws').style.height = '6vmin';
    }    
    if(cardDesign.value == 'vintage'){
        
        document.getElementById('backImg').style.backgroundImage = `url('./images/vintage-card.jpg')`;
        document.getElementById('backImg').style.opacity = '1';
        
        document.getElementById('cardBackP').style.height = '47vmin';
        document.getElementById('cardBackP').style.marginTop = '10vmin';

        document.getElementById('ws').style.width = '16vmin';
        document.getElementById('ws').style.height = '12vmin';
    }
}


//ADDRESS INPUT

function addressInput(){

    let nameF= document.getElementById('nameF').value;
    let house= document.getElementById('house').value;
    let city= document.getElementById('city').value;
    let country= document.getElementById('country').value;

    
    document.getElementById('adName').innerHTML = `<a>${nameF}</a>`;
    document.getElementById('nameF').value = '';

    document.getElementById('adHouse').innerHTML = `<a>${house}</a>`;
    document.getElementById('house').value = '';

    document.getElementById('adCity').innerHTML = `<a>${city}</a>`;
    document.getElementById('city').value = '';

    document.getElementById('adCountry').innerHTML = `<a>${country}</a>`;
    document.getElementById('country').value = '';
}

function resetAddress(){

    document.getElementById('adName').innerHTML = '';
    document.getElementById('adHouse').innerHTML = '';
    document.getElementById('adCity').innerHTML = '';
    document.getElementById('adCountry').innerHTML = '';
}


//TEXTAREA input personal

function personalInput(){
    let userText = document.getElementById('personal').value;

    document.getElementById('userText').innerHTML += `<a>${userText} </a>`;
    document.getElementById('personal').value ='';
}

function resetPersonal(){
    document.getElementById('userText').innerHTML ='';
}

function generateCard(){
    localStorage.setItem('front', document.getElementById('imgPreview').innerHTML);
    localStorage.setItem('frontImage', document.getElementById('imgPreview').style.backgroundImage);
    localStorage.setItem('back', document.getElementById('backImg').innerHTML);
    localStorage.setItem('backImage', document.getElementById('backImg').style.backgroundImage);
}



/* let myWindow = window.open('', 'Preview', 'height=400,width=600');
    myWindow.document.write('<html><head><title>Magic Card</title>');
    myWindow.document.write('<link rel="stylesheet" href="style.css" type="text/css" />');
    myWindow.document.write('</head><body >');
    myWindow.document.write(localStorage.getItem('front'));
    myWindow.document.write(localStorage.getItem('front').style.backgroundImage=localStorage.getItem('frontImage'));
    myWindow.document.write(localStorage.getItem('back'));
    myWindow.document.write(localStorage.getItem('back').style.backgroundImage=localStorage.getItem('backImage'));
    myWindow.document.write('</body></html>'); */

/* let c = document.getElementById('imgPreview');
    let t = c.getContext('2d');
    myWindow.document.write(document.getElementById('imgPreview').toDataURL()); */
/* let myWindow;
function openWin() {
    let newWindowContent = document.getElementById('img-preview').innerHTML;
    myWindow = window.open("", "myWindow", "width=600,height=400");
    myWindow.document.write(newWindowContent);
} */

/* function printSection() {
    let data=document.getElementById('imgPreview').innerHTML;
    let myWindow = window.open('', 'my section', 'height=400,width=600');
    myWindow.document.write('<html><head><title>my section</title>');
    myWindow.document.write('<link rel="stylesheet" href="style.css" type="text/css" />');
    myWindow.document.write('</head><body >');
    myWindow.document.write(data);
    myWindow.document.write('</body></html>');
    myWindow.document.close(); // necessary for IE >= 10

    myWindow.onload=function(){ // necessary if the div contain images

        myWindow.focus(); // necessary for IE >= 10
        myWindow.print();
        myWindow.close();
    };
} */

