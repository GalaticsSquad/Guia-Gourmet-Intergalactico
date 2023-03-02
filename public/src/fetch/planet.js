
const get_planets = async ()=>{
    try {
        const req =  await fetch(`https://140.82.28.22:443/getplanet`, {
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
    try{
        const req =  await fetch(`https://140.82.28.22:443/getplanet/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            body: null,
        })
        const json = await req.json()
        return json;
    }catch(error){
        console.log("FETCH", error)
    }

}

const del_planets = async (_id)=>{
    try{
        let req =  await fetch(`https://140.82.28.22:443/delplanet/${_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        let json = await req.json()
        return json
    }catch(error){
        console.log("FETCH", error)
    }

} 

export {get_planets, get_planets_id, del_planets}
