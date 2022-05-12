const FACTS_ANIMAL_TYPE = "dog";
const FACTS_AMOUNT = 100;

let generateRandomFacts = async (animalType, amount) => {
  try {
    const response = await fetch(
      `https://cat-fact.herokuapp.com/facts/random?animal_type=${animalType}&amount=${amount}`
    );
    let facts = await response.json();
    renderList(facts);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

let renderButton = async () => {
  let generateFactsButton = document.createElement("button");
  generateFactsButton.id = "generator";
  generateFactsButton.innerText = "Generuoti faktus";
  document.body.append(generateFactsButton);
  document
    .getElementById("generator")
    .addEventListener("click", () =>
      generateRandomFacts(FACTS_ANIMAL_TYPE, FACTS_AMOUNT)
    );
};

let renderList = async (items) => {
  console.log(items);
  let ol = document.createElement("ol");
  ol.innerText = "Itemu listas:";
  for (let item of items) {
    let li = document.createElement("li");
    li.innerText = item.text;
    ol.append(li);
  }

  document.body.append(ol);
};

let render = async () => {
  renderButton();
};

render();
