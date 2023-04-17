import { generatePhotographers } from "../factories/photographer.js";
import { getData } from "../factories/data.js";

/**
 * Genère et affiche la page index
 * @param {Object} data 
 */
async function displayIndexPhotographers(data) {
    generatePhotographers(data.photographers);
}


/**
 * Initialize en asynchrone la page index
 */
async function init() {
    const photographers = await getData();
    displayIndexPhotographers(photographers);
}

init();
