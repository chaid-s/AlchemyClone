let menuClicked = false;

document.getElementById("gameCanvas").addEventListener("mousedown",(e)=>{
    console.log("LIVE ELEMENTS:", liveElements)
   // console.log("DISCOVERED ELEMENTS", discoveredElements)
    /**
     * Checks all elements to see if they are clicked.
     */
    //console.log(discoveredElements)

    if(e.clientX>.66*canvas.width){
        //this is the menu stuff
        //if we click on the menu, we need to check if we clicked
        //on an dex entry
        //if we did click an entry, then it needs to set as moving element
        for(let i =discoveredElements.length-1; i>=0; i--){
            isMenuClicked({x:e.offsetX, y:e.offsetY }, discoveredElements[i]);
            if(movingElement){
                menuClicked=true;
                break;
            }
        }
    }
    else{
        for(let i =liveElements.length-1; i>=0; i--){
            isElementClicked({x:e.offsetX, y:e.offsetY }, liveElements[i]);
            if(movingElement){
                break;
            }
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
    if(e.clientX<.66*canvas.width){
        if(menuClicked){
            menuClicked=false;
            liveElements.push(movingElement)
            movingElement=false;
        }
        else if(movingElement){
            
            for(let i = 0; i<liveElements.length; i++){
                if( movingElement.name != liveElements[i].name &&
                    movingElement.position.x+movingElement.width >=liveElements[i].position.x &&
                    movingElement.position.x <= liveElements[i].position.x + liveElements[i].width &&
                    movingElement.position.y + movingElement.height >=liveElements[i].position.y &&
                    movingElement.position.y <= liveElements[i].position.y + liveElements[i].height
                ){
                    console.log(movingElement.name+" overlaps "+liveElements[i].name)
                    let children = fuseElements(movingElement.name, liveElements[i].name);
                    generateChildElements(children,movingElement.position);
                    //kill parents
                    //dont add moving
                    movingElement=false;
                    //kill the liveEl[i]
                    liveElements.splice(i,1);
                }
                
            }
            if(movingElement){
                liveElements.push(movingElement);
            }
            
            movingElement=false;
        }
    }else{
        movingElement=false;
    }
    
})

window.addEventListener("resize",(e)=>{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

window.addEventListener("wheel",(e)=>{
    //get size of menu
    let menuSize = discoveredElements.length * 125 + 25*(discoveredElements.length-1) 
    let add = e.deltaY/2;
   
    //we need to plus or minus the scroll offset
    if(menuSize>canvas.height ){
        if(scrollOffset+add-50>=0){}
        else if(scrollOffset+add+100+menuSize-canvas.height<=0){}
        else{
            scrollOffset+=add;
        }
    }
    
   // console.log(scrollOffset, menuSize);

     
})