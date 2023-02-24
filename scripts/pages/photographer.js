import { photographerFactory } from "../factories/photographer.js";
    
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

    // DOM Element - header des pages photographes uniques
    const PhotographerMain = document.getElementById("main");
    console.log(data.photographers);

    data.photographers.forEach((photographer) => {
        if (id == photographer.id) {
            const photographerCard = photographerFactory(photographer)
            // console.log(photographerCard.name, photographerCard.id, photographerCard.city, photographerCard.country, photographerCard.tagline, photographerCard.price, photographerCard.picture )

            const SinglePhotographe = photographerCard.singlePhotographeDOM(photographerCard.name, photographerCard.id, photographerCard.city, photographerCard.country, photographerCard.tagline, photographerCard.price, photographerCard.picture);
            PhotographerMain.appendChild(SinglePhotographe);
        }
    });
};

async function init() {
    const photographers = await getData();
    displayOnePhotographer(photographers);
};

init(); 