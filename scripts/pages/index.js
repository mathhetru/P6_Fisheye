import { generatePhotographers } from "../factories/photographer.js";
import { getData } from "../factories/data.js";

/**
 * genère et affiche la page index
 * @param {Object} data 
 */
async function displayIndexPhotographers(data) {
    generatePhotographers(data.photographers);
}


/**
 * initialize en asynchrone la page index
 */
async function init() {
    const photographers = await getData();
    displayIndexPhotographers(photographers);
}

init();
