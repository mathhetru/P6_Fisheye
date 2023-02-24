import { photographerFactory } from "../factories/photographer.js";
    
async function getData() {
    const requestURL = "http://localhost:5500/data/photographers.json"
    return fetch(requestURL)
    .then(response => response.json())
    .catch(error => alert("Erreur : " + error));
} 

// Function affiche tous les photograhes
async function displayIndexPhotographers(data) {
    // DOM Element - div contenant tous les articles
    const photographersSection = document.querySelector(".photographer-section");

    // Pour chaque photographe
    data.photographers.forEach((photographer) => {
        const photographerCard = photographerFactory(photographer);
        const indexArticlePanel = photographerCard.indexArticleDOM(photographerCard.name, photographerCard.id, photographerCard.city, photographerCard.country, photographerCard.tagline, photographerCard.price, photographerCard.picture);
        photographersSection.appendChild(indexArticlePanel);
    });
};

async function init() {
    const photographers = await getData();
    displayIndexPhotographers(photographers);
};

init(); 