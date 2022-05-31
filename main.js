const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const liveElements = [];


const wind = new Element({name:"wind",position:{x:100, y:100}, img:"green"});

const water = new Element({name:"water",position:{x:200, y:30}, img:"blue"});

const fire = new Element({name:"fire",position:{x:200, y:30}, img:"red"});

const earth = new Element({name:"earth",position:{x:200, y:30}, img:"brown"});
//maybe try enqueue 
liveElements.push(wind)
liveElements.push(water)
liveElements.push(earth)
liveElements.push(fire)

const animate = () =>{
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    liveElements.forEach(i =>{
        i.draw();
    })

    window.requestAnimationFrame(animate);
}

animate();

let movingElement = false;

/**
 * Takes two element names. If there is an entry
 * in fusionList with two matching parents 
 * (the order of parents does not matter),
 * return the array of children.
 */
const fuseElements = (elementName1, elementName2) =>{
     
     for(let i = 0; i<fusionList.length; i++){
         let check = fusionList[i];
         if(check.parents.includes(elementName1) 
            && check.parents.includes(elementName2)){
                return check.children;
         }
     }

     return [];
}


/**
 * Accepts a list of element names
 * Draws them as elements to the screen
 */
const generateChildElements = (childrenArray) =>{

    masterElementList.forEach(element=>{

        if(childrenArray.includes(element.name)){
            let tempEl = new Element({name:element.name,
                position:{x:100+Math.floor(Math.random() * 100),
                y:100+Math.floor(Math.random() * 100)}, img:element.img});
            
            liveElements.push(tempEl);
            tempEl.draw();
            element.discovered = true;
        }
    })
}


/**
 * Takes a mouseclick's coords, and an element,
 * and returns that element ONLY if it was clicked.
 */
const isElementClicked=(click,element)=>{
   
    if(click.x >= element.position.x && click.x <= element.position.x + element.width 
        && click.y >= element.position.y && click.y <= element.position.y + element.height){
            console.log("clicked:", element.name);
            movingElement = element;
        }
        else{
            movingElement = false;   
        }


}


document.getElementById("gameCanvas").addEventListener("mousedown",(e)=>{
    /**
     * Checks all elements to see if they are clicked.
     */
    for(let i =0; i<liveElements.length; i++){
        isElementClicked({x:e.offsetX, y:e.offsetY }, liveElements[i]);
        if(movingElement){
            break;
        }
    }
   
})

document.getElementById("gameCanvas").addEventListener("mousemove",(e)=>{

    //If we have an element then update its position 
    if(movingElement){
        movingElement.position.x = e.offsetX;
        movingElement.position.y = e.offsetY;

    }
})

document.getElementById("gameCanvas").addEventListener("mouseup",(e)=>{
    movingElement=false;

    //drop the element
    //then,,.,. run check if dropped element touched anything
    //if so run fusions checks 

    //if two squares touch, console.log somethign
    //Sean - is to figure out if squares touch
    //Jake - layout the fusion code
})