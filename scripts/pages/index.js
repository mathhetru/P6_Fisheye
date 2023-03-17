import { photographerFactory } from "../factories/photographer.js";
import { getData } from "../factories/data.js";

// Function affiche tous les photograhes
async function displayIndexPhotographers(data) {
    // DOM Element - div contenant tous les articles
    const photographersSection = document.querySelector(".photographer-section");

    // Pour chaque photographe
    data.photographers.forEach((photographer) => {
        const photographerCard = photographerFactory(photographer);
        const indexArticlePanel = photographerCard.indexArticleDOM(
            photographerCard.name,
            photographerCard.id,
            photographerCard.city,
            photographerCard.country,
            photographerCard.tagline,
            photographerCard.price,
            photographerCard.picture
        );

        // photographersSection.appendChild(indexArticlePanel);
        photographersSection.innerHTML = indexArticlePanel.join('');
    });
}

async function init() {
    const photographers = await getData();
    displayIndexPhotographers(photographers);
}

init();
