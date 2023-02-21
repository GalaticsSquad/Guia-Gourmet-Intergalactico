
// {
          
//     const urlReplaced = url.replace(/[/]/, "")

//     const found = data[0].find(planet => planet.name === urlReplaced)

//     if(found !== undefined) {
//       const filtered = data[1].filter(recipe => recipe.id_planet === found.id)
//       const planeter = renderPlanets(found, filtered);
//       let root = document.getElementById('root')
//       root.innerHTML = ``
//       logicHeader(data[0])
//       logicPlanets(found)
//     }
// }


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
    return DB;
} 

const get_planets_id = async (id)=>{
    let req =  await fetch(`http://localhost:3000/getplanet/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        body: null,
    })
    let json = await req.json()
    let DB = json.data
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