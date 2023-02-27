// @author {Carolina}

const connection = require('./db-connection')
TAG = "Repository: "

exports.get_RP_AllPlanets = async () => {
    try {
        const query = [
            {text: "SELECT * FROM planets ORDER BY id ASC",}
        ]
        const response = await connection.executarQuerys(query)
        return response[0].rows
    } catch (error) {
        console.log(TAG, 'error caught1');
        throw error;
    }
};

exports.get_RP_Planet_id = async (_id) => {
    try {
        const query =[
            {text: "SELECT * FROM planets WHERE id = $1 ORDER BY id ASC",
            params: [_id]}
        ]
        const response = await connection.executarQuerys(query)
        return response[0].rows
    } catch (error) {
        console.log(TAG, 'error caught2');
        throw error;
    }
};

exports.add_RP_Planet = async (_name, _icon, _background, _description) => {
    try {
        const query =[{
            text: "INSERT INTO planets (name, icon, background, description) VALUES ($1, $2, $3, $4) RETURNING *",
            params: [_name, _icon, _background, _description]
        }]
        const response = await connection.executarQuerys(query)
        return response[0].rows
    } catch (error) {
        console.log(TAG, 'error caught3');
        throw error;
    }
};

exports.edit_RP_Planet = async (_id, body) => {
    try {
        const query =[{
            text:'SELECT * FROM planets WHERE id = $1',
            params: [_id]}]
        const planet = await connection.executarQuerys(query)
        
        Object.assign(planet[0].rows[0], body);
        const { id, name, icon, background, description } = planet[0].rows[0];

        const query2 =[{
            text: 'UPDATE planets SET name = $1, icon = $2, background = $3, description = $4 WHERE id = $5 RETURNING *',
            params:[name, icon, background, description, _id]}]
        const response = await connection.executarQuerys(query2)
        
        return response[0].rows[0]
    } catch (error) {
        console.log(TAG, 'error caught4');
        throw error;
    }
};

exports.del_RP_Planet = async (_id)=>{
    try{
        const query = [{
            text: 'DELETE FROM planets WHERE id = $1 RETURNING *',
            params: [_id]
        }]
        const response = await connection.executarQuerys(query)
        console.log(response[0].rows)
        return response[0].rows
    }catch(error){
        console.log(TAG, 'error caught9')
        throw error
    }
}

exports.get_RP_name = async (name) =>{
    // const name = req.params.name

    try {
        const query = [
            {text: "SELECT name FROM planets WHERE name=$1 ",
            params: [name]}]

        const response = await connection.executarQuerys(query)
        // res.status(200).json({teste: response[0].rows})
        return response[0].rows
    } catch (error) {
        console.log(TAG, 'error caught1');
        throw error;
    }
}

/* ------------------------------RECIPES------------------------------------ */

exports.get_RP_AllRecipes = async () => {
    const querys = []
    try {
        const query = {
            text: 'SELECT * FROM recipes ORDER BY id ASC'}
        querys.push(query)
        const query2 = {
            text:'SELECT ingredient, id_recipes FROM ingredients_recipes'}
        querys.push(query2)
        const query3 = {
            text: 'SELECT description, id_recipes FROM instructions_recipes'}
        querys.push(query3)
        const response = await connection.executarQuerys(querys)
        return {
            recipe: response[0].rows,
            ingredients: response[1].rows,
            instructions: response[2].rows
        }      
    } catch (error) {
        console.log(TAG, 'error caught5');
        throw error;
    }
};

exports.get_RP_Recipe_id = async (_id) => { //necessário verificar o soft delete
    const query_Ingredients = []
    const query_Instructions = []
    try {
        const query = [{
            text: 'SELECT * FROM recipes WHERE id_planet = $1 ORDER BY id ASC',
            params: [_id]}]
        const response = await connection.executarQuerys(query)
        console.log("tamanho do vetor rows:", response[0].rows.length)
        for(let i =0 ; i<response[0].rows.length; i++){
            const query2 = {
                text:'SELECT id_recipes, ingredient FROM ingredients_recipes WHERE id_recipes = $1',
                params: [response[0].rows[i].id]}
            query_Ingredients.push(query2)

        }

        for(let i =0 ; i<response[0].rows.length; i++){
            const query3 = {
                text: 'SELECT id_recipes, description FROM instructions_recipes WHERE id_recipes = $1',
                params: [response[0].rows[i].id]}
            query_Instructions.push(query3)
        }
        const response2 = await connection.executarQuerys(query_Ingredients)
        const response3 = await connection.executarQuerys(query_Instructions)
        return [response[0].rows, response2, response3]
    } catch (error) {
        console.log(TAG, 'error caught6');
        throw error;
    }
};


exports.add_RP_Recipe = async (_id_planet, _name, _description,  _type, _image, _time, _ingredients, _instructions) => {
    console.log("Repository: /POST");

    console.log("repository:",_id_planet,
      _name,
      _description,
      _type,
      _image,
      _time,
      _ingredients,
      _instructions)

    try {
        let querys = []
        const query = {
            text: "INSERT INTO recipes (id_planet, name, description, type, time, image, visit_count) VALUES ($1, $2, $3, $4, $5, $6, 0) RETURNING *",
            params: [_id_planet, _name, _description,  _type, _time, _image]
        }
        querys.push(query)
        
        for(let i=0; i<_ingredients.length;i++){
            const query_Ingredients = {
                text: "INSERT INTO ingredients_recipes (id_recipes, ingredient) VALUES ((SELECT id FROM recipes WHERE name = $1), $2) RETURNING *",
                params: [_name, _ingredients[i]]
            }
            querys.push(query_Ingredients)
        }
        for(let i=0; i<_instructions.length;i++){
            const query_Instructions = {
                text:"INSERT INTO instructions_recipes (id_recipes, description) VALUES ((SELECT id FROM recipes WHERE name = $1), $2) RETURNING *",
                params: [_name, _instructions[i]]
            }
            querys.push(query_Instructions)
        }
        const response_recipe = await connection.executarQuerys(querys)
        return response_recipe[0].rows
    } catch (error) {
        console.log(TAG, 'error caught7');
        throw error;
    }
};

exports.edit_RP_Recipe = async (_id, body)=>{
    try {
        const query =[{
            text: "SELECT * FROM recipes WHERE id = $1",
            params: [_id]}]
        
        const recipe = await connection.executarQuerys(query)
        const query2 =[{
            text: "select id, ingredient from ingredients_recipes where id_recipes= $1",
            params: [_id]}]
        
        const resIngredients = await connection.executarQuerys(query2)
        const query3 =[{
            text: "select id, description from instructions_recipes where id_recipes= $1",
            params: [_id]}]
        
        const resInstructions = await connection.executarQuerys(query3)

        const arrayIngredients = resIngredients[0].rows.map(x => x.ingredient);
        recipe[0].rows[0].ingredient = arrayIngredients
        const arrayInstructions = resInstructions[0].rows.map(x => x.description);
        recipe[0].rows[0].instructions = arrayInstructions
      
        
        Object.assign(recipe[0].rows[0], body);
    
        const { id_planet, name, description, type, image, visit_count, time, ingredient, instructions } = recipe[0].rows[0]
        const query4 =[{
            text: 'UPDATE recipes SET id_planet = $2, name = $3, description = $4, type = $5,  image = $6, visit_count = $7, time = $8  WHERE id = $1 RETURNING *',
            params:[_id, id_planet, name, description, type, image, visit_count, time]}]
        for(let i=0;i<ingredient.length;i++){
            const query = {
                text: 'UPDATE ingredients_recipes SET ingredient=$2 WHERE id=$1',
                params: [resIngredients[0].rows[i].id, ingredient[i]]}
            query4.push(query)
        }
        for(let i=0;i<instructions.length;i++){
            const query = {
                text: 'UPDATE instructions_recipes SET description=$2 WHERE id=$1',
                params: [resInstructions[0].rows[i].id, instructions[i]]}
            query4.push(query)
        }
        const response = await connection.executarQuerys(query4)
        return recipe[0].rows[0]
    } catch (error) {
        console.log(TAG, 'error caught8');
        throw error;
    }
}

exports.del_RP_Recipe = async (_id)=>{
    try{
        const query = [{
            text:'DELETE FROM recipes WHERE id = $1',
            params: [_id]
        }]
        const response = await connection.executarQuerys(query)
        return response[0].rows
    }catch(error){
        console.log(TAG, 'error caught9')
        throw error
    }
}

exports.post_RP_Session = async (username)=>{
    try{
        const query = [{
            text:'SELECT password FROM USERS WHERE username = $1',
            params: [username]
        }]
        const response = await connection.executarQuerys(query)
        return response[0].rows
    }catch(error){
        console.log(TAG, 'error caught9')
        throw error
    }
}