const fillStarterData = () =>{
    const wind = new Element({name:"wind",position:{x:200, y:100}, img:"green",id:setId()});

    const water = new Element({name:"water",position:{x:200, y:200}, img:"blue",id:setId()});

    const fire = new Element({name:"fire",position:{x:200, y:300}, img:"red",id:setId()});

    const earth = new Element({name:"earth",position:{x:200, y:400}, img:"brown",id:setId()});
    //maybe try enqueue 
    liveElements.push(wind)
    liveElements.push(water)
    liveElements.push(earth)
    liveElements.push(fire)
}