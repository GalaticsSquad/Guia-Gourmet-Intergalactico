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
 const get_recipes_id_planet = async (id_Planet)=>{
    let req =  await fetch(`http://localhost:3000/getrecipe/${id_Planet}`, {
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

const post_recipes = async (_id_planet, _name, _description,  _type, _image, _time, _ingredients, _instructions)=>{
    const _body = {
        id_planet: _id_planet, 
        name:_name, 
        description: _description, 
        type: _type, 
        image: _image, 
        time: _time, 
        ingredients: _ingredients, 
        instructions: _instructions}
    let req =  await fetch('http://localhost:3000/addrecipe', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(_body) 
    })
    let json = await req.json()
    // console.log(json)
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

export {get_recipes, get_recipes_id_planet, post_recipes, patch_recipes, delete_recipes};