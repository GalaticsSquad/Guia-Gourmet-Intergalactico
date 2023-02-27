

const get_planets = async ()=>{
    try {
        const req =  await fetch(`http://localhost:3000/getplanet`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        body: null,
        
        })
        const json = await req.json()
        return json;
    } catch (error) {
        console.log("FETCH", error)
    }
} 

const get_planets_id = async (id)=>{
    const req =  await fetch(`http://localhost:3000/getplanet/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        body: null,
    })
    const json = await req.json()
    return json;
}

const del_planets = async (_id)=>{
    let req =  await fetch(`http://localhost:3000/delplanet/${_id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    let json = await req.json()
    return json
} 

export {get_planets, get_planets_id, del_planets}