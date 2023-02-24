import { photographerFactory } from "../factories/photographer.js";
import { getData } from "../factories/data.js";
import { modalContact } from "../utils/contactForm.js";

// Function affiche tous les photograhes
async function displayOnePhotographer(data) {
    const string = window.location.href;
    const url = new URL(string);
    const id = url.searchParams.get("id");

    // DOM Element - header des pages photographes uniques
    const PhotographerMain = document.getElementById("main");

    // Find() le photographe dans le tableau des photographes
    const AllPhotographersData = data.photographers;
    const singlePhotographerData = AllPhotographersData.find(element => AllPhotographersData.id = id);
    // console.log(singlePhotographerData); 

    
    const photographerCard = photographerFactory(singlePhotographerData);
    const singlePhotographe = photographerCard.singlePhotographeDOM(photographerCard.name, photographerCard.id, photographerCard.city, photographerCard.country, photographerCard.tagline, photographerCard.price, photographerCard.picture);
    PhotographerMain.appendChild(singlePhotographe);

    modalContact();
};

async function init() {
    const photographers = await getData();
    displayOnePhotographer(photographers);
};

init(); 