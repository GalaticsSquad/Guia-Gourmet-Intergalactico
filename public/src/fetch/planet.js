
const get_planets = async ()=>{
    let req =  await fetch('http://localhost:3000/getplanet', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        body: null,
    })
    let json = await req.json()
    let DB = json.data
    console.log(DB)
    return DB;
} 

const post_planets = async ()=>{
    let _body = {password: 123 , name:"teste nome", icon: "teste icon", background: "teste back", description: "teste description"}
    let req =  await fetch('http://localhost:3000/planet', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(_body) 
    })
    let json = await req.json()
    console.log(json)
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
    console.log(json)
} 

export {get_planets, post_planets, patch_planets}