// import { photographerFactory } from "../factories/photographer.js";
    
async function getData() {
    const requestURL = "http://localhost:5500/data/photographers.json"
    return fetch(requestURL)
    .then(response => response.json())
    .catch(error => alert("Erreur : " + error));
} 

// Function affiche tous les photograhes
async function displayOnePhotographer(data) {
    const string = window.location.href;
    const url = new URL(string);
    const id = url.searchParams.get("id");

    // // DOM Element - div contenant tous les articles
    // const photographersSection = document.querySelector(".photographer-section");

    data.photographers.forEach((photographer) => {
        if (id == photographer.id) {
            console.log(photographer.name)
        }
        // const photographerCard = photographerFactory(photographer);
        // const articlePanel = photographerCard.articlePanelDOM(photographerCard.name, photographerCard.id, photographerCard.city, photographerCard.country, photographerCard.tagline, photographerCard.price, photographerCard.picture);
        // photographersSection.appendChild(articlePanel);
    });

    // console.log(id, data);
};

async function init() {
    const photographers = await getData();
    displayOnePhotographer(photographers);
};

init(); 