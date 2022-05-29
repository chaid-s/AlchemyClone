const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");



const liveElements = [];


const wind = new Element({name:"wind",position:{x:100, y:100}, type:"green"});

const water = new Element({name:"water",position:{x:200, y:30}, type:"blue"});

const fire = new Element({name:"fire",position:{x:200, y:30}, type:"red"});

const earth = new Element({name:"earth",position:{x:200, y:30}, type:"brown"});
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


//method to take click coords, and a square
const isElementClicked=(click,element)=>{
    //add width to the y of sqaure, height to the x of square
    //if click x,y is within this range return true
   
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
    //find out if theres a square under us
    
    //check all squares and see if any have that overlap
    for(let i =0; i<liveElements.length; i++){
        isElementClicked({x:e.offsetX, y:e.offsetY }, liveElements[i]);
        if(movingElement){
            break;
        }
    }
   
})

document.getElementById("gameCanvas").addEventListener("mousemove",(e)=>{

    //if we have an element then update it position 
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