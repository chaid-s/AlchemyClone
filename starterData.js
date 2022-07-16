const fillStarterData = () =>{
    const wind = new Element({name:"wind",position:{x:1000, y:50}, img:"green",id:setId()});

    const water = new Element({name:"water",position:{x:1000, y:200}, img:"blue",id:setId()});

    const fire = new Element({name:"fire",position:{x:1000, y:350}, img:"red",id:setId()});

    const earth = new Element({name:"earth",position:{x:1000, y:500}, img:"brown",id:setId()});
    //maybe try enqueue 
    // liveElements.push(wind)
    // liveElements.push(water)
    // liveElements.push(earth)
    // liveElements.push(fire)
}