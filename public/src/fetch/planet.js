const get_planets = async ()=>{
    const req =  await fetch('http://localhost:3000/getplanet', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        body: null,
    })
    const json = await req.json()
    const DB = json.data
    return DB;
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
    const DB = json.data
    return DB;
}

const post_planets = async (_name, _icon, _background, _description)=>{
    const _body = {name:_name, icon: _icon, background: _background, description: _description}
    const req =  await fetch('http://localhost:3000/addplanet', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(_body) 
    })
    const json = await req.json()
    const DB = json.data
    return DB; 
} 


const patch_planets = async ()=>{
    let id = 1;
    let _body = {password: 123, icon: "teste icon", background: "teste back", description: "teste description"}
    let req =  await fetch(`http://localhost:3000/planet/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(_body) 
    })
    let json = await req.json()
} 

export {get_planets, post_planets, patch_planets, get_planets_id}