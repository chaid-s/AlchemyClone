class Element{
    //Look img is just a color rn but it will be a png eventually
    constructor({name, position, img, id=0, height=100, width=100}){
        this.name = name;
        this.height = height;
        this.width = width;
        this.position = position;
        this.img = img;
        this.id = id;
    }

    //Draws the elements to the living element table
    draw(){
        ctx.fillStyle = this.img;
        ctx.fillRect(this.position.x,this.position.y, this.height, this.width);
    }

    
    //This one doesn't work due to how the drag and drop will update this.position
    //     // drawDexElement(scrollOffset, numLiveElements){
    //     //where is it being drawn
    //     //x:70% of screen width, y
    //     ctx.strokeRect(this.position.x,this.position.y+scrollOffset, this.height*3, this.width+25)
    //     ctx.font = "32px Comic Sans MS";
    //     ctx.fillText(this.name,this.position.x + 150,this.position.y+scrollOffset + 50)
    // }
}