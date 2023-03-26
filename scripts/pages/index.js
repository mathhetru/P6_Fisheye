import { generatePhotographers } from "../factories/photographer.js";
import { getData } from "../factories/data.js";

// Function affiche tous les photograhes
async function displayIndexPhotographers(data) {
    generatePhotographers(data.photographers);
}

async function init() {
    const photographers = await getData();
    displayIndexPhotographers(photographers);
}

init();
