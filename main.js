const canvas = document.getElementById("gameCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");

let scrollOffset = 0;
let liveElements = [];
let elementID = 0;
let movingElement = false;
const setId = () =>{
    return elementID++;
}

//Prefill the array with starter elements
fillStarterData();

let discoveredElements = [];

const fillDiscoveredElements = () =>{
    discoveredElements = [];
    masterElementList.forEach(el =>{
        if(el.discovered){
            let element = new Element({name:el.name,
                position:{x:0, y:0}, 
                img:el.img, id:setId()});
                discoveredElements.push(element);
        }
        
    })
}

const isMenuClicked = (click, element) =>{
    
    if(click.x >= .7*canvas.width && click.x <= .7*canvas.width + 300 
        && click.y >= element.position.y && click.y <= element.position.y + 125){
            console.log("clicked:", element.name);
            movingElement = element; 
        }
        else{
            movingElement = false;   
        }

}

const drawMenu = () =>{
    //If this is processor intensive, fix it, idiot
    fillDiscoveredElements();
    
    ctx.fillStyle = "black"
    ctx.fillRect(.66*canvas.width, 0,1,canvas.height)


    //Has bug due to how we are handling draw priority
    for(let i =0; discoveredElements.length > i; i++){
    
    ctx.strokeRect(.7*canvas.width, i*150+50+scrollOffset, 300, 100)
    ctx.font = "32px Comic Sans MS";
    ctx.fillText(discoveredElements[i].name, .80*canvas.width , i*150+50+scrollOffset + 50)
    //draw in the element box
    //change their positions and then draw them
    discoveredElements[i].position = {x:.7*canvas.width, y:i*150+50+scrollOffset}
    discoveredElements[i].draw()

    }
}



const animate = () =>{
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //draw menu loop
    drawMenu();

    liveElements.forEach(i =>{
        i.draw()
    })

    if(movingElement){
        movingElement.draw()
    }
    
  
    window.requestAnimationFrame(animate);
}

animate();