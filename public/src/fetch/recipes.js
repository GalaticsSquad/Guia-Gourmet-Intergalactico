
// @author {Eduardo}
// @coauthor {Carolina}
const get_recipes = async ()=>{
    try{
        let req =  await fetch(`https://140.82.28.22:443/getrecipe`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            body: null,
        })
        let json = await req.json()
        return json;
    }catch(error){
        console.log("FETCH", error)
    }
}
// @author {Eduardo}
// @coauthor {Carolina}
 const get_recipes_id_planet = async (id_Planet)=>{
    try{
        let req =  await fetch(`https://140.82.28.22:443/getrecipe/${id_Planet}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            body: null,
        })
        let json = await req.json()
        return json;
    }catch(error){
        console.log("FETCH", error)
    }

}
// @author {Eduardo}
// @coauthor {Carolina}
const post_recipes = async (_id_planet, _name, _description,  _type, _image, _time, _ingredients, _instructions)=>{
    try{
        const _body = {
            id_planet: _id_planet, 
            name:_name, 
            description: _description, 
            type: _type, 
            image: _image, 
            time: _time, 
            ingredients: _ingredients, 
            instructions: _instructions}
        let req =  await fetch(`https://140.82.28.22:443/addrecipe`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(_body) 
        })
        let json = await req.json()
    }catch(error){
        console.log("FETCH", error)
    }
} 
// @author {Eduardo}
// @coauthor {Carolina}
const patch_recipes = async (_id, _id_planet, _name, _description,  _type, _image, _time, _ingredients, _instructions)=>{
    try{
        let _body = {
            id_planet:_id_planet,
            name:_name, 
            description:_description, 
            type:_type, 
            image:_image, 
            time:_time, 
            ingredients:_ingredients, 
            instructions:_instructions}
        let req =  await fetch(`https://140.82.28.22:443/editrecipe/${_id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(_body) 
        })
        let json = await req.json()
        return json;
    }catch(error){
        console.log("FETCH", error)
    }
} 
// @author {Eduardo}
// @coauthor {Carolina}
const delete_recipes = async (_id)=>{
    try{
        let req =  await fetch(`https://140.82.28.22:443/delrecipe/${_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({password:123})
        })
        let json = await req.json()
        return json;
    }catch(error){
        console.log("FETCH", error)
    }
} 

export {get_recipes, get_recipes_id_planet, post_recipes, patch_recipes, delete_recipes};
