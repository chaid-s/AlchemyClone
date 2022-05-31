class Element{
    //Look img is just a color rn but it will be a png eventually
    constructor({name, position, img}){
        this.name = name
        this.height = 100;
        this.width = 100;
        this.position = position;
        this.img = img;
    }

    draw(){
        ctx.fillStyle = this.img;
        ctx.fillRect(this.position.x,this.position.y, this.height, this.width);
    }

}