// @author {Carolina}

const connection = require('./db-connection')
TAG = "Repository: "

exports.getAllPlanets = async () => {
    try {
        const query = "SELECT * FROM planets"
        const response = await connection.connection(query)
        return response        
    } catch (error) {
        console.log(TAG, 'error caught');
        throw error;
    }
};

exports.get_Planet_id = async (_id) => {
    try {
        const query ='SELECT * FROM planets WHERE id = $1'
        const params = [_id]
        const response = await connection.connection(query, params)
        return response
    } catch (error) {
        console.log(TAG, 'error caught');
        throw error;
    }
};

exports.getAllRecipes = async () => {
    try {
        const query = "SELECT * FROM recipes"
        const query2 = 'SELECT ingredient, id_recipes FROM ingredients_recipes'
        const query3 = 'SELECT description, id_recipes FROM instructions_recipes'
        const resRecipe = await connection.connection(query)
        const resIng = await connection.connection(query2)
        const resDesc = await connection.connection(query3)
        return {
            recipe: resRecipe,
            ingredients: resIng,
            instructions: resDesc
        }      
    } catch (error) {
        console.log(TAG, 'error caught');
        throw error;
    }
};

exports.get_Recipe_id = async (_id) => {
    try {
        const query = 'SELECT * FROM recipes WHERE id_planet = $1'
        const query2 = 'SELECT ingredient FROM ingredients_recipes WHERE id_recipes = $1'
        const query3 = 'SELECT description FROM instructions_recipes WHERE id_recipes = $1'
        const params = [_id]
        const resRecipe = await connection.connection(query, params)
        const resIng = await connection.connection(query2, params)
        const resDesc = await connection.connection(query3, params)
        return [resRecipe, resIng, resDesc]
    } catch (error) {
        console.log(TAG, 'error caught');
        throw error;
    }
};