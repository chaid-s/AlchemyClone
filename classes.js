class Element{
    constructor({name, position, type}){
        this.name = name
        this.height = 100;
        this.width = 100;
        this.position = position;
        this.type = type;
    }

    draw(){
        ctx.fillStyle = this.type;
        ctx.fillRect(this.position.x,this.position.y, this.height, this.width);
    }

}