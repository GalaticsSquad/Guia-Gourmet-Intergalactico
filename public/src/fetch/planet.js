const get_planets = async ()=>{
    const req =  await fetch('http://localhost:3000/getplanet', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        body: null,
    })
    const json = await req.json()
    // const DB = json.data
    return json;
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
    // const DB = json.data
    return json;
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
    return json; 
} 


const patch_planets = async (_id, _name, _icon, _background, _description)=>{
    // let id = 1;
    let _body = {name: _name, icon: _icon , background: _background, description: _description}
    let req =  await fetch(`http://localhost:3000/editplanet/${_id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(_body) 
    })
    let json = await req.json()
    return json
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

export {get_planets, post_planets, patch_planets, get_planets_id, del_planets}