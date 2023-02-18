 const get_recipes = async ()=>{
    let req =  await fetch('http://localhost:3000/getrecipe', {
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
 const get_recipes_id = async (id)=>{
    let req =  await fetch(`http://localhost:3000/getrecipe/${id}`, {
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

const post_recipes = async ()=>{
    let _body = {"password": 123 , "id": 123 , id_planet: 2, "name": "teste R_name","description": "teste R_description", 
    "type": "teste R_type", "time": "teste R_time", "ingredients": "teste R_ingredients", "instructions": "teste R_instrutions", 
    "image": "teste2 R_image"}
    let req =  await fetch('http://localhost:3000/recipe', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(_body) 
    })
    let json = await req.json()
    console.log(json)
} 

const patch_recipes = async ()=>{
    let id = 1;
    let _body = {"password": 123 , "id": 123 , "name": "EDUARDO", 
    "image": "teste2 R_image"}
    let req =  await fetch(`http://localhost:3000/recipe/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(_body) 
    })
    let json = await req.json()
    console.log(json)
} 

const delete_recipes = async ()=>{
    let id = 1;
    let req =  await fetch(`http://localhost:3000/recipe/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({password:123})
    })
    let json = await req.json()
    console.log("delete",json)
} 

export {get_recipes, get_recipes_id, post_recipes, patch_recipes, delete_recipes};