const canvas = document.getElementById("gameCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");

let scrollOffset = 0;

let liveElements = [];

let elementID = 0;

const setId = () =>{
    return elementID++;
}

const wind = new Element({name:"wind",position:{x:200, y:100}, img:"green",id:setId()});

const water = new Element({name:"water",position:{x:200, y:200}, img:"blue",id:setId()});

const fire = new Element({name:"fire",position:{x:200, y:300}, img:"red",id:setId()});

const earth = new Element({name:"earth",position:{x:200, y:400}, img:"brown",id:setId()});
//maybe try enqueue 
liveElements.push(wind)
liveElements.push(water)
liveElements.push(earth)
liveElements.push(fire)

let discoveredElements = [];

const fillDiscoveredElements = () =>{
    discoveredElements = [];
    masterElementList.forEach(el =>{
        if(el.discovered){
            let element = new Element({name:el.name,
                position:{x:0, y:0}, 
                img:el.img});
                discoveredElements.push(el);
        }
        
    })
}

const drawMenu = () =>{
    //If this is processor intensive, fix it, idiot
    fillDiscoveredElements();

    ctx.fillStyle = "black"
    ctx.fillRect(.66*canvas.width, 0,1,canvas.height)

    for(let i =0; i< discoveredElements.length; i++){
        //Use real element objects
        // ctx.fillStyle = "black"
        // ctx.fillRect(.70*canvas.width, 50+i*120, .15*canvas.width, 110)
        // ctx.fillStyle = "red"
        // ctx.fillRect(.70*canvas.width+2, 52+i*120, 100,100)
        // ctx.fillStyle = "white"
        // ctx.font = "32px Jokerman"
        // ctx.fillText("water", .70*canvas.width+152,102+i*120 )





    }

}

const animate = () =>{
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    liveElements.forEach(i =>{
        i.draw();
    })

    //draw menu loop
    drawMenu();

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
    // console.log("fuseElements:", elementName1, elementName2)
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
                y:100+Math.floor(Math.random() * 100)}, img:element.img, id:setId()});
            
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
            //console.log("clicked:", element.name);
            movingElement = element;
            //remove element from liveElements then push it back in
            
            liveElements = liveElements.filter(el =>{return el.id!=movingElement.id})
            liveElements.push(movingElement);
            console.log(liveElements)
        }
        else{
            movingElement = false;   
        }


}


document.getElementById("gameCanvas").addEventListener("mousedown",(e)=>{
    /**
     * Checks all elements to see if they are clicked.
     */
    console.log(discoveredElements)
     
    for(let i =liveElements.length-1; i>=0; i--){
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
    //drop the element
    //then,,.,. run check if dropped element touched anything
    //if so run fusions checks
    if(movingElement){
        for(let i = 0; i<liveElements.length; i++){
            if( movingElement.name != liveElements[i].name &&
                movingElement.position.x+movingElement.width >=liveElements[i].position.x &&
                movingElement.position.x <= liveElements[i].position.x + liveElements[i].width &&
                movingElement.position.y + movingElement.height >=liveElements[i].position.y &&
                movingElement.position.y <= liveElements[i].position.y + liveElements[i].height
            ){
                console.log(movingElement.name+" overlaps "+liveElements[i].name)
                let children = fuseElements(movingElement.name, liveElements[i].name);
                generateChildElements(children);
            }
        }
        //console.log(movingElement.name + " Element Dropped")
        movingElement=false;
    }
    

})

window.addEventListener("resize",(e)=>{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})