/* function $(el){
    return document.getElementById(el);
}
var tzdragg = function(){
    return {
        move : function(divid,xpos,ypos){
           console.log('1');
            var a = $(divid);
            $(divid).style.left = xpos + 'px';
            $(divid).style.top = ypos + 'px';
        },
        startMoving : function(evt){
           
            evt = evt || window.event;
            var posX = evt.clientX,
                posY = evt.clientY,
                a = $('cardFrontHeader'),
            divTop = a.style.top,
            divLeft = a.style.left;
            
            divTop = divTop.replace('px','');
            divLeft = divLeft.replace('px','');
            var diffX = posX - divLeft,
                diffY = posY - divTop;
            document.onmousemove = function(evt){
                evt = evt || window.event;
                var posX = evt.clientX,
                    posY = evt.clientY,
                    aX = posX - diffX,
                    aY = posY - diffY;
           var boun=document.getElementById("parent").offsetWidth-document.getElementById("cardFrontHeader").offsetWidth;
               
                if((aX>0)&&(aX<boun)&&(aY>0)&&(aY<boun))
                tzdragg.move('cardFrontHeader',aX,aY);
            }
        },
        stopMoving : function(){
            var a = document.createElement('script');
            document.onmousemove = function(){}
        },
    }
}(); */


////////


 // Cancel dragging if mouse leaves the editor container.

 //The dollar function, $(), can be used as shorthand for the getElementById function

/*  $('.element-container').on('mouseleave', function(){
    var event = document.createEvent('MouseEvents');
    event.initEvent('blur', true, true);
    document.dispatchEvent(event);
  }); */

/////////


/* $(function() {
    $( "#set div" ).draggable({ 
    
    containment: "#set1 div",
    stack: "#set div",
        stop: function(event, ui) {
            var pos_x = ui.offset.left;
            var pos_y = ui.offset.top;
            var need = ui.helper.data("need");
            
            console.log(pos_x);
            console.log(pos_y);
            console.log(need);
            
            //alert( pos_x);
            
            //Do the ajax call to the server
            $.ajax({
                type: "POST",
                url: "your_php_script.php",
                data: { x: pos_x, y: pos_y, need_id: need}
            }).done(function( msg ) {
                alert( "Data Saved: " + msg );
            }); 
        }
    });

});
 */


/* 
let draggable = document.getElementById('cardFrontHeader');
let viewport = document.getElementById('cardFront');
let viewportOffset = viewport.offset();
let box = 
    {
        x1: viewportOffset.left + (viewport.outerWidth() - draggable.outerWidth()),
        y1: viewportOffset.top + (viewport.outerHeight() - draggable.outerHeight()),
        x2: viewportOffset.left,
        y2: viewportOffset.top
    };

    document.getElementById('cardFrontHeader').draggable(
        {
            containment: [box.x1, box.y1, box.x2, box.y2 ]
        });



/////////////////////////////////


// target elements with the "draggable" class
interact('.draggable')
  .draggable({
    // enable inertial throwing
    inertia: true,
    // keep the element within the area of it's parent
    modifiers: [
      interact.modifiers.restrictRect({
        restriction: 'parent',
        endOnly: true
      })
    ],
    // enable autoScroll
    autoScroll: true,

    listeners: {
      // call this function on every dragmove event
      move: dragMoveListener,

      // call this function on every dragend event
      end (event) {
        var textEl = event.target.querySelector('p')

        textEl && (textEl.textContent =
          'moved a distance of ' +
          (Math.sqrt(Math.pow(event.pageX - event.x0, 2) +
                     Math.pow(event.pageY - event.y0, 2) | 0))
            .toFixed(2) + 'px')
      }
    }
  })

function dragMoveListener (event) {
  var target = event.target
  // keep the dragged position in the data-x/data-y attributes
  var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
  var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

  // translate the element
  target.style.webkitTransform =
    target.style.transform =
      'translate(' + x + 'px, ' + y + 'px)'

  // update the posiion attributes
  target.setAttribute('data-x', x)
  target.setAttribute('data-y', y)
}

// this function is used later in the resizing and gesture demos
window.dragMoveListener = dragMoveListener */



/* function textInput(){

    for(let i=1; i<5; i++){
        
        let titleName = document.getElementById('title').value;

        document.getElementById('title').value = '';

        if(document.getElementById('title').value != null){

            let titleObj = {'name':'Title'+i, 'title':`${titleName}`};
            title.push(titleObj);

            console.log(title);

            document.getElementById('cardFront').innerHTML += `<div>${titleName}</div>`;
        }

    }
}


function titleSel(){

} */

let title = [];
    
let i = localStorage.getItem('counter');

function textInput(){
    i++

    localStorage.setItem('counter', i);
    
    let titleName = document.getElementById('title').value;

    document.getElementById('title').value = '';

    let titleObj = {'name':'Title'+i, 'title':`${titleName}`};
    title.push(titleObj);

    document.getElementById('cardFront').innerHTML += `<div>${titleName}</div>`;

    document.getElementById('selection').innerHTML += `<option value="${titleObj.name}">${titleObj.name}</option>`;
}




//////

dragElement(document.getElementsById(`cardFront${titleObj.name}`));

function dragElement(elmnt) {

let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
/* if (document.getElementById(elmnt.id + "Header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "Header").onmousedown = dragMouseDown; */
if (document.getElementById(elmnt.className == 'cardFront')) {
        // if present, the header is where you move the DIV from:
        document.getElementById(elmnt.className == 'cardFront').onmousedown = dragMouseDown;
} else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
}

function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
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
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
}

function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
    }
}



/////////////////////
function drag_start(event) {
    var style = window.getComputedStyle(event.target, null);
    event.dataTransfer.setData("text/plain", (parseInt(style.getPropertyValue("left"), 10) - event.clientX) + ',' + (parseInt(style.getPropertyValue("top"), 10) - event.clientY) + ',' + event.target.getAttribute('data-item'));
  }
  
  function drag_over(event) {
    event.preventDefault();
    return false;
  }

  const index = title.findIndex((element, index) => {
    if (element.title === `${titleName}`) {
        return true;
    }
  });
  
  function drop(event) {
    var offset = event.dataTransfer.getData("text/plain").split(',');
    var dm = document.getElementsByClassName('cardFront');
    dm[parseInt(offset[2])].style.left = (event.clientX + parseInt(offset[0], 10)) + 'px';
    dm[parseInt(offset[2])].style.top = (event.clientY + parseInt(offset[1], 10)) + 'px';
    event.preventDefault();
    return false;
  }
  
  var dm = document.getElementsByClassName('cardFront');
  for (var a = 0; a < dm.length; a++) {
    dm[a].addEventListener('dragstart', drag_start, false);
    document.body.addEventListener('dragover', drag_over, false);
    document.body.addEventListener('drop', drop, false);
  }



/////////////

// Wrap the module in a self-executing anonymous function
// to avoid leaking variables into global scope:
function dragDrop(document) {
    // Enable ECMAScript 5 strict mode within this function:
    

    // Obtain a node list of all elements that have class="draggable":
    var draggable = document.getElementsByClassName('cardFront'),
        draggableCount = draggable.length, // cache the length
        a; // iterator placeholder

    // This function initializes the drag of an element where an
    // event ("mousedown") has occurred:
    function startDrag(evt) {

        // The element's position is based on its top left corner,
        // but the mouse coordinates are inside of it, so we need
        // to calculate the positioning difference:
        var diffX = evt.clientX - this.offsetLeft,
            diffY = evt.clientY - this.offsetTop,
            that = this; // "this" refers to the current element,
                         // let's keep it in cache for later use.

        // moveAlong places the current element (referenced by "that")
        // according to the current cursor position:
        function moveAlong(evt) {
            that.style.left = (evt.clientX - diffX) + 'px';
            that.style.top = (evt.clientY - diffY) + 'px';
        }

        // stopDrag removes event listeners from the element,
        // thus stopping the drag:
        function stopDrag() {
            document.removeEventListener('mousemove', moveAlong);
            document.removeEventListener('mouseup', stopDrag);
        }

        document.addEventListener('mouseup', stopDrag);
        document.addEventListener('mousemove', moveAlong);
    }

    // Now that all the variables and functions are created,
    // we can go on and make the elements draggable by assigning
    // a "startDrag" function to a "mousedown" event that occurs
    // on those elements:
    for (a = 0; a < draggableCount; a++) {
        draggable[a].addEventListener('mousedown', startDrag);
    }
}dragDrop(document);
