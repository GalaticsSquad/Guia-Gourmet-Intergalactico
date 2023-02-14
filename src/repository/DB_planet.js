let planet = [
  {
    id: 0,
    name: "Exemplo 1",
    icon: "../../img/planet/p1.png",
    background: "../../img/planet/p2.png",
    description: "esse planeta é só um teste!",
  },
  {
    id: 1,
    name: "Exemplo 2",
    icon: "../../img/planet/p2.png",
    background: "../../img/planet/p2.png",
    description: "esse planeta é só um outro teste!",
  },
];


let recipe = [
  {
    id: 0,
    name: "Suco de tarantula-aquática do mar do norte",
    descricao: "Uma bebida extremamente refrescante",
    type: "teste tipo",
    time: "10 min",
    ingredients: "teste ingredientes",
    instructions: "teste modo de preparo",
    image: "../../img/recipe/prat1.png",
    visit_count: 0,
  },
  {
    id: 1,
    name: "carne de boi da fazenda do sul",
    descricao: "Exemplo de Receita 2",
    type: "teste tipo 2",
    time: "20 min",
    ingredients: "teste ingredientes 2",
    instructions: "teste modo de preparo 2",
    image: "../../img/recipe/prat2.png",
    visit_count: 0,
  },
];

module.exports = { planet, recipe };
