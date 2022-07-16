


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
const generateChildElements = (childrenArray,position) =>{

    masterElementList.forEach(element=>{

        if(childrenArray.includes(element.name)){
            let tempEl = new Element({name:element.name,
                position:{x:position.x+Math.floor(Math.random() * 100)-50,
                y:position.y+Math.floor(Math.random() * 100)-50},
                 img:element.img, id:setId()});
            
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
            //liveElements.push(movingElement);
           // console.log(liveElements)
        }
        else{
            movingElement = false;   
        }


}
