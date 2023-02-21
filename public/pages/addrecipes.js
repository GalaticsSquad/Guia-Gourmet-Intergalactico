// // @author {Eduardo}
// //@coauthor {Carolina,João}

import {insertHeader, logicHeader} from "./header.js";
import { get_planets } from "../src/fetch/planet.js";

export default async function renderAddRecipe() {
    const dataPlanet = await get_planets()
    const addRecipe = addRecipeHTML()
    const root = document.getElementById('root')
    root.innerHTML = ``
    root.appendChild(addRecipe);
    logicHeader(dataPlanet, dataRecipe)
}

function addRecipeHTML() {
    const header = insertHeader();
    const container = document.createElement("div");
    container.className = "rootContainerAddRecipes"
    container.innerHTML = `
    <header>${header}</header>
    <div class="container_planet_recipe">
        <form class="form_envio">
            <div class="div_input">
                <label>Nome do Planeta</label>
                <div>
                    <select id="planet_select">
                        <option>planet 1</option>
                        <option>planet 2</option>
                        <option>planet 3</option>
                        <option>planet 4</option>
                    </select>
                </div>
            </div>
            <div class="div_input">
                <label>Imagem da receita:</label>
                <div class="div_image">
                    <input type="file" id="input_image_receita">
                </div>
            </div>
            <div class="div_input">
                <label>Tipo da Receita:</label>
                <div>
                    <select id="Type_select">
                        <option>type 1</option>
                        <option>type 2</option>
                        <option>type 3</option>
                        <option>type 4</option>
                    </select>
                </div>
            </div>
            <div class="div_input">
                <label>Descrição do Prato:</label>
                <div class="div_input">
                <textarea id="food_description" cols="95" rows="5">
                </textarea>
                </div>
            </div>
            <div class="div_input">
                <label>Tempo de preparo:</label>
                <div class="div_input">
                    <input type="text" id="input_tempo">
                </div>
            </div>
            <div class="div_input">
                <label>Ingredientes:</label>
                <div class="div_input">
                    <textarea id="text_ingredients" cols="95" rows="5">
                    </textarea>
                </div>
            <div class="div_input">
                <label>Preparo:</label>
                <div class="div_input">
                    <textarea id="text_preparation" cols="95" rows="5">
                    </textarea>
                </div>
            </div>
                <input type="button" class="envio_button" id="input_send_recipe value="Enviar">
            </div>
            <section id="section-lista">
            <div class="container_up">
                <h2>LISTA DE USUÁRIOS CADASTRADOS</h2>
                <p id="verUsuarios">Ver Usuários</p>
            </div>
            <table id="table">
                <thead>
                    <tr id="table-heading">
                        <td class="id-number">#ID</td>
                        <td class="nome">NOME</td>
                        <td class="e-mail">E-MAIL</td>
                        <td class="editar">EDITAR</td>
                        <td class="excluir">EXCLUIR</td>
                    </tr>
                </thead>
                <tbody id="tbody">
                </tbody>
            </table>
        </section>
        </form>
    </div>
    `;

    return container
}
// const planetSelect = document.querySelector("#planet_select")
// const foodImage = document.querySelector("#input_image_receita")
// const typeSelect = document.querySelector("#type_select")
// const foodDescription = document.querySelector("#food_description")
// const inputTempo = document.querySelector("#input_tempo")
// const textIngredients = document.querySelector("#text_ingredients")
// const textPreparation = document.querySelector("#text_preparation")
// const sendRecipe = document.querySelector("#input_send_recipe")
// const tbody = document.querySelector("#tbody")

// sendRecipe.addEventListener("click",function registerrecipe(){
        
//         if (planetSelect == "" || foodImage.value == "" || typeSelect.value == "" || inputTempo.value == "" || textIngredients.value == "" || textPreparation.value == ""){
//             message.innerText = `Falha no cadastro da Receita!!`;
//             setTimeout(clearMsgs, 1500);
//         }
//         let recipe = {
//             [
//               id: 0,
//               id_planet: 0,
//               name: planetSelect.value,
//               description: foodDescription.value,
//               type: typeSelect.value,
//               time: inputTempo.value,
//               ingredients:textIngredients.value,
//               instructions: textPreparation.value,
//               image: foodImage.value,
//               visit_count: 0,
//               delete:false
//             ]
//             }
//         })
//criando as linhas da tabela;
// function creatLineRecipe(recipe, index){  
//     let tr2 = document.createElement("tr");
//     let td1 = document.createElement("td");
//     let td2 = document.createElement("td");
//     let td3 = document.createElement("td");
//     let td4 = document.createElement("td");
//     let td5 = document.createElement("td");
//     let td6 = document.createElement("td");
//     let td7 = document.createElement("td");
//     let td8 = document.createElement("td");
//     let td9 = document.createElement("td");
//     let td10 = document.createElement("td");
//     let td11 = document.createElement("td");

//     const editButton = document.createElement("img");
//     const deleteButton = document.createElement("img");

//     editButton.setAttribute("class", "editar-img");
//     deleteButton.setAttribute("class", "editar-img");    

//     editButton.setAttribute('onclick', `btnUpdate(${JSON.stringify(users[index])})`);
//     deleteButton.setAttribute("onclick", `delUsers(${JSON.stringify(users[index])})`);

//      editButton.setAttribute("src", "./src/lapis.png");
//      deleteButton.setAttribute("src", "./src/excluir.png");
    

//     tbody.appendChild(tr2);
//     tr2.appendChild(td1);
//     tr2.appendChild(td2);
//     tr2.appendChild(td3);
//     tr2.appendChild(td4);
//     tr2.appendChild(td5);
//     tr2.appendChild(td6);
//     tr2.appendChild(td7);
//     tr2.appendChild(td8);
//     tr2.appendChild(td9);
//     tr2.appendChild(td10);
//     tr2.appendChild(td11);

//     td1.innerHTML = planets[index].id;
//     td2.innerHTML = planets[index].id_planet;
//     td3.innerHTML = planets[index].name;
//     td4.innerHTML = planets[index].description;
//     td5.innerHTML = planets[index].type;
//     td6.innerHTML = planets[index].time;
//     td7.innerHTML = planets[index].ingredients;
//     td8.innerHTML = planets[index].instructions;
//     td9.innerHTML = planets[index].image;
//     td10.innerHTML = editButton.outerHTML;
//     td11.innerHTML = deleteButton.outerHTML;
// }

//caso queria olha a logica!

//import { v4 as uuidv4 } from 'uuid';
// import fs from "fs";
// const path = "./repository/dados.json";

// export function getAll(req, res){
//     const usersList = JSON.parse(fs.readFileSync(path));
//     res.status(200).send(usersList);
// }

// export function postUser(req, res){
//     const usersList = JSON.parse(fs.readFileSync(path));
//     const user = req.body
//     user.id = uuidv4();
//     JSON.stringify(user);
//     usersList.push(user);

//     fs.writeFile(path, JSON.stringify(usersList), (err)=>{
//         if(err){
//             console.log(err)
//         }
//         res.json({status: "Usuário cadastrado com sucesso!"})
//     })
// }

// export function patchUser(req, res){
//     const usersList = JSON.parse(fs.readFileSync(path));

//     const user = req.body;
   
//     const dataId = req.body.id;
//     for (let index = 0; index < usersList.length; index++) {
//         if(dataId == usersList[index].id){
            
//             if(req.body.nome){
//                 usersList[index].nome = user.nome;
//             }
//             if(req.body.email){
//                 usersList[index].email = user.email;
//             }
//             fs.writeFile(path, JSON.stringify(usersList), (err)=>{
//                 if(err){
//                     res.json({status: "Usuário não encontrado!"})
//                 }
                
//                 res.json({status: "Usuário atualizado com sucesso!"})
//             })
//         }
//     }
// }

// export function userDel(req, res){
//     const users = JSON.parse(fs.readFileSync(path));
//     console.log(req.body)
//     const dataId = req.body.id;

//     const usersList = users.filter((user) => user.id !== dataId);
    
//     fs.writeFile(path, JSON.stringify(usersList), (err)=>{
//         if(err){
//             console.log(err)
//         }res.json({status: "Usuário removido com sucesso!"})
//     })
// }
